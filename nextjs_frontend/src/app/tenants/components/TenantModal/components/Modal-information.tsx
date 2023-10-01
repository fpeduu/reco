interface ModalInformationProps {
  title: string;
  value: number;
  installments?: number;
  installmentValue: number;
}

export default function ModalInformation({
  title,
  value,
  installments,
  installmentValue,
}: ModalInformationProps) {
  return (
    <div
      className="flex flex-col gap-1 p-4 w-full
                bg-tertiary rounded-md shadow"
    >
      <span className="font-normal text-sm">{title}:</span>
      <span className="text-sm font-light md:whitespace-nowrap">
        <b>Entrada:</b> R$ {value.toLocaleString("pt-BR")} |&nbsp;
        {installments} parcelas de R$ {installmentValue.toLocaleString("pt-BR")}
      </span>
    </div>
  );
}
