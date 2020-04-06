import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajesService } from '../service/mensajes.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Precio } from '../models/precio';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  formularioPrecio: FormGroup
  precios: Precio[] = new Array<Precio>()
  esEditar: boolean = false
  id: string = ''
  constructor(private fb: FormBuilder,
    private db: AngularFirestore,
    private sm: MensajesService,
    private spinner: NgxSpinnerService, ) { }

  ngOnInit() {
    this.formularioPrecio = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required]
    })
    this.mostrarPrecios()
  }

  mostrarPrecios(){
    this.db.collection<Precio>('precios').get().subscribe((result) => {
      this.precios.length = 0
      result.docs.forEach((dato) => {
        let precio = dato.data() as Precio
        precio.id = dato.id
        precio.ref = dato.ref
        this.precios.push(precio)
      })
    })
  }

  agregar() {
    this.spinner.show()
    this.db.collection<Precio>('precios').add(this.formularioPrecio.value).then((result) => {
      this.formularioPrecio.reset()
      this.spinner.hide()
      this.mostrarPrecios()
      this.sm.mensajeSuccess("El preció", "Se agrego correctamente")
    }).catch((err) => {
      this.spinner.hide()
      this.sm.mensajeError("ERROR", "")
    })
  }

  editarPrecio(precio: Precio) {
    this.esEditar = true
    this.formularioPrecio.setValue({
      nombre: precio.nombre,
      costo: precio.costo,
      duracion: precio.duracion,
      tipoDuracion: precio.tipoDuracion
    })
    this.id = precio.id
  }

  editar() {
    this.db.doc('precios/' + this.id).update(this.formularioPrecio.value).then(() => {
      this.formularioPrecio.reset();
      this.esEditar = false
      this.mostrarPrecios()
      this.sm.mensajeSuccess('Editado', 'Se edito correctamente')
    }).catch((err) => {
      this.sm.mensajeError('Error', 'A ocurrido un error')
      console.error(err)
    })
  }

}
