import Image from "next/image";
import StatusBarCard from "../StatusBarCard/status-bar-card";

interface StatusBarCheckItemProps {
  key?: any;
  step: number;
  checkStatus: "Completo" | "Em andamento" | "Pendente";
  title: string;
}

export default function StatusBarCheckItem({ step, checkStatus, title }: StatusBarCheckItemProps) {
  return (
    <div
      className={
        "relative flex justify-center md:justify-start" +
        (step < 5 ? " w-32 md:w-60" : "w-32 md:w-auto")
      }>
      <div className="w-10 flex flex-col">
        <span
          className={`w-11 h-11 z-10 flex items-center justify-center rounded-full text-white ${
            checkStatus === "Completo"
              ? "bg-emerald-500"
              : checkStatus === "Em andamento"
              ? "bg-amber-500"
              : "bg-gray-100"
          }`}>
          {checkStatus === "Completo" ? (
            <Image src="/icons/check.svg" alt="check" width={21} height={15} />
          ) : (
            <span
              className={
                "font-light tex-xl " +
                (checkStatus === "Em andamento" ? "text-white" : "text-slate-500")
              }>
              {step + 1}
            </span>
          )}
        </span>
        <p className="w-24 mt-5 mb-6 self-center md:self-auto md:-translate-x-5 text-center font-normal">
          {title}
        </p>
        <StatusBarCard checkStatus={checkStatus} />
      </div>
      {step < 5 && (
        <span
          className={`w-full h-2 top-4 left-8 md:flex absolute hidden ${
            checkStatus === "Completo" ? "bg-emerald-500" : "bg-gray-100"
          }`}
        />
      )}
      {step < 5 && checkStatus === "Em andamento" && (
        <span
          className="w-1/2 h-2 top-4 left-8 hidden md:flex
                         absolute rounded-2xl bg-amber-500"
        />
      )}
    </div>
  );
}
