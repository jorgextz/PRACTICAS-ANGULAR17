import { Component } from '@angular/core';
import { MessageServicesService } from '../message-services.service';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-list-messages',
  standalone: true,
  imports: [JsonPipe, FormsModule],
  templateUrl: './list-messages.component.html',
  styleUrl: './list-messages.component.css'
})
export class ListMessagesComponent {

  constructor(public msjService:MessageServicesService){}
  

}
