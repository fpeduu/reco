import { NextResponse } from "next/server";
import { faker } from '@faker-js/faker/locale/pt_BR';

import { Condomino } from "@/models/Devedores";
import { generateCNPJ, createRandomTenant } from "@/services/randomizer";

function createRandomTenantList(): Condomino[] {
  const cnpjCondominio = generateCNPJ();

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
