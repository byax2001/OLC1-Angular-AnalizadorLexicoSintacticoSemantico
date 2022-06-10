import { B_datos } from "./BaseDatos/B_datos";
import { Environment } from "./Symbols/Environment";

const fs = require('fs');
const parser = require('./Interprete/grammar.js');

let bDatos=B_datos.getInstance();



try{
    const entrada = fs.readFileSync('./src/entrada.lf');
    const ast = parser.parse(entrada.toString());
    const env = new Environment(null);
    for(const instruction of ast){
        try{
            instruction.execute(env);

        }catch (error){
            console.log(error);
        }
    }
    
}catch(error){
    console.log(error);
}