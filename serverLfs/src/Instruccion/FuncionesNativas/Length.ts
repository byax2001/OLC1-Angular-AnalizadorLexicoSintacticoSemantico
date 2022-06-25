import { expresion } from "../../Abstract/expresion";
import { instruction } from "../../Abstract/instruction";
import { Retorno } from "../../Abstract/Retorno";
import { B_datos } from "../../BaseDatos/B_datos";
import { Environment } from "../../Symbols/Environment";
import { Type } from "../../Symbols/Type";


export class Length extends instruction{
    constructor(
        public expresion: expresion,
        line:number,
        column:number
    ){
        super(line,column);
    }
    public execute(env:Environment){
        let exp=this.expresion.execute(env);
        let result:Retorno={value:null,type:Type.error}
        if(exp.type!==Type.error){
            if( typeof exp.value ==="object"){
                //SIGNIFICA QUE ES UN ARRAY
                if(exp.value.filas===1){
                    result={value:exp.value.value[0].length,type:Type.INT} //retorna un numero entero 
                }else{
                    //error intento de usar lenght en un array de dos de meciones 
                    B_datos.getInstance().addError("Semantico","Intento de usar lenght en un vector de 2 dimensiones",this.line,this.column);
                }
            }else if(exp.type===Type.STRING){
                result={value:exp.value.length,type:Type.INT} //retorna un numero entero 
            }else{
                //REPORTAR ERROR, funcion length en un tipo de dato no string o array
                B_datos.getInstance().addError("Semantico","Intento de hacer Length en un dato no string o vector",this.line,this.column);
            }

        }else{
            //reportar error
            B_datos.getInstance().addError("Semantico","Expresion da error",this.line,this.column);
        }
        return result
    }
    public ast(idPadre: string, NoHijo: number,NivelPadre:number) {
        let nivel= NivelPadre+1; //NIVEL NODO ACTUAL
        let id = `${idPadre}${NoHijo}N${nivel}`
        let nodo = {
            id: id,
            label: "Instruction:\nLength"
        }
        B_datos.getInstance().addNodosAst(nodo);
        if (this.expresion !== null) {
            let edge = {
                from: id,
                to:`${id}0N${(nivel+1)}`
            }
            B_datos.getInstance().addEdgesAst(edge);
            this.expresion.ast(id, 0,nivel);//NODO HIJO: EXPRESION
        }
    }
}