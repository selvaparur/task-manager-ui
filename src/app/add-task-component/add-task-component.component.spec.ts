import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import {async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientTestingModule } from   '@angular/common/http/testing';
import { RouterTestingModule } from   '@angular/router/testing';
import { AddTaskComponentComponent } from './add-task-component.component';
import { exec } from 'child_process';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { LoggingService } from '../services/logging.service';
import { AppSettings } from '../taskmodels/AppSettings';
import { DatePipe } from '@angular/common';
import { ModalService } from '../services/model.service';
import { createComponent } from '@angular/compiler/src/core';
import { FilterPipe } from '../pipes/filter.pipe';

import { ModalComponent } from '../directives/model.component';


describe('Add Task Component', () => {
  let component: AddTaskComponentComponent;
  let fixture: ComponentFixture<AddTaskComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTaskComponentComponent,FilterPipe,ModalComponent],
      imports:[
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,FormsModule
      ],
        providers:[ProjectService,TaskService,LoggingService,ModalService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should  be greater than or equal',()=>{
    const hostElement = fixture.nativeElement;
      const nameInput: HTMLInputElement = hostElement.querySelector('input');
      expect(nameInput.value).toBeGreaterThanOrEqual(0);
  });

  it('header should have text as add task',()=>{
    const hostElement = fixture.nativeElement;
    const nameInputheader: HTMLInputElement = hostElement.querySelector('h3');    
    expect(nameInputheader.innerText).toBe('Add Task');
  });
  

});
