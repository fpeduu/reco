import mongoose from "mongoose";

export interface Devedor {
  rg: string;
  cpf: string;
  nome: string;
  apartamento: string;
  mensalidadesAtrasadas: number;
  cnpjCondominio: string;
}

export interface Condomino extends Devedor {
  nomeCondominio: string;
}

const DevedorSchema = new mongoose.Schema({
  rg: String,
  cpf: String,
  nome: String,
  apartamento: String,
  mensalidadesAtrasadas: Number,
  cnpjCondominio: String,
});

export default mongoose.models.Devedores ||
               mongoose.model("Devedores", DevedorSchema);
