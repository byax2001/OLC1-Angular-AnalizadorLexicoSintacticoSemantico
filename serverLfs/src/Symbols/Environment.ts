import { Symbol } from "./Symbol";
import { Type } from "./Type";

export class Environment{
    private variables:Map<string,Symbol>
    //ANTERIOR ES UN PUNTERO PARA CREAR UNA LISTA ENLAZADA 
    constructor(
        public anterior: Environment|null
    ){
        this.variables=new Map();
    }

    public guardarSimbolo(type:Type,id:string,value:string,linea:number,column:number){
        this.variables.set(id,new Symbol(type,id,value,linea,column));
        return true 
    }

}