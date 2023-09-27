import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/middlewares/mongodb";
import Acordos, { Acordo } from "@/models/Acordos";

import { options } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

import Devedores from "@/models/Devedores";
import { DevedorAcordo } from "@/types/acordo.dto";

export async function GET(request: NextRequest) {
  connectToDatabase();

  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.redirect("/auth/signin");
  }

  const { pathname } = new URL(request.url);
  const cpfDevedor = pathname.split("/").pop() as string;

  const devedoresAndAcordos: DevedorAcordo[] = await Devedores.aggregate([
    { $match: {
      emailAdministrador: session.user?.email,
      cpf: cpfDevedor
    } },
    {
      $lookup: {
        from: "acordos",
        localField: "cpf",
        foreignField: "cpfDevedor",
        as: "acordo",
      },
    },
    { $unwind: { path: "$acordo" } },
  ]);
  if (devedoresAndAcordos.length === 0) {
    return NextResponse.next();
  }

  return NextResponse.json(devedoresAndAcordos[0]);
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