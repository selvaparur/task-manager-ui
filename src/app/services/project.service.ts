import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ProjectsModel } from '../taskmodels/Projects';
import { AppSettings } from '../taskmodels/AppSettings';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  constructor(private httpClient: HttpClient, private _userService: UserService) { }

  getAll() {
    return this.httpClient.get<ProjectsModel[]>(AppSettings.ProjectsUrl);
  }

  getById(id: number) {
    return this.httpClient.get<ProjectsModel>(AppSettings.ProjectsUrl + '/' + id);
  }

  delete(id: number) {
    const deleteUrl = AppSettings.ProjectsUrl + '/delete/' + id;
    return this.httpClient.post<any>(deleteUrl, {});
  }

  createOrUpdateProject(project) {
    return this.httpClient.post(AppSettings.ProjectsUrl, project);
  }

  getAllManagers() {
    return this._userService.getUsers();
  }
}
