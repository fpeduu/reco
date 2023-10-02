import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/middlewares/mongodb";

import Devedores, { Devedor } from "@/models/Devedores";
import Usuarios, { Usuario } from "@/models/Usuarios";

interface Context {
  params: { cpfDevedor: string }
}

export async function GET(request: NextRequest, context: Context) {
  connectToDatabase();

  const { cpfDevedor } = context.params;
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

  return NextResponse.json(lastRule);
}
