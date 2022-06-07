declare var require: any;
const fs = require('fs');
export class main{
    constructor(){}
    AnalizarAst(TextAnalizar:string){
        const parser = require('./src/Interprete/grammar.js');
        try{
            const ast =parser.parse(TextAnalizar);
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
    AnalizarAst2(){
        
        const parser = require('./src/Interprete/grammar.js');
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
    

    
}