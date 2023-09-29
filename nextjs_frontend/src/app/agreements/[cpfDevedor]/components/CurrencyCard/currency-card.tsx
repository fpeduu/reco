import Image from "next/image";

interface CurrencyCardProps {
  icon: string;
  iconSize: number;
  title: string;
  value: number;
  description?: string;
  descriptionStyle?: string;
  desccriptionTitle?: string;
}

export default function CurrencyCard({
  icon, iconSize, title, value,
  desccriptionTitle,
  description, descriptionStyle
}: CurrencyCardProps) {
  return (
    <div className="h-28 py-4 px-6 flex items-center justify-between gap-5 bg-white rounded-2xl">
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-50">
        <Image src={icon} alt="icon" width={iconSize} height={iconSize} />
      </div>
      <div className="flex flex-col justify-between">
        <span className="font-medium">{title}</span>
        <span className="text-2xl font-medium">
          {value?.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
          })}
        </span>
        <span className="flex items-center text-sm
                         font-normal text-neutral-400">
          {desccriptionTitle}&nbsp;
          <span className={descriptionStyle}>
            {description}
          </span>
        </span>
      </div>
    </div>
  );
}
