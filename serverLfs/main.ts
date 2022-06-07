import { Environment } from "./src/Symbols/Environment";

declare var require: any;
const fs = require('fs');
const parser = require('./src/Interprete/grammar.js');
export class main{
    constructor(){}
    
    AnalizarAst(TextAnalizar:string){
        const env = new Environment(null);
        try{
            const ast =parser.parse(TextAnalizar);
            for(const instruction of ast){
                try{
                  //  instruction.execute(env);
                }catch (error){
                    console.log(error);
                }
            }
        }catch(error){
            console.log(error);
        }
    }
    /*
    AnalizarAst2(){
        try{
            const entrada = fs.readFileSync('./src/prueba.txt');
            const ast =parser.parse(entrada.toString());
            for(const instruction of ast){
                try{
                  
                }catch (error){
                    console.log(error);
                }
            }
        }catch(error){
            console.log(error);
        }
    }
    */

    
}