
import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction"
import { Retorno } from "../Abstract/Retorno";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment"
import { Type } from "../Symbols/Type";

export class Return extends instruction{
    expR:Retorno;
    constructor(
        public expresion:expresion,
        line:number,
        column:number
    ){
        super(line,column)
        this.expR={value:undefined,type:Type.error};
    }

    public execute(env:Environment){
        //this.bloque instanceof instruction;
        if(this.expresion!=null){
           this.expR=this.expresion.execute(env);
        }
        return this;     
    }
    public ast(idPadre:string,NoHijo:number){
        let id=idPadre+""+NoHijo;
        let nodo={
            id:id,
            label:"Instruction: Return"
        }
        B_datos.getInstance().addNodosAst(nodo);
        if(this.expresion!=null){
            let edge={
                from:id,
                to:id+""+0,
            }
            B_datos.getInstance().addEdgesAst(edge);
            this.expresion.ast(id,0);
        }
    }
}