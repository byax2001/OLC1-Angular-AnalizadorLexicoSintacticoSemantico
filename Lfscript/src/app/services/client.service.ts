import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
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
}
