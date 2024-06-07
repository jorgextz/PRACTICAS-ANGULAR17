import { Component } from '@angular/core';
import { Persona } from '../../persona';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [],
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

numero:number = 0;
text_color:string ='';
button_change:boolean = false;

img:string = 'https://images.pexels.com/photos/23947602/pexels-photo-23947602/free-photo-of-amor-gente-mujer-picnic.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

ActiveAlert:boolean= false;


// Metodos
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

}
