import { Acordo } from "@/models/Acordos";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

async function generateAgreement(id: number) {
  // o id vai indicar qual acordo buscar no bd
  // const acordo = await getAgreement(id);
  const acordo: Acordo = {
    id: 1,
    usuarioEmail: "José Eduardo",
    cpfDevedor: "12345678910",
    dataAcordo: new Date(),
    status: "ACEITO PELAS PARTES",
    valor: 1000,
    juros: 0.1,
    diaPagamento: 10,
    qtdParcelas: 20,
    descricao: "Acordo de teste",
  };

  const condominio = {
    nome: "Bom Condomínio",
    cnpj: "12345678910",
    rua: "Rua legal",
    numero: "123",
    bairro: "Tamarineira",
    cidade: "Recife",
    uf: "PE",
    cep: "12345678",
  };

  const devedor = {
    nome: "José Eduardo",
    cpf: "12345678910",
    rg: "123456789",
    apt: "321",
  };

  const pdfDoc = await PDFDocument.create();
  const timesBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  const fontSize = 11;

  const title = "Termo de Acordo Extrajudicial";
  const titleWidth = timesRomanFont.widthOfTextAtSize(title, fontSize);
  const titleX = (width - titleWidth) / 2;

  page.drawText(title, {
    x: titleX,
    y: height - 50,
    size: fontSize,
    font: timesBoldFont,
    color: rgb(0, 0, 0),
  });

  const today = new Date();
  const firstPaymentMonth = today.getMonth() + 2;
  const lastPaymentMonth = firstPaymentMonth + acordo.qtdParcelas;
  const firstPaymentYear =
    firstPaymentMonth > 12 ? today.getFullYear() + 1 : today.getFullYear();
  const lastPaymentYear =
    lastPaymentMonth > 12
      ? today.getFullYear() + Math.floor(lastPaymentMonth / 12)
      : today.getFullYear();

  const firstPaymentDay = `${acordo.diaPagamento}/${
    firstPaymentMonth % 12
  }/${firstPaymentYear}`;
  const lastPaymentDay = `${acordo.diaPagamento}/${
    lastPaymentMonth % 12
  }/${lastPaymentYear}`;

  const content = `
CREDOR:

${condominio.nome}, inscrito no CNPJ sob nº ${condominio.cnpj}, situado à Rua ${
    condominio.rua
  }, n.º ${condominio.numero}, ${condominio.bairro}, ${condominio.cidade} –  ${
    condominio.uf
  }, CEP ${condominio.cep}.

DEVEDOR(A):

${devedor.nome}, portador(a) da carteira de identidade nº ${Number(
    devedor.rg
  ).toLocaleString("pt-br")}, inscrita no CPF sob o nº ${
    devedor.cpf
  }, residente e domiciliada à Rua ${condominio.rua}, nº ${
    condominio.numero
  }, ${condominio.bairro}, ${condominio.cidade} – ${condominio.uf}.

APARTAMENTO: ${devedor.apt}

CLÁUSULAS E CONDIÇÕES:

1. O(A) DEVEDOR(A) declara e confessa a dívida de R$ ${(
    acordo.valor *
    (1 + acordo.juros)
  ).toLocaleString(
    "pt-br"
  )} referente as cotas condominiais vencidas nas seguintes datas: 01/01/2021, 01/02/2021, 01/03/2021, com o acréscimo das multas, juros de mora, calculados até a presente data, conforme planilha em anexo.

2. No intuito de viabilizar a regularização do pagamento das cotas condominiais, o CREDOR receberá do(a) DEVEDOR(A), a sobredita importância em ${
    acordo.qtdParcelas
  } parcelas mensais sucessivas de R$ ${(
    (acordo.valor * (1 + acordo.juros)) /
    acordo.qtdParcelas
  ).toLocaleString(
    "pt-br"
  )}, vencendo-se a primeira no dia ${firstPaymentDay} e a última em ${lastPaymentDay}, cujos pagamentos deverão ser realizados através de boletos bancários a serem emitidos pelo condomínio ou sua administradora.

3. O presente acordo não implica novação da dívida, mas tão somente numa liberalidade do CREDOR na forma de recebimento de seu crédito.

4. O inadimplemento de qualquer uma das parcelas do acordo ou cota condominial vencida na pendência deste, implicará no vencimento antecipado da dívida e poderá, a critério do credor ensejar a imediata ação de execução.

5. A verificação da inadimplência e da mora independerá de qualquer tipo de notificação, bastando, para tanto, o não pagamento das parcelas aqui convencionadas.

6. Em caso de mora das cotas mensais, ocorrerá o vencimento antecipado da dívida, incluindo os juros moratórios e correção monetária legal, devendo, entretanto, serem deduzidos do montante do débito os valores eventualmente recebidos por meio do presente acordo.

7. Caso o CREDOR tenha que se valer de ação judicial para exigir o débito aqui confessado pelo DEVEDOR, ainda que se trate do prosseguimento do processo eventualmente suspenso, serão acrescidos ao débito as despesas daí decorrentes, inclusive os honorários advocatícios fixados pelo juízo sobre o valor da dívida.

8. O presente acordo obriga herdeiros e sucessores de ambas as partes.

9. Por fim, por estarem firmes no propósito de prevenirem ou abreviarem qualquer demanda judicial em relação ao débito mencionado no item nº 2, reconhecido como líquido e certo, assinam o presente para os fins de direito.

_________________, ___ de _____ de ______.
`;

  const contentLines = content.split("\n");

  let formattedContent = "";
  for (const line of contentLines) {
    const words = line.split(" ");
    let currentLine = "";

    for (const word of words) {
      if (currentLine.length + word.length + 1 <= 100) {
        currentLine += (currentLine === "" ? "" : " ") + word;
      } else {
        formattedContent += currentLine + "\n";
        currentLine = word;
      }
    }

    formattedContent += currentLine + "\n";
  }

  page.drawText(formattedContent, {
    x: 50,
    y: height - 80,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
    lineHeight: 14,
  });

  const secondPage = pdfDoc.addPage();

  const secondPageContent = `
_______________________________________________________
Devedor(a)

_______________________________________________________
${condominio.nome}

_______________________________________________________
Síndico(a)

_______________________________________________________
Primeira testemunha 

_______________________________________________________
Segunda testemunha  
`;

  secondPage.drawText(secondPageContent, {
    x: 50,
    y: height - 80,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}

export async function downloadAgreement(id: number) {
  const pdfBytes = await generateAgreement(id);
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = `acordo_${id}.pdf`;
  link.click();
}
