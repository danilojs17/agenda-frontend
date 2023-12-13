import { Action } from '@interface/components/table/Table'

export interface ITodo {
  id: string;
  todo: string;
  userId: number;
  completed: boolean;
}

export interface IToDoRes {
  todos: Array<ITodo>;
  limit: number;
  skip: number;
  total: number;
}

export interface ITodoView extends Omit<ITodo, 'todo' | 'completed'> {
  status: boolean | number;
  title: string;
  description: string;
}

export interface ITodoCrud extends ITodoView {
  action: Action
}

export interface ITodoState {
  status: boolean,
  error?: string,
  todos: Map<string, ITodoView>;
  limit: number;
  skip: number;
  total: number;
  loading: boolean;
}

export type IBodyToDo = ITodoView

export interface ITodoStateView extends Omit<ITodoState, 'todos'> {
  status: boolean,
  error?: string,
  todos: Array<ITodoView>;
  limit: number;
  skip: number;
  total: number;
}

export interface ITodoContext {
  todo: ITodoState;
  readToDos: () => Promise<void>;
  createToDo: (data: IBodyToDo) => Promise<void>;
  updateToDo: (data: IBodyToDo) => Promise<void>;
  deleteToDo: (data: string) => Promise<void>;
}
