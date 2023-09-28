import Image from "next/image";

interface CurrencyCardProps {
  icon: string;
  iconSize: number;
  title: string;
  value: number;
  desccriptionTitle: string;
  description: string;
  isUpArrow: boolean;
}

export default function CurrencyCard({
  icon,
  iconSize,
  title,
  value,
  desccriptionTitle,
  description,
  isUpArrow
}: CurrencyCardProps) {
  return (
    <div className="h-28 py-4 px-6 flex items-center justify-between gap-5 bg-white rounded-2xl">
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-50">
        <Image src={icon} alt="icon" width={iconSize} height={iconSize} />
      </div>
      <div className="flex flex-col justify-between">
        <span className="font-semibold">{title}</span>
        <span className="text-2xl font-bold">
          {value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
          })}
        </span>
        <span className="flex items-center text-sm font-medium text-neutral-400">
          {desccriptionTitle}:&nbsp;
          <Image
            className="mb-1"
            src={isUpArrow ? "/icons/upwards_arrow_green.svg" : "/icons/downards_arrow_red.svg"}
            alt="arrow"
            width={12}
            height={12}
          />
          <span className={isUpArrow ? "text-green-600" : "text-rose-400"}>{description}</span>
        </span>
      </div>
    </div>
  );
}
