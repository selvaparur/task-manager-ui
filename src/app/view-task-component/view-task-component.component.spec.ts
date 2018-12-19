import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskComponentComponent } from './view-task-component.component';
import { FilterPipe } from '../pipes/filter.pipe';
import { ModalService } from '../services/model.service';
import { ModalComponent } from '../directives/model.component';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientTestingModule } from   '@angular/common/http/testing';
import { RouterTestingModule } from   '@angular/router/testing';

describe('List Task Component', () => {
  let component: ViewTaskComponentComponent;
  let fixture: ComponentFixture<ViewTaskComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTaskComponentComponent,FilterPipe,ModalComponent],
      imports:[
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,FormsModule
      ],
      providers:[ModalService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});