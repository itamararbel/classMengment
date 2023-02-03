class classesModal { 
    id: number;
    number_of_class: number;
    max_student: number;
    frontal:boolean;
    circle:boolean;
    auditorium: boolean;
}

export class lessonsModal{
    id:number;
    number_of_student: number;
    date:Date;
    lesson_start: string;
    lesson_end: string;
    sitting: string;
    lesson_name:string;
    classId :number;
    class_number:number;
}

export default classesModal;
