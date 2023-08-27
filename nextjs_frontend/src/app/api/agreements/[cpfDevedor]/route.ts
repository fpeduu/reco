import { NextRequest, NextResponse } from "next/server";
import Acordos, { Acordo } from "@/models/Acordos";
import { faker } from '@faker-js/faker/locale/pt_BR';
import { connectToDatabase } from "@/middlewares/mongodb";

function createRandomAcordo(cpfDevedor: string) { 
  const usuarioEmail = faker.internet.email();
  const minimumValue = faker.number.float({
    min: 100, max: 10000, precision: 2
  });
  const valor = faker.number.float({
    min: minimumValue / 10, max: minimumValue * 2, precision: 2
  })

  const chance = faker.number.int({ max: 100 });
  const gain = (valor / minimumValue * 100).toFixed(2);
  const chanceTxt = `${chance}% de chance de aceitação.`
  const gainTxt = `Retorno de ${gain}% ao condomínio.`

  const newAcordo: Acordo =  {
    id: faker.number.int(),
    status: "EM ANÁLISE",
    cpfDevedor, usuarioEmail, valor,
    descricao: `${chanceTxt}\n${gainTxt}`,
    diaPagamento: faker.number.int({ min: 1, max: 31 }),
    qtdParcelas: faker.number.int({ min: 1, max: 12 * 5 }),
    juros: faker.number.float({ min: 0, max: 1, precision: 2 }),
  }

  return newAcordo;
}

export async function GET(req: NextRequest) {
  connectToDatabase();

  const cpfDevedor = req.nextUrl.href.split("/").pop() as string;

  const acordoList: Acordo[] = await Acordos.find({ cpfDevedor });
  const acceptedAcordoList = acordoList.filter(acordo =>
    acordo.status === "ACEITO PELAS PARTES");
  if (acceptedAcordoList.length > 0) {
    return NextResponse.json(acceptedAcordoList[0]);
  }

  const newAcordo = createRandomAcordo(cpfDevedor);
  return NextResponse.json(newAcordo);
}
