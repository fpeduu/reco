import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/middlewares/mongodb";
import Acordos, { Acordo } from "@/models/Acordos";

import { options } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

import Devedores, { Devedor } from "@/models/Devedores";

export async function GET(request: NextRequest) {
  connectToDatabase();

  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.redirect("/auth/signin");
  }

  const { pathname } = new URL(request.url);
  const cpfDevedor = pathname.split("/").pop() as string;

  const devedor: Devedor | null = await Devedores.findOne({
    cpf: cpfDevedor
  });
  const acordo: Acordo | null = await Acordos.findOne({ cpfDevedor });

  return NextResponse.json({
    acordo,
    devedor,
  });
}

export async function POST(request: NextRequest) {
  connectToDatabase();

  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.redirect("/auth/signin");
  }

  const { pathname } = new URL(request.url);
  const { entrada, qtdParcelas, valorTotal } = await request.json();
  const cpfDevedor = pathname.split("/").pop() as string;

  const acordo: Acordo | null = await Acordos.findOne({ cpfDevedor });
  if (!acordo) {
    const usuarioEmail = session.user?.email as string;
    const newAcordo: Acordo = {
      status: "Aguardando inadimplente",
      historicoValores: [],
      cpfDevedor,
      entrada,
      valorTotal,
      qtdParcelas,
      usuarioEmail,
    }

    const acordoCreated = await Acordos.create(newAcordo);
    return NextResponse.json(acordoCreated);
  }

  return NextResponse.json(acordo);
}