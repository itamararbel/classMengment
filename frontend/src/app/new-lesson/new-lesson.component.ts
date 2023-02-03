import { Component, Input } from '@angular/core';
import { CrudeService } from '../crude-service.service';
import { Classes } from '../modal/classes';
import { Lessons } from '../modal/lessons';

export class MyComponent {
  selectedValue: string | undefined;
}

@Component({
  selector: 'app-new-lesson',
  templateUrl: './new-lesson.component.html',
  styleUrls: ['./new-lesson.component.css']
})
export class NewLessonComponent {
  @Input() changeTab!: (tab: number) => void
  classesList: Classes[] = [];
  constructor(private classService: CrudeService) {
  }
  addNewLesson(frontal: any, circle: any, auditorium: any, number_of_student: number, lesson_name: string, start: string, end: string, selectedClass: string) {
    const sitting = frontal._checked ? "frontal" : circle._checked ? "circle" : "auditorium";
    const newLesson = new Lessons(NaN, number_of_student, sitting, start.split("T")[0], start.split("T")[1], end, lesson_name, +selectedClass)
    this.classService.postNewLesson(newLesson).subscribe(resp => {
      console.log("passing");
      this.change();
      setTimeout(() => this.changeTab(1), 5000)

    })
  }

  findClass(frontal: any, circle: any, auditorium: any, number_of_student: number, lesson_name: string, start: string, end: string) {
    const sitting = frontal._checked ? "frontal" : circle._checked ? "circle" : "auditorium";
    const newLesson = new Lessons(NaN, number_of_student, sitting, start.split("T")[0], start.split("T")[1], end, lesson_name, NaN)
    this.classService.findClass(newLesson).subscribe(resp => {
      console.log(resp);
      this.classesList = resp
    })
  }

  change = () => {
    console.log("fdafdas")
    this.changeTab(1)
  }

}
