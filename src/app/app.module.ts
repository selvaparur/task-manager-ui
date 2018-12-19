import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';


import { AppComponent } from './app.component';
import { AddTaskComponentComponent } from './add-task-component/add-task-component.component';
import { ViewTaskComponentComponent } from './view-task-component/view-task-component.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ModalComponent } from './directives/model.component';
import { ModalService } from './services/model.service';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    AddTaskComponentComponent,
    ViewTaskComponentComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
