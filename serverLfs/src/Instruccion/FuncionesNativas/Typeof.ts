import { expresion } from "../../Abstract/expresion";
import { instruction } from "../../Abstract/instruction";
import { Retorno } from "../../Abstract/Retorno";
import { B_datos } from "../../BaseDatos/B_datos";
import { Environment } from "../../Symbols/Environment";
import { Type } from "../../Symbols/Type";

export class Typeof extends instruction{
    constructor(
        public expresion: expresion,
        line:number,
        column:number
    ){
        super(line,column);
    }
    public execute(env:Environment){
        let exp=this.expresion.execute(env);
        let tipoDato:Retorno={value:null,type:Type.error}
        if(exp.type==Type.INT){
            tipoDato={value:"int",type:Type.STRING}
        }else if(exp.type==Type.DOUBLE){
            tipoDato={value:"double",type:Type.STRING}
        }else if(exp.type==Type.CHAR){
            tipoDato={value:"char",type:Type.STRING}
        }else if(exp.type==Type.BOOLEAN){
            tipoDato={value:"boolean",type:Type.STRING}
        }else if(exp.type==Type.STRING){
            tipoDato={value:"string",type:Type.STRING}
        }
        return tipoDato
    }
    public ast(idPadre: string, NoHijo: number) {
        let id = idPadre + "" + NoHijo;
        let nodo = {
            id: id,
            label: "Instruction:\nTypeOf"
        }
        if (this.expresion !== null) {
            B_datos.getInstance().addNodosAst(nodo);
            let edge = {
                from: id,
                to: id + "" + 0,
            }
            B_datos.getInstance().addEdgesAst(edge);
            this.expresion.ast(id, 0);//NODO HIJO: EXPRESION
        }
    }
}