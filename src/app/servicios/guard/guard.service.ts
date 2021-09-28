import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {
  constructor() {}

  //canActivate devuelve un boolean dependiendo de la logica de seguridad que
  //apliquemos a las rutas
  canActivate(route: ActivatedRouteSnapshot) {
    let ruta = route['_routerState']['url'];
    let usuario: Usuario = JSON.parse(
      window.localStorage.getItem('VENTAS_APP_USER')
    );

    console.log('this.tieneRol(usuario, ruta)', this.tieneRol(usuario, ruta));
    if (usuario && this.tieneRol(usuario, ruta)) {
      return true;
    } else {
      return false;
    }
  }

  tieneRol(usuario, ruta): boolean {
    console.log("ruta", ruta);
    if (ruta === '/menu') {
      return true;
    }
    let existe_rol = usuario.roles.find((rol) => rol.ruta == ruta);
    if (existe_rol) {
      return true;
    } else {
      return false;
    }
  }
}
