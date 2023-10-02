interface PricingCardProps {
  title: string;
  value: number;
  dailyAgreements: number | string;
}

export default function PricingCard({
  title,
  value,
  dailyAgreements,
}: PricingCardProps) {
  return (
    <div className="w-64 py-6 px-5 flex flex-col gap-4 divide-y divide-zinc-100 bg-black text-neutral-200 rounded-3xl shadow-lg">
      <h3 className="font-medium text-3xl text-center">{title}</h3>
      <div className="h-full pt-7 flex flex-col gap-8 items-center">
        <h3 className="font-medium text-xl text-center">
          R$
          <span className="text-5xl">{value.toFixed(2).replace(".", ",")}</span>
          <p>condomínio/mês</p>
        </h3>
        <span className="text-lg font-light">
          até {dailyAgreements} acordos mensais
        </span>
        <button className="w-40 h-11 bg-primary flex items-center justify-center rounded-full text-lg">
          Começar
        </button>
      </div>
    </div>
  );
}
