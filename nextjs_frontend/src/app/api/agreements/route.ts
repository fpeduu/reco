import { AcordoIdentificado } from "@/models/Acordos";
import { NextResponse } from "next/server";
import { faker } from '@faker-js/faker/locale/pt_BR';

function formatCpf(cpf: string) {
  return cpf.slice(0, 3) + "." +
          cpf.slice(3, 6) + "." +
          cpf.slice(6, 9) + "-" +
          cpf.slice(9, 11);
}

function createRandomAgreement(condominioName: string): AcordoIdentificado {
  const cpfDevedor = formatCpf(String(faker.number.int())
    .padStart(11, "0").slice(0, 11));
  
  const randomStatus: "NEGADO PELO INADIMPLENTE" | "ACEITO PELAS PARTES"
    | "EM ANÁLISE" = faker.helpers.arrayElement([
    "NEGADO PELO INADIMPLENTE",
    "ACEITO PELAS PARTES",
    "EM ANÁLISE"
  ]);

  return {
    id: faker.number.int(),
    usuarioEmail: faker.internet.email(),
    cpfDevedor: cpfDevedor,
    status: randomStatus,
    descricao: faker.lorem.sentence(),
    nomeCondominio: condominioName,
    nomeDevedor: faker.person.fullName(),
    dataAcordo: faker.date.past(),
    valor: faker.number.float({ min: 100, max: 1000, precision: 2 }),
    juros: faker.number.float({ min: 0, max: 10, precision: 2 }),
    diaPagamento: faker.number.int({ min: 1, max: 28 }),
    qtdParcelas: faker.number.int({ min: 1, max: 12 })
  }
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
