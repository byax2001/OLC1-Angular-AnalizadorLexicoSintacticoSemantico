import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";
import {Retorno} from "../Abstract/Retorno";

export class Splice extends instruction {
    constructor(
        public id: string,
        public index:expresion,
        public dato:expresion,
        line: number,
        column: number
    ) {
        super(line, column);
    }
    public execute(env: Environment) { 
        let vec = env.getSimbolo(this.id);
        let index= this.index.execute(env);
        let dato=this.dato.execute(env);
        if (vec.type !== Type.error && typeof vec.value === "object" && dato.type!==Type.error) {
            if(index.type===Type.INT){
                if (vec.value.filas === 1) { 
                    if(index.value<vec.value.columnas){
                        if(vec.type===dato.type){
                            let valor:Retorno={value:dato.value,type:dato.type}
                            vec.value.value[0].splice(index.value,0,valor);
                            vec.value.columnas=vec.value.value[0].length; //SE AGREGO UN ELEMENTO, MODIFICAR NUMERO DE COLUMNAS
                        }else{
                            //INTENTO DE HACER SPLICE DE UN DATO EN UN VECTOR DE TIPO DISTINTO
                        }
                    }else{
                        //INTENTO DE HACER UN SPLICE EN UN INDEX INEXISTENTE
                    }
                }else{
                    //REPORTAR ERROR intento de hacer splice en un vector de dos dimensiones
                }
            }else{
                //EL INDEX NO ES UN INT 
            }
            
        }else{
            //REPORTAR ERROR 
        }
    }
    public ast(){

    }
}
