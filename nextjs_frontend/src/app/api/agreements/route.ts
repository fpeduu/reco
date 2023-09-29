import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import options from "../auth/[...nextauth]/options";

import { connectToDatabase } from "@/middlewares/mongodb";
import Devedores from "@/models/Devedores";

import { DevedorAcordo } from "@/types/acordo.dto";

export async function GET() {
  connectToDatabase();

  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.redirect("/auth/signin");
  }

  const devedoresAndAcordos: DevedorAcordo[] = await Devedores.aggregate([
    { $match: { emailAdministrador: session.user?.email } },
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

  return NextResponse.json(devedoresAndAcordos);
}
