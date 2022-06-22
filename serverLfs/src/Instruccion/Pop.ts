import { instruction } from "../Abstract/instruction";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

export class Pop extends instruction{
    constructor(
        public id: string,
        line:number,
        column:number
    ){
        super(line,column);
    }
    public execute(env: Environment) {
        let vec = env.getSimbolo(this.id);
        if (vec.type !== Type.error && typeof vec.value === "object") {
            if (vec.value.filas === 1) { 
                vec.value.value[0].pop();
                vec.value.columnas=vec.value.value[0].length; //SE QUITO UN ELEMENTO, MODIFICAR NUMERO DE COLUMNAS
            }else{
                //REPORTAR ERROR 
            }
        }else{
            //REPORTAR ERROR 
        }
    }
    public ast(){

    }
}