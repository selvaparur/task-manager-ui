import { Component, OnInit } from '@angular/core';
import { TasksModel } from '../taskmodels/Tasks';

import { ModalService } from '../services/model.service';
import { TaskService } from '../services/task.service';
import { ProjectService } from '../services/project.service';
import { ProjectsModel } from '../taskmodels/Projects';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-task-component',
  templateUrl: './view-task-component.component.html',
  styleUrls: ['./view-task-component.component.css']
})
export class ViewTaskComponentComponent implements OnInit {

  taskForm: FormGroup;
  tasks: Array<TasksModel> = [];
  projects: Array<ProjectsModel> = [];
  projectName: string;
  sortBy: string;
  searchProject: string;

  constructor(private _taskService: TaskService,
    private _projectService: ProjectService,
    private _modalService: ModalService,
    private _formBuilder: FormBuilder,
    private _router: Router) {
    this.sortBy = 'startDate';
    this.OnComponentLoad();
  }

  isCompleted(tm: TasksModel) {
    if (tm === null) { return false; }
    return (tm.Status === 'Yes');
  }

  closeModal(id: string) {
    this._modalService.close(id);
    this.loadTasks();
  }

  setSelectedProject(m: ProjectsModel) {
    this.projectName = m.ProjectName;
  }

  get f() { return this.taskForm.controls; }

  editTask(task: TasksModel) {
    this._router.navigate(['tasks/' + task.TaskId.toString()]);
  }

  public getAllProjects() {
    this._projectService.getAll().subscribe((data: Array<ProjectsModel>) => {
      this.projects = data;
    });
  }

  loadTasks() {
    this._taskService.getAll().subscribe((data: Array<TasksModel>) => {
      this.tasks = data;
    });
  }

  openModal(id: string) {
    this._modalService.open(id);
  }  

  endTask(task: TasksModel) {
    if (!confirm('This operation cannot be undone. Are you sure want to continue?')) {
      return;
    }

    this._taskService.completeTask(task).subscribe((data: Array<TasksModel>) => {
      this.tasks = data;
    });
  }
  private getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }

  OnComponentLoad() {
    this.ngOnInit();
  }

  ngOnInit() {
    this.loadTasks();
  //  this.getAllProjects();
  }

  handleSortBy(value) {
    this.sortBy = value;

    switch (this.sortBy) {
      case 'startDate':
        this.tasks = this.tasks.sort((a, b) => {
          return this.getTime(a.StartDate) - this.getTime(b.StartDate);
        });
        break;
      case 'endDate':
        this.tasks = this.tasks.sort((a, b) => {
          return this.getTime(a.EndDate) - this.getTime(b.EndDate);
        });
        break;
      case 'completed':
        this.tasks = this.tasks.sort((a, b) => a.Status.localeCompare(b.Status));
        break;
      case 'priority':
        this.tasks = this.tasks.sort((a, b) => a.Priority.toString().localeCompare(b.Priority.toString()));
        break;
      default:
        // this.tasks = this.tasks.sort((a, b) => a.ProjectName.localeCompare(b.ProjectName));
        break;
    }
  }
}
