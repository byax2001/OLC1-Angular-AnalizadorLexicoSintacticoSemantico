
import { expresion } from "../Abstract/expresion";
import { Retorno } from "../Abstract/Retorno";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

export class ToLower extends expresion{
    constructor(
        public expresion:expresion,
        line:number,
        column:number
    ){
        super(line,column)
    }
    public execute(env:Environment):Retorno{
        let result:Retorno={value:null,type:Type.error}
        let exp=this.expresion.execute(env);
        if(exp.type===Type.STRING){
            result={value:String(exp.value).toLowerCase(),type:Type.STRING};
        }else{  
            //REPORTAR ERROR
            B_datos.getInstance().addError("Semantico","Intento de hacer toLowerCase a un no String",this.line,this.column);
        }



        return result
    }
    public ast(idPadre: string, NoHijo: number,NivelPadre:number) {
        let nivel= NivelPadre+1; //NIVEL NODO ACTUAL
        let id = `${idPadre}${NoHijo}N${nivel}`

        let nodo = {
            id: id,
            label: "Expresion:\nToLower"
        }
        if (this.expresion !== null) {
            B_datos.getInstance().addNodosAst(nodo);
            let edge = {
                from: id,
                to: `${id}0N${(nivel+1)}`
            }
            B_datos.getInstance().addEdgesAst(edge);
            this.expresion.ast(id, 0,nivel);//NODO HIJO: EXPRESION
        }
    }
}