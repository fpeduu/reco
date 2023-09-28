interface StatusBarCardProps {
  checkStatus: "Completo" | "Em andamento" | "Pendente";
}

export default function StatusBarCard({ checkStatus }: StatusBarCardProps) {
  return (
    <div
      className={
        "w-32 -mr-16 whitespace-nowrap py-2 px-4 rounded-md text-sm text-center font-semibold -translate-x-8 " +
        (checkStatus === "Completo"
          ? "bg-green-100 text-emerald-700"
          : checkStatus === "Em andamento"
          ? "bg-orange-50 text-amber-500"
          : "bg-zinc-100 text-zinc-500")
      }>
      {checkStatus}
    </div>
  );
}
