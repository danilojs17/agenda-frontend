import { IQuoteContext, IQuoteState } from '@interface/context/quotes/Quotes'
import { createContext } from 'react'

export const initialState: IQuoteState = {
  list: [],
  loading: false,
  status: false,
  error: false
}

export const QuoteContext = createContext<IQuoteContext>({
  readQuotes: async () => {},
  state: initialState
})
