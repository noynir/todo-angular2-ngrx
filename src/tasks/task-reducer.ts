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
    case TaskActions.CREATE_TASK:
      return Object.assign({},state,{tasks:[ ...(state.tasks), action.payload.task]});
    case TaskActions.DELETE_TASK:
      return Object.assign({},state,{tasks:state.tasks.filter((task: Task) => task.id != action.payload.taskId)});
    case TaskActions.UPDATE_TASK:
      return Object.assign({},state,{tasks:state.tasks.map((task: Task) => task.id == action.payload.taskId ? Object.assign({},task,action.payload.changes): task)});
    default:
      return state;
  }
};
