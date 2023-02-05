import { Component, Input } from '@angular/core';
import { Lessons } from '../modal/lessons';
import { CrudeService } from '../crude-service.service';

@Component({
  selector: 'app-show-lessons',
  templateUrl: './show-lessons.component.html',
  styleUrls: ['./show-lessons.component.css']
})
export class ShowLessonsComponent {
  @Input() changeTab!: (tab: number) => void

  public LessonsList:Lessons[] = [];
  lessonsFilterd:Lessons[]=[];

  constructor(private classService:CrudeService){
    classService.getAllLessons().subscribe(res=>{
      console.log(res);
      res.map(item=>{
       item.length = Number(item.length.split(":")[0])<3? "#7fff00" :  Number(item.length.split(":")[0])<6? "yellow":"red";
        item.date =  showDate(item.date)})
      this.LessonsList = res
    this.lessonsFilterd=res;
    })
  }
  sortByDate = ()=>{
    this.LessonsList.sort((a,b)=>a.date>b.date? 1: a.date<b.date? -1:0 );
  }

  sortByClass = ()=>{
    this.LessonsList.sort((a,b)=>a.class_number>b.class_number? 1: a.class_number<b.class_number? -1:0);
  }

  sortByIdOrder = ()=>{
    this.LessonsList.sort((a,b)=>a.id>b.id? 1: a.id<b.id? -1 : 0);
  }
  deleteLesson=(id:number)=>{
this.classService.deleteLesson(id).subscribe(resp=>{
  if(resp.status===204){
    this.LessonsList =this.LessonsList.filter((item)=>item.id!==id)
  }
} )
  }
  filterResp=(exp:string)=>{
    console.log(exp)
    if (exp===""){
      this.lessonsFilterd=this.LessonsList;
    }else
    this.lessonsFilterd= this.LessonsList.filter((item)=>item.lesson_name.includes(exp))
  }
}
const showDate=(date:string):string=>{
  let temp = date.split("T")[0].split("-")
  let displayableDate = +temp[2]+1+"/"+temp[1]+"/"+temp[0];
  return displayableDate

}



