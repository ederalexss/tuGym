import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cliente } from '../models/cliente';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarCLienteComponent implements OnInit {
  clientes: Cliente[] = Array<Cliente>()
  constructor(private db: AngularFirestore) { }
  @Input('nombre') nombre: string
  @Output('seleccionCliente') seleccionCliente = new EventEmitter()
  @Output('cancelarCliente') cancelCliente = new EventEmitter()
  ngOnInit() {
    this.db.collection<Cliente>('clientes').get().subscribe((result) => {
      this.clientes.length = 0
      result.docs.forEach((item) => {
        let cliente: any = item.data()
        cliente.id = item.id
        cliente.ref = item.ref
        cliente.visible = false
        this.clientes.push(cliente)
      })
    })
  }

  buscar(nombre: string): void {
    this.clientes.forEach((item) => {
      if (item.nombre.toLowerCase().includes(nombre.toLowerCase())) {
        item.visible = true
      } else { 
        item.visible = false
      }
    })
  }

  seleccionarCliente(cliente: Cliente){
    this.nombre = cliente.nombre + " " +cliente.apellido
    this.clientes.forEach((item) => {
        item.visible = false
    })
    this.seleccionCliente.emit(cliente) 
  }

  cancelarCliente(){
    this.nombre = undefined
    this.cancelCliente.emit()
  }

}
