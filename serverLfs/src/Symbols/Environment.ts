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

    public guardarSimbolo(constante:boolean,type:Type,id:string,value:string,linea:number,column:number){
        this.variables.set(id,new Symbol(constante,type,id,value,linea,column));
        
        return true 
        
    }
    public existeSimbolo(id:string):boolean{
        let existe=false;
        this.variables.forEach((value,key)=>{
            if(key[0]==id){
                existe=true;
            }
        })
        return existe;
    }
    public getSimbolo(id:string):Symbol{
        let simbolo= new Symbol(false,Type.error,"","",0,0);
        this.variables.forEach((value,key)=>{
            if(key[0]==id){
                simbolo=value;
            }
        })
        return simbolo;
    }   
    public ChangeSimbolo(id:string,newValue:any){
        this.variables.forEach((value,key)=>{
            if(key[0]==id){
                value=newValue
            }
        })
    }

}