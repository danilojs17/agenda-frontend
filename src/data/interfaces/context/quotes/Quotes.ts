export interface IQuote {
  Day: string;
  Duration: string;
  Hour: string;
}

export interface IQuoteState {
  list: Array<IQuote>;
  status: boolean;
  loading: boolean;
  error: boolean;
}

export interface IQuoteContext {
  state: IQuoteState;
  readQuotes: (day: string) => Promise<void>;
  // createToDo: (data: IBodyToDo) => Promise<void>;
  // updateToDo: (data: IBodyToDo) => Promise<void>;
  // deleteToDo: (data: string) => Promise<void>;
}
