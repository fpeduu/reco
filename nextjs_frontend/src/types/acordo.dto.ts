import { Devedor } from "@/models/Devedores";
import { Acordo } from "@/models/Acordos";


export interface DevedorAcordo extends Devedor {
    acordo: Acordo
}