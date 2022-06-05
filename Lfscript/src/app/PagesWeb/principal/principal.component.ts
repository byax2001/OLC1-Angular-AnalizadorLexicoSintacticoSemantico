import { Component, OnInit } from '@angular/core';
import {MJsExternosService} from './../../m-js-externos.service'
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  
  constructor(
    private MjsExt:MJsExternosService
  ) { 
    MjsExt.CargarJs(['metodos.js']);
  }

  ngOnInit(): void {
  }

  addTab(){
    let tabbedpane=document.getElementById("NamePest");
    let contentpane=document.getElementById("ContPest");
    let pestaña= document.createElement("li"),
    contenido=document.createTextNode("1")
    ;
    let Cpestaña= document.createElement("div");
    let AreaText= document.createElement("textarea");
    //

    AreaText.setAttribute("class","tAreaW");
    pestaña.setAttribute("class","option");
    pestaña.setAttribute("id","option4")
    
    Cpestaña.setAttribute("id","content4");
    Cpestaña.setAttribute("class","content")
    
    //
    pestaña.appendChild(contenido)
    tabbedpane?.appendChild(pestaña)
    Cpestaña.appendChild(AreaText)
    contentpane?.appendChild(Cpestaña)
  }
}
