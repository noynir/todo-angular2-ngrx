import { Action, ActionReducer } from '@ngrx/store';
import { Task } from './task';
import { TaskActions } from './task-actions';


export interface AppState{
  tasks:Task[]
}

const initialState:AppState = {
  tasks:[]
};


export const taskReducer = (state: AppState = initialState, action: Action):AppState => {
  switch (action.type) {
    case TaskActions.CREATE_TASK_COMPLETED:
      return Object.assign({},state,{tasks:[ ...(state.tasks), action.payload.task]});
    case TaskActions.DELETE_TASK_COMPLETED:
      return Object.assign({},state,{tasks:state.tasks.filter((task: Task) => task.id != action.payload.task.id)});
    case TaskActions.UPDATE_TASK_COMPLETED:
      return Object.assign({},state,{tasks:state.tasks.map((task: Task) => task.id == action.payload.task.id ? Object.assign({},task,action.payload.task): task)});
    case TaskActions.FETCH_TASKS_COMPLETED:
      return Object.assign({},state,{tasks:action.payload.tasks || []});
    default:
      return state;
  }
};
