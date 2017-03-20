# Reactive Angular Lab - Todo app with Angular2 and ngrx/store
A simple Todo app example featuring [ngrx/store](https://github.com/ngrx/store) — RxJS powered state management inspired by Redux for Angular2 apps.


Stack
-----
- Angular 2
- [ngrx/store](https://github.com/ngrx/store)
- [ngrx/effects](https://github.com/ngrx/effects)
- [ngrx/store-devtools](https://github.com/ngrx/store-devtools)
- RxJS
- SASS
- Typescript 2
- Webpack 2 
- node.js server running [express](https://expressjs.com/) with [lowdb](https://github.com/typicode/lowdb)


Getting Started
---------------

#### Recommended
- `node >= 6`

#### Quick Start
```shell
$ git clone https://github.com/noynir/todo-angular2-ngrx.git
$ cd todo-angular2-ngrx
$ npm install
$ npm start
```

#### Solutions

All solutions for the following 2 step lab are under seperate branches in this repo:
- [step1_solution](https://github.com/noynir/todo-angular2-ngrx/tree/step1_solution)
```shell
$ git checkout step1_solution
```
 - [step2_solution](https://github.com/noynir/todo-angular2-ngrx/tree/step2_solution)
 ```shell
 $ git checkout step2_solution
 ```

Usage
-----

|Script|Description|
|---|---|
|`npm start`|Start webpack development server @ `localhost:3000` and api server @ `localhost:3001`|
|`npm run build`|Lint, test, and build the application to `./target`|
|`npm run lint`|Lint `.ts` and `.js` files|
|`npm run lint:js`|Lint `.js` files with eslint|
|`npm run lint:ts`|Lint `.ts` files with tslint|
|`npm test`|Run unit tests with Karma and Jasmine|
|`npm run test:watch`|Run unit tests with Karma and Jasmine; watch for changes to re-run tests|


Step 1 - Working Locally
-------
In this step will add hook up this ToDo application's components 
To the ngrx/store by creating a state,recucers and actions.

1.  so first let's setup the tasks state:
    * create a file named tasks-reducer inside the tasks folder
    ```
        src
        |___app
            |___tasks
                |   task-reducer.ts
    ```
2. inside tasks-reducer file create an interface and intial state to define the state strcuture.
    ```typescript
        export interface AppState{
          tasks:Task[]
        }
        const initialState:AppState = {
          tasks:[]
        };
    ```
3.   create  a tasks-action file and create 3 types of actions 
        *   Create Task
        *   Update Task
        *   Delete Task
            ```
                src
                |___app
                    |___tasks
                        |   task-actions.ts
            ```
    
4.  now we go back the tasks-reducer and implement a reducer function,
        a reducer function receives state and an action, and returns a new state and if it doesn't do anything then it should return the same state
       ```typescript
        export const taskReducer = (state: AppState = initialState, action: Action):AppState => {
          switch (action.type) {
            // your implentation goes here
            default:
              return state;
          }
        };
       
       ```
5. now that we have a reducer all setup, we to setup the store in our app.module.
    the app module is inside the the app folder inside the index.ts file.
    add the following line to the app.module imports.
     ```typescript
        StoreModule.provideStore(taskReducer)
     ```
6.  now we need to dispatch the right actions from the tasks-container component.
    * don't forget to inject the store service into the component.
    * implement the following 3 methods inside the component
  ```typescript

    createTask(title: string){
      this.store$.dispatch(//Create action);
    }
  
    deleteTask(task: Task): void {
      this.store$.dispatch(//delete action);
    }
  
    updateTask(task: Task, changes: any): void {
      this.store$.dispatch(//Update action);
    }
  
  ```
7. inside the component constructor set the tasks$ observable to select the tasks state slice.
  
  Step2 - Real World - Adding Effects
  --------------
  In this step we will add ngrx/effects to handle the async action we are making to fetch, create, update, delete tasks.
  
  1.  so first we need to add a few actions, because we have async actions every action will have a start and an end action
      so basically we need to add to every action we created another action for the completed state. for instance we will now have a 
      create_action and create_action_completed action.
  2.  becuase now we are also fetching the tasks from the server 
      we also need 2 new actions for fetch_action and fetch_action_completed.
  2.  now let's setup the tasks effects:
      * create a file named tasks-effects inside the tasks folder
      ```
          src
          |___app
              |___tasks
                  |   task-effects.ts
      ```
      * create a TasksEffects Service and create an Observable for every action.
        * to create the calls to the server inject the ApiService and use it's create,update,delete,get methods,
            have a look at the file under:
            ```
                  src
                  |___app
                      |___shared
                          |_____services
                                |   api-service.ts
            ```
        * implement 4 effects for every action each effect will end up with the matching completed action.
      ```typescript

      @Injectable()
      export class    TaskEffects {
          constructor(
              private actions$: Actions,
              private api: ApiService,
              private store$: Store<any>,
          ) {}
      
      
          @Effect()
          createTask$ = this.actions$
              .ofType(//Create_Action)
              .switchMap(//api calls here)
              .map(//Create_Action_completed here)
      
          @Effect()
          deleteTask$ = this.actions$
              .ofType(//delete_Action)
              .switchMap(//api calls here)
              .map(//delete_Action_completed here)
      
          @Effect()
          fetchTasks$ = this.actions$
              .ofType(//fetch_Action)
              .switchMap(//api calls here)
               .map(//fetch_Action_completed here)
      
          @Effect()
          updateTask$ = this.actions$
              .ofType(//update_Action)
              .switchMap(//api calls here)
              .map(//update_Action_completed here)
      ```
      * in your reducer you need to:
        * add a handle to the fetch_action_completed
        * change all cases to handle the *_action_completed
    

    

