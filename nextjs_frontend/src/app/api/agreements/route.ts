import Acordos, { AcordoIdentificado } from "@/models/Acordos";
import { NextResponse } from "next/server";
import Devedores from "@/models/Devedores";
import { connectToDatabase } from "@/middlewares/mongodb";
import { getServerSession } from "next-auth";
import options from "../auth/[...nextauth]/options";

async function getAgreement(cpf: string) {
  const agreement: any = await Acordos.findOne({ cpfDevedor: cpf })
    .lean()
    .exec();

  return agreement || null;
}

export async function GET() {
  connectToDatabase();
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.redirect("/auth/signin");
  }

  console.log("email", session.user?.email);

  const devedores = await Devedores.find({
    emailAdministrador: session.user?.email,
  }).exec();

  const agreementPromises = devedores.map(async (devedor) => {
    const agreement = await getAgreement(devedor.cpf);
    return {
      ...agreement,
      nomeDevedor: devedor.nome,
      nomeCondominio: devedor.nomeCondominio,
    };
  });

  const acordos: AcordoIdentificado[] = await Promise.all(agreementPromises);

  const filteredAcordos = acordos.filter((item) => item.cpfDevedor);

  return NextResponse.json(filteredAcordos);
}
