import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteServices } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulario: FormGroup;
  loader = true;
  hide = true;


  ngOnInit():void {
    setTimeout(()=>{
      this.loader = false;
    }, 2000);
  }

  pacienteService = inject(PacienteServices);
  router = inject(Router);

  constructor(){
    this.formulario = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  async onSubmit() {
    try {
      const response = await this.pacienteService.login(this.formulario.value);
      if (!response.error) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('userRole', response.userRole);
        this.showCorrectPopup();
        this.router.navigate(['/Inicio']).then(() => {
          setTimeout(()=>{
            window.location.reload();
          }, 2000);
        });
      } else {
        this.showErrorPopup();
      }
    } catch (error) {
      console.error(error);
      this.showErrorPopup();
    }
  }
  
  showErrorPopup() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Correo o contraseña incorrectos!"
    });
  }

  showCorrectPopup() {
    Swal.fire({
      title: "Bienvenido!",
      text: "Haz iniciado sesión correctamente!",
      icon: "success"
    });
  }

}
