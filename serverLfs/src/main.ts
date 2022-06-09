import { Environment } from "./Symbols/Environment";

const fs = require('fs');
const parser = require('./Interprete/grammar.js');
try{
    const entrada = fs.readFileSync('./src/entrada.lf');
    const ast = parser.parse(entrada.toString());
    const env = new Environment(null);
    for(const instruction of ast){
        try{
            console.log(instruction)
        }catch (error){
            console.log(error);
        }
    }
}catch(error){
    console.log(error);
}