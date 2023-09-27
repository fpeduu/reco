export function getUniqueMonths(list: number[]) {
  const uniqueMonths = list
    .filter((month, index, arr) => arr.indexOf(month) === index)
    .filter((month, index, arr) => arr.indexOf(month) === index)
    .sort((a, b) => a - b)
    .map((month) => (month === 1 ? month + " mês" : month + " meses"));
  if (uniqueMonths.length > 10) {
    const lastMonth = uniqueMonths[10];
    uniqueMonths.splice(10, uniqueMonths.length - 10);
    uniqueMonths.push(lastMonth + " ou mais");
  }
  return uniqueMonths;
}

export function filterByCodominiumAndMonths(
  condominium: string, currentCondominium: string,
  lateMonths: string, currentMonth: number,
) {
  const condominiumFilter = condominium === "Todos" ||
                currentCondominium === condominium;
  if (lateMonths === "Todos") return condominiumFilter;

  const selected = Number(lateMonths.split(" ")[0]);
  const monthsFilter = lateMonths.indexOf("ou mais") !== -1
                      ? selected <= currentMonth
                      : selected === currentMonth;
  return condominiumFilter && monthsFilter;
}