import { Devedor } from "@/models/Devedores";

interface TenantProfileCardProps {
  tenant: Devedor;
}

export default function TenantProfileCard({ tenant }: TenantProfileCardProps) {
  return (
    <div className="w-96 h-40 py-6 px-10 flex flex-col justify-between rounded-2xl bg-white">
      <span className="text-xl font-medium">
        Perfil do inadimplente
      </span>
      <div className="flex items-center justify-between">
        <div className="flex flex-col justify-between">
          <span className="text-lg font-normal">{tenant.nome}</span>
          <span className="text-xs font-light">
            <span className="font-normal">CPF:</span>&nbsp;
            {tenant.cpf}
          </span>
          <span className="text-sm font-light">
            <span className="font-normal">Local:</span>&nbsp;
            {tenant.nomeCondominio}
          </span>
        </div>
      </div>
    </div>
  );
}
