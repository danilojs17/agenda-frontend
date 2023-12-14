import { IQuoteContext, IQuoteState } from '@interface/context/quotes/Quotes'
import { createContext } from 'react'

export const initialState: IQuoteState = {
  scheduledAppoinments: [],
  availableSpaces: [],
  timeAvailable: '',
  day: undefined,
  loading: false,
  status: false,
  error: false
}

export const QuoteContext = createContext<IQuoteContext>({
  readQuotes: async () => {},
  createQuotes: async () => {},
  deleteQuotes: async () => {},
  state: initialState
})
