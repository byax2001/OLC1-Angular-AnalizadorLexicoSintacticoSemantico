export class B_datos{
    private static instance:B_datos;
    private constructor(){}
    public static getInstance():B_datos{
        if(!B_datos.instance){
            B_datos.instance=new B_datos();
        }
        return B_datos.instance;
    }

    //METODOS
    addMensage(hola:string){

        console.log(hola)
    }

}