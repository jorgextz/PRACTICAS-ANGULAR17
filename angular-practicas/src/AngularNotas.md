# Notas angular 

## Formularios Reactivos
### Crear Formularios
Para crear de forma correcta un **formulario** con la herramienta `FormBuilder` es necesario primero importar `FormBuilder` y 
`FormGroup` desde `@angular/forms`, luego inyactar el form Builder en el **Constructor** de la clase de la siguiente manera:

```js
import { FormGroup, FormBuilder } from '@angular/forms';

export class FormularioReactivo { 

  constructor(private fb:FormBuilder){

}

}
```
**fb** es el nombre que se le asigna a el `FormBuilder` para poder usarlo con mayor facilidad dentro del archivo **.ts**, puede ser cualquiera que el usuario elija.
***

### Getters
Los **getters** son heramientas que nos permiten usar propiedades mas facilmente simplificando la escritura a la hora de llamarlos por ejemplo:
    Si tuvieramos que imprimir a la pripiedad `name` del formulario `form1` mediante el `console.log()` tendriamos que llamarla de la siguiente manera:
```js

form1 = this.fb.group({
  'name' : ['',Validators.required],
  'email': ['', [Validators.required, Validators.email]]
})

console.log(this.form1.get('name')?.value)
```

## Comunicacion entre Componentes
### Input y Ouput

El **Input** nos ayuda a poder importar algun elemento de desde el componente padre al componente Hijo, por ejemplo:

```javascript
<app-children [user]="usuario"> </app-children>
```
En este caso el componente hijo esta recibiendo el elemento **user** que es un objeto, este objeto existe en el **.ts** del componente padre con el nombre de **usuario**, por ejemplo:

```javascript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PruebasComponent, FormularioReactivoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  usuario = {
    nombre: 'Jorge marcano',
    dni: '95.981.511'
  }
}
```
Para poder recepcionar el objeto **user** en el componente Hijo es necesario importar el decorador ``Input`` de ``@angular/core`` como en el siguiente ejemplo:


```javascript

import {Input} from '@angular/core';

@Component({
  selector: 'app-children',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './children.component.html',
  styleUrl: './children.component.css'
})
export class ChildrenComponent {

@Input() user?:{nombre:string, dni:string}

imprimir(){
  console.log('Mi nombre es: '+ this.user.nombre +' y mi dni es: '+ this.user.dni)
}
}
```

El **Output** es todo lo contrario, permite enviar informacion de vuelva a los componentes padre, para poder hacerlo en necesario impotar las dependecias: ``EventEmitter`` y ``Output`` de ``@angular/core`` en el componente **Hijo** de la siguiente forma:

```javascript
import {Output, EventEmitter} from '@angular/core';
```
Una vez realizado tenemos que crear un evento personalizado con el ``EventEmitter``, este evento va a ser llamado desde **html** en el componente hijo, y va a enviar la informacion al componente padre.

```javascript
import { Component,Input,Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-children',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './children.component.html',
  styleUrl: './children.component.css'
})
export class ChildrenComponent {

usuario = {
  nombre:'user';
  dni: '1.234.567'
}

@Output() userSend = new EventEmitter<any>();


emitUser(){
  this.userSend.emit(this.usuario)
}
}
```

Luego disparo la funcion en ``HTML`` en algun elemento del componente **hijo** como el button:

```javascript
<button class="form-button" (click)="emitUser()"></button>
```

Despues debo escuchar el en la plantillla del componente **padre** el evento enviado ``userSend``, en este caso lo recibo como argumento de una funcion creada en el componente padre llamada ``recibirUser``

```javascript
<app-children (userSend) = "recibirUser($event)"> </app-children>
```
``$event`` trae dentro la informacion enviada desde el componente hijo, en este caso el objeto, luego lo manipulo en el componente padre:

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PruebasComponent, FormularioReactivoComponent, ChildrenComponent, FormsModule, MessagesComponent, MessageslistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 
 recibirUser(usuario:any){
    console.log('Usuario Recibido: ' + usuario )
 }
  
 
}
```

### Servicios
Es una forma de comunicacion mucho mas sencilla entre componentes, los **Servicios** es una clase accesible desde cualquier componente que decidamos conectar a este, permitiendo que el intercambio de informacion sea mucho mas sencillo y eficiente.