import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  tab:number = 0;
  changeTab= (tab:number):void=>{
    this.tab=tab;

  }


}




