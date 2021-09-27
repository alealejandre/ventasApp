import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fbdate'
})
export class FbdatePipe implements PipeTransform {

  //en el tranform mandamos un objeto deconocido
  //transform(value: unknown, ...args: unknown[]): unknown {
    transform(fbFecha:any): Date {
      let dtFecha = new Date(1970,0,1);
      dtFecha.setSeconds(fbFecha.seconds);
      //let stFecha:String  = dtFecha.getDay() + '/'+dtFecha.getMonth() + '/'  + dtFecha.getFulleYear() + '/';

    return dtFecha;
  }

}
