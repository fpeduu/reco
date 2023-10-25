import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/middlewares/mongodb";
import options from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import Acordos, { Acordo, Proposta, StatusType } from "@/models/Acordos";
import { Devedor } from "@/models/Devedores";
import { Usuario } from "@/models/Usuarios";
import { NegotiationData } from "@/types/negotiation.dto";
import { notificate } from "./notification";

interface AgreementAgg extends Acordo {
  administrador: Usuario;
  devedor: Devedor;
}

interface AgreementAgg2 extends Acordo {
  devedor: Devedor;
}
interface Context {
  params: { chatID: string }
}

export async function GET(request: NextRequest, context: Context) {
  connectToDatabase();

  const identificador = context.params.chatID;
  const agreements: AgreementAgg[] = await Acordos.aggregate([
    { $match: { identificador } },
    {
      $lookup: {
        from: "devedores",
        localField: "cpfDevedor",
        foreignField: "cpf",
        as: "devedor",
      },
    },
    {
      $lookup: {
        from: "usuarios",
        localField: "usuarioEmail",
        foreignField: "email",
        as: "administrador",
      },
    },
    { $unwind: { path: "$administrador" } },
    { $unwind: { path: "$devedor" } },
  ]);
  if (agreements.length === 0) {
    return NextResponse.json({ "error": "No agreements found" });
  }

  const agreement: AgreementAgg = agreements[0];
  const devedor: Devedor = agreement.devedor;
  const response: NegotiationData = {
    nome: devedor.nome,
    valorDivida: devedor.valorDivida,
    nomeCondominio: devedor.nomeCondominio,
    mensalidadesAtrasadas: devedor.mensalidadesAtrasadas,
    emailAdministrador: agreement.usuarioEmail,
    contact: agreement.administrador.contact,
    proposals: agreement.historicoValores,
    identifier: agreement.identificador,
    rules: agreement.regraProposta,
    cpf: agreement.cpfDevedor,
    status: agreement.status,
  };

  return NextResponse.json(response);
}

export async function POST(request: NextRequest, context: Context) {
  connectToDatabase();

  const identificador = context.params.chatID;
  const newProposal: Proposta = await request.json();

  const agreements: AgreementAgg2[] = await Acordos.aggregate([
    { $match: { identificador } },
    {
      $lookup: {
        from: "devedores",
        localField: "cpfDevedor",
        foreignField: "cpf",
        as: "devedor",
      },
    },
    { $unwind: { path: "$devedor" } },
  ]);
  if (agreements.length === 0) {
    return NextResponse.json({ "error": "No agreement found" });
  }
  const agreement: AgreementAgg2 = agreements[0];
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

  const devedor: Devedor = agreement.devedor;
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

  agreement.dataAtualizacao = new Date();
  agreement.status = status;

  const updatedProposal = await Acordos.findOneAndUpdate(
    { identificador },
    { $set: {
      dataAtualizacao: agreement.dataAtualizacao,
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