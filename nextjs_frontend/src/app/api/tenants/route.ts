import { NextRequest, NextResponse } from "next/server";

import Devedores from "@/models/Devedores";
import { connectToDatabase } from "@/middlewares/mongodb";

export async function POST(req: NextRequest) {
  const { administradorEmail } = await req.json();

  connectToDatabase();

  const devedores = await Devedores.find({ administradorEmail }).exec();

  return NextResponse.json(devedores);
}
