%{
    const {B_datos}=require('../BaseDatos/B_datos.ts');
    let bDatos=B_datos.getInstance(); 
	const {Type} =require('../Symbols/Type');
    const {TypeAritmeticas}= require('../Expresion/TypeAritmeticas.ts');
    const {TypeRelacionales}= require('../Expresion/TypeRelacionales.ts');
    const {TypeLogic}= require('../Expresion/TypeLogic.ts');
    const {Literal}= require('../Expresion/Literal.ts');
    const {Declaracion}= require('../Instruccion/Declaracion.ts');
    const {Asignacion} = require('../Instruccion/Asignacion.ts')
    const {OAritmeticas}= require('../Expresion/OAritmeticas.ts');
    const {IncDecremento}=require('../Expresion/IncDecremento.ts');
    const {ORelacionales}= require('../Expresion/ORelacionales.ts');
    const {OLogicas}= require('../Expresion/OLogicas.ts');
    const {If} = require('../Instruccion/If.ts');
    const {While} = require('../Instruccion/While.ts');
    const {Dowhile} = require('../Instruccion/Dowhile.ts');
    const {For}= require('../Instruccion/For.ts');
    const {Switch}= require('../Instruccion/Switch.ts');
    const {Case} = require('../Instruccion/Case.ts');

    //SALTOS DE SENTENCIAS
    const {Break}= require('../Instruccion/Break.ts');
    const {Continue}= require('../Instruccion/Continue.ts');
    const {Return}= require('../Instruccion/Return.ts');

    //NATIVAS
    const {Print}= require('../Instruccion/FuncionesNativas/Print.ts');
    const {Println}= require('../Instruccion/FuncionesNativas/Println.ts');
    const {Typeof}=require('../Instruccion/FuncionesNativas/Typeof.ts')

    //METODOS Y FUNCIONES
    const {Metodo}= require('../Instruccion/Metodo.ts');
    const {Funcion}= require('../Instruccion/Funcion.ts');
    const {Call}= require('../Instruccion/Call.ts');

    //EXTRAS
    const {Nothing}= require('../Instruccion/Nothing.ts');
    const {BloqueInstSup}= require('../Instruccion/BloqueInstSup.ts');

    //FASE 2
    const {Ternario}= require('../Instruccion/Ternario.ts');
    const {ToLower}= require('../Expresion/ToLower.ts');
    const {ToUpper}= require('../Expresion/ToUpper.ts');
    const {Round}= require('../Expresion/Round.ts');
    const {DeclaracionVector} = require('../Instruccion/DeclaracionVector.ts');
    const {AccesoVector} = require('../Expresion/AccesoVector.ts');
    const {ModiVector} = require('../Instruccion/ModiVector.ts');
    const {Push} = require('../Instruccion/Push.ts');
    const {Pop} = require('../Instruccion/Pop.ts');
    const {Splice} = require('../Instruccion/Splice.ts');
    const {Graficarts} = require('../Instruccion/graficarTs.ts');

    //NATIVAS
    const {Length}= require('../Instruccion/FuncionesNativas/Length.ts');
    const {ToCharArray}= require('../Instruccion/FuncionesNativas/ToCharArray.ts');
    const {IndexOf} =require('../Instruccion/FuncionesNativas/IndexOf.ts');
    

%}
%lex
%options case-insensitive          
LETRAS [a-zA-ZñÑ]+ 
ENTERO [0-9]+
DECIMAL {ENTERO}("."{ENTERO})
ID {LETRAS}({LETRAS}|{ENTERO}|"_")*

