import { Action } from '@ngrx/store';
import { Task } from './task';


export class TaskActions {
  static CREATE_TASK = 'CREATE_TASK';

  static DELETE_TASK = 'DELETE_TASK';

  static UPDATE_TASK = 'UPDATE_TASK';



  //===================================
  //  CREATE
  //-----------------------------------

  createTask(task: Task): Action {
    return {
      type: TaskActions.CREATE_TASK,
      payload: {
        task
      }
    };
  }




  //===================================
  //  DELETE
  //-----------------------------------

  deleteTask(taskId: string): Action {
    return {
      type: TaskActions.DELETE_TASK,
      payload: {
        taskId
      }
    };
  }


  //===================================
  //  FETCH
  //-----------------------------------



  //===================================
  //  UPDATE
  //-----------------------------------

  updateTask(taskId: string, changes: any): Action {
    return {
      type: TaskActions.UPDATE_TASK,
      payload: {
        changes,
        taskId
      }
    };
  }
}



