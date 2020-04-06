import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { User } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gymplus';
  usuario: User
  cargando: boolean = true
  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.user.subscribe( (usuario) => {
      this.cargando = false
      this.usuario = usuario
    } )
  }
 
  
}
