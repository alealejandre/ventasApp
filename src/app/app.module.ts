import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { AgregarVentasComponent } from './componentes/venta/agregar-ventas/agregar-ventas.component';
import { LoginComponent } from './componentes/acceso/login/login.component';
import { RegistrarComponent } from './componentes/acceso/registrar/registrar.component';
import { FormsModule} from '@angular/forms';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgregarProductosComponent } from './componentes/producto/agregar-productos/agregar-productos.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { ListarProductosComponent } from './componentes/producto/listar-productos/listar-productos.component';
import { AgregarVentaComponent } from './componentes/venta/agregar-ventas/agregar-ventas.component';

import { HttpClientModule } from '@angular/common/http';
import { ListarVentasComponent } from './componentes/venta/listar-ventas/listar-ventas.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { FbdatePipe } from './pipes/fbdate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    //AgregarVentasComponent,
    LoginComponent,
    RegistrarComponent,
    AgregarProductosComponent,
    ListarProductosComponent,
    AgregarProductosComponent,
    AgregarVentaComponent,
    ListarVentasComponent,
    MenuComponent,
    FbdatePipe
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,     
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig,'ventasApp'),
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
    //FontAwesomeModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
