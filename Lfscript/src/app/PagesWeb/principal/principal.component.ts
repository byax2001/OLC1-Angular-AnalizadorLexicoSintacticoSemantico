import { Component, OnInit,ElementRef,ViewChild,Renderer2} from '@angular/core';
import {MJsExternosService} from './../../m-js-externos.service'
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
    @ViewChild('AreaPest') APest: ElementRef;
    @ViewChild('contPest') Cpest: ElementRef;
  constructor(
    private MjsExt:MJsExternosService,
    private Renderer2: Renderer2
  ) { 
    MjsExt.CargarJs(['metodos.js']);
  
  }

  ngOnInit(): void {
  }

  addTab(){
    
    let tabbedpane=this.APest.nativeElement;
    let contentpane=this.Cpest.nativeElement;

    let pestana= this.Renderer2.createElement('li'),
    contenido=this.Renderer2.createText('1');
    console.log(tabbedpane)
    let Cpestana= this.Renderer2.createElement("div");
    let AreaText= this.Renderer2.createElement("textarea");
    //atributos
    this.Renderer2.setAttribute(AreaText,'class','tAreaW');
    this.Renderer2.setAttribute(pestana,'class','option');
    this.Renderer2.setAttribute(pestana,'id','option4');
    this.Renderer2.setAttribute(Cpestana,'id','content4');
    this.Renderer2.setAttribute(Cpestana,'class','content');
    
    //agregar elementos a otros
    this.Renderer2.appendChild(pestana,contenido);
    this.Renderer2.appendChild(tabbedpane,pestana);
    this.Renderer2.appendChild(Cpestana,AreaText);
    this.Renderer2.appendChild(contentpane,Cpestana);
  }
}
