import { Component } from '@angular/core';
import { MessageServicesService } from '../message-services.service';
import { JsonPipe } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';

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
  title:'',
  note:''
}

procesar(){
    this.msjService.addMessage(this.vaciar)
    this.vaciar = {
      title:'',
      note:''
    }
}
}
