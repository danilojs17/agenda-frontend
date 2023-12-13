import React, { FC } from 'react'
import Axios, { AxiosInstance } from 'axios'
import AxiosContext from './AxiosContext'
import { IAxiosState } from '@interface/context/axios/Axios'

const AxiosState: FC<IAxiosState> = (props) => {
  const baseURL = process.env.NEXT_URL_API ?? '172.0.0.1:3001'

  const axios: AxiosInstance = Axios.create({
    baseURL,
    timeout: 6000
  })
  return (
    <AxiosContext.Provider value={axios}>
      {props.children}
    </AxiosContext.Provider>
  )
}

export default AxiosState
