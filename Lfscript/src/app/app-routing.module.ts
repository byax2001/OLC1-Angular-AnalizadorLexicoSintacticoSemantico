import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AstComponent } from './PagesWeb/Ast/ast/ast.component';
import { EnviromentComponent } from './PagesWeb/Enviroments/enviroment/enviroment.component';
import { ErroresComponent } from './PagesWeb/Errores/errores/errores.component';
import { PrincipalComponent } from './PagesWeb/principal/principal.component';



const routes: Routes = [
  {path:'', component: PrincipalComponent},
  {path:'Ast', component: AstComponent},
  {path:'Errores', component: ErroresComponent},
  {path:'Enviroments', component: EnviromentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true, relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
