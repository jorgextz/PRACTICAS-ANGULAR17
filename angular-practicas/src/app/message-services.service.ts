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

  getMessages(){
    return this.messages
  }
}
