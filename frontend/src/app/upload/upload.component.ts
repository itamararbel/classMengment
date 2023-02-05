import { Classes } from './../modal/classes';
import { CrudeService } from './../crude-service.service';
import { Lessons } from '../modal/lessons';
import { Component, Input } from '@angular/core';
import * as Excel from '@grapecity/spread-excelio';
import * as GC from '@grapecity/spread-sheets';
// import { saveAs } from 'file-saver';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
      @Input() changeTab!: (tab: number) => void
  classesList:Classes[]=[]
  lessons: Lessons[] = [];
  oneClass:Classes[]=[];

  spreadBackColor = 'aliceblue';
  hostStyle = {
    width: '95vw',
    height: '80vh'
  };
  private spread;
  private excelIO;

  constructor(private classService: CrudeService) {
    this.spread = new GC.Spread.Sheets.Workbook();
    this.excelIO = new Excel.IO();
     }

  //   workbookInit(args: any) {
  //     const self = this;
  //     self.spread = args.spread;
  //     const sheet = self.spread.getActiveSheet();
  //     // sheet.getCell(0, 0).text('Test Excel').foreColor('blue');
  //     // sheet.getCell(1, 0).text('Test Excel').foreColor('blue');
  //     // sheet.getCell(2, 0).text('Test Excel').foreColor('blue');
  //     // sheet.getCell(3, 0).text('Test Excel').foreColor('blue');
  //     // sheet.getCell(0, 1).text('Test Excel').foreColor('blue');
  //     // sheet.getCell(1, 1).text('Test Excel').foreColor('blue');
  //     // sheet.getCell(2, 1).text('Test Excel').foreColor('blue');
  //     // sheet.getCell(3, 1).text('Test Excel').foreColor('blue');
  //     // sheet.getCell(0, 2).text('Test Excel').foreColor('blue');
  //     // sheet.getCell(1, 2).text('Test Excel').foreColor('blue');
  //     // sheet.getCell(2, 2).text('Test Excel').foreColor('blue');
  //     // sheet.getCell(3, 2).text('Test Excel').foreColor('blue');
  //     // sheet.getCell(0, 3).text('Test Excel').foreColor('blue');
  //     // sheet.getCell(1, 3).text('Test Excel').foreColor('blue');
  //     // sheet.getCell(2, 3).text('Test Excel').foreColor('blue');
  //     // sheet.getCell(3, 3).text('Test Excel').foreColor('blue');
  //  }

  onFileChange(args: any) {
    const self = this, file = args.srcElement && args.srcElement.files && args.srcElement.files[0];
    if (self.spread && file) {
      self.excelIO.open(file, (json: any) => {
        const data = json.sheets.גיליון1.data.dataTable
        for (const prop in data) {
          if (+prop !== 0) {
            const date = this.OADateToDate(data[prop][3].value.split("(")[1].split(')')[0]);
            const dateString = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
            console.log(dateString);
            const lesson = new Lessons(0, data[prop][1].value, data[prop][2].value, dateString, this.timeFormat(data[prop][4].value), this.timeFormat(data[prop][5].value), data[prop][0].value, 0);
            this.lessons.push(lesson)
          }
        }
        this.findClass(this.lessons);


        // self.spread.fromJSON(json, {});
        // setTimeout(() => {
        //   alert('load successfully');
        // }, 0);
      }, (error: any) => {
        alert('load fail');
      }
      );
    }
  }
  // onClickMe(args: any) {
  //   const self = this;
  //   const filename = 'exportExcel.xlsx';
  //   const json = JSON.stringify(self.spread.toJSON());
  //   self.excelIO.save(json, function (blob: Blob) {
  //     saveAs(blob, filename);
  //   }, function (error: any) {
  //     console.log(error);
  //   });
  // }
  OADateToDate = (value: number) => {
    const minutesMilliseconds = 60000;
    const ticks = this.oaDateToTicks(value)
    return new Date(ticks + new Date().getTimezoneOffset() * minutesMilliseconds)
  }

  oaDateToTicks = (oaDate: number) => {
    const OaTimeGap= 25569;
    const DAY_MILLISECONDS =86400000
    var ticks = (oaDate - OaTimeGap) * DAY_MILLISECONDS
    if (oaDate < 0) {
      const frac = (oaDate - Math.trunc(oaDate)) * DAY_MILLISECONDS
      if (frac !== 0) {
        ticks -= frac * 2
      }
    }

    return ticks
  }

  timeFormat = (timeOa: string): string => {
    let time = (+timeOa.substring(8, timeOa.length - 2) * 24)
    let timeString: string = (Math.floor(time) < 10 ? "0" + Math.floor(time).toString() : Math.floor(time).toString()).concat(":",
    (time % 1 * 60 < 10) ? "0" + (time % 1 * 60).toString() : (time % 1 * 60).toString())
    return timeString;
  }
  findClass(lessons:Lessons[]) {
    let locker=lessons.length;
    lessons.map(item=>{this.classService.findClass(item).subscribe(resp => {
      item.class_options = resp;
      locker-=1;
      if (locker===0){
        lessons[0].class_options?.map((item)=>{
          let isAvailbleToAll= true;
          lessons.map(lesson=>{
            let matchClass=lesson.class_options?.filter(classAvailable=>classAvailable.id===item.id)
            console.log(matchClass?.length)
            if (matchClass?.length===0){
              isAvailbleToAll=   false;

            }

          })
          if (isAvailbleToAll){
            this.oneClass.push(item)
            console.log(this.oneClass)

          }
        })

      }
    })
    console.log(this.lessons);
    })
  }

  chooseClass=(index:number,id:number)=>{
    this.lessons[index].classId=id;
    console.log(this.lessons);
  }
  chooseOneClass=(id:number)=>{
    this.lessons.map((item:any)=>item.classId=id);
    console.log(this.lessons)
  }
  // =(class)=>{
    // this.lessons.map((item:any)=>item)

  // }

  postLessons=()=>{
    this.classService.postMultipleLessons(this.lessons).subscribe(resp=>{
      console.log(resp)
      this.changeTab(0)
    })
    ;
  }



}
