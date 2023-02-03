import { Component } from '@angular/core';
import { Classes } from '../modal/classes';
import { CrudeService } from '../crude-service.service';

@Component({
  selector: 'app-new-class',
  templateUrl: './new-class.component.html',
  styleUrls: ['./new-class.component.css']
})
export class NewClassComponent {
  classesList:Classes[] = []
  constructor(private classService:CrudeService){
    classService.getAllClasses().subscribe(res=>this.classesList = res )
  }
  submitClass(number_of_class: number, max_student: number, frontal: any, circle: any, auditorium: any) {
    const newClass = new Classes(number_of_class, max_student, frontal._checked, circle._checked, auditorium._checked)
    this.classService.postNewClass(newClass).subscribe(resp=>console.log(resp))

  }
}
