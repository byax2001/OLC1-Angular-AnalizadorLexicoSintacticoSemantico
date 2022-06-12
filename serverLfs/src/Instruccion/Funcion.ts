import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

export class Funcion extends instruction{
    constructor(
        public tipo:Type,
        public id:string,
        public parametros: instruction[],
        public instrucciones: instruction[],
        line:number,
        column:number
    ){
        super(line,column);
    }

    public execute(env:Environment){
        let existeM=env.existeSimbolo(this.id);
        if(existeM==false){
            //INGRESAR NUEVO METODO
            env.guardarSimbolo(true,this.tipo,this.id,[this.parametros,this.instrucciones],this.line,this.column);
        }else{
            B_datos.getInstance().addError("Semantico","Intento de guardar una funcion ya existente",this.line,this.column); 
        }
    }
        
}
    
