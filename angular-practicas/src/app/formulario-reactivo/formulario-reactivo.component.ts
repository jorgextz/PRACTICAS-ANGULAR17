import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-formulario-reactivo',
  standalone: true,
  imports: [FormsModule, JsonPipe, ReactiveFormsModule],
  templateUrl: './formulario-reactivo.component.html',
  styleUrl: './formulario-reactivo.component.css'
})
export class FormularioReactivoComponent {

constructor(private fb:FormBuilder){

}

get name(){
  return this.form1.get('name');
}

get email(){
  return this.form1.get('email');
}

form1 = this.fb.group({
  'name' : ['',Validators.required],
  'email': ['', [Validators.required, Validators.email]]
})


procesar(){
  console.log(this.form1.get('name')?.value)
}

}
