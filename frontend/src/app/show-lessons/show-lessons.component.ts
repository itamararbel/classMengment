import { Component } from '@angular/core';
import { Lessons } from '../modal/lessons';
import { CrudeService } from '../crude-service.service';

@Component({
  selector: 'app-show-lessons',
  templateUrl: './show-lessons.component.html',
  styleUrls: ['./show-lessons.component.css']
})
export class ShowLessonsComponent {
  public LessonsList:Lessons[] = []
  constructor(private classService:CrudeService){
    classService.getAllLessons().subscribe(res=>{
      console.log(res);
      res.map(item=>{
       item.length = Number(item.length.split(":")[0])<3? "#7fff00" :  Number(item.length.split(":")[0])<6? "yellow":"red";
        item.date =  showDate(item.date)})
      this.LessonsList = res})
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

}
const showDate=(date:string):string=>{
  let temp = date.split("T")[0].split("-")
  let displayableDate = +temp[2]+1+"/"+temp[1]+"/"+temp[0];
  return displayableDate

}


