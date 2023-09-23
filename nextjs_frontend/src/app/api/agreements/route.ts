import Acordos, {
  Acordo,
  AcordoIdentificado,
  StatusType,
} from "@/models/Acordos";
import { NextRequest, NextResponse } from "next/server";
import { faker } from "@faker-js/faker/locale/pt_BR";
import { generateCPF, createRandomAcordo } from "@/services/randomizer";
import Devedores from "@/models/Devedores";
import { connectToDatabase } from "@/middlewares/mongodb";

function enrichAcordo(acordo: Acordo): AcordoIdentificado {
  const randomStatus: StatusType = faker.helpers.arrayElement([
    "Aguardando inadimplente",
    "Conversa iniciada",
    "Valor reserva alcançado",
    "Negociação concluída",
  ]);

  return {
    ...acordo,
    status: randomStatus,
    usuarioEmail: faker.internet.email(),
    nomeDevedor: faker.person.fullName(),
  };
}

function createRandomAgreement(condominioName: string): AcordoIdentificado {
  const cpfDevedor = generateCPF();
  const acordo = createRandomAcordo(cpfDevedor);
  return enrichAcordo(acordo);
}

function createRandomAgreementList() {
  const condominioName = faker.company.name();
  return faker.helpers.multiple(() => createRandomAgreement(condominioName), {
    count: { min: 1, max: 10 },
  });
}

export async function GET() {
  const agreementList = [];
  for (let i = 0; i < faker.number.int({ min: 1, max: 10 }); i++) {
    agreementList.push(...createRandomAgreementList());
  }
  const sortedAgreementList = agreementList.sort((a, b) => b.valor - a.valor);
  return NextResponse.json(sortedAgreementList);
}

async function getAgreement(cpf: string) {
  const agreement: any = await Acordos.findOne({ cpfDevedor: cpf })
    .lean()
    .exec();

  return agreement || null;
}

export async function POST(req: NextRequest) {
  const { administradorEmail } = await req.json();

  connectToDatabase();

  const devedores = await Devedores.find({ administradorEmail }).exec();

  const agreementPromises = devedores.map(async (devedor) => {
    const agreement = await getAgreement(devedor.cpf);
    return { ...agreement, nomeDevedor: devedor.nome };
  });

  const acordos: AcordoIdentificado[] = await Promise.all(agreementPromises);

  const filteredAcordos = acordos.filter((item) => item.cpfDevedor);

  return NextResponse.json(filteredAcordos);
}
