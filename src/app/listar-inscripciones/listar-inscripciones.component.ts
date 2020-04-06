import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente';


@Component({
  selector: 'app-listar-inscripciones',
  templateUrl: './listar-inscripciones.component.html',
  styleUrls: ['./listar-inscripciones.component.scss']
})
export class ListarInscripcionesComponent implements OnInit {
  inscripciones: Array<any> = new Array<any>()
  inscripcionesVencidas: Array<any> = new Array<any>()

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.inscripcionesVencidasGet()
    var fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() - 1);
    this.inscripciones.length = 0
    this.db.collection('inscripciones' , ref => ref.where('fechaFinal' , '>=' , fechaActual)).get().subscribe((result) => {
      result.forEach((inscripcion) => {
        let inscripcionNew = inscripcion.data()
        inscripcionNew.id = inscripcion.id
        inscripcionNew.fecha = new Date(inscripcionNew.fecha.toDate())
        inscripcionNew.fechaFinal = new Date(inscripcionNew.fechaFinal.toDate())
        inscripcionNew.clienteOctenido = new Cliente()
        this.db.doc(inscripcionNew.cliente.path).get().subscribe((cliente) => {
          let clienteNew = new Cliente()
          clienteNew = cliente.data() as Cliente
          clienteNew.id = cliente.id
          inscripcionNew.clienteOctenido = clienteNew
        })
        this.inscripciones.push(inscripcionNew)
      })
    })
  }

  inscripcionesVencidasGet() {
    var fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() - 1); 
    this.inscripcionesVencidas.length = 0
    this.db.collection('inscripciones', ref => ref.where('fechaFinal' , '<' , fechaActual)).get().subscribe((result) => {
      result.forEach((inscripcion) => {
        let inscripcionNew = inscripcion.data()
        inscripcionNew.id = inscripcion.id
        inscripcionNew.fecha = new Date(inscripcionNew.fecha.toDate())
        inscripcionNew.fechaFinal = new Date(inscripcionNew.fechaFinal.toDate())
        inscripcionNew.clienteOctenido = new Cliente()
        this.db.doc(inscripcionNew.cliente.path).get().subscribe((cliente) => {
          let clienteNew = new Cliente()
          clienteNew = cliente.data() as Cliente
          clienteNew.id = cliente.id
          inscripcionNew.clienteOctenido = clienteNew
        })
        this.inscripcionesVencidas.push(inscripcionNew)
      })
      console.log(this.inscripcionesVencidas)
    })
  }

}
