import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";

export class Nothing extends instruction{
    constructor(
        line:number,
        column:number
    ){
        super(line,column);
    }

    public execute(env:Environment){
        return this;
    }
    public ast(idPadre:string,NoHijo:number){
        let id=idPadre+""+NoHijo;
        let nodo={
            id:id,
            label:"(Espacio sin instrucciones)"
        }
        B_datos.getInstance().addNodosAst(nodo);
    }
}