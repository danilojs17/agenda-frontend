import React, { FC } from 'react'
import { ICont, IStatusCont } from '@interface/components/cont/Cont'
import Countdown from 'react-countdown'

const Cont: FC<ICont> = (props) => {
  const renderer = ({ hours, minutes, seconds, completed }: IStatusCont) => {
    if (completed) {
      props.handlerTime(!props.status)
      return <>Ya {props.status ? 'Cerramos' : 'Abrimos'}</>
    } else {
      return <span className='text-[28px]'>{hours}:{minutes}:{seconds}</span>
    }
  }

  const today = new Date()
  const tomorrow = new Date(today)
  const day = props.status ? 0 : 1
  tomorrow.setDate(today.getDate() + day)
  tomorrow.setHours(props.status ? 17 : 9, 0, 0, 0)

  return (
    <Countdown
      date={props.time}
      renderer={renderer}
    />
  )
}

export default Cont
