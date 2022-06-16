import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Network, DataSet } from 'vis';
declare var handler: any
@Component({
  selector: 'app-ast',
  templateUrl: './ast.component.html',
  styleUrls: ['./ast.component.css']
})
export class AstComponent implements OnInit {
  
  constructor(
    private clientS: ClientService,
  ) { 
  }

  ngOnInit(): void {
  }

  graficarAst(){
    let ast=this.clientS.getAst();
    const contenedor= document.getElementById("AreaGraficaAst");
    console.log("fifo")
    console.log(ast[0])
    console.log(ast[1]);
    const nodes= new DataSet<any>(ast[0]);
    const edges=new DataSet<any>(ast[1]);
   
    const data={nodes,edges};
    //OPCIONES PARA LOS NODOS----------------------------------------------------------
    let opciones={
      edges:{
        color:{
          color:"#013ADF"
        }
      },
      nodes:{
        color:{
          //border:"#13B0D3",background:"black",hover:{border:"#51C8E3",background:"#54919F"}  Con estilo
          border:"white",background:"red",hover:{border:"#51C8E3",background:"#54919F"}
        },
        shape:"box",
        font:{
          //color:"#13B0D3", Con estilo
          color:"white",
          align:"center"
        }
      }, physics:{
        enabled: false,
        barnesHut: {
          gravitationalConstant: -100,
          centralGravity: 0.3,
          springLength: 95
        }},
      layout:{
        hierarchical: {
          direction: "UD",
          sortMethod: "directed",
          nodeSpacing: 200,
          treeSpacing: 400
        }
      }
    };
    //------------------------------------------------------------------------
    if(contenedor!=null && data!=null){
      let grafo= new Network(contenedor,data,opciones);
    }
    
  }

}
