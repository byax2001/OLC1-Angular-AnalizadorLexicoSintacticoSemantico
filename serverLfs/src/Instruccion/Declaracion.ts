
import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

export class Declaracion extends instruction{
    constructor(
        public constante:boolean,
        public tipo:Type,
        public id:string[],
        public expresion:expresion,
        line:number,
        column:number 
    ) {
        super(line,column)   
    }
    public execute(env:Environment){
        //SI SE DECLARA CON UN VALOR  Y NO SOLO EL ID Y EL TIPO
        if(this.expresion!=null){
            let exp=this.expresion.execute(env);
            //SI SUCEDE UN ERROR CON LA EXPRESION O SI ESTA ES ERRONEA
            if(exp.type!==Type.error){ 
                this.id.forEach((id)=>{
                    let existe=env.existeSimDeclaracion(id);
                    if(existe==true){
                        //ERROR YA FUE DECLARADA ESTA VARIABLE CON ANTERIORIDAD
                        B_datos.getInstance().addError("Semantico","Intento de declarar 2 veces una variable",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                        //ERROR  2
                        if(this.tipo!=exp.type){
                            B_datos.getInstance().addError("Semantico","Tipo de declaracion y dato no coinciden",this.line,this.column);
                            console.log("error semantico distintos tipos");
                        }
                
                        console.log("error semantico ya existia la variable")   
                    }else{    
                        if(this.tipo==exp.type){
                            //GUARDAR DATO
                            env.guardarSimbolo(this.constante,this.tipo,id,exp.value,this.line,this.column);
                            console.log('--------------------acabo de guardar una variable------------------')
                    
                        }else{
                            //ERROR  NO COINCIDEN LOS TIPOD DE DATOS DE LA VARIABLE Y SU EXPRESION
                            B_datos.getInstance().addError("Semantico","Tipo de declaracion y dato no coinciden",this.line,this.column);
                            console.log("error semantico distintos tipos");
                        }
                    }
    
                })  
            }else{
                B_datos.getInstance().addError("Semantico","Declaracion no posible de realizar",this.line,this.column)
            } 
        //SE DECLARA SOLO UN TIPO E ID 
        }else{
            this.id.forEach((id)=>{
                let existe=env.existeSimbolo(id);
                if(existe==true){
                    //ERROR YA FUE DECLARADA ESTA VARIABLE CON ANTERIORIDAD
                    B_datos.getInstance().addError("Semantico","Intento de declarar 2 veces una variable",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                    console.log("error semantico ya existia la variable")   
                }else{    
                    //GUARDAR DATO
                    env.guardarSimbolo(this.constante,this.tipo,id,null,this.line,this.column);
                    console.log('--------------------acabo de guardar una variable------------------')
                }

            })   
        }
    }
    public changeExpresion(expresion:expresion){
        this.expresion=expresion
    }
    public ast(idPadre:string,NoHijo:number){
        let id=idPadre+""+NoHijo;
        let nodo={
            id:id,
            label:"Instruction:\n Declaracion"
        }
        B_datos.getInstance().addNodosAst(nodo);
        //CONSTANTE
        nodo={
            id:id+""+0,
            label:"Constante:\n"+String(this.constante)
        }
        let edge={
            from:id,
            to:id+""+0
        }
        B_datos.getInstance().addNodosAst(nodo);
        B_datos.getInstance().addEdgesAst(edge);
        //TIPO
        let tipo="any"
        if(this.tipo===Type.INT){
            tipo="int"
        }else if(this.tipo===Type.DOUBLE){
            tipo="double"
        }else if(this.tipo===Type.CHAR){
            tipo="char"
        }else if(this.tipo===Type.BOOLEAN){
            tipo="boolean"
        }else if(this.tipo===Type.STRING){
            tipo="string"
        }
        nodo={
            id:id+""+1,
            label:"Tipo:\n"+tipo
        }
        edge={
            from:id,
            to:id+""+1
        }
        B_datos.getInstance().addNodosAst(nodo);
        B_datos.getInstance().addEdgesAst(edge);
        //ID'S
        nodo={
            id:id+""+2,
            label:"ID:\n"+this.id.toString()
        }
        edge={
            from:id,
            to:id+""+2
        }
        B_datos.getInstance().addNodosAst(nodo);
        B_datos.getInstance().addEdgesAst(edge);
        //EXPRESION
        if(this.expresion!==null){
            edge={
                from:id,
                to:id+""+3
            }
            B_datos.getInstance().addEdgesAst(edge);
            this.expresion.ast(id,3);
        }
    }
}