import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reestablecer-cont',
  templateUrl: './reestablecer-cont.component.html',
  styleUrls: ['./reestablecer-cont.component.css'] 
})
export class ReestablecerContComponent {
  email: string = '';
  loader = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

  submitForm() {
    console.log('Formulario enviado con email:', this.email);
    this.router.navigate(['/Login']);
  }
}
