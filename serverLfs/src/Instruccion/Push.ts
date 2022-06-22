import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { Retorno } from "../Abstract/Retorno";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

export class Push extends instruction{
    constructor(
        public id: string,
        public expresion: expresion,
        line:number,
        column:number
    ){
        super(line,column);
    }
    public execute(env: Environment) {
        let result: Retorno = { value: false, type: Type.BOOLEAN }
        let vec = env.getSimbolo(this.id);
        let exp = this.expresion.execute(env);//VALOR A ASIGNAR A LA DIRECCION DE VECTOR INDICADA  
        //VERIFICAR QUE EXPRESION NO HAYA DADO NINGUN ERROR 
        if (exp.type !== Type.error) {
            if (vec.type !== Type.error && typeof vec.value === "object") {
                if (vec.value.filas === 1) {
                    if(vec.type===exp.type){
                        vec.value.value[0].push(exp);
                        vec.value.columnas=vec.value.value[0].length; //SE AGREGO UN ELEMENTO, MODIFICAR NUMERO DE COLUMNAS
                        result = { value: true, type: Type.BOOLEAN }
                    }else{
                        //REPORTAR ERROR 
                    }
                    
                }else{  
                    //INTENTO DE HACER PUSH A UN ARRAY DE DOS DIMENSIONES
                }
            }else{
                //NO HAY SIMBOLO CON ESA ID O NO ES UN ARRAY
            }
        }else{
            //REPORTAR ERROR 
        }
        return result;
    }
    public ast(){

    }
}