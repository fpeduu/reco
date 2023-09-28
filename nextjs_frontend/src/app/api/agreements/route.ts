import Acordos, { Acordo, AcordoIdentificado } from "@/models/Acordos";
import { NextResponse } from "next/server";
import Devedores, { Devedor } from "@/models/Devedores";
import { connectToDatabase } from "@/middlewares/mongodb";
import { getServerSession } from "next-auth";
import options from "../auth/[...nextauth]/options";

export async function GET() {
  connectToDatabase();

  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.redirect("/auth/signin");
  }

  const devedores: Devedor[] = await Devedores.find({
    emailAdministrador: session.user?.email,
  });

  const agreementPromises = devedores.map(async (devedor) => {
    const agreement: Acordo | null = await Acordos.findOne({
      cpfDevedor: devedor.cpf
    });

    if (!agreement) {
      return null;
    }

    return {
      usuarioEmail: agreement.usuarioEmail,
      cpfDevedor: agreement.cpfDevedor,
      dataAcordo: agreement.dataAcordo,
      status: agreement.status,

      entrada: agreement.entrada,
      valorTotal: agreement.valorTotal,
      qtdParcelas: agreement.qtdParcelas,
      historicoValores: agreement.historicoValores,
      
      nomeDevedor: devedor.nome,
      nomeCondominio: devedor.nomeCondominio,
    };
  }).filter((item) => item) as Promise<AcordoIdentificado>[];

  const acordos: AcordoIdentificado[] = await Promise.all(
    agreementPromises);

  return NextResponse.json(acordos);
}
