import 'rxjs/add/operator/pluck';


import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {Task} from "../task";



@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tasks',
  template: `
    <div class="g-row">
      <div class="g-col">
        <task-form (createTask)="createTask($event)"></task-form>
      </div>

      <div class="g-col">
        <task-list 
          [filter]="filter$ "
          [tasks]="tasks$ | async"
          (remove)="deleteTask($event)"
          (update)="updateTask($event.task, $event.changes)"></task-list>
      </div>
    </div>
  `
})

export class TasksContainerComponent {
  filter$: Observable<string>;

  tasks$:Observable<Task[]>;

  constructor(public route: ActivatedRoute) {
    this.filter$ = route.params
      .pluck<string>('filter');

    //This tasks Observable should come from the store service.
    this.tasks$ = Observable.of([new Task('Create Actions'),
      new Task('Create Reducer'),
      new Task('Dispatch Actions')
    ]);
  }

  createTask(value){
    alert('Implement an action=>reducer for creating tasks');
  }

  deleteTask(value){
    alert('Implement an action=>reducer for deleting tasks');
  }

  updateTask(value){
    alert('Implement an action=>reducer for updating tasks');
  }
}
