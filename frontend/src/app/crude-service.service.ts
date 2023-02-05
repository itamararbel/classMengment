import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Classes } from './modal/classes';
import { Lessons } from './modal/lessons';

@Injectable({
  providedIn: 'root'
})
export class CrudeService {
  URLclasses = "http://localhost:3001/api/classes"
  URLLessons = "http://localhost:3001/api/lessons"
  constructor(private http: HttpClient) { }

  getAllClasses(): Observable<any[]> {
    return this.http.get<any[]>(this.URLclasses+"/all");
}

getClassesByDate(date:string):Observable<any[]> {
  return this.http.get<any[]>(this.URLclasses+"/date/"+date);
}

getAllLessons(): Observable<any[]> {
  return this.http.get<any[]>(this.URLLessons+"/all");
}
postNewClass(newClass:Classes):Observable<Classes>{
  return this.http.post<Classes>(this.URLclasses+"/new",newClass);
}
postNewLesson(newLesson:Lessons):Observable<Lessons>{
  return this.http.post<Lessons>(this.URLLessons+"/new",newLesson);
}
findClass(newLesson:Lessons):Observable<Classes[]>{
  return this.http.post<Classes[]>(this.URLclasses+"/findClass",newLesson);
}
deleteLesson(id:number):Observable<any>{
  return this.http.delete<any>(this.URLLessons+"/delete/"+id,{observe:"response"})
}
postMultipleLessons(lessons:Lessons[]):Observable<Lessons[]>{
  return this.http.post<Lessons[]>(this.URLLessons+"/postMultipleLessons/",lessons)
}

}
