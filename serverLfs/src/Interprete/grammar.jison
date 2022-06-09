%{
	const {Type} =require('../Symbols/Type');
    const {TypeAritmeticas}= require('../Expresion/TypeAritmeticas.ts');
    const {TypeRelacionales}= require('../Expresion/TypeRelacionales.ts');
    const {TypeLogic}= require('../Expresion/TypeLogic.ts');
    const {Literal}= require('../Expresion/Literal.ts');
    const {Declaracion}= require('../Instruccion/Declaracion.ts');
    const {OAritmeticas}= require('../Expresion/OAritmeticas.ts');
    const {ORelacionales}= require('../Expresion/ORelacionales.ts');
    const {OLogicas}= require('../Expresion/OLogicas.ts');

    const {Print}= require('../Instruccion/Print.ts');
    
%}
%lex
%options case-insensitive          
LETRAS [a-zA-ZñÑ]+ 
NUMEROS [0-9]+
DECIMAL {NUMEROS}("."{NUMEROS})?
ID {LETRAS}({LETRAS}|{NUMEROS}|"_")*

CESPECIALES \\[\'\"\\nrt]
ACEPTACION [^\"\n]    
CADENA \"({ACEPTACION}|{CESPECIALES})*\"

ACEPTACIONC [^\'\n]     
CARACTER \'({ACEPTACIONC}|{CESPECIALES})\'

%% 

[ \r\t\n\s]+  {}
"//".*      {}
"/*"([\n]|[^"*/"]|\*)*"*/" {}

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


"int"             {console.log("Reconocio: "+yytext); return 'int'}
"double"             {console.log("Reconocio: "+yytext); return 'double'}
"boolean"             {console.log("Reconocio: "+yytext); return 'boolean'}
"char"             {console.log("Reconocio: "+yytext); return 'char'}
"string"             {console.log("Reconocio: "+yytext); return 'string'}

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
"print"             {console.log("Reconocio: "+yytext); return 'print'}
"println"             {console.log("Reconocio: "+yytext); return 'println'}
"typeof"             {console.log("Reconocio: "+yytext); return 'typeof'}
"void"             {console.log("Reconocio: "+yytext); return 'void'}
"length"             {console.log("Reconocio: "+yytext); return 'length'}
"call"             {console.log("Reconocio: "+yytext); return 'call'}

{ID}        {console.log("Reconocio: "+yytext); return 'id'}
{CADENA}    {console.log("Reconocio: "+yytext); return 'cadena'}
{DECIMAL}   {console.log("Reconocio: "+yytext); return 'decimal'}
{ENTERO}    {console.log("Reconocio: "+yytext); return 'entero'}
{CARACTER}  {console.log("Reconocio: "+yytext); return 'caracter'}


//EOF INDICA EL FIN DEL DOCUMENTO LEIDO 
<<EOF>> return 'EOF';
.       {
            console.log('Este error es un error lexico: '+yytext+' en al linea '+yylloc.first_line+' en la columna '+yylloc.first_column);
        }

/lex
//Fin del analisis lexico 

//INICIO DEL ANALISIS SINTACTICO

//PRECEDENCIA
//LAS PRECEDENCIAS VAN DE ABAJO A ARRIBA
%left 'coma','puntoycoma'
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
INSTRUCCION: ASIGNACION {$$= $1;}
            | DECLARACION {$$= $1;}
            | IF
            | SWITCH
            | FOR  
            | WHILE
            | DO_WHILE       
            | PRINT       
            | PRINTLN 
            | FUNCIONES 
            | METODOS 
            | LLAMADA puntoycoma
            | BLOQUE_INST
            | error {console.log("Error Sintactico, simbolo no esperado:"  + yytext 
                           + " linea: " + this._$.first_line
                           +" columna: "+ this._$.first_column);
                           }
            ;
DECLARACION: TIPOVAR CONJID igual EXPRESION puntoycoma {$$= new Declaracion(false,$1,$2,$4,@1.first_line,@1.last_column);}
    | const TIPOVAR CONJID igual EXPRESION puntoycoma {$$= new Declaracion(true,$2,$3,$5,@1.first_line,@1.last_column);}
    ;

ASIGNACION: CONJID igual EXPRESION puntoycoma;

CONJID: CONJID coma id  { $1.push($3); $$=$1; }
    | id  {  $$=[$1];   }
    ;

TIPOVAR: int   {$$=Type.INT;}
    | double  {$$=Type.DOUBLE;}
    | boolean {$$=Type.BOOLEAN;}
    | char {$$=Type.CHAR;}
    | string {$$=Type.STRING;}
    ; 
TIPODATO: cadena  {$$= new Literal($1,Type.STRING,@1.first_line,@1.last_column);}
    | caracter {$$= new Literal($1,Type.CHAR,@1.first_line,@1.last_column);}
    | decimal {$$= new Literal($1,Type.DOUBLE,@1.first_line,@1.last_column);}
    | id {$$=$1}
    | entero {$$= new Literal($1,Type.INT,@1.first_line,@1.last_column);}
    | true {$$= new Literal($1,Type.BOOLEAN,@1.first_line,@1.last_column);}
    | false {$$= new Literal($1,Type.BOOLEAN,@1.first_line,@1.last_column);}
    ;


IF: if parentesisa EXPRESION parentesisc llavea INSTRUCCIONES llavec
    | if parentesisa EXPRESION parentesisc llavea INSTRUCCIONES llavec CELSEIF
    | if parentesisa EXPRESION parentesisc llavea INSTRUCCIONES llavec CELSEIF else llavea INSTRUCCIONES llavec 
    ;
CELSEIF: CELSEIF ELSEIF
    |ELSEIF
    ;
ELSEIF: else if parentesisa EXPRESION parentesisc llavea INSTRUCCIONES llavec;

//SWITCH
SWITCH: switch parentesisa EXPRESION parentesisc llavea INST_SWITCH llavec
    ;

//Instrucciones adentro de un switch
INST_SWITCH: CASES_LIST
    | CASES_LIST DEFAULT 
    | CASES_LIST DEFAULT CASES_LIST
    | DEFAULT CASES_LIST
    | DEFAULT
    ;

CASES_LIST: CASES_LIST CASE
    | CASE
    ;
CASE: case EXPRESION dospuntos INSTRUCCIONES
    | case EXPRESION dospuntos INSTRUCCIONES break puntoycoma
    ;
DEFAULT: default dospuntos INSTRUCCIONES
    | default dospuntos INSTRUCCIONES break puntoycoma
    ;

//FOR (DECASIG de por si ya tiene puntoycoma)
FOR: for parentesisa DECLARACION EXPRESION puntoycoma EXPRESION parentesisc llavea INST_FOR llavec
    | for parentesisa ASIGNACION EXPRESION puntoycoma EXPRESION parentesisc llavea INST_FOR llavec;

//Instrucciones para un ciclo for 
INST_FOR:INSTRUCCIONES
    | INSTRUCCIONES continue puntoycoma
    | INSTRUCCIONES continue puntoycoma INSTRUCCIONES
    | continue puntoycoma INSTRUCCIONES
    ; 

//WHILE
WHILE: while parentesisa EXPRESION parentesisc llavea INST_WHILE llavec 
    ;

//DO WHILE
DO_WHILE: do llavea INST_WHILE llavec while parentesisa EXPRESION parentesisc puntoycoma;

//Instrucciones para while y do while
INST_WHILE: INSTRUCCIONES
    | INSTRUCCIONES break puntoycoma
    | INSTRUCCIONES break puntoycoma INSTRUCCIONES
    | break puntoycoma INSTRUCCIONES
    ;

//METODOS 
METODOS: void id parentesisa PARAMETROS parentesisc llavea INST_METODOS llavec 
    | void id parentesisa parentesisc  llavea INST_METODOS llavec
    ;
INST_METODOS: INSTRUCCIONES
    | INSTRUCCIONES return
    ;

//FUNCIONES
FUNCIONES: TIPOVAR id parentesisa PARAMETROS parentesisc llavea INST_FUNCIONES llavec
    | TIPOVAR id parentesisa parentesisc llavea INST_FUNCIONES llavec
    ;
INST_FUNCIONES: INSTRUCCIONES
    | INSTRUCCIONES return EXPRESION
    ;

//Parametros  
PARAMETROS:PARAMETROS coma TIPOVAR id
    | TIPOVAR id
    ;

//LLAMADA
LLAMADA: call  id parentesisa PARAMETROSLLAMADA parentesisc
    | call  id parentesisa parentesisc
    | id parentesisa PARAMETROSLLAMADA parentesisc
    | id parentesisa parentesisc
    ;

PARAMETROSLLAMADA: PARAMETROSLLAMADA coma EXPRESION 
    | EXPRESION
    ;

N_PRINTLN: println parentesisa EXPRESION parentesisc puntoycoma
    | println parentesisa LLAMADA parentesisc puntoycoma
    | println parentesisa parentesisc  puntoycoma
    ;
N_PRINT: print parentesisa EXPRESION parentesisc puntoycoma
    | print parentesisa LLAMADA arentesisc puntoycoma
    | print parentesisa parentesisc  puntoycoma 
    ;
N_TYPEOF: typeof parentesisa TIPODATO parentesisc;

//Bloque de Instrucciones
BLOQUE_INST: llavea INSTRUCCIONES llavec;

EXPRESION: EXPRESION mas EXPRESION {$$=new OAritmeticas($1,$3,TypeAritmeticas.SUMA,@1.first_line,@1.last_column);}
        | EXPRESION menos EXPRESION {$$=new OAritmeticas($1,$3,TypeAritmeticas.RESTA,@1.first_line,@1.last_column);}
        | EXPRESION div EXPRESION {$$=new OAritmeticas($1,$3,TypeAritmeticas.MULTIPLICACION,@1.first_line,@1.last_column);}
        | EXPRESION multi EXPRESION {$$=new OAritmeticas($1,$3,TypeAritmeticas.DIVISION,@1.first_line,@1.last_column);}
        | EXPRESION mod EXPRESION {$$=new OAritmeticas($1,$3,TypeAritmeticas.MOD,@1.first_line,@1.last_column);}
        | EXPRESION pow EXPRESION {$$=new OAritmeticas($1,$3,TypeAritmeticas.POW,@1.first_line,@1.last_column);}
        | menos EXPRESION %prec UMINUS {$$=new OAritmeticas($2,null,TypeAritmeticas.NEGACION,@1.first_line,@1.last_column);}
        | EXPRESION igualigual EXPRESION {$$=new ORelacionales($1,$3,TypeRelacionales.IGUALQUE,@1.first_line,@1.last_column);}
        | EXPRESION diferente EXPRESION{$$=new ORelacionales($1,$3,TypeRelacionales.DIFERENTEQUE,@1.first_line,@1.last_column);}
        | EXPRESION menorque EXPRESION{$$=new ORelacionales($1,$3,TypeRelacionales.MENORQUE,@1.first_line,@1.last_column);}
        | EXPRESION menorigual EXPRESION{$$=new ORelacionales($1,$3,TypeRelacionales.MENORIGUALQUE,@1.first_line,@1.last_column);}
        | EXPRESION mayorque EXPRESION  {$$=new ORelacionales($1,$3,TypeRelacionales.MAYORQUE,@1.first_line,@1.last_column);}
        | EXPRESION mayorigual EXPRESION {$$=new ORelacionales($1,$3,TypeRelacionales.MAYORIGUALQUE,@1.first_line,@1.last_column);}
        | EXPRESION or EXPRESION {$$=new OLogicas($1,$3,TypeLogic.OR,@1.first_line,@1.last_column);}
        | EXPRESION and EXPRESION {$$=new OLogicas($1,$3,TypeLogic.AND,@1.first_line,@1.last_column);}
        | EXPRESION xor EXPRESION {$$=new OLogicas($1,$3,TypeLogic.XOR,@1.first_line,@1.last_column);}
        | not EXPRESION {$$=new OLogicas($2,null,TypeLogic.NOT,@1.first_line,@1.last_column);}
        | id inc
        | id dec 
        | inc id
        | dec id 
        | parentesisa EXPRESION parentesisc {$$=$2;}
        | TIPODATO {$$=$1;}
        | N_TYPEOF {$$=$1;}
        ;
