import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../../interfaces';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-input-output',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './input-output.component.html',
  styleUrl: './input-output.component.css'
})

export class InputOutputComponent {
  
@Input() user?: Usuario;

nombre = '';
dni = 0;
edad = 0;


@Output() userChange = new EventEmitter<Usuario>();

// procesar(info:any){
//   console.log('Enviado')
//   this.user!.nombre = info.nombre;
//   this.user!.edad = info.edad;
//   this.user!.dni = info.dni;
//   this.userChange.emit(this.user)
//   this.nombre = ''
//   this.dni = 0
//   this.edad = 0
// }

// sendName(name:any){
//   this.user!.nombre = name
// }

procesar(info:any){
this.user!.nombre = info.nombre
this.user!.edad = info.edad
this.user!.dni = info.dni
this.userChange.emit(this.user)
}



}
