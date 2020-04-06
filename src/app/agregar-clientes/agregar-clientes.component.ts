import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { MensajesService } from '../service/mensajes.service';


@Component({
  selector: 'app-agregar-clientes',
  templateUrl: './agregar-clientes.component.html',
  styleUrls: ['./agregar-clientes.component.scss']
})
export class AgregarClientesComponent implements OnInit {
  formularioCliente: FormGroup
  porcentageSubida: number = 0
  urlImage: string = ""
  esEditable: boolean = false
  id: string = ''
  constructor(private fb: FormBuilder,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private spinner: NgxSpinnerService,
    private activeRoute: ActivatedRoute,
    private ms: MensajesService) { }

  ngOnInit() {
    this.formularioCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      fecha: ['', Validators.required],
      telefono: ['', Validators.required],
      imgUrl: ['']
    })

    let id = this.activeRoute.snapshot.params.clienteId
    this.id = id
    if (id != undefined) {
      this.esEditable = true
      this.db.doc<any>('clientes/' + id).valueChanges().subscribe((cliente) => {
        let fecha = this.obtenerFecha(cliente.fecha.toDate())
        this.formularioCliente.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          correo: cliente.correo,
          telefono: cliente.telefono,
          fecha: fecha,
          imgUrl: ''
        })
        this.urlImage = cliente.imgUrl;
      })
    }
  }

  agregar() {
    this.spinner.show();
    this.formularioCliente.value.imgUrl = this.urlImage
    this.formularioCliente.value.fecha = new Date(this.formularioCliente.value.fecha)
    this.db.collection('clientes').add(this.formularioCliente.value).then((res) => {
      console.log('Registro creado')
      this.formularioCliente.reset()
      this.porcentageSubida = 0
      this.urlImage = ''
      this.spinner.hide();
      this.ms.mensajeSuccess('El cliente' , 'Se agrego correctamente')
    }).catch((err) => {
      this.spinner.hide();
      console.error(err)
    })
  }

  editar(){
    this.spinner.show();
    this.formularioCliente.value.imgUrl = this.urlImage
    this.formularioCliente.value.fecha = new Date(this.formularioCliente.value.fecha)
    this.db.doc('clientes/'+this.id).update(this.formularioCliente.value).then((cliente)=>{
      console.log(cliente)
      this.spinner.hide(); 
      this.ms.mensajeSuccess('El cliente' , 'Se actulizo correctamente')
    }).catch((err)=>{
      this.spinner.hide();
      console.error(err);
    })
  }

  subirImg(event) {
    if (event.target.files.length > 0) {
      let nombre: string = new Date().getTime().toString()
      const file = event.target.files[0];
      let formato: string = file.name.toString().substring(file.name.toString().lastIndexOf('.'))
      const filePath = 'clientes/' + nombre + formato;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task.then((obj) => {
        ref.getDownloadURL().subscribe((url) => {
          this.urlImage = url
        })
      })
      task.percentageChanges().subscribe((porcentaje) => {
        this.porcentageSubida = parseInt(porcentaje.toString())
      })
    }
  }

  obtenerFecha(timeStamp): string {
    const d = new Date(timeStamp)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    let year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }
}
