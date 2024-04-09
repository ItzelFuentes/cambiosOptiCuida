import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  loader = true;

  ngOnInit():void {
    setTimeout(()=>{
      this.loader = false;
    }, 2000);
  }

  

}
