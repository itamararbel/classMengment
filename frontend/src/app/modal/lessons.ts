import { Classes } from "./classes";

export class Lessons {
  id: number = 0;
  number_of_student: number = NaN;
  date: string = "null";
  sitting: string = "null";
  lesson_start: string = "null";
  lesson_end:string= "null";
  lesson_name: string = "null";
  classId: any = NaN;
  class_number:number=NaN;
  length?:string;
  class_options?:Classes[]=[]

  constructor(id: number, number_of_student: number, sitting: string, date: string,start:string,end:string , lesson_name: string, classId: number) {
    this.id = id;
    this.number_of_student = number_of_student;
    this.date = date;
    this.lesson_start=start;
    this.lesson_end = end;
    this.sitting = sitting;
    this.lesson_name = lesson_name;
    this.classId = classId;
  }

}
