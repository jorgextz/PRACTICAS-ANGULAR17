import { Component } from '@angular/core';
import { Persona } from '../../persona';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [JsonPipe, FormsModule],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent {

// Propiedades
animal:string = 'Gato loco'

usuario:Persona = {
  nombre: 'Luis',
  edad: 27
}

personas:Persona[] = [
  {nombre: 'Jorge Marcano', edad:31},
  {nombre: 'Martin Bragatto', edad:57},
  {nombre: 'Mauro Bragatto', edad:25},
  {nombre: 'Sabrina Bragatto', edad:58}
]

numero:number = 0;
text_color:string ='';
button_change:boolean = false;

img:string = 'https://images.pexels.com/photos/23947602/pexels-photo-23947602/free-photo-of-amor-gente-mujer-picnic.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

ActiveAlert:boolean= false;

dia?:number;

persona = {
  nombre:'',
  edad: ''
}


// Metodos

GuardarFormulario(name:string, age:string){
  this.persona.nombre = name;
  this.persona.edad = age;
}

incrementar(){
  this.numero ++; 
}

decrementar(){
  this.numero --; 
}

mostrarEnConsola(name:string) {
  console.log(name);
  this.ActiveAlert= !this.ActiveAlert;
}

changeDay(day:string){
 let convertDay = parseInt(day);
 this.dia = convertDay;
}

procesar(){
  console.log(this.persona)
}

}
