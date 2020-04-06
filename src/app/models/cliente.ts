import { DocumentReference } from '@angular/fire/firestore'

export class Cliente {
    id: string
    nombre: string
    apellido: string
    correo: string
    fecha: Date
    imgUrl: string
    telefono: string
    ref: DocumentReference
    visible: boolean

    constructor(){
        this.nombre = this.nombre
        this.apellido = this.apellido
    }
}