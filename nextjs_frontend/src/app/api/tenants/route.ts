import { NextRequest, NextResponse } from "next/server";
import { faker } from "@faker-js/faker/locale/pt_BR";

import { createRandomTenant } from "@/services/randomizer";
import Devedores, { Devedor } from "@/models/Devedores";
import { connectToDatabase } from "@/middlewares/mongodb";

function createRandomTenantList(): Devedor[] {
  return faker.helpers.multiple(() => createRandomTenant(), {
    count: { min: 1, max: 10 },
  });
}

export async function GET() {
  const tenantList = [];
  for (let i = 0; i < faker.number.int({ min: 1, max: 10 }); i++) {
    tenantList.push(...createRandomTenantList());
  }
  const sortedTenantList = tenantList.sort(
    (a, b) => b.mensalidadesAtrasadas - a.mensalidadesAtrasadas
  );
  return NextResponse.json(sortedTenantList);
}

export async function POST(req: NextRequest) {
  const { administradorEmail } = await req.json();

  connectToDatabase();

  const devedores = await Devedores.find({ administradorEmail }).exec();

  return NextResponse.json(devedores);
}
