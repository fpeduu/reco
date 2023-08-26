import { NextRequest, NextResponse } from "next/server";
import Acordos, { Acordo } from "@/models/Acordos";
import { faker } from '@faker-js/faker/locale/pt_BR';
import { connectToDatabase } from "@/middlewares/mongodb";

function createRandomAcordo(cpfDevedor: string, usuarioEmail: string, 
                            minimumValue: number) { 
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
    usuarioEmail: usuarioEmail,
    status: "Pendente",
    valor: value,
    juros: faker.number.float({ min: 0, max: 1, precision: 2 }),
    diaPagamento: faker.number.int({ min: 1, max: 31 }),
    qtdParcelas: faker.number.int({ min: 1, max: 12 * 5 }),
    descricao: `${chanceTxt}\n${gainTxt}`
  }

  return newAcordo;
}

function createRandomAcordoList(cpfDevedor: string) {
  const minimumValue = faker.number.float({
    min: 100, max: 10000, precision: 2
  });
  const usuarioEmail = faker.internet.email();
  return faker.helpers.multiple(() => createRandomAcordo(
    cpfDevedor, usuarioEmail, minimumValue
  ));
}

/*
Get all Acordos for a given CPF. If there is no Acordo for the given CPF,
create a new list of Acordos and save it to the database.
*/
export async function GET(req: NextRequest) {
  connectToDatabase();

  const cpfDevedor = req.nextUrl.href.split("/").pop() as string;
  const acordoList: Acordo[] = await Acordos.find(
    { devedorCpf: cpfDevedor }
  );
  if (acordoList.length > 0) return NextResponse.json(acordoList);

  return POST(req);
}

/*
Saves the choosen Acordo to the database.
*/
export async function PUT(req: NextRequest) {
  connectToDatabase();

  const cpfDevedor = req.nextUrl.href.split("/").pop() as string;
  const { acordoID }: { acordoID: number } = await req.json();

  const previousAcordo = await Acordos.findOneAndUpdate({
    devedorCpf: cpfDevedor, id: acordoID
  }, { $set: { status: "Aceito" } });

  return NextResponse.json(previousAcordo);
}

/*
Genereates new Acordo list for a given CPF.
*/
export async function POST(req: NextRequest) {
  connectToDatabase();

  const cpfDevedor = req.nextUrl.href.split("/").pop() as string;
  const newAcordos: Acordo[] = createRandomAcordoList(cpfDevedor);
  const wasDeleted = await Acordos.deleteMany({ devedorCpf: cpfDevedor });
  if (wasDeleted) {
    const savedAcordos = await Acordos.create(newAcordos);
    return NextResponse.json(savedAcordos);
  }
  return NextResponse.error();
}
