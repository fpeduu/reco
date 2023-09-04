import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/middlewares/mongodb";
import Acordos, { Acordo } from "@/models/Acordos";

import {
  createRandomAcordo,
  createRandomTenant,
  createRandomApartment
} from '@/services/randomizer';

export async function GET(req: NextRequest) {
  connectToDatabase();

  // const cpfDevedor = req.nextUrl.href.split("/").pop() as string;

  // const acordoList: Acordo[] = await Acordos.find({ cpfDevedor });
  // const acceptedAcordoList = acordoList.filter(acordo =>
  //   acordo.status === "ACEITO PELAS PARTES");
  // if (acceptedAcordoList.length > 0) {
  //   return NextResponse.json(acceptedAcordoList[0]);
  // }

  const apartment = createRandomApartment();
  const devedor = createRandomTenant(apartment.cnpj, apartment.nome);
  const newAcordo = createRandomAcordo(devedor.cpf);
  return NextResponse.json({
    acordo: newAcordo,
    devedor: devedor,
    condominio: apartment
  });
}
