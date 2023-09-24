import { StatusType } from "@/models/Acordos";

interface StatusBarBigProps {
  status: StatusType | null;
}

export default function StatusBarBig({ status }: StatusBarBigProps) {
  function getStatusStep(status: StatusType) {
    switch (status) {
      case "Aguardando inadimplente":
        return 0;
      case "Conversa iniciada":
        return 1;
      case "Valor reserva alcançado":
        return 2;
      case "Negociação concluída":
        return 3;
      default:
        return 0;
    }
  }

  const step = status ? getStatusStep(status) : 0;

  return (
    <span className="w-full p-1 flex justify-between relative">
      <span
        className={`w-1/3 h-8 top-4 left-0 flex justify-center absolute ${
          step > 0 ? "bg-emerald-500" : "bg-gray-500"
        }`}
      />
      <span
        className={`w-1/3 h-8 top-4 left-1/3 flex justify-center absolute ${
          step > 1 ? "bg-emerald-500" : "bg-gray-500"
        }`}
      />
      <span
        className={`w-1/3 h-8 top-4 left-2/3 flex justify-center absolute ${
          step > 2 ? "bg-emerald-500" : "bg-gray-500"
        }`}
      />
      <div className="flex flex-col items-center -ml-16">
        <span
          className={`w-14 h-14 z-10 flex items-center justify-center rounded-full text-white ${
            step > 0 ? "bg-emerald-500" : "bg-gray-500"
          }`}
        >
          {step > 0 && <span>&#10003;</span>}
        </span>
        <p className="text-center">
          Aguardando
          <br />
          inadimplente
        </p>
      </div>
      <div className="flex flex-col items-center">
        <span
          className={`w-14 h-14 z-10 flex items-center justify-center rounded-full text-white ${
            step > 1 ? "bg-emerald-500" : "bg-gray-500"
          }`}
        >
          {step > 1 && <span>&#10003;</span>}
        </span>
        <p className="text-center">
          Conversa
          <br />
          iniciada
        </p>
      </div>
      <div className="flex flex-col items-center">
        <span
          className={`w-14 h-14 z-10 flex items-center justify-center rounded-full text-white ${
            step > 2 ? "bg-emerald-500" : "bg-gray-500"
          }`}
        >
          {step > 2 && <span>&#10003;</span>}
        </span>
        <p className="text-center">
          Valor reserva
          <br />
          alcançado
        </p>
      </div>
      <div className="flex flex-col items-center -mr-16">
        <span
          className={`w-14 h-14 z-10 flex items-center justify-center rounded-full text-white ${
            step >= 3 ? "bg-emerald-500" : "bg-gray-500"
          }`}
        >
          {step >= 3 && <span>&#10003;</span>}
        </span>
        <p className="text-center">
          Negociação
          <br />
          concluída
        </p>
      </div>
    </span>
  );
}
