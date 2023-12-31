import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { DevedorAcordo } from "@/types/acordo.dto";

async function generateAgreement(devedor: DevedorAcordo) {
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
    color: rgb(0, 0, 0)
  });

  const today = new Date();
  const { acordo } = devedor;
  const firstPaymentMonth = today.getMonth() + 2;
  const lastPaymentMonth = firstPaymentMonth + acordo.qtdParcelas;
  const firstPaymentYear = firstPaymentMonth > 12 ? today.getFullYear() + 1 : today.getFullYear();
  const lastPaymentYear =
    lastPaymentMonth > 12
      ? today.getFullYear() + Math.floor(lastPaymentMonth / 12)
      : today.getFullYear();

  if (acordo.dataAcordo === undefined) {
    acordo.dataAcordo = new Date();
  }
  const day = new Date(acordo.dataAcordo).getDate();
  const firstPaymentDay = `${day}/${firstPaymentMonth % 12}/${firstPaymentYear}`;
  const lastPaymentDay = `${day}/${lastPaymentMonth % 12}/${lastPaymentYear}`;

  const totalDebit = devedor.valorDivida;
  const totalDebitString = totalDebit.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL"
  });
  const debitMonths = ["01/01/2021", "01/02/2021", "01/03/2021"];
  const debitMonthsString = debitMonths.join(", ");
  const firstValue = acordo.entrada.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL"
  });
  const debitMonth = ((totalDebit - acordo.entrada)/ acordo.qtdParcelas).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL"
  });
  const content = `
DEVEDOR(A):

${devedor.nome}, inscrita no CPF sob o nº ${devedor.cpf}.

APARTAMENTO: ${devedor.nomeCondominio}

CLÁUSULAS E CONDIÇÕES:

1. O(A) DEVEDOR(A) declara e confessa a dívida de ${totalDebitString} referente as cotas condominiais vencidas nas seguintes datas: ${debitMonthsString}, com o acréscimo das multas, juros de mora, calculados até a presente data, conforme planilha em anexo.

2. No intuito de viabilizar a regularização do pagamento das cotas condominiais, o CREDOR receberá do(a) DEVEDOR(A), a sobredita importância de ${firstValue} de entrada e ${acordo.qtdParcelas} parcelas mensais sucessivas de ${debitMonth}, vencendo-se a primeira no dia ${firstPaymentDay} e a última em ${lastPaymentDay}, cujos pagamentos deverão ser realizados através de boletos bancários a serem emitidos pelo condomínio ou sua administradora.

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
    lineHeight: 14
  });

  const secondPage = pdfDoc.addPage();

  const secondPageContent = `
_______________________________________________________
Devedor(a)

_______________________________________________________
${devedor.nomeCondominio}

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
    color: rgb(0, 0, 0)
  });

  const imageBytes = await fetch("/reco.png").then((response) => response.arrayBuffer());
  const image = await pdfDoc.embedPng(imageBytes);
  const imageDims = image.scale(0.1);

  page.drawImage(image, {
    x: width - imageDims.width - 10,
    y: 10,
    width: imageDims.width,
    height: imageDims.height
  });

  secondPage.drawImage(image, {
    x: width - imageDims.width - 10,
    y: 10,
    width: imageDims.width,
    height: imageDims.height
  });

  return await pdfDoc.save();
}

export async function downloadAgreement(acordo: DevedorAcordo) {
  const pdfBytes = await generateAgreement(acordo);
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  if (typeof window !== "undefined") {
    link.href = window.URL.createObjectURL(blob);
    link.download = `acordo_${acordo.cpf}.pdf`;
    link.click();
  }
}
