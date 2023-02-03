export class Classes {
    id: number = 0;
    number_of_class: number=0;
    max_student: number=0;
    frontal:boolean=false;
    circle:boolean=false;
    auditorium: boolean=false;
    constructor(number_of_class:number, max_student:number,frontal:boolean, circle:boolean, auditorium:boolean){
      this.number_of_class = number_of_class;
      this.max_student = max_student;
      this.frontal = frontal;
      this.circle=circle;
      this.auditorium=auditorium
    }
}
