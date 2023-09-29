import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/middlewares/mongodb";
import options from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

import Acordos, { Acordo, Proposta, StatusType } from "@/models/Acordos";
import Devedores, { Devedor } from "@/models/Devedores";
import Usuarios, { Usuario } from "@/models/Usuarios";
import { NegotiationData } from "@/types/negotiation.dto";
import { revalidatePath } from "next/cache";

interface Context {
  params: { chatID: string }
}

export async function GET(request: NextRequest, context: Context) {
  connectToDatabase();

  const cpfDevedor = context.params.chatID;
  const devedor: Devedor | null = await Devedores.findOne({
    cpf: cpfDevedor,
  });
  if (!devedor) {
    return NextResponse.json({
      "error": "No debtor found"
    });
  }

  const emailAdministrador = devedor?.emailAdministrador;
  const userInfos: Usuario | null = await Usuarios.findOne({
    email: emailAdministrador
  });
  if (!userInfos) {
    return NextResponse.json({
      "error": "No user found"
    });
  }

  const lastOne = userInfos.regrasProposta.length - 1;
  let lastRule = userInfos.regrasProposta[lastOne];
  for (const rule of userInfos.regrasProposta) {
    if (devedor.mensalidadesAtrasadas <= rule.mesesAtraso)  {
      lastRule = rule;
      break;
    }
  }

  const proposal: Acordo | null = await Acordos.findOne({
    cpfDevedor
  });
  if (!proposal) {
    return NextResponse.json({
      "error": "No proposal found"
    });
  }

  const response: NegotiationData = {
    cpf: devedor.cpf,
    nome: devedor.nome,
    valorDivida: devedor.valorDivida,
    nomeCondominio: devedor.nomeCondominio,
    emailAdministrador: devedor.emailAdministrador,
    mensalidadesAtrasadas: devedor.mensalidadesAtrasadas,
    proposals: proposal.historicoValores,
    contact: userInfos.contact,
    status: proposal.status,
    rules: lastRule,
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
  } else if (newProposal.aceito) {
    status = "Aguardando aprovação";
  } else switch (history.length) {
    case 0:
      status = "Primeira proposta";
      break;
    case 1:
      status = "Segunda proposta";
      break;
    case 2:
      status = "Proposta do inadimplente";
      break;
    default:
      status = "Conversa iniciada";
      break;
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

  if (status !== "Acordo aceito" && status !== "Acordo recusado") {
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
  return NextResponse.json(updatedProposal);
}