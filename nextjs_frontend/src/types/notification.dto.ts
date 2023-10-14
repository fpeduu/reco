export interface INotification {
  type: "Sucesso" | "Erro" | "Aviso" | "Informação";
  tenantName: string;
  tenantCpf: string;
  condominiumName: string;
  message: string;
}
