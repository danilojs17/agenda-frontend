export interface IQuote {
  Day: string;
  Duration: string;
  Hour: string;
}

export type ICreateQuote = IQuote

export interface IResQuote {
  scheduledAppoinments: Array<IQuote>;
  availableSpaces: Array<IQuote>;
  timeAvailable: string;
}

export interface IQuoteState extends IResQuote {
  day?: string;
  status: boolean;
  loading: boolean;
  error: boolean;
}

export interface IHandlerQuote extends IQuote{
  option: 'program' | 'delete';
}

export interface IQuoteContext {
  state: IQuoteState;
  readQuotes: (day: string) => Promise<void>;
  createQuotes: (data: ICreateQuote) => Promise<void>;
  deleteQuotes: (quote: IQuote) => Promise<void>;
}
