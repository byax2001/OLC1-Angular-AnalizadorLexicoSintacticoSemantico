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
app.get('/ObtenerEnvs', function (req:any,res:any){
    res.send({Envs:B_datos.getInstance().getListEnviroments()});
})

app.get('/ObtenerError', function (req:any,res:any){
    res.send({bDatos:B_datos.getInstance().getListError()});
})
//TEXTO A ANALIZAR PARA EL AST 
app.post('/setTextoAst', function (req: any, res: any) {
    let textoAst = req.body.textoAst;
    B_datos.getInstance().clearConsola();//LIMPIAR LA CONSOLA 
    B_datos.getInstance().clearErrores();//LIMPIA LA TABLA DE ERRORES
    B_datos.getInstance().clearEnviroments();//LIMPIAR LA TABLA DE ENVIROMENTS
    try {
        const ast = parser.parse(textoAst);
        const env = new Environment(null);
        for (const instruction of ast) {
            try {
                instruction.execute(env);

            } catch (error) {
                console.log(error);
            }
        }
        B_datos.getInstance().addEnviroments("Principal", env);//SE AÑANDIO ESTA BASE DE DATOS A LA LISTA, recorrer esta lista al revez
        //SE LIMPIAN LOS NODOS Y EDGES
        B_datos.getInstance().clearAst();
        let nodo = {
            id: "0",
            label: "AST"
        }
        B_datos.getInstance().addNodosAst(nodo);
        let n = 0
        for (const instruction of ast) {
            try {
                instruction.ast("0", n,0);
            } catch (error) {
                console.log(error);
            }
            n++;
        }
        n=0
        for (const instruction of ast) {
            let edge = {
                from: "0",
                to: "0"+n+"N1"
            }
            B_datos.getInstance().addEdgesAst(edge);
            n++;
        }
        


    } catch (error) {
        console.log(error);
    }
    let Consola = B_datos.getInstance().getConsola();
    let Ast=B_datos.getInstance().getAst();
    res.json({ consola: Consola,ast:Ast });
})