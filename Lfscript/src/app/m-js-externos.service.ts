import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MJsExternosService {

  constructor() { }


  CargarJs(archivos:String[]){
    for(let archivo of archivos){
      let script=document.createElement("script");
      
      //@ts-ignore
      //"ARCHIVO" sera la direccion del documento js con su extension ejem:  ./Paginaweb/Principal/metodos.js
      script.src='./assets/js/'+archivo; 
      let body=document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }

  }
}
