import { faker } from '@faker-js/faker/locale/pt_BR';

import { Condominio } from '@/models/Condominios';
import { Condomino } from "@/models/Devedores";
import { Acordo } from '@/models/Acordos';

export function generateCPF(): string {
  const cpf = String(faker.number.int())
        .padStart(11, "0").slice(0, 11);
  return cpf.slice(0, 3) + "." +
         cpf.slice(3, 6) + "." +
         cpf.slice(6, 9) + "-" +
         cpf.slice(9, 11);
}

export function generateCNPJ(): string {
  const cnpj = String(faker.number.int())
    .padStart(8, "0").slice(0, 8) + "0001" +
    String(faker.number.int()).padStart(2, "0").slice(0, 2)
  
  return cnpj.slice(0, 2) + "." +
         cnpj.slice(2, 5) + "." +
         cnpj.slice(5, 8) + "/" +
         cnpj.slice(8, 12) + "-" +
         cnpj.slice(12, 14);
}

export function generateRG(): string {
  const rg = String(faker.number.int())
    .padStart(9, "0").slice(0, 9);
  return rg.slice(0, 2) + "." +
         rg.slice(2, 5) + "." +
         rg.slice(5, 8) + "-" +
         rg.slice(8, 9);
}

export function generateAddress(): string {
  const streetName = faker.location.street();
  const addressNumber = String(faker.number.int({ min: 1, max: 1000 }));
  const district = faker.location.county();
  const city = faker.location.city();
  const uf = faker.location.state({ abbreviated: true });
  const cep = String(faker.number.int({ min: 10000000, max: 99999999 }))
    .padStart(8, "0").slice(0, 8).replace(/(\d{5})(\d{3})/, "$1-$2");
  return `Rua ${streetName} n.º ${addressNumber}, ${district}, ${city} –  ${uf}, CEP ${cep}`;
}

export function createRandomTenant(
  cnpjCondominio: string,
  condominioName: string
): Condomino {
  const cpfDevedor = generateCPF();
  const rgDevedor = generateRG();

  return {
    cnpjCondominio: cnpjCondominio,
    nomeCondominio: condominioName,
    rg: rgDevedor,
    cpf: cpfDevedor,
    nome: faker.person.fullName(),
    apartamento: String(faker.number.int({ min: 1, max: 1000 })),
    mensalidadesAtrasadas: faker.number.int({ min: 0, max: 60 }),
  }
}

export function createRandomAcordo(cpfDevedor: string): Acordo { 
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

  return  {
    id: faker.number.int(),
    status: "EM ANÁLISE",
    cpfDevedor, usuarioEmail, valor,
    descricao: `${chanceTxt}\n${gainTxt}`,
    diaPagamento: faker.number.int({ min: 1, max: 31 }),
    qtdParcelas: faker.number.int({ min: 1, max: 12 * 5 }),
    juros: faker.number.float({ min: 0, max: 1, precision: 2 }),
  }
}

export function createRandomApartment(): Condominio {
    const cnpj = generateCNPJ();

    return {
        cnpj,
        nome: faker.company.name(),
        address: generateAddress(),
        valorMensalidade: faker.number.float({
            min: 100, max: 10000, precision: 2
        }),
        administradorEmail: faker.internet.email(),
    }
}
