import { Component } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent {

  loader = true;

  ngOnInit():void {
    setTimeout(()=>{
      this.loader = false;
    }, 2000);
  }

}
