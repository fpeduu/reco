import mongoose from "mongoose";

export interface Usuarios {
  nome: string;
  email: string;
  password: string;
}

const UsuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  password: String,
});

export default mongoose.models.Bot || mongoose.model("Usuarios", UsuarioSchema);
