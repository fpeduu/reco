import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/middlewares/mongodb";
import Acordos, { Acordo } from "@/models/Acordos";

import { options } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

import Devedores from "@/models/Devedores";
import { DevedorAcordo } from "@/types/acordo.dto";
import { randomUUID } from "crypto";

interface Context {
  params: { cpfDevedor: string };
}

export async function GET(request: NextRequest, context: Context) {
  connectToDatabase();

  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.redirect("/auth/signin");
  }

  const { cpfDevedor } = context.params;
  const devedoresAndAcordos: DevedorAcordo[] = await Devedores.aggregate([
    {
      $match: {
        emailAdministrador: session.user?.email,
        cpf: cpfDevedor,
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
    { $unwind: { path: "$acordo" } },
  ]);
  if (devedoresAndAcordos.length === 0) {
    return NextResponse.next();
  }

  return NextResponse.json(devedoresAndAcordos[0]);
}

export async function POST(request: NextRequest, context: Context) {
  connectToDatabase();

  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.redirect("/auth/signin");
  }

  const {
    valorTotal, mesesAtraso, melhorEntrada, melhorParcela,
    piorEntrada, piorParcela, valorEntrada,
  } = await request.json();
  const { cpfDevedor } = context.params;

  const acordo: Acordo | null = await Acordos.findOne({ cpfDevedor });
  if (!acordo) {
    const usuarioEmail = session.user?.email as string;
    const status = "Aguardando inadimplente";
    const newAcordo: Acordo = {
      identificador: randomUUID(),
      qtdParcelas: melhorParcela,
      entrada: valorEntrada,
      historicoValores: [],
      regraProposta: {
        melhorEntrada,
        melhorParcela,
        mesesAtraso,
        piorEntrada,
        piorParcela,
      },
      usuarioEmail,
      cpfDevedor,
      valorTotal,
      status,
    };

    const acordoCreated = await Acordos.create(newAcordo);
    return NextResponse.json(acordoCreated);
  }

  return NextResponse.json(acordo);
}
