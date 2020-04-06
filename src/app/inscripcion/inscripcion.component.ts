import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '../models/inscrpciones';
import { Cliente } from '../models/cliente';
import { AngularFirestore } from '@angular/fire/firestore';
import { Precio } from '../models/precio';
import { MensajesService } from '../service/mensajes.service';


@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {
  inscripcione: Inscripcion = new Inscripcion()
  clienteSeleccionado: Cliente = new Cliente()
  precios: Precio[] = new Array<Precio>()
  precioSeleccionado: Precio = new Precio()
  idPrecio: string = "null"

  constructor(private db: AngularFirestore,
    private ms: MensajesService) { }

  ngOnInit() {
    this.db.collection('precios').get().subscribe((result) => {
      result.docs.forEach((item) => {
        let precio = item.data() as Precio
        precio.id = item.id
        precio.ref = item.ref
        this.precios.push(precio)
      })
    })
  }

  asignarCliente(cliente: Cliente) {
    this.inscripcione.cliente = cliente.ref
    this.clienteSeleccionado = cliente
  }

  eliminarCliente() {
    this.clienteSeleccionado = new Cliente()
    this.inscripcione.cliente = undefined
  }

  guardar() {
    if (this.inscripcione.validar().esValido) {
      let inscripccion = {
        fecha: this.inscripcione.fecha,
        fechaFinal: this.inscripcione.fechaFinal,
        cliente: this.inscripcione.cliente,
        precios: this.inscripcione.precios,
        subTotal: this.inscripcione.subTotal,
        iva: this.inscripcione.iva,
        total: this.inscripcione.total
      }
      this.db.collection('inscripciones').add(inscripccion).then((result)=>{
        this.inscripcione = new Inscripcion()
        this.clienteSeleccionado = new Cliente()
        this.precioSeleccionado = new Precio()
        this.idPrecio = "null"
        this.ms.mensajeSuccess("EXITO","Se guardo correctamente")
      }).catch((err)=>{
        console.error(err)
        this.ms.mensajeError("Error","")
      })
    } else {
      this.ms.mensajeError("Error", this.inscripcione.validar().mensaje) 
    }
  }

  seleccionarPrecio(id: string) {

    if (id != 'null') {
      this.precioSeleccionado = this.precios.find(x => x.id == id)
      this.inscripcione.precios = this.precioSeleccionado.ref
      this.inscripcione.fecha = new Date()

      if (this.precioSeleccionado.tipoDuracion == 1) {
        let dias: number = this.precioSeleccionado.duracion * 1
        let fechaFinal =
          new Date(this.inscripcione.fecha.getFullYear(), this.inscripcione.fecha.getMonth(), this.inscripcione.fecha.getDate() + dias)
        this.inscripcione.fechaFinal = fechaFinal
      }

      if (this.precioSeleccionado.tipoDuracion == 2) {
        let dias: number = this.precioSeleccionado.duracion * 7
        let fechaFinal =
          new Date(this.inscripcione.fecha.getFullYear(), this.inscripcione.fecha.getMonth(), this.inscripcione.fecha.getDate() + dias)
        this.inscripcione.fechaFinal = fechaFinal
      }

      if (this.precioSeleccionado.tipoDuracion == 3) {
        let dias: number = this.precioSeleccionado.duracion * 15
        let fechaFinal =
          new Date(this.inscripcione.fecha.getFullYear(), this.inscripcione.fecha.getMonth(), this.inscripcione.fecha.getDate() + dias)
        this.inscripcione.fechaFinal = fechaFinal
      }

      if (this.precioSeleccionado.tipoDuracion == 4) {
        let meses: number = this.precioSeleccionado.duracion * 1
        let fechaFinal =
          new Date(this.inscripcione.fecha.getFullYear(), this.inscripcione.fecha.getMonth() + meses, this.inscripcione.fecha.getDate())
        this.inscripcione.fechaFinal = fechaFinal
      }

      if (this.precioSeleccionado.tipoDuracion == 5) {
        let years: number = this.precioSeleccionado.duracion * 1
        let fechaFinal =
          new Date(this.inscripcione.fecha.getFullYear() + years, this.inscripcione.fecha.getMonth(), this.inscripcione.fecha.getDate())
        this.inscripcione.fechaFinal = fechaFinal
      }

      let subTotal: number = this.precioSeleccionado.costo * 1
      let iva: number = this.precioSeleccionado.costo * 0.16
      this.inscripcione.subTotal = subTotal
      this.inscripcione.iva = iva
      this.inscripcione.total = subTotal + iva

    } else {
      this.precioSeleccionado = new Precio()
      this.inscripcione.fecha = null
      this.inscripcione.fechaFinal = null
      this.inscripcione.fechaFinal = null
      this.inscripcione.precios = null
      this.inscripcione.subTotal = 0
      this.inscripcione.iva = 0
      this.inscripcione.total = 0
    }

  }

}   
