import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  coleccion_usuarios: string = 'usuarios';
  caleccion_roles: string = 'roles';
  constructor(private afs: AngularFirestore) {}
  
  
  /*  acceder(usuaurio:Usuario){
    this.afs.collection(
          this.coleccion_usuarios, (ref) => 
          ref.where('correo', '==',usuaurio.correo)
          .where('contrasena', '==', usuaurio.contrasena)
        ).valueChanges();
  }*/

  listarRoles() {
    return this.afs.collection(this.caleccion_roles).valueChanges();
    //throw new Error('Method not implemented.');
  }
  listarUsuarios(){
    return this.afs.collection(this.coleccion_usuarios).valueChanges()
  }  


  acceder(usuario: Usuario) {
    return this.afs
      .collection(this.coleccion_usuarios, (ref) =>
        ref
          .where('correo', '==', usuario.correo)
          .where('contrasena', '==', usuario.contrasena)
          .limit(1)
      )
      .valueChanges();
  }

  
  //Metodo que accede al documento por el ID y setea un objeto en ese documento
  agregarUsuario(usuario:Usuario){

  // {
  //   nombre: 'Flavio',
  //   apellido_paterno: 'Ramirez',
  //   apellido_materno: 'Gonzales',
  //   ....
  // }

    usuario.usuario_id = this.agregarCodigoId(usuario)
  
  // {
  //   usuario_id: 165475512FRG
  //   nombre: 'Flavio',
  //   apellido_paterno: 'Ramirez',
  //   apellido_materno: 'Gonzales',
  //   ....
  // }
   

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
}
