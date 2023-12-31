interface StatusBarCardProps {
  checkStatus: "Completo" | "Em andamento" | "Pendente";
}

export default function StatusBarCard({
  checkStatus
}: StatusBarCardProps) {
  const styles = checkStatus === "Completo"
    ? "bg-green-100 text-emerald-700"
    : checkStatus === "Em andamento"
    ? "bg-orange-50 text-amber-500"
    : "bg-zinc-100 text-zinc-500";

  return (
    <div className={`w-32 md:-mr-16 whitespace-nowrap py-2 px-4 mb-8 
      rounded-md text-sm text-center font-light self-center md:mb-0 
      md:self-auto md:-translate-x-8 ${styles}`}>
      {checkStatus}
    </div>
  );
}
