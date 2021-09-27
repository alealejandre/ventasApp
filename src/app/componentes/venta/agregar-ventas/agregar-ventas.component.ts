import { AfterViewInit,Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from 'src/app/interfaces/producto';
import { Usuario } from 'src/app/interfaces/usuario';
import { Venta } from 'src/app/interfaces/venta';
import { ProductoService } from 'src/app/servicios/producto/producto.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { VentaService } from 'src/app/servicios/venta/venta.service';


@Component({
  selector: 'app-agregar-ventas',
  templateUrl: './agregar-ventas.component.html',
  styleUrls: ['./agregar-ventas.component.css']
})
export class AgregarVentaComponent implements OnInit, AfterViewInit {
  
  
  lista_productos_disponibles: Producto[];
  lista_productos: Producto[];
  lista_productos_seleccionados: any[];
  producto_seleccionado: any;
  monto_total: number;
  input_busqueda: string;
  constructor(
    private productoService: ProductoService,
    private ventaService: VentaService,
    private ngbModal: NgbModal,
    private usuarioServices: UsuarioService
    
  ) {
    
  }

  ngOnInit(): void {
    this.listarUsuariosRest();
    this.inicializarVariables();
  }

  listarUsuariosRest() {
    this.usuarioServices.listarUsuarioRest().subscribe((usuarios) => {
      console.log('usuarios rest:', usuarios);
    });
  }

  ngAfterViewInit() {
    this.productoService.listarProductos().subscribe((productos) => {
      this.lista_productos = productos;
      this.lista_productos_disponibles = this.clonarObjeto(
        this.lista_productos
      );
    });
  }

  keyPress(event) {
    this.filtrarDisponibles();
  }
  keyBackspace(event) {
    this.filtrarDisponibles();
  }

  filtrarDisponibles() {
    setTimeout(() => {
      this.lista_productos_disponibles = this.lista_productos.filter(
        (producto) =>
          producto.nombre
            .toUpperCase()
            .includes(this.input_busqueda.toUpperCase())
      );
    });
  }

  agregarProducto(modalAgregar, producto) {
    this.producto_seleccionado = {};
    this.producto_seleccionado = this.clonarObjeto(producto);

    this.ngbModal
      .open(modalAgregar, {
        centered: true,
        size: 'lg',
        scrollable: true,
        backdrop: 'static',
      })
      .result.then(
        (result) => {
          if (result == 'Save') {
            this.agregarProductoAlista();
          }
        },
        (reason) => {}
      );
  }

  agregarProductoAlista() {
    this.lista_productos_seleccionados.push(this.producto_seleccionado);
    this.actualizarMontoTotal();
  }

  actualizarMontoTotal() {
    this.monto_total = 0;
    this.lista_productos_seleccionados.forEach((producto) => {
      this.monto_total += producto.precio * producto.cantidad;
    });
  }

  quitarProductoSeleccionado(indice) {
    console.log('indice', indice);
    this.lista_productos_seleccionados.splice(indice, 1);
    this.actualizarMontoTotal();
  }

  obtenerUsuario(): Usuario {
    return JSON.parse(window.localStorage.getItem('VENTAS_APP_USER'));
  }

  generarVenta() {
    let usuario_registro: Usuario = this.obtenerUsuario();
    //alert("1631561609981aal")
    let nueva_venta: Venta = {      
      //usuario_id: usuario_registro.usuario_id,
      usuario_id: "1631561609981aal",
      detalles: this.lista_productos_seleccionados,
      fecha_registro: new Date(),
      total: this.monto_total,
    };
     alert (nueva_venta)
    this.ventaService
      .registrarVenta(nueva_venta)
      .then(() => {
        alert('Venta registrada corretamente');
        this.listarUsuariosRest();
        this.inicializarVariables();
      })
      .catch((error) => {
        console.error('error al registrar venta: ', error);
      });
  }

  clonarObjeto(objeto: any) {
    return JSON.parse(JSON.stringify(objeto));
  }

  inicializarVariables() {
    this.lista_productos_disponibles = [];
    this.lista_productos_seleccionados = [];
    this.producto_seleccionado = {};
    this.lista_productos = [];
    this.monto_total = 0;
    this.input_busqueda = '';
  }
  
}