ESCAPECHAR [\'\"\\nrt]
CESPECIALES \\{ESCAPECHAR}
ACEPTACION [^\"\n]    
CADENA \"({CESPECIALES}|{ACEPTACION})*\"

ACEPTACIONC [^\'\n]     
CARACTER \'({ACEPTACIONC}|{CESPECIALES})\'

%% 

[ \r\t\n\s]+  {}
"//".*      {}
[/][*]([\n]|[^"*/"]|\*|"/")*[*][/] {}

//se deben de reconocer primero los == != antes de = y ! por que los reconocera antes, si no a la hora de usar un == lo reconocio primero como = =
"++"                 { console.log("Reconocio : " + yytext);  return 'inc' } 
"--"                 { console.log("Reconocio : " + yytext);  return 'dec' } 
"=="                 { console.log("Reconocio : " + yytext);  return 'igualigual' } 
"!="                  { console.log("Reconocio : " + yytext);  return 'diferente' } 

"("                  { console.log("Reconocio : " + yytext);  return 'parentesisa' } 
")"                  { console.log("Reconocio : " + yytext);  return 'parentesisc' } 
"["                  { console.log("Reconocio : " + yytext);  return 'corchetea' } 
"]"                  { console.log("Reconocio : " + yytext);  return 'corchetec' } 
"{"                  { console.log("Reconocio : " + yytext);  return 'llavea' } 
"}"                  { console.log("Reconocio : " + yytext);  return 'llavec' } 
","                  { console.log("Reconocio : " + yytext);  return 'coma' } 
";"                  { console.log("Reconocio : " + yytext);  return 'puntoycoma' } 
"="                 { console.log("Reconocio : " + yytext);  return 'igual' } 
"?"                 { console.log("Reconocio : " + yytext);  return 'interrogacion' } 
":"                 { console.log("Reconocio : " + yytext);  return 'dospuntos' } 



"+"                  { console.log("Reconocio : " + yytext);  return 'mas' } 
"-"                  { console.log("Reconocio : " + yytext);  return 'menos' } 
"**"                  { console.log("Reconocio : " + yytext);  return 'pow' } 
"*"                  { console.log("Reconocio : " + yytext);  return 'multi' }
"/"                  { console.log("Reconocio : " + yytext);  return 'div' } 
"%"                  { console.log("Reconocio : " + yytext);  return 'mod' } 

"<="                  { console.log("Reconocio : " + yytext);  return 'menorigual' } 
"<"                  { console.log("Reconocio : " + yytext);  return 'menorque' } 
">="                  { console.log("Reconocio : " + yytext);  return 'mayorigual' } 
">"                  { console.log("Reconocio : " + yytext);  return 'mayorque' } 


"||"                  { console.log("Reconocio : " + yytext);  return 'or' } 
"&&"                  { console.log("Reconocio : " + yytext);  return 'and' } 
"!"                  { console.log("Reconocio : " + yytext);  return 'not' } 
"^"                  { console.log("Reconocio : " + yytext);  return 'xor' } 


"int"               {console.log("Reconocio: "+yytext); return 'int'}
"double"            {console.log("Reconocio: "+yytext); return 'double'}
"boolean"           {console.log("Reconocio: "+yytext); return 'boolean'}
"char"              {console.log("Reconocio: "+yytext); return 'char'}
"string"            {console.log("Reconocio: "+yytext); return 'string'}
"null"              {console.log("Reconocio: "+yytext); return 'null'}

//para asignaciones 
"const"             {console.log("Reconocio: "+yytext); return 'const'}

//resultado booleanos
"true"             {console.log("Reconocio: "+yytext); return 'true'}
"false"             {console.log("Reconocio: "+yytext); return 'false'}

//palabras para ciclos 
"if"             {console.log("Reconocio: "+yytext); return 'if'}
"else"                    {console.log("Reconocio: "+yytext); return 'else'}
"switch"                  {console.log("Reconocio: "+yytext); return 'switch'} 
"case"                    {console.log("Reconocio: "+yytext); return 'case'} 
"default"                 {console.log("Reconocio: "+yytext); return 'default'} 
"while"                    {console.log("Reconocio: "+yytext); return 'while'}
"do"                    {console.log("Reconocio: "+yytext); return 'do'} 
"for"                     {console.log("Reconocio: "+yytext); return 'for'} 

//palabras para funciones 
"break"                    {console.log("Reconocio: "+yytext); return 'break'}
"continue"                {console.log("Reconocio: "+yytext); return 'continue'} 
"return"                {console.log("Reconocio: "+yytext); return 'return'}
"println"             {console.log("Reconocio: "+yytext); return 'println'} 
"print"             {console.log("Reconocio: "+yytext); return 'print'}
"typeof"             {console.log("Reconocio: "+yytext); return 'typeof'}
"void"             {console.log("Reconocio: "+yytext); return 'void'}
"length"             {console.log("Reconocio: "+yytext); return 'length'}
"call"             {console.log("Reconocio: "+yytext); return 'call'}

//OTROS METODOS
"toLower"   {console.log("Reconocio: "+yytext); return 'tolower'}
"toUpper"   {console.log("Reconocio: "+yytext); return 'toupper'}
"round"     {console.log("Reconocio: "+yytext); return 'round'}
"new"       {console.log("Reconocio: "+yytext); return 'new'}
"length"    {console.log("Reconocio: "+yytext); return 'length'}
"toCharArray" {console.log("Reconocio: "+yytext); return 'toCharArray'}
"indexof"   {console.log("Reconocio: "+yytext); return 'indexof'}
"push"      {console.log("Reconocio: "+yytext); return 'push'}
"pop"       {console.log("Reconocio: "+yytext); return 'pop'}
"splice"    {console.log("Reconocio: "+yytext); return 'splice'}
"graficar_ts()" {console.log("Reconocio: "+yytext); return 'graficar_ts'}

{ID}        {console.log("Reconocio: "+yytext); return 'id'}
{CADENA}    {console.log("Reconocio: "+yytext); return 'cadena'}
{DECIMAL}   {console.log("Reconocio: "+yytext); return 'decimal'}
{ENTERO}    {console.log("Reconocio ENTERO: "+yytext); return 'entero'}
{CARACTER}  {console.log("Reconocio: "+yytext); return 'caracter'}

"."                  {console.log("Reconocio : " + yytext);  return 'punto' }

//EOF INDICA EL FIN DEL DOCUMENTO LEIDO 
<<EOF>> return 'EOF';
.       {
            bDatos.addError("Lexico","Caracter no reconocido "+yytext,yylloc.first_line,yylloc.first_column);
            console.log('Este error es un error lexico: '+yytext+' en al linea '+yylloc.first_line+' en la columna '+yylloc.first_column);
        }

/lex
//Fin del analisis lexico 

//INICIO DEL ANALISIS SINTACTICO

//PRECEDENCIA
//LAS PRECEDENCIAS VAN DE ABAJO A ARRIBA
%right 'interrogacion'
%left 'coma','puntoycoma', 'igual'
%left 'or'
%left 'and'
%right 'xor'
%left 'igualigual','diferente','menorque','menorigual','mayorque','mayorigual'
%left 'mas','menos'
%left 'div', 'multi','mod' 
%right 'pow'
%left 'inc','dec'
%right 'not'
%right UMINUS

//INICIO DE LA GRAMATICA 

%start INICIO 
%%
//========En este caso las minusculas son terminales y las mayusculas no terminales=================================


INICIO:INSTRUCCIONES  EOF { console.log("termine de analizar" ); return $$; }
            ;
INSTRUCCIONES : INSTRUCCIONES INSTRUCCION { $1.push($2); $$=$1;   }
            | INSTRUCCION {$$= [$1];}
            ;
INSTRUCCION: ASIGNACION puntoycoma {$$= $1;}
            | DECLARACION puntoycoma {$$= $1;}
            | IF {$$= $1;}
            | IF_SINLLAVES {$$= $1;}
            | SWITCH {$$= $1;}
            | FOR {$$=$1;}
            | WHILE {$$=$1;}
            | DO_WHILE {$$=$1;}  
            | break puntoycoma {$$= new Break(@1.first_line,@1.last_column);}
            | continue puntoycoma  {$$= new Continue(@1.first_line,@1.last_column);}
            | return puntoycoma  {$$= new Return(null,@1.first_line,@1.last_column);}
            | return EXPRESION puntoycoma {$$= new Return($2,@1.first_line,@1.last_column);}
            | N_PRINT puntoycoma {$$= $1;}     
            | N_PRINTLN puntoycoma {$$= $1;}
            | FUNCIONES {$$= $1;}
            | METODOS {$$= $1;}
            | LLAMADA puntoycoma {$$= $1;}
            | BLOQUE_INST {$$=new BloqueInstSup($1,@1.first_line,@1.last_column);}
            | id inc puntoycoma {$$=new IncDecremento ($1,TypeAritmeticas.INCDER,@1.first_line,@1.last_column);}
            | id dec puntoycoma {$$=new IncDecremento ($1,TypeAritmeticas.DECDER,@1.first_line,@1.last_column);}
            | inc id puntoycoma {$$=new IncDecremento ($2,TypeAritmeticas.INCIZQ,@1.first_line,@1.last_column);}
            | dec id puntoycoma {$$=new IncDecremento ($2,TypeAritmeticas.DECIZQ,@1.first_line,@1.last_column);}
            | VECTOR puntoycoma {$$=$1;}
            | MODIVECTOR puntoycoma {$$=$1;}
            | TERNARIO puntoycoma {$$=$1;}
            | PUSH_V puntoycoma {$$=$1;}
            | POP_V puntoycoma {$$=$1;}
            | SPLICE puntoycoma {$$=$1;}
            | graficar_ts puntoycoma {$$=new Graficarts(@1.first_line,@1.last_column);}
            | error puntoycoma {console.log("Error Sintactico, simbolo no esperado:"  + yytext 
                           + " linea: " + this._$.first_line
                           +" columna: "+ this._$.first_column);
                    bDatos.addError("Sintactico","No se esperaba este caracter "+yytext,@1.first_line,@1.last_column);    
                    $$=new Nothing(@1.first_line,@1.last_column);
                    }
            ;
DECLARACION: TIPOVAR CONJID igual EXPRESION  {$$= new Declaracion(false,$1,$2,$4,@1.first_line,@1.last_column);}
    | const TIPOVAR CONJID igual EXPRESION {$$= new Declaracion(true,$2,$3,$5,@1.first_line,@1.last_column);}
    | TIPOVAR CONJID  {$$= new Declaracion(false,$1,$2,null,@1.first_line,@1.last_column);}
    ;

ASIGNACION: CONJID igual EXPRESION{$$=new Asignacion($1,$3,@1.first_line,@1.last_column)}
    ;

CONJID: CONJID coma id  { $1.push($3); $$=$1; }
    | id  {  $$=[$1];   }
    ;

TIPOVAR: int    {$$=Type.INT;}
    | double    {$$=Type.DOUBLE;}
    | boolean   {$$=Type.BOOLEAN;}
    | char      {$$=Type.CHAR;}
    | string    {$$=Type.STRING;}
    ; 
TIPODATO: cadena  {$$= new Literal($1,Type.STRING,@1.first_line,@1.last_column);}
    | caracter {$$= new Literal($1,Type.CHAR,@1.first_line,@1.last_column);}
    | decimal {$$= new Literal($1,Type.DOUBLE,@1.first_line,@1.last_column);}
    | id {$$= new Literal($1,Type.ID,@1.first_line,@1.last_column);}
    | entero {$$= new Literal($1,Type.INT,@1.first_line,@1.last_column);}
    | true {$$= new Literal($1,Type.BOOLEAN,@1.first_line,@1.last_column);}
    | false {$$= new Literal($1,Type.BOOLEAN,@1.first_line,@1.last_column);}
    | null  {$$= new Literal($1,Type.NULL,@1.first_line,@1.last_column);}
    ;


IF: if parentesisa EXPRESION parentesisc BLOQUE_INST {$$=new If($3,$5,[],@1.first_line,@1.last_column);}
    | if parentesisa EXPRESION parentesisc BLOQUE_INST else BLOQUE_INST {$$= new If($3,$5,$7,@1.first_line,@1.last_column);}
    | if parentesisa EXPRESION parentesisc BLOQUE_INST else IF {$$= new If($3,$5,[$7],@1.first_line,@1.last_column);}
    ;

IF_SINLLAVES: if parentesisa EXPRESION parentesisc IFS_INSTRUCCION  {$$=new If($3,[$5],[],@1.first_line,@1.last_column);}
    | if parentesisa EXPRESION parentesisc IFS_INSTRUCCION  else IFS_INSTRUCCION  {$$= new If($3,[$5],$7,@1.first_line,@1.last_column);}
    | if parentesisa EXPRESION parentesisc IFS_INSTRUCCION  else IF_SINLLAVES {$$= new If($3,[$5],[$7],@1.first_line,@1.last_column);}
    ;

IFS_INSTRUCCION: ASIGNACION puntoycoma {$$=$1} 
    | DECLARACION puntoycoma {$$=$1}
    | N_PRINT puntoycoma {$$=$1}
    | N_PRINTLN puntoycoma  {$$=$1}
    | id inc puntoycoma {$$=new IncDecremento ($1,TypeAritmeticas.INCDER,@1.first_line,@1.last_column);}
    | id dec puntoycoma {$$=new IncDecremento ($1,TypeAritmeticas.DECDER,@1.first_line,@1.last_column);}
    | inc id puntoycoma {$$=new IncDecremento ($2,TypeAritmeticas.INCIZQ,@1.first_line,@1.last_column);}
    | dec id puntoycoma {$$=new IncDecremento ($2,TypeAritmeticas.DECIZQ,@1.first_line,@1.last_column);}
    ;


//SWITCH
SWITCH: switch parentesisa EXPRESION parentesisc llavea CASES_LIST llavec {$$=new Switch($3,$6,@1.first_line,@1.last_column);}
    | switch parentesisa EXPRESION parentesisc llavea CASES_LIST DEFAULT llavec {$6.push($7);   $$=new Switch($3,$6,@1.first_line,@1.last_column);}
    | switch parentesisa EXPRESION parentesisc llavea DEFAULT llavec {$$= new Switch($3,[$6],@1.first_line,@1.last_column);}
    | switch parentesisa EXPRESION parentesisc llavea DEFAULT CASES_LIST  llavec {$7.push($6);     $$= new Switch($3,$7,@1.first_line,@1.last_column);}
    | switch parentesisa EXPRESION parentesisc llavea CASES_LIST DEFAULT CASES_LIST  llavec  {$6.push($7);  $6.concat($8);   $$= new Switch($3,$6,@1.first_line,@1.last_column);}
    ;

CASES_LIST: CASES_LIST CASE {$1.push($2); $$=$1;}
    | CASE {$$=[$1];}
    ;
CASE: case EXPRESION dospuntos INSTRUCCIONES {$$= new Case($2,$4,@1.first_line,@1.last_column);}
    | case EXPRESION dospuntos {$$= new Case($2,[],@1.first_line,@1.last_column);}
    ;
DEFAULT: default dospuntos INSTRUCCIONES {$$=$3;}
    | default dospuntos {$$=[new Nothing(@1.first_line,@1.last_column)];} 
    ;



//FOR 
FOR: for parentesisa DECLARACION puntoycoma EXPRESION puntoycoma EXPRESION parentesisc BLOQUE_INST {$$=new For($3,$5,$7,$9,@1.first_line,@1.last_column);}
    | for parentesisa ASIGNACION puntoycoma EXPRESION puntoycoma EXPRESION parentesisc BLOQUE_INST {$$=new For($3,$5,$7,$9,@1.first_line,@1.last_column);}
    ;


//WHILE
WHILE: while parentesisa EXPRESION parentesisc BLOQUE_INST {$$=new While($3,$5,@1.first_line,@1.last_column);}
    ;

//DO WHILE
DO_WHILE: do BLOQUE_INST while parentesisa EXPRESION parentesisc puntoycoma{$$=new Dowhile($5,$2,@1.first_line,@1.last_column);}
    ;


//METODOS 
METODOS: void id parentesisa PARAMETROS parentesisc  BLOQUE_INST {$$= new Metodo($2,$4,$6,@1.first_line,@1.last_column);}
    | void id parentesisa parentesisc  BLOQUE_INST {$$= new Metodo($2,[],$5,@1.first_line,@1.last_column);}
    ;

//FUNCIONES
FUNCIONES: TIPOVAR id parentesisa PARAMETROS parentesisc BLOQUE_INST {$$= new Funcion($1,$2,$4,$6,@1.first_line,@1.last_column);}
    | TIPOVAR id parentesisa parentesisc BLOQUE_INST {$$= new Funcion($1,$2,[],$5,@1.first_line,@1.last_column);}
    ;

//Parametros  
PARAMETROS:PARAMETROS coma TIPOVAR id {$1.push(new Declaracion(false,$3,[$4],null,@1.first_line,@1.last_column)); $$=$1;}
    | TIPOVAR id {$$=[new Declaracion(false,$1,[$2],null,@1.first_line,@1.last_column)]}
    ;

//LLAMADA
LLAMADA: call  id parentesisa PARAMETROSLLAMADA parentesisc {$$=new Call($2,$4,@1.first_line,@1.last_column)}
    | call  id parentesisa parentesisc {$$=new Call($2,[],@1.first_line,@1.last_column)}
    | id parentesisa PARAMETROSLLAMADA parentesisc {$$=new Call($1,$3,@1.first_line,@1.last_column)}
    | id parentesisa parentesisc {$$=new Call($1,[],@1.first_line,@1.last_column)}
    ;

PARAMETROSLLAMADA: PARAMETROSLLAMADA coma EXPRESION {$1.push($3); $$=$1;}
    | EXPRESION {$$=[$1];}
    ;

N_PRINTLN: println parentesisa EXPRESION parentesisc {$$=new Println($3,@1.first_line,@1.last_column);}
    | println parentesisa parentesisc  {$$=new Println(null,@1.first_line,@1.last_column);}
    ;
N_PRINT: print parentesisa EXPRESION parentesisc  {$$=new Print($3,@1.first_line,@1.last_column);}
    | print parentesisa parentesisc  {$$=new Print(null,@1.first_line,@1.last_column);}
    ;
N_TYPEOF: typeof parentesisa EXPRESION parentesisc {$$=new Typeof($3,@1.first_line,@1.last_column);} ;

//Bloque de Instrucciones
BLOQUE_INST: llavea INSTRUCCIONES llavec {$$=$2;}
    | llavea llavec {$$=[new Nothing(@1.first_line,@1.last_column)];}
    ;

//TERNARIOS
TERNARIO: parentesisa EXPRESION parentesisc interrogacion INST_1LINE dospuntos INST_1LINE {$$=new Ternario($2,$5,$7,@1.first_line,@1.last_column);}
    ;
    
INST_1LINE: ASIGNACION {$$=$1} 
    | DECLARACION {$$=$1}
    | N_PRINT {$$=$1}
    | N_PRINTLN {$$=$1}
    | LLAMADA {$$=$1}
    | id inc {$$=new IncDecremento ($1,TypeAritmeticas.INCDER,@1.first_line,@1.last_column);}
    | id dec {$$=new IncDecremento ($1,TypeAritmeticas.DECDER,@1.first_line,@1.last_column);}
    | inc id  {$$=new IncDecremento ($2,TypeAritmeticas.INCIZQ,@1.first_line,@1.last_column);}
    | dec id {$$=new IncDecremento ($2,TypeAritmeticas.DECIZQ,@1.first_line,@1.last_column);}
    ;    

//VECTORES
VECTOR: TIPOVAR id corchetea corchetec igual new TIPOVAR corchetea EXPRESION corchetec {$$= new DeclaracionVector($1,$2,1,$7,null,$9,null,null,@1.first_line,@1.last_column);}
    | TIPOVAR id corchetea corchetec corchetea corchetec igual new TIPOVAR corchetea EXPRESION corchetec corchetea EXPRESION corchetec {$$= new DeclaracionVector($1,$2,1,$7,$9,$12,null,null,@1.first_line,@1.last_column);}
    | TIPOVAR id corchetea corchetec igual CONJVECTOR {$$= new DeclaracionVector($1,$2,2,null,null,null,$6,1,@1.first_line,@1.last_column);}
    | TIPOVAR id corchetea corchetec corchetea corchetec igual CONJVECTOR {$$= new DeclaracionVector($1,$2,2,null,null,null,$8,2,@1.first_line,@1.last_column);}
    | TIPOVAR id corchetea corchetec igual TO_CHAR_ARRAY {$$= new DeclaracionVector($1,$2,3,null,null,null,[$6],1,@1.first_line,@1.last_column);}
    ; 

CONJVECTOR:  corchetea CONJVECTOR corchetec {$$=$2;}
    | CONJVECTOR coma corchetea CONJEXP corchetec  {$1.push($4);  $$= $1;}  //EL TAMAÑO DEL ARRAY GENERADO ES DE N  (N FILAS) EN ESTE CASO
    | corchetea CONJEXP corchetec  {$$= [$2];} //EL TAMAÑO DEL ARRAY GENERADO ES DE 1  (1 FILA) EN ESTE CASO
    ;

CONJEXP: CONJEXP coma EXPRESION {$1.push($3);  $$=$1;}
    | EXPRESION {$$= [$1];}
    ;
MODIVECTOR: id corchetea EXPRESION corchetec igual EXPRESION {$$= new ModiVector($1,$3,null,$6,@1.first_line,@1.last_column);}
    | id corchetea EXPRESION corchetec corchetea EXPRESION corchetec igual EXPRESION {$$= new ModiVector($1,$3,$6,$9,@1.first_line,@1.last_column);}
    ;
TO_CHAR_ARRAY: toCharArray parentesisa EXPRESION parentesisc {$$= new ToCharArray($3,@1.first_line,@1.last_column)}
    ;
PUSH_V: id punto push parentesisa EXPRESION parentesisc {$$=new Push($1,$5,@1.first_line,@1.last_column) }
    ;
POP_V: id punto pop parentesisa parentesisc {$$=new Pop($1,@1.first_line,@1.last_column) }
    ;
SPLICE: id punto splice parentesisa EXPRESION coma EXPRESION parentesisc {$$=new Splice($1,$5,$7,@1.first_line,@1.last_column) }
    ;

EXPRESION: 
         menos EXPRESION %prec UMINUS {$$=new OAritmeticas($2,null,TypeAritmeticas.NEGACION,@1.first_line,@1.last_column);}
        | EXPRESION mas EXPRESION {$$=new OAritmeticas($1,$3,TypeAritmeticas.SUMA,@1.first_line,@1.last_column);}
        | EXPRESION menos EXPRESION {$$=new OAritmeticas($1,$3,TypeAritmeticas.RESTA,@1.first_line,@1.last_column);}
        | EXPRESION div EXPRESION {$$=new OAritmeticas($1,$3,TypeAritmeticas.DIVISION,@1.first_line,@1.last_column);}
        | EXPRESION multi EXPRESION {$$=new OAritmeticas($1,$3,TypeAritmeticas.MULTIPLICACION,@1.first_line,@1.last_column);}
        | EXPRESION mod EXPRESION {$$=new OAritmeticas($1,$3,TypeAritmeticas.MOD,@1.first_line,@1.last_column);}
        | EXPRESION pow EXPRESION {$$=new OAritmeticas($1,$3,TypeAritmeticas.POW,@1.first_line,@1.last_column);}

        | EXPRESION igualigual EXPRESION {$$=new ORelacionales($1,$3,TypeRelacionales.IGUALQUE,@1.first_line,@1.last_column);}
        | EXPRESION diferente EXPRESION{$$=new ORelacionales($1,$3,TypeRelacionales.DIFERENTEQUE,@1.first_line,@1.last_column);}
        | EXPRESION menorque EXPRESION{$$=new ORelacionales($1,$3,TypeRelacionales.MENORQUE,@1.first_line,@1.last_column);}
        | EXPRESION menorigual EXPRESION{$$=new ORelacionales($1,$3,TypeRelacionales.MENORIGUALQUE,@1.first_line,@1.last_column);}
        | EXPRESION mayorque EXPRESION  {$$=new ORelacionales($1,$3,TypeRelacionales.MAYORQUE,@1.first_line,@1.last_column);}
        | EXPRESION mayorigual EXPRESION {$$=new ORelacionales($1,$3,TypeRelacionales.MAYORIGUALQUE,@1.first_line,@1.last_column);}

        | EXPRESION or EXPRESION {$$=new OLogicas($1,$3,TypeLogic.OR,@1.first_line,@1.last_column);}
        | EXPRESION and EXPRESION {$$=new OLogicas($1,$3,TypeLogic.AND,@1.first_line,@1.last_column);}
        | EXPRESION xor EXPRESION {$$=new OLogicas($1,$3,TypeLogic.XOR,@1.first_line,@1.last_column);}
        | not EXPRESION {$$=new  OLogicas($2,null,TypeLogic.NOT,@1.first_line,@1.last_column);}
        
        | id inc {$$=new IncDecremento ($1,TypeAritmeticas.INCDER,@1.first_line,@1.last_column);}
        | inc id {$$=new IncDecremento ($2,TypeAritmeticas.INCIZQ,@1.first_line,@1.last_column);}
        | id dec {$$=new IncDecremento ($1,TypeAritmeticas.DECDER,@1.first_line,@1.last_column);}
        | dec id {$$=new IncDecremento ($2,TypeAritmeticas.DECIZQ,@1.first_line,@1.last_column);}
        
        | parentesisa EXPRESION parentesisc {$$=$2;}
        | TIPODATO {$$=$1;}
        | N_TYPEOF {$$=$1;}

        | id igual EXPRESION {$$=new Asignacion([$1],$3,@1.first_line,@1.last_column)}
        | LLAMADA {$$=$1;}
        | parentesisa EXPRESION parentesisc interrogacion EXPRESION dospuntos EXPRESION {$$=new Ternario($2,$5,$7,@1.first_line,@1.last_column);}
        | tolower parentesisa EXPRESION parentesisc   {$$=new ToLower($3,@1.first_line,@1.last_column)}
        | toupper parentesisa EXPRESION parentesisc   {$$=new ToUpper($3,@1.first_line,@1.last_column)}
        | round parentesisa EXPRESION parentesisc   {$$=new Round($3,@1.first_line,@1.last_column)}
        | id corchetea EXPRESION corchetec {$$=new AccesoVector($1,$3,null,@1.first_line,@1.last_column)}
        | id corchetea EXPRESION corchetec corchetea EXPRESION corchetec {$$=new AccesoVector($1,$3,$6,@1.first_line,@1.last_column)}
        | length parentesisa EXPRESION parentesisc {$$= new Length($3,@1.first_line,@1.last_column)}
        | id punto indexof parentesisa EXPRESION parentesisc {$$=new IndexOf($1,$5,@1.first_line,@1.last_column) }
        | id punto push parentesisa EXPRESION parentesisc {$$=new Push($1,$5,@1.first_line,@1.last_column) }
        ;
