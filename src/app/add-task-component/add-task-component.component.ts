import { Component, OnInit, Input } from '@angular/core';

import { ProjectService } from '../services/project.service';
import { ProjectsModel } from '../taskmodels/Projects';
import { ModalService } from '../services/model.service';
import { UsersModel } from '../taskmodels/Users';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TasksModel } from '../taskmodels/Tasks';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { LoggingService } from '../services/logging.service';
import { AppSettings } from '../taskmodels/AppSettings';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-create-task-component',
  templateUrl: './add-task-component.component.html',
  styleUrls: ['./add-task-component.component.css'],
  providers: [ProjectService, DatePipe]
})

export class AddTaskComponentComponent implements OnInit {
  taskForm: FormGroup;
  submitted = false;
  priority: number;
  isParentTask: boolean;
  showAlert: boolean;
  alertType: string;
  managers: Array<UsersModel> = [];
  projects: Array<ProjectsModel> = [];
  parentTasks: Array<TasksModel> = [];
  searchProject: string;
  searchManager: string;
  searchParentTask: string;
  pageMessage: string;
  task: TasksModel;
  isEditMode: boolean;

  addButtonTitle: string;
  pageTitle: string;

  @Input() project: TasksModel;
  constructor(private _formBuilder: FormBuilder,
    private _projectService: ProjectService,
    private _router: Router,
    private _modalService: ModalService,
    private _taskService: TaskService,
    private _activatedRoute: ActivatedRoute,
    private _logSerice: LoggingService,
    private _datePipe: DatePipe) {
    this.OnComponentLoad();
  }

  OnComponentLoad() {
    this.task = new TasksModel();
    this.ngOnInit();
  }

  ngOnInit() {

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 1);

    this.taskForm = this._formBuilder.group(
      {
        taskId: [0],
        taskName: ['', Validators.required],
        // projectId: [0],
        // projectName: ['', Validators.required],
        isParentTask: [false],
        priority: [0],
        parentTaskId: [0],
        parentTaskName: [''],
        startDate: [null],
        endDate: [null],
        // managerId: [0],
        // managerName: ['']
      });

    this.loadDependencies();
    this.setStartAndEndDate(startDate, endDate);
    this.resetLabels();

    this._activatedRoute.paramMap.subscribe(pm => {
      const id = +pm.get('id');
      if (id > 0) {
        this.getTaskById(id);
      }
    });
  }

  resetLabels() {
    this.pageTitle = 'Add Task';
    this.addButtonTitle = 'Add';
  }

  onPriorityChange(e) {
    this.priority = e.target.value;
  }

  loadDependencies() {
    // this._projectService.getAllManagers().subscribe((data: Array<UsersModel>) => {
    //   this.managers = data;
    // });

    // this._projectService.getAll().subscribe((data: Array<ProjectsModel>) => {
    //   this.projects = data;
    // });

    this._taskService.getAllParentTasks().subscribe((data: Array<TasksModel>) => {
      console.log(data);
      this.parentTasks = data;
    });
  }

  openModal(id: string) {
    this._modalService.open(id);
  }

  closeModal(id: string) {
    this._modalService.close(id);
  }

  get f() { return this.taskForm.controls; }

  resetForm() {
    this.taskForm.reset();
    this.submitted = false;
    this.priority = 0;
    this.taskForm.controls['priority'].setValue(0);
    this.isEditMode = false;
    this.resetLabels();
  }

  // setSelectedManager(m: UsersModel) {
  //   this.setControlValue('managerId', m.UserId);
  //   this.setControlValue('managerName', m.FirstName + ' ' + m.LastName);
  // }
 public  onChange(event:any):void
 {
  this.setControlValue('parentTaskId', event.target.value);
  this.setControlValue('parentTaskName', event.target.options[event.target.options.selectedIndex].text);
// alert(event.target.value);
// //alert(event.target.text);
// alert(event.target.options[event.target.options.selectedIndex].text);
 }
  // setSelectedParentTask(m: TasksModel) {
  //   this.setControlValue('parentTaskId', m.ParentTaskId);
  //   this.setControlValue('parentTaskName', m.ParentTaskName);
  // }

  // setSelectedProject(m: ProjectsModel) {
  //   this.setControlValue('projectId', m.ProjectId);
  //   this.setControlValue('projectName', m.ProjectName);
  // }

  setControlValue(controlName: string, value: any) {
    this.taskForm.controls[controlName].setValue(value);
  }

  onParentTaskSelected(e) {
    this.isParentTask = e.target.checked;
    const controlNames: string[] = ['priority', 'startDate', 'endDate'];

    let index = 0;
    if (this.isParentTask) {
      for (index = 0; index < controlNames.length; index++) {
        this.disableControl(controlNames[index]);
      }
    } else {
      for (index = 0; index < controlNames.length; index++) {
        this.enableControl(controlNames[index]);
      }
    }
  }

  displayPageMessage(alertType: string, message: string) {
    this.pageMessage = message;
    this.showAlert = true;
    this.alertType = (alertType === AppSettings.AlertDanger)
      ? AppSettings.AlertDangerClass
      : AppSettings.AlertSuccessClass;
  }

  enableControl(controlName: string) {
    this.taskForm.controls[controlName].enable();
  }

  disableControl(controlName: string) {
    this.taskForm.controls[controlName].disable();
  }

  getTaskById(id: number) {
    this.isEditMode = true;
    this._taskService.getById(id).subscribe((p) => {
      this.addButtonTitle = 'Update';
      this.pageTitle = 'Manage Task - ' + p.TaskName;
      this.project = p;
      this.patchModel(p);
      this.priority = p.Priority;
      this.setStartAndEndDate(p.StartDate, p.EndDate);
    });
  }

  

  setStartAndEndDate(start: Date, end: Date) {
    const formattedTodayDate = this._datePipe.transform(start, AppSettings.IsoDateFormat).toString();
    const formattedTomorrowDate = this._datePipe.transform(end, AppSettings.IsoDateFormat).toString();
    this.taskForm.patchValue({ startDate: formattedTodayDate, endDate: formattedTomorrowDate });
  }

  patchModel(t: TasksModel) {
    this.taskForm.patchValue({
      taskId: t.TaskId,
      taskName: t.TaskName,
      // projectId: t.ProjectId,
      // projectName: t.ProjectName,
      isParentTask: (t.StartDate == null),
      priority: t.Priority,
      parentTaskId: t.ParentTaskId,
      parentTaskName: t.ParentTaskName,
      startDate: t.StartDate,
      endDate: t.EndDate,
      // managerId: t.ManagerId,
      // managerName: t.ManagerName
    });
  }

  onSubmit() {
    this.submitted = true;
    const sd = Date.parse(this.taskForm.value.startDate);
    const ed = Date.parse(this.taskForm.value.endDate);
    if (ed <= sd) {
      this.displayPageMessage(AppSettings.AlertDanger, 'End date should be greater than start date');
      return;
    }

    if (this.taskForm.invalid) {      
      return;
    }

    this._taskService.createOrUpdateTask(this.taskForm.value)
      .subscribe((data) => {
        this._router.navigate(['/view-tasks']);
      },
        (exception) => {

          this.displayPageMessage(AppSettings.AlertDanger, AppSettings.GenericError);
          this._logSerice.LogError(exception);
        });
  }
}
