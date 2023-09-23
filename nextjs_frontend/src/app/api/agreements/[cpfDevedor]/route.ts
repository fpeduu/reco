import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/middlewares/mongodb";
import Acordos, { Acordo } from "@/models/Acordos";

import Devedores, { Devedor } from "@/models/Devedores";

export async function GET(req: NextRequest) {
  connectToDatabase();

  const cpfDevedor = req.nextUrl.href.split("/").pop() as string;

  const devedor: Devedor | null = await Devedores.findOne({ cpf: cpfDevedor });

  const acordo: Acordo | null = await Acordos.findOne({ cpfDevedor });

  return NextResponse.json({
    acordo,
    devedor,
  });
}
