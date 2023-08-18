import { NextRequest, NextResponse } from "next/server";
import Acordos, { Acordo } from "@/models/Acordos";
import { faker } from '@faker-js/faker/locale/pt_BR';

function createRandomAcordo(cpfDevedor: string, minimumValue: number) { 
  const value = faker.number.float({
    min: minimumValue / 10, max: minimumValue * 2, precision: 2
  })

  const chance = faker.number.int({ max: 100 });
  const gain = (value / minimumValue * 100).toFixed(2);
  const chanceTxt = `${chance}% de chance de aceitação.`
  const gainTxt = `Retorno de ${gain}% ao condomínio.`

  const newAcordo: Acordo =  {
    id: faker.number.int(),
    devedorCpf: cpfDevedor,
    status: "Pendente",
    valor: value,
    usuarioEmail: faker.internet.email(),
    juros: faker.number.float({ min: 0, max: 1, precision: 2 }),
    diaPagamento: faker.number.int({ min: 1, max: 31 }),
    qtdParcelas: faker.number.int({ min: 1, max: 12 * 5 }),
    descricao: `${chanceTxt}\n${gainTxt}`
  }

  return newAcordo;
}

function createRandomAcordoList(cpfDevedor: string) {
  // const cpfDevedor = String(faker.number.int())
  //                 .padStart(11, "0").slice(0, 11)
  const minimumValue = faker.number.float({
    min: 100, max: 10000, precision: 2
  });
  return faker.helpers.multiple(() => createRandomAcordo(
    cpfDevedor, minimumValue
  ));
}


export async function GET(req: NextRequest) {
  const cpfDevedor = req.nextUrl.href.split("/").pop() as string;

  // const hasAcordos = await Acordos.find({ devedorCpf: cpfDevedor });
  // if (hasAcordos.length > 0) return NextResponse.json(hasAcordos);

  const acordos: Acordo[] = createRandomAcordoList(cpfDevedor);
  return NextResponse.json(acordos);
}

export async function POST(req: Request) {
  const newAcordo: Acordo = await req.json();
  const created = await Acordos.create(newAcordo);
  return NextResponse.json(created);
}
