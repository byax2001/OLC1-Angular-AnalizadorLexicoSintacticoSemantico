import { B_datos } from "./BaseDatos/B_datos";
import { Call } from "./Instruccion/Call";
import { Funcion } from "./Instruccion/Funcion";
import { Metodo } from "./Instruccion/Metodo";
import { Environment } from "./Symbols/Environment";

const fs = require('fs');
const parser = require('./Interprete/grammar.js');

let bDatos=B_datos.getInstance();



try{
    const entrada = fs.readFileSync('./src/entrada.lf');
    const ast = parser.parse(entrada.toString());
    const env = new Environment(null);
    
    //RECONOCER METODOS Y FUNCIONES
    for(const instruction of ast){
        if(instruction instanceof Metodo || instruction instanceof Funcion){
            try{
                instruction.execute(env);
            }catch (error){
                console.log(error);
            }
        }
    }
    let nodo = {
        id:"0",
        label: "Ast"
    }
    B_datos.getInstance().addNodosAst(nodo);
    let n=0
    for(const instruction of ast){
        try{
            instruction.ast("0",n);
        }catch (error){
            console.log(error);
        }
        n++;
    }
    //RECONOCER TODAS LAS DEMAS INSTRUCCIONES
    for(const instruction of ast){
        if(!(instruction instanceof Metodo || instruction instanceof Funcion)){
            try{
                instruction.execute(env);
            }catch (error){
                console.log(error);
            }
        }
    }


    
}catch(error){
    console.log(error);
}