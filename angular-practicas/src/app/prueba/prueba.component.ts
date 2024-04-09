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

// Metodos
incrementar(){
  this.numero ++; 
}

decrementar(){
  this.numero --; 
}


}
