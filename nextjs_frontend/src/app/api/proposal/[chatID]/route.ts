import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/middlewares/mongodb";
import options from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

import Acordos, { Acordo, Proposta, StatusType } from "@/models/Acordos";
import Devedores, { Devedor } from "@/models/Devedores";
import Usuarios, { Usuario } from "@/models/Usuarios";
import { NegotiationData } from "@/types/negotiation.dto";

export async function GET(request: NextRequest) {
  connectToDatabase();

  const { pathname } = new URL(request.url);
  const cpfDevedor = pathname.split("/").pop() as string;
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

  for (const rule of userInfos.regrasProposta) {
    if (rule.mesesAtraso === devedor.mensalidadesAtrasadas) {
      return NextResponse.json(rule);
    }
  }
  const lastOne = userInfos.regrasProposta.length - 1;
  const lastRule = userInfos.regrasProposta[lastOne];

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

export async function POST(request: NextRequest) {
  connectToDatabase();

  const { pathname } = new URL(request.url);
  const cpfDevedor = pathname.split("/").pop() as string;
  const newProposal: Proposta = await request.json();

  const proposal: Acordo | null = await Acordos.findOne({
    cpfDevedor
  });
  if (!proposal) {
    return NextResponse.json({
      "error": "No proposal found"
    });
  }

  let status: StatusType = "Aguardando inadimplente";
  const session = await getServerSession(options);
  if (session) {
    if (newProposal.aceito) {
      status = "Acordo aceito";
    } else {
      status = "Acordo recusado";
    }
  } else if (newProposal.aceito) {
    status = "Aguardando aprovação";
  } else switch (proposal.historicoValores.length) {
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

  if (status === "Acordo aceito") {
    proposal.entrada = newProposal.entrada;
    proposal.qtdParcelas = newProposal.qtdParcelas;
  }

  proposal.status = status;
  proposal.dataAcordo = new Date();
  proposal.historicoValores.push(newProposal);

  const updatedProposal = await Acordos.findOneAndUpdate(
    { cpfDevedor },
    { $set: {
      dataAcordo: proposal.dataAcordo,
      status, entrada: proposal.entrada,
      qtdParcelas: proposal.qtdParcelas,
      historicoValores: proposal.historicoValores,
    } },
    { new: true }
  );

  return NextResponse.json(updatedProposal);
}