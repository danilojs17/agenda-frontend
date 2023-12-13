import { ERROR, LOADING, READ_QUOTE } from './../../../data/constant/type'
import { IQuote, IQuoteState } from '@interface/context/quotes/Quotes'

type Action = { type: typeof READ_QUOTE; payload: Array<IQuote>; }
// | { type: 'ADD_TODO'; payload: IBodyToDo; }
// | { type: 'UPDATE_TODO'; payload: IBodyToDo; }
// | { type: 'DELETE_TODO'; payload: string; }
| { type: typeof LOADING; payload: boolean; }
| { type: typeof ERROR; payload: boolean; }

const QuoteReducer = (state: IQuoteState, action: Action) => {
  const { type, payload } = action

  const optionReducer: Record<string, (state: IQuoteState, payload: any) => IQuoteState> = {
    READ_TODO: (state: IQuoteState, payload: Array<IQuote>): IQuoteState => {
      return {
        ...state,
        status: true,
        list: payload
      }
    },
    // ADD_TODO: (state: ITodoState, payload: IBodyToDo): ITodoState => {
    //   const todos: Map<string, ITodoView> = new Map(state.todos.entries())

    //   todos.set(payload.id, payload)

    //   return {
    //     ...state,
    //     status: true,
    //     todos
    //   }
    // },
    // UPDATE_TODO: (state: ITodoState, payload: IBodyToDo): ITodoState => {
    //   const todos: Map<string, ITodoView> = new Map(state.todos.entries())

    //   todos.set(payload.id, payload)

    //   return {
    //     ...state,
    //     status: true,
    //     todos
    //   }
    // },
    // DELETE_TODO: (state: ITodoState, payload: string): ITodoState => {
    //   const todos: Map<string, ITodoView> = new Map(state.todos.entries())

    //   todos.delete(payload)

    //   return {
    //     ...state,
    //     status: true,
    //     todos
    //   }
    // },
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

  return optionReducer[type](state, payload)
}
export default QuoteReducer
