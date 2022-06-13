import { B_datos } from "./src/BaseDatos/B_datos";
import { Environment } from "./src/Symbols/Environment";
const express =require('express');
const morgan= require('morgan');
const cors=require('cors')
//IMPORTACIONES PARA EL PARSER



const fs = require('fs');
const parser = require('./src/Interprete/grammar.js');



var app=express();
var corsOption={origin:true,optionsSuccessStatus:200};
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOption));
app.use(express.urlencoded({extended:true}));
let puerto=8080

//variables ast 
let text="";
app.listen(puerto, function(){
    console.log('Escuchando en el puerto 8080')
});

app.get('/', function (req:any,res:any){
    res.json({mensaje:"hola mundo"})
})

app.get('/retornoTexto', function (req:any,res:any){
    res.send("este mensaje esta en texto")
})
//TEXTO A ANALIZAR PARA EL AST 
app.post('/setTextoAst', function(req:any,res:any){
    let textoAst=req.body.textoAst;
    try{
        const ast = parser.parse(textoAst);
        const env = new Environment(null);
        
        for(const instruction of ast){
            try{
                instruction.execute(env);
    
            }catch (error){
                console.log(error);
            }
        }
        B_datos.getInstance().addEnviroments("Principal",env);//SE AÑANDIO ESTA BASE DE DATOS A LA LISTA, recorrer esta lista al revez
        
    }catch(error){
        console.log(error);
    }
    let consola= B_datos.getInstance().getConsola();
    res.json({consola:consola});
})