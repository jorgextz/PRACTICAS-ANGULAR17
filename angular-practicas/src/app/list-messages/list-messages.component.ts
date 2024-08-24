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
