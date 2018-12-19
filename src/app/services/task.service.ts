import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TasksModel } from '../taskmodels/Tasks';
import { AppSettings } from '../taskmodels/AppSettings';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private httpClient: HttpClient) { }

  createOrUpdateTask(task: TasksModel) {
    alert('Services Reached');
    alert(task);
console.log(task);

    return this.httpClient.post(AppSettings.TasksUrl, task);
  }

  completeTask(task: TasksModel) {
    return this.httpClient.post(AppSettings.TasksUrl + '/complete', task);
  }

  getAllParentTasks() {
    return this.httpClient.get<TasksModel[]>(AppSettings.TasksUrl + '/parent-tasks');
  }

  getById(id: number) {
    return this.httpClient.get<TasksModel>(AppSettings.TasksUrl + '/' + id);
  }

  getAll() {
    return this.httpClient.get<TasksModel[]>(AppSettings.TasksUrl);
  }
}
