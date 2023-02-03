import { Component } from '@angular/core';
import { Classes } from '../modal/classes';
import { CrudeService } from '../crude-service.service';

@Component({
  selector: 'app-show-classes',
  templateUrl: './show-classes.component.html',
  styleUrls: ['./show-classes.component.css']
})
export class ShowClassesComponent {
  classesList:Classes[] = []
  constructor(private classService:CrudeService){
    classService.getAllClasses().subscribe(res=>this.classesList = res )
  }


}
