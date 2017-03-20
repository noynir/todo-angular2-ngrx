import { Action } from '@ngrx/store';
import { Task } from './task';


export class TaskActions {
  static CREATE_TASK = 'CREATE_TASK';
  static CREATE_TASK_COMPLETED = 'CREATE_TASK_COMPLETED';
  static CREATE_TASK_FAIL = 'CREATE_TASK_FAIL';

  static DELETE_TASK = 'DELETE_TASK';
  static DELETE_TASK_COMPLETED = 'DELETE_TASK_COMPLETED';
  static DELETE_TASK_FAIL = 'DELETE_TASK_FAIL';

  static UPDATE_TASK = 'UPDATE_TASK';
  static UPDATE_TASK_COMPLETED = 'UPDATE_TASK_COMPLETED';
  static UPDATE_TASK_FAIL = 'UPDATE_TASK_DELETED';

  static FETCH_TASKS = 'FETCH_TASKS';
  static FETCH_TASKS_COMPLETED = 'FETCH_TASKS_COMPLETED';
  static FETCH_TASKS_FAIL = 'FETCH_TASKS_DELETED';



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
  createTaskCompleted(task: Task): Action {
      return {
        type: TaskActions.CREATE_TASK_COMPLETED,
        payload: {
          task
        }
      };
    }
    createTaskFail(error: any): Action {
      return {
        type: TaskActions.CREATE_TASK_FAIL,
        payload: {
          error
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
  deleteTaskFail(error: any): Action {
      return {
        type: TaskActions.DELETE_TASK_FAIL,
        payload: {
          error
        }
      };
  }
  deleteTaskCompleted(task: Task): Action {
      return {
        type: TaskActions.DELETE_TASK_COMPLETED,
        payload: {
          task
        }
      };
    }


  //===================================
  //  FETCH
  //-----------------------------------

    fetchTasks(): Action {
      return {
        type: TaskActions.FETCH_TASKS,
      }
    };
    fetchTaskFail(error: any): Action {
      return {
        type: TaskActions.FETCH_TASKS_FAIL,
        payload: {
          error
        }
      }
    };

    fetchTaskCompleted(tasks: Task[]): Action {

      return {
        type: TaskActions.FETCH_TASKS_COMPLETED,
        payload: {
          tasks
        }

      };
    }


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
  updateTaskCompleted(task: Task): Action {
    return {
      type: TaskActions.UPDATE_TASK_COMPLETED,
      payload: {
        task
      }
    };
  }
  updateTaskFail(error: any): Action {
    return {
      type: TaskActions.UPDATE_TASK_FAIL,
      payload: {
        error
      }
    };
  }

}



