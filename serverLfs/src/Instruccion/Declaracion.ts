import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

export class Declaracion extends instruction{
    bDatos:any;
    constructor(
        public constante:boolean,
        public tipo:Type,
        public id:string,
        public expresion:expresion,
        line:number,
        column:number 
    ) {
        super(line,column)
        this.bDatos=B_datos.getInstance();
    }
    public execute(env:Environment){
        let exp=this.expresion.execute(env);
        let existe=env.existeSimbolo(this.id);
        if(existe==true){
            //ERROR 
            this.bDatos.addError("Semantico","Intento de declarar 2 veces una variable",this.line,this.column);
            //ERROR  2
            if(this.tipo!=exp.type){
                this.bDatos.addError("Semantico","Tipo de declaracion y dato no coinciden",this.line,this.column);
                console.log("error semantico distintos tipos");
            }
            console.log(B_datos.getInstance().getListError());
            console.log("error semantico ya existia la variable")   
        }else{
            //GUARDAR DATO 
            if(this.tipo==exp.type){
                env.guardarSimbolo(this.constante,this.tipo,this.id,exp.value,this.line,this.column);
                console.log('--------------------acabo de guardar una variable------------------')
                console.log(env)
            }else{
                //ERROR 
                this.bDatos.addError("Semantico","Tipo de declaracion y dato no coinciden",this.line,this.column);
                console.log("error semantico distintos tipos");
            }
        }
    }
}