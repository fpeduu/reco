interface PricingCardProps {
  title: string;
  value: number;
  dailyAgreements: number;
}

export default function PricingCard({ title, value, dailyAgreements }: PricingCardProps) {
  return (
    <div className="w-64 h-80 py-5 px-3 flex flex-col gap-4 divide-y divide-zinc-100 bg-black text-neutral-200 rounded-2xl shadow-lg">
      <h3 className="font-medium text-3xl text-center">{title}</h3>
      <div className="h-full pt-3 flex flex-col justify-around items-center">
        <h3 className="font-medium text-xl text-center">
          R$<span className="text-5xl">{value.toFixed(2).replace(".", ",")}</span>
          <p>/ mês</p>
        </h3>
        <span className="text-lg font-light">{dailyAgreements} acordos diários</span>
        <button className="w-40 h-11 bg-red-600 flex items-center justify-center rounded-full text-lg">
          Começar
        </button>
      </div>
    </div>
  );
}
