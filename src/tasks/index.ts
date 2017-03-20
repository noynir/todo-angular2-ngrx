import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from 'src/shared';
import { TaskFormComponent } from './components/task-form';
import { TaskItemComponent } from './components/task-item';
import { TaskListComponent } from './components/task-list';
import {TasksContainerComponent} from './components/tasks-container';
import { AutoFocusDirective } from './directives/autofocus-directive';
import { TaskListFilterPipe } from './pipes/task-list-filter-pipe';
import { Task } from './task';


const routes: Routes = [
  {path: 'tasks', component: TasksContainerComponent}
];


@NgModule({
  declarations: [
    AutoFocusDirective,
    TaskFormComponent,
    TaskItemComponent,
    TaskListComponent,
    TaskListFilterPipe,
    TasksContainerComponent
  ],
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: []
})

export class TasksModule {}

export { Task};
