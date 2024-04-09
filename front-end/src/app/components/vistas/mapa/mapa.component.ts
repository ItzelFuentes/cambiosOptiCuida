import { Component } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {
  loader = true;

  ngOnInit():void {
    setTimeout(()=>{
      this.loader = false;
    }, 2000);
  }
}
