import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteServices } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  formulario: FormGroup;
  pacienteService = inject(PacienteServices)
  router = inject(Router);
  loader = true;

  ngOnInit():void {
    setTimeout(()=>{
      this.loader = false;
    }, 2000);
  }

  constructor(){
    this.formulario = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    })
  }

  async onSubmit(){
    const response = await this.pacienteService.singup(this.formulario.value);
    this.router.navigate(['/Inicio']);
  }

}
