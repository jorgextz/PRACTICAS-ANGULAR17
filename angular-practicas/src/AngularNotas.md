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
Es una forma de comunicacion mucho mas sencilla entre componentes, un **Servicio** es una clase  que contiene lógica y funciones compartidas que se pueden inyectar y utilizar en otros componentes u otros servicios, permitiendo que el intercambio de informacion sea mucho mas sencillo y eficiente.

Para poder crear un servicio es necesario introducir el siguiente codigo en la consola:
```
ng generate service miServicio
```

Partamos del ejemplo en el que tenemos dos componentes uno llamado ``messages`` y otro ``list-messages`` ambos componentes estan consumiendo un servicio llamado``message-services``. En el componente ``messages`` nos encargamos de cargar notas y en ``list-messages`` de listarlas estos es posible gracias a la logica contenida en el servicio ``message-services``. 

Lo primero que debemos hacer es agregar la logica de funcionamiento en el archivo **ts** de nuestro servicio, de la siguiente forma:

```javascript
import { Injectable } from '@angular/core';
import { Mensajes } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MessageServicesService {

  constructor() { }

  messages: Mensajes[] = [
    {
      title: 'Nota 1',
      note: 'Vamos a testear esto'
    }
  ]


  addMessage(msj:Mensajes){
    this.messages.push(msj)
  }
}
```

Como se oberva creamos un ``array`` llamado ``messages`` que contiene objetos del tipo **Mensajes** que es una **interface**. en este array guardaremos todas nuestras notas, luego agregamos un metodo llamado ``addMessage`` para poder agregar mas notas a  ``messages``. Una vez configurado nuestro servicio nos encargamos de inyectarlos a los componentes donde lo necesitamos, en este caso ``messages`` y ``list-messages``, quedaria:

En el componente ``messages``

```javascript
import { Component } from '@angular/core';
import { MessageServicesService } from '../message-services.service';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [JsonPipe, FormsModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  constructor(public msjService:MessageServicesService){

  }

vaciar:any = {
  titulo:'',
  nota:''
}

procesar(){
    this.msjService.addMessage(this.vaciar)
    this.vaciar = {
      titulo:'',
      nota:''
    }
}
}

```

y luego de la misma forma en el componente ``list-messages``

```javascript
import { Component } from '@angular/core';
import { MessageServicesService } from '../message-services.service';
import { Mensajes } from '../../interfaces';

@Component({
  selector: 'app-list-messages',
  standalone: true,
  imports: [],
  templateUrl: './list-messages.component.html',
  styleUrl: './list-messages.component.css'
})
export class ListMessagesComponent {

  constructor(msjService:MessageServicesService){}

}

```
como se observa en el componente ``messages`` inyectamos el servicio y le asignamos el nombre de ``msjService`` y luego lo utilizamos para pushear notas en el servicio mediante los metodos que ya creamos. 