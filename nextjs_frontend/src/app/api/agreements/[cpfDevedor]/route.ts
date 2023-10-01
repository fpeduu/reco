import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/middlewares/mongodb";
import Acordos, { Acordo } from "@/models/Acordos";

import { options } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

import Devedores from "@/models/Devedores";
import { DevedorAcordo } from "@/types/acordo.dto";

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

  const { entrada, qtdParcelas, valorTotal, piorValor, pioresParcelas } =
    await request.json();

  const { cpfDevedor } = context.params;

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
      valorReserva: {
        entrada: piorValor,
        qtdParcelas: pioresParcelas,
      },
    };

    const acordoCreated = await Acordos.create(newAcordo);
    return NextResponse.json(acordoCreated);
  }

  return NextResponse.json(acordo);
}
