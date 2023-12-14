import React, { FC, useCallback, useContext, useReducer } from 'react'
import { QuoteContext, initialState } from './QuotesContext'
import { Children } from '@interface/children'
import AxiosContext from '@context/axios/AxiosContext'
import showToast from '@components/global/toast/Toast'
import { ICreateQuote, IQuote, IQuoteContext, IResQuote } from '@interface/context/quotes/Quotes'
import { CREATE_QUOTE, DELETE_QUOTE, ERROR, LOADING, READ_QUOTE } from '@constant/type'
import QuoteReducer from './QuotesReducer'
import { AxiosInstance } from 'axios'

const QuoteState: FC<Children> = (props) => {
  const axios = useContext<AxiosInstance>(AxiosContext)
  const [state, dispatch] = useReducer(QuoteReducer, initialState)

  const readQuotes = useCallback(async (day: string): Promise<void> => {
    dispatch({ type: LOADING, payload: true })

    await axios
      .get<IResQuote>(`quotes/${day}`)
      .then(({ data }) => {
        dispatch({ type: READ_QUOTE, payload: { day, ...data } })
      })
      .catch((err) => {
        dispatch({ type: ERROR, payload: false })
        showToast('error', err.message)
      })
      .finally(() => {
        setTimeout(() => dispatch({ type: LOADING, payload: false }), 1000)
      })
  }, [axios])

  const createQuotes = useCallback(async (data: ICreateQuote): Promise<void> => {
    await axios
      .post<IResQuote>(`quotes`, data)
      .then(({ data }) => {
        dispatch({ type: CREATE_QUOTE, payload: data })
      })
      .catch((err) => {
        dispatch({ type: ERROR, payload: false })
        showToast('error', err.message)
      })
  }, [axios])

  const deleteQuotes = useCallback(async ({ Day, Hour }: IQuote): Promise<void> => {
    await axios
      .delete<IResQuote>(`quotes/${Day}/${Hour}`)
      .then(({ data }) => {
        dispatch({ type: DELETE_QUOTE, payload: data })
      })
      .catch((err) => {
        dispatch({ type: ERROR, payload: false })
        showToast('error', err.message)
      })
  }, [axios])

  const value: IQuoteContext = {
    state,
    readQuotes,
    createQuotes,
    deleteQuotes
  }

  return (
    <QuoteContext.Provider value={value}>
      {props.children}
    </QuoteContext.Provider>
  )
}

export default QuoteState
