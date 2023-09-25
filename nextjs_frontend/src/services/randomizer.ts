import { faker } from "@faker-js/faker/locale/pt_BR";

import { Devedor } from "@/models/Devedores";
import { Acordo, StatusType } from "@/models/Acordos";

export function generateCPF(): string {
  const cpf = String(faker.number.int()).padStart(11, "0").slice(0, 11);
  return cpf.slice(0, 3) + "." + cpf.slice(3, 6) + "." + cpf.slice(6, 9) + "-" + cpf.slice(9, 11);
}

export function generateAddress(): string {
  const streetName = faker.location.street();
  const addressNumber = String(faker.number.int({ min: 1, max: 1000 }));
  const district = faker.location.county();
  const city = faker.location.city();
  const uf = faker.location.state({ abbreviated: true });
  const cep = String(faker.number.int({ min: 10000000, max: 99999999 }))
    .padStart(8, "0")
    .slice(0, 8)
    .replace(/(\d{5})(\d{3})/, "$1-$2");
  return `Rua ${streetName} n.º ${addressNumber}, ${district}, ${city} –  ${uf}, CEP ${cep}`;
}

export function createRandomTenant(condominioName: string): Devedor {
  const cpfDevedor = generateCPF();

  return {
    nomeCondominio: condominioName,
    cpf: cpfDevedor,
    nome: faker.person.fullName(),
    emailAdministrador: faker.internet.email(),
    valorDivida: faker.number.float({
      min: 100,
      max: 10000,
      precision: 2
    }),
    mensalidadesAtrasadas: faker.number.int({ min: 0, max: 60 })
  };
}

export function createRandomAcordo(cpfDevedor: string): Acordo {
  const usuarioEmail = faker.internet.email();
  const minimumValue = faker.number.float({
    min: 100,
    max: 10000,
    precision: 2
  });
  const valor = faker.number.float({
    min: minimumValue / 10,
    max: minimumValue * 2,
    precision: 2
  });
  const status = faker.helpers.arrayElement([
    "Aguardando inadimplente",
    "Conversa iniciada",
    "Valor reserva alcançado",
    "Negociação concluída",
    "Baixar acordo finalizado"
  ]) as StatusType;

  return {
    cpfDevedor,
    usuarioEmail,
    qtdParcelas: faker.number.int({ min: 1, max: 12 * 5 }),
    entrada: faker.number.float({
      min: 0,
      max: valor,
      precision: 2
    }),
    valorTotal: valor,
    dataAcordo: faker.date.past(),
    status: status,
    historicoValores: []
  };
}
