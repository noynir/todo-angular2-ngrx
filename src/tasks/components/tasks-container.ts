import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/do';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {Task} from '../task';
import {Store} from "@ngrx/store";
import {TaskActions} from "../task-actions";
import {AppState} from "../task-reducer";


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
          [filter]="filter$ | async"
          [tasks]="tasks$ | async"
          (remove)="deleteTask($event)"
          (update)="updateTask($event.task, $event.changes)"></task-list>
      </div>
    </div>
  `
})

export class TasksContainerComponent implements OnInit{
  filter$: Observable<string>;
  tasks$:Observable<Task[]>

  constructor(public route: ActivatedRoute,
              public store$:Store<AppState>,
              private actions: TaskActions) {

    // this.filter$ = empty();
    this.filter$ = this.route.params
        .pluck<string>('filter');
    this.tasks$ = this.store$.select((state)=> state.tasks);

  }

  ngOnInit(){
    // this.filter$ = this.route.params
    //     .pluck<string>('filter');
  }
  createTask(title: string){
    this.store$.dispatch(
      this.actions.createTask(new Task(title)));
  }

  deleteTask(task: Task): void {
    this.store$.dispatch(
      this.actions.deleteTask(task.id));
  }

  updateTask(task: Task, changes: any): void {
    this.store$.dispatch(this.actions.updateTask(task.id, changes));
  }


}
