import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/middlewares/mongodb";
import options from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import Acordos, { Acordo, Proposta, StatusType } from "@/models/Acordos";
import Devedores, { Devedor } from "@/models/Devedores";
import { Usuario } from "@/models/Usuarios";
import { NegotiationData } from "@/types/negotiation.dto";
import { notificate } from "./notification";

interface AggregatedDebtor extends Devedor {
  administrador: Usuario;
  acordo: Acordo;
}

interface Context {
  params: { chatID: string }
}

export async function GET(request: NextRequest, context: Context) {
  connectToDatabase();

  const cpfDevedor = context.params.chatID;
  const debtors: AggregatedDebtor[] = await Devedores.aggregate([
    { $match: { cpf: cpfDevedor } },
    {
      $lookup: {
        from: "usuarios",
        localField: "emailAdministrador",
        foreignField: "email",
        as: "administrador",
      },
    },
    {
      $lookup: {
        from: "acordos",
        localField: "cpf",
        foreignField: "cpfDevedor",
        as: "acordo",
      },
    },
    { $unwind: { path: "$administrador" } },
    { $unwind: { path: "$acordo" } },
  ]);
  if (debtors.length === 0) {
    return NextResponse.json({ "error": "No debtors found" });
  }

  const devedor: AggregatedDebtor = debtors[0];
  const response: NegotiationData = {
    cpf: devedor.cpf,
    nome: devedor.nome,
    valorDivida: devedor.valorDivida,
    nomeCondominio: devedor.nomeCondominio,
    emailAdministrador: devedor.emailAdministrador,
    mensalidadesAtrasadas: devedor.mensalidadesAtrasadas,
    proposals: devedor.acordo.historicoValores,
    contact: devedor.administrador.contact,
    rules: devedor.acordo.regraProposta,
    status: devedor.acordo.status,
  };

  return NextResponse.json(response);
}

export async function POST(request: NextRequest, context: Context) {
  connectToDatabase();

  const cpfDevedor = context.params.chatID;
  const newProposal: Proposta = await request.json();

  const agreement: Acordo | null = await Acordos.findOne({
    cpfDevedor
  });
  if (!agreement) {
    return NextResponse.json({ "error": "No proposal found" });
  }

  let status: StatusType = "Aguardando inadimplente";
  const session = await getServerSession(options);
  const history = agreement.historicoValores;
  if (session && history.length > 0 &&
      history[history.length - 1].aceito) {
    if (newProposal.aceito) {
      status = "Acordo aceito";
    } else {
      status = "Acordo recusado";
    }
  } else {
    status = newProposal.status;
  }

  const devedor: Devedor | null = await Devedores.findOne({
    cpf: cpfDevedor,
  });
  if (!devedor) {
    return NextResponse.json({ "error": "No debtor found" });
  }
  if (newProposal.autor === "User") {
    agreement.entrada = newProposal.entrada;
  } else {
    agreement.entrada = devedor.valorDivida * newProposal.entrada;
  }
  agreement.qtdParcelas = newProposal.qtdParcelas;

  if (!["Acordo aceito", "Acordo recusado",
        "Decisão do inadimplente"].includes(status)) {
    history.push(newProposal);
  }

  agreement.dataAcordo = new Date();
  agreement.status = status;

  const updatedProposal = await Acordos.findOneAndUpdate(
    { cpfDevedor },
    { $set: {
      dataAcordo: agreement.dataAcordo,
      status, entrada: agreement.entrada,
      qtdParcelas: agreement.qtdParcelas,
      historicoValores: history,
    } },
    { new: true }
  );

  revalidatePath("/negociacao/[chatID]/page");
  revalidatePath("/agreements/[chatID]/page");
  revalidatePath("/agreements/page");
  notificate(devedor, updatedProposal);
  return NextResponse.json(updatedProposal);
}