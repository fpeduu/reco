import { Condomino } from "@/models/Devedores";

interface TenantProfileCardProps {
  tenant: Condomino;
}

export default function TenantProfileCard({ tenant }: TenantProfileCardProps) {
  return (
    <div className="w-1/3 h-40 py-6 px-10 flex flex-col justify-between rounded-2xl bg-white">
      <span className="text-xl font-semibold">Perfil do inadimplente</span>
      <div className="flex items-center justify-between">
        <div className="flex flex-col justify-between">
          <span className="text-lg font-medium">{tenant.nome}</span>
          <span className="text-xs">
            <span className="font-semibold">CPF:</span>&nbsp;
            {tenant.cpf}
          </span>
          <span className="text-sm">
            <span className="font-semibold">Local:</span>&nbsp;
            {tenant.nomeCondominio}
          </span>
        </div>
        <div className="py-2 px-4 rounded-md text-sm bg-rose-100 text-red-500">
          <span className="font-semibold">Atraso:</span>&nbsp;
          <span className="text-black">{tenant.mensalidadesAtrasadas} meses</span>
        </div>
      </div>
    </div>
  );
}
