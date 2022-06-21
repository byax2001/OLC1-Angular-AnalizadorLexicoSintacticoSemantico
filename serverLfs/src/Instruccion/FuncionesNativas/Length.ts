import { expresion } from "../../Abstract/expresion";
import { instruction } from "../../Abstract/instruction";
import { Retorno } from "../../Abstract/Retorno";
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
                }
            }else if(exp.type===Type.STRING){
                result={value:exp.value.length,type:Type.INT} //retorna un numero entero 
            }else{
                //REPORTAR ERROR, funcion length en un tipo de dato no string o array
            }

        }else{
            //reportar error
        }
        return result
    }
    public ast(){

    }
}