import React, { FC } from 'react'
import Axios, { AxiosInstance } from 'axios'
import AxiosContext from './AxiosContext'
import { IAxiosState } from '@interface/context/axios/Axios'

const AxiosState: FC<IAxiosState> = (props) => {
  const axios: AxiosInstance = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 6000
  })

  return (
    <AxiosContext.Provider value={axios}>
      {props.children}
    </AxiosContext.Provider>
  )
}

export default AxiosState
