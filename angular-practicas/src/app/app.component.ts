import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PruebaComponent } from './prueba/prueba.component';
import { FormsModule } from '@angular/forms';
import { InputOutputComponent } from "./input-output/input-output.component";
import { Usuario } from '../interfaces';
import {Validators, FormGroup, FormBuilder, FormControl} from '@angular/forms'
import { JsonPipe } from '@angular/common';
import { MessagesComponent } from "./messages/messages.component";
import { ListMessagesComponent } from "./list-messages/list-messages.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PruebaComponent, FormsModule, InputOutputComponent, JsonPipe, MessagesComponent, ListMessagesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-practicas';

usuario:Usuario = {
  nombre: 'Jorge Marcano',
  dni: 95981511,
  edad: 31,
}

recibirUser(info:any){

}

}
