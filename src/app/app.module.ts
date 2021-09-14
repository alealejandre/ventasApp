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


@NgModule({
  declarations: [
    AppComponent,
    //AgregarVentasComponent,
    LoginComponent,
    RegistrarComponent,
    AgregarProductosComponent,
    ListarProductosComponent
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
    NgbModule
    //FontAwesomeModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
