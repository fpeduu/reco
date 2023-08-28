import mongoose from "mongoose";

export interface Devedor {
  cpf: string;
  nome: string;
  mensalidadesAtrasadas: number;
  cnpjCondominio: string;
}

export interface Condomino extends Devedor {
  nomeCondominio: string;
}

const DevedorSchema = new mongoose.Schema({
  cpf: String,
  nome: String,
  mensalidadesAtrasadas: Number,
  cnpjCondominio: String,
});

export default mongoose.models.Devedores ||
               mongoose.model("Devedores", DevedorSchema);
