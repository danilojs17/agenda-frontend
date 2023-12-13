import React, { FC, useCallback, useContext, useReducer } from 'react'
import { QuoteContext, initialState } from './QuotesContext'
import { Children } from '@interface/children'
import AxiosContext from '@context/axios/AxiosContext'
import showToast from '@components/global/toast/Toast'
import { IQuoteContext } from '@interface/context/quotes/Quotes'
import { ERROR, LOADING, READ_QUOTE } from '@constant/type'
import QuoteReducer from './QuotesReducer'

const QuoteState: FC<Children> = (props) => {
  const axios = useContext(AxiosContext)
  const [state, dispatch] = useReducer(QuoteReducer, initialState)

  const readQuotes = useCallback(async (day: string): Promise<void> => {
    dispatch({ type: LOADING, payload: true })
    await axios
      .get(`quotes/${day}`)
      .then(({ data }) => {
        dispatch({ type: READ_QUOTE, payload: data })
      })
      .catch((err) => {
        setTimeout(() => dispatch({ type: ERROR, payload: false }), 2000)
        showToast('error', err.message)
      })
      .finally(() => {
        setTimeout(() => dispatch({ type: LOADING, payload: false }), 2000)
      })
  }, [axios])

  // const createToDo = useCallback(async ({ title, description, ...data }: IBodyToDo): Promise<void> => {
  //   dispatch({ type: LOADING, payload: true })
  //   await axios
  //     .post('todos/add', data)
  //     .then((result) => {
  //       dispatch({ type: ADD_TODO, payload: { ...result.data, description, title } })
  //       showToast('success', 'Tarea creada con exito.')
  //     })
  //     .catch((err) => {
  //       dispatch({ type: ERROR, payload: err.message })
  //       showToast('error', err.message)
  //     })
  //     .finally(() => {
  //       setTimeout(() => dispatch({ type: LOADING, payload: false }), 2000)
  //     })
  // }, [axios])

  // const updateToDo = useCallback(async ({ id, status, description, title }: IBodyToDo): Promise<void> => {
  //   dispatch({ type: LOADING, payload: true })
  //   await axios
  //     .put(`todos/${+id}`, { completed: Boolean(+status) })
  //     .then((result) => {
  //       dispatch({ type: UPDATE_TODO, payload: { ...result.data, status: result.data.completed, id, description, title } })
  //       showToast('success', 'Tarea actualizada con exito.')
  //     })
  //     .catch((err) => {
  //       dispatch({ type: ERROR, payload: err.message })
  //       showToast('error', err.message)
  //     })
  //     .finally(() => {
  //       setTimeout(() => dispatch({ type: LOADING, payload: false }), 2000)
  //     })
  // }, [axios])

  // const deleteToDo = useCallback(async (todoId: string): Promise<void> => {
  //   dispatch({ type: LOADING, payload: true })
  //   await axios
  //     .delete(`todos/${todoId}`)
  //     .then((result) => {
  //       dispatch({ type: DELETE_TODO, payload: result.data.id })
  //       showToast('success', 'Tarea eliminada con exito.')
  //     })
  //     .catch((err) => {
  //       dispatch({ type: ERROR, payload: err.message })
  //       showToast('error', err.message)
  //     })
  //     .finally(() => {
  //       setTimeout(() => dispatch({ type: LOADING, payload: false }), 2000)
  //     })
  // }, [axios])

  const value: IQuoteContext = {
    state,
    readQuotes
  }

  return (
    <QuoteContext.Provider value={value}>
      {props.children}
    </QuoteContext.Provider>
  )
}

export default QuoteState
