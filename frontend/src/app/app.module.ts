import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { NewClassComponent } from './new-class/new-class.component';
import { NewLessonComponent } from './new-lesson/new-lesson.component';
import { ShowClassesComponent } from './show-classes/show-classes.component';
import { ShowLessonsComponent } from './show-lessons/show-lessons.component';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { UploadComponent } from './upload/upload.component';
import {SpreadSheetsModule } from '@grapecity/spread-sheets-angular';



@NgModule({
  declarations: [
    AppComponent,
    NewClassComponent,
    NewLessonComponent,
    ShowClassesComponent,
    ShowLessonsComponent,
    UploadComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonToggleModule,
    SpreadSheetsModule,

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
