import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import options from "../../auth/[...nextauth]/options";
import Devedores from "@/models/Devedores";
const csv = require("papaparse");
const fs = require("fs");

export async function POST(req: NextRequest) {
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.redirect("/auth/signin");
  }

  const csvFiles = (await req.formData()).getAll("files");

  for (let i = 0; i < csvFiles.length; i++) {
    const file: any = csvFiles[i];
    const fileBuffer = await file.arrayBuffer();
    const fileContent = new TextDecoder().decode(fileBuffer);
    const csvData = csv.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
    });

    var devedores = csvData.data;

    devedores.forEach(async (devedor: any) => {
      devedor.emailAdministrador = session.user?.email ?? "";

      const newDevedor = new Devedores(devedor);
      await newDevedor.save();
    });
  }

  return NextResponse.json(devedores);
}
