import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './componentes/acceso/login/login.component'
import {RegistrarComponent} from './componentes/acceso/registrar/registrar.component'
import { MenuComponent } from './componentes/menu/menu.component';
import { GuardService } from './servicios/guard/guard.service';
import { ListarProductosComponent } from './componentes/producto/listar-productos/listar-productos.component';
import { ListarVentasComponent } from './componentes/venta/listar-ventas/listar-ventas.component';
const routes: Routes = [
{ path:'', component:LoginComponent},
{ path:'login', component:LoginComponent},
{path:'register', component:RegistrarComponent},
{path: 'menu', component: MenuComponent, canActivate: [GuardService] },
{
  path: 'producto',
  component: ListarProductosComponent,
  canActivate: [GuardService],
},
{
  path: 'venta',
  component: ListarVentasComponent,
  canActivate: [GuardService],
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
