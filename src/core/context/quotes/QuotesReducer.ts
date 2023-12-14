import { IQuoteState, IResQuote } from '@interface/context/quotes/Quotes'

type CreateQuoteOption = IResQuote & {
  day: string;
}

type Action = { type: 'READ_QUOTE'; payload: CreateQuoteOption; }
| { type: 'CREATE_QUOTE'; payload: IResQuote; }
| { type: 'DELETE_QUOTE'; payload: IResQuote; }
| { type: 'LOADING'; payload: boolean; }
| { type: 'ERROR'; payload: boolean; }

const QuoteReducer = (state: IQuoteState, action: Action) => {
  const { type, payload } = action

  const optionReducer: Record<string, (state: IQuoteState, payload: any) => IQuoteState> = {
    READ_QUOTE: (state: IQuoteState, payload: CreateQuoteOption): IQuoteState => {
      return {
        ...state,
        ...payload,
        status: true
      }
    },
    CREATE_QUOTE: (state: IQuoteState, payload: IResQuote): IQuoteState => {
      return {
        ...state,
        ...payload,
        status: true
      }
    },
    DELETE_QUOTE: (state: IQuoteState, payload: IResQuote): IQuoteState => {
      return {
        ...state,
        ...payload,
        status: true
      }
    },
    LOADING: (state: IQuoteState, payload: boolean): IQuoteState => {
      return {
        ...state,
        status: true,
        loading: payload
      }
    },
    ERROR: (state: IQuoteState, payload: boolean): IQuoteState => {
      return {
        ...state,
        error: payload
      }
    }
  }

  const optionType = optionReducer[type]

  if (optionType) {
    return optionType(state, payload)
  }

  return state
}
export default QuoteReducer
