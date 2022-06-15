import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  //ESTOS SERVICES PUEDEN FUNCIONAR COMO SERVIDOR O COMO BASE DE DATOS 
  ast:any[]=[];
  terror:any[]=[];
  Url="http://localhost:8080"
  constructor(
    private http:HttpClient
  ) {}
  getData(){
    return this.http.get(`${this.Url}/`)
  }
  setData(json:any){
    return this.http.post(`${this.Url}/`,json);
  }
  setDataTAst(json:any){
    return this.http.post(`${this.Url}/setTextoAst`,json);
  }
  //AST 
  setAst(ast:any[]){
    this.ast=ast;
  }
  getAst():any[]{
    return this.ast
  }
  //TABLA DE ERRORES
  getTError(){
    return this.http.get(`${this.Url}/ObtenerError`);
  }
  getTEnvs(){
    return this.http.get(`${this.Url}/ObtenerEnvs`);
  }
}
