import { Acordo, AcordoIdentificado, StatusType } from "@/models/Acordos";
import { NextResponse } from "next/server";
import { faker } from '@faker-js/faker/locale/pt_BR';
import { generateCPF, createRandomAcordo } from "@/services/randomizer";

function enrichAcordo(
  condominioName: string,
  acordo: Acordo
): AcordoIdentificado {
  const randomStatus: StatusType = faker.helpers.arrayElement([
    "NEGADO PELO INADIMPLENTE",
    "ACEITO PELAS PARTES",
    "EM ANÁLISE"
  ]);

  return {
    ...acordo,
    status: randomStatus,
    nomeCondominio: condominioName,
    usuarioEmail: faker.internet.email(),
    nomeDevedor: faker.person.fullName(),
  }
}

function createRandomAgreement(condominioName: string): AcordoIdentificado {
  const cpfDevedor = generateCPF();
  const acordo = createRandomAcordo(cpfDevedor);
  return enrichAcordo(condominioName, acordo);
}

function createRandomAgreementList() {
  const condominioName = faker.company.name();
  return faker.helpers.multiple(() => createRandomAgreement(
    condominioName
  ), { count: { min: 1, max: 10 }});
}

export async function GET() {
  const agreementList = [];
  for (let i = 0; i < faker.number.int({ min: 1, max: 10 }); i++) {
    agreementList.push(...createRandomAgreementList());
  }
  const sortedAgreementList = agreementList.sort(
    (a, b) => b.valor - a.valor);
  return NextResponse.json(sortedAgreementList);
}
