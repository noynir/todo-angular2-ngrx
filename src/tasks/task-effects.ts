import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';


import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ApiService } from 'src/shared';
import { TaskActions } from './task-actions';

@Injectable()
export class    TaskEffects {
    constructor(
        private actions$: Actions,
        private api: ApiService,
        private store$: Store<any>,
        private taskActions: TaskActions
    ) {}


    @Effect()
    createTask$ = this.actions$
        .ofType(TaskActions.CREATE_TASK)
        .switchMap(({payload}) => this.api.createTask(payload.task)
            .map(task => this.taskActions.createTaskCompleted(task))
            .catch(error => Observable.of(this.taskActions.createTaskFail(error)))
        );

    @Effect()
    deleteTask$ = this.actions$
        .ofType(TaskActions.DELETE_TASK)
        .switchMap(({payload}) => this.api.deleteTask(payload.taskId)
            .map(task => this.taskActions.deleteTaskCompleted(task))
            .catch(error => Observable.of(this.taskActions.deleteTaskFail(error)))
        );

    @Effect()
    fetchTasks$ = this.actions$
        .ofType(TaskActions.FETCH_TASKS)
        .startWith(this.taskActions.fetchTasks())
        .do((action)=>console.log(action))
        .switchMap(() => this.api.fetchTasks()
            .do(tasks=>console.log(tasks))
            .map(task => this.taskActions.fetchTaskCompleted(task))
            .catch(error => Observable.of(this.taskActions.createTaskFail(error)))
        );

    @Effect()
    updateTask$ = this.actions$
        .ofType(TaskActions.UPDATE_TASK)
        .do(action=>console.log(action))
        .switchMap(({payload}) => this.api.updateTask(payload.taskId, payload.changes)
            .map(task => this.taskActions.updateTaskCompleted(task))
            .catch(error => Observable.of(this.taskActions.updateTaskFail(error)))
        );
}
