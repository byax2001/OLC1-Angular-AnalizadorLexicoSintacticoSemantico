import { instruction } from "../Abstract/instruction"
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment"

export class Break extends instruction{
    constructor(
        line:number,
        column:number
    ){
        super(line,column)
    }

    public execute(env:Environment){
        //this.bloque instanceof instruction;
        return this;
    }
    public ast(idPadre:string,NoHijo:number){
        let id=idPadre+""+NoHijo;
        let nodo={
            id:id,
            label:"Instruction: Break"
        }
        B_datos.getInstance().addNodosAst(nodo);
    }


}