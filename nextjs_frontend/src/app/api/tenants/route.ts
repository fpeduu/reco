import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

import Devedores, { Devedor } from "@/models/Devedores";
import { connectToDatabase } from "../../../middlewares/mongodb";

export async function GET() {
  connectToDatabase();
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.redirect("/auth/signin");
  }

  const devedores: Devedor[] = await Devedores.find({
    emailAdministrador: session.user?.email,
  });

  return NextResponse.json(devedores);
}
