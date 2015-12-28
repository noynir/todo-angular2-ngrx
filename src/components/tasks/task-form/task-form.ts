import { Component } from 'angular2/core';
import { TaskActions } from 'modules/task/task-actions';

const styles: string = require('./task-form.scss');


@Component({
  selector: 'task-form',
  styles: [styles],

  template: `
    <form class="task-form" (ngSubmit)="submit()" novalidate>
      <input
        (keyup.escape)="clear()"
        ngControl="title"
        [(ngModel)]="title"
        autocomplete="off"
        autofocus
        class="task-form__input"
        placeholder="What needs to be done?"
        required
        type="text">
    </form>
  `
})

export class TaskForm {
  title: string = '';

  constructor(private actions: TaskActions) {}

  clear(): void {
    this.title = '';
  }

  submit(): void {
    const title: string = this.title.trim();
    if (title.length) {
      this.actions.createTask(title);
    }
    this.clear();
  }
}