import { NgModule } from '@angular/core';
import { Routes,  RouterModule } from '@angular/router';

import { AddTaskComponentComponent } from './add-task-component/add-task-component.component';
import { ViewTaskComponentComponent } from './view-task-component/view-task-component.component';

export const routes: Routes = [
  { 'path': '', redirectTo: 'projects/0', pathMatch: 'full' },
  { 'path': 'tasks/:id', component: AddTaskComponentComponent },
  { 'path': 'view-tasks', component: ViewTaskComponentComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
