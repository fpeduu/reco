export interface INotification {
  type: "Sucesso" | "Erro" | "Aviso" | "Informação";
  tenantName: string;
  condominiumName: string;
  message: string;
}
