import { ITodoStateView, ITodoView } from '@interface/context/to-do/ToDo'

export type Column = {
  name: string;
  uid: string;
  sortable?: boolean;
}

export type Action = 'create' | 'update' | 'delete'

export interface ITableTodo {
  columns: Array<Column>;
  data: ITodoStateView;
  openModal: (action: Action, data?: ITodoView) => void;
}
