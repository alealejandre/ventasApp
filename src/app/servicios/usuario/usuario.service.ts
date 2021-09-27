import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/interfaces/usuario';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //usuario_actual :Usuario;
  coleccion_usuarios: string = 'usuarios';
  caleccion_roles: string = 'roles';
  usuario_actual :any;
  //Esto no debe ser
  
  constructor(private afs: AngularFirestore, private httpClient: HttpClient,private router: Router) {
    this.usuario_actual = JSON.parse(
      window.localStorage.getItem('VENTAS_APP_USER')
    );
  }
  
  
  /*  
    By AleAlejandre
    acceder(usuaurio:Usuario){
    this.afs.collection(
          this.coleccion_usuarios, (ref) => 
          ref.where('correo', '==',usuaurio.correo)
          .where('contrasena', '==', usuaurio.contrasena)
        ).valueChanges();
  }*/

  acceder(usuario: Usuario) {
    return this.afs
      .collection(this.coleccion_usuarios, (ref) =>
        ref
          .where('correo', '==', usuario.correo)
          .where('contrasena', '==', usuario.contrasena)
          .limit(1)
      )
      .valueChanges().subscribe((usuarios) => {
        //si el arreglo de usuarios es mayor a 0
        //almacenar al usuario de la posicion 0 en el localStorage
        if (usuarios.length > 0) {
          window.localStorage.setItem(
            'VENTAS_APP_USER',
            JSON.stringify(usuarios[0])
          );
          this.usuario_actual = usuarios[0];
          this.router.navigate(['../menu']);
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      });
  }


  listarRoles() {
    return this.afs.collection(this.caleccion_roles).valueChanges();
    //throw new Error('Method not implemented.');
  }


  listarUsuarios(){
    return this.afs.collection(this.coleccion_usuarios).valueChanges()
  }  

   
  
  //Metodo que accede al documento por el ID y setea un objeto en ese documento   
  // {
  //   usuario_id: 165475512FRG
  //   nombre: 'Flavio',
  //   apellido_paterno: 'Ramirez',
  //   apellido_materno: 'Gonzales',
  //   ....
  // }
  agregarUsuario(usuario:Usuario){        
        usuario.usuario_id = this.agregarCodigoId(usuario)
       return  this.afs.doc(this.coleccion_usuarios+'/'+ usuario.usuario_id)
              .set(usuario)
  }

  //Metodo que accede al documento por el ID y actualiza todo el objeto por el nuevo objeto
  editarUsuario(usuario:Usuario){
    return  this.afs.doc(this.coleccion_usuarios+'/'+ usuario.usuario_id)
            .update(usuario)
  }

  //Metodo que elimina el documento con el id proporcionado en la colección
  eliminarUsuario(usuario_id){
    return  this.afs.doc(this.coleccion_usuarios+'/'+ usuario_id)
            .delete()
  }

  agregarCodigoId(usuario:Usuario){
    let fecha_actual_ms:string = new Date().getTime().toString()
    let letra_nombre:string = usuario.nombres.substring(0,3)
    return fecha_actual_ms + letra_nombre
  }

  //Consumiendo un servicio de tipo GET desde https://gorest.co.in/public/v1/users
   url: string = 'https://gorest.co.in/public/v1/users';
  listarUsuarioRest() {
    return this.httpClient.get(this.url);
  }

  checkLoging(){
    if(this.usuario_actual){
      return true;
    }else{
      return false;
    }
  }
  logOut(){    
      this.usuario_actual =null;
      window.localStorage.removeItem('VENTAS_APP_USER');
      this.router.navigate(['../login'])
    }
}
