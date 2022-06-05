const express =require('express');
const morgan= require('morgan');

let incremental=0;
var app=express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.listen(8080, function(){
    console.log('Escuchando en el puerto 8080')
});

app.get('/', function (req,res){
    res.json({mensaje:"hola mundo"})
})

app.get('/retornoTexto', function (req,res){
    res.send("este mensaje esta en texto")
})

app.post('/post', function(req,res){
    incremental=req.body.incremental;
    res.json({msg:"operaico con exito!"})
})