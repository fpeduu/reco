import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

import Devedores, { Devedor } from "@/models/Devedores";
import { connectToDatabase } from "@/middlewares/mongodb";

export async function GET() {
  connectToDatabase();
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.redirect("/auth/signin");
  }

  const devedores: Devedor[] = await Devedores.aggregate([
    { $match: { emailAdministrador: session.user?.email } },
    {
      $lookup: {
        from: "acordos",
        localField: "cpf",
        foreignField: "cpfDevedor",
        as: "acordos",
      },
    },
    { $match: { acordos: { $size: 0 } } },
    { $unset: "acordos" },
  ]);

  return NextResponse.json(devedores);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.redirect("/auth/signin");
  }

  const devedor: Devedor = await req.json();
  devedor.emailAdministrador = session.user?.email ?? "";

  connectToDatabase();

  const newDevedor = new Devedores(devedor);
  await newDevedor.save();

  return NextResponse.json(newDevedor);
}
