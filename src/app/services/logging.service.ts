import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { ErrorsModel } from '../taskmodels/Errors';
import { AppSettings } from '../taskmodels/AppSettings';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(private httpClient: HttpClient) { }

  LogInfo(message: any) {
    const error = new ErrorsModel();
    error.LogType = 'Info';
    error.Message = JSON.stringify(message);
    this.InnerLogging(error);
  }

  LogError(message: any) {
    const error = new ErrorsModel();
    error.LogType = 'Info';
    error.Message = JSON.stringify(message);
    this.InnerLogging(error);
  }

  private InnerLogging(error: ErrorsModel) {
    return this.httpClient.post(AppSettings.LoggingUrl, error);
  }
}
