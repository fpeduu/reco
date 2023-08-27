import { Condomino } from "@/models/Devedores";
import { NextResponse } from "next/server";
import { faker } from '@faker-js/faker/locale/pt_BR';

function formatCpf(cpf: string) {
  return cpf.slice(0, 3) + "." +
          cpf.slice(3, 6) + "." +
          cpf.slice(6, 9) + "-" +
          cpf.slice(9, 11);
}

function formatCnpj(cnpj: string) {
  return cnpj.slice(0, 2) + "." +
          cnpj.slice(2, 5) + "." +
          cnpj.slice(5, 8) + "/" +
          cnpj.slice(8, 12) + "-" +
          cnpj.slice(12, 14);
}

function createRandomTenant(
  condominioCnpj: string,
  condominioName: string
): Condomino {
  const cpfDevedor = formatCpf(String(faker.number.int())
    .padStart(11, "0").slice(0, 11));

  return {
    condominioCnpj: condominioCnpj,
    nomeCondominio: condominioName,
    cpf: cpfDevedor,
    nome: faker.person.fullName(),
    mensalidadesAtrasadas: faker.number.int({ min: 0, max: 60 }),
  }
}

function createRandomTenantList() {
  const cnpjCondominio = formatCnpj(String(faker.number.int())
    .padStart(8, "0").slice(0, 8) + "0001" +
    String(faker.number.int()).padStart(2, "0").slice(0, 2));

  const condominioName = faker.company.name();
  return faker.helpers.multiple(() => createRandomTenant(
    cnpjCondominio, condominioName
  ), { count: { min: 1, max: 10 }});
}

export async function GET() {
  const tenantList = [];
  for (let i = 0; i < faker.number.int({ min: 1, max: 10 }); i++) {
    tenantList.push(...createRandomTenantList());
  }
  const sortedTenantList = tenantList.sort((a, b) =>
    b.mensalidadesAtrasadas - a.mensalidadesAtrasadas);
  return NextResponse.json(sortedTenantList);
}
