import { expresion } from "../../Abstract/expresion";
import { instruction } from "../../Abstract/instruction";
import { Retorno } from "../../Abstract/Retorno";
import { Environment } from "../../Symbols/Environment";
import { Type } from "../../Symbols/Type";

export class ToCharArray extends instruction{
    constructor(
        public expresion: expresion,
        line:number,
        column:number
    ){
        super(line,column);
    }
    public execute(env:Environment){
        let matriz=[]
        let fila=[]
        let result:Retorno={value:null,type:Type.error};
        let exp=this.expresion.execute(env);
        if(exp.type!==null && exp.type===Type.STRING){
            for(let letra of exp.value){
                result={value:letra,type:Type.CHAR}
                fila.push(result);
            }
            matriz.push(fila)
        }else{
            //reportar error

        }
        //SI MATRIZ ES TAMAÑO 0 ENTONCES UN ERROR AL PASAR EL STRING A ARRAY, TOMAR ESTO EN CUENTA A LA HORA DE DECLARAR UN VECTOR 
        return matriz
    }
    public ast(){

    }
}
