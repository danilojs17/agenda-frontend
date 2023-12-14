import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type Time = {
  showTime: boolean;
  setShowTime: Dispatch<SetStateAction<boolean>>;
  time: number;
}

export const useTimeTemp = (): Time => {
  const [showTime, setShowTime] = useState(false)

  const today = new Date()
  const tomorrow = new Date(today)
  const day = showTime ? 0 : 1
  tomorrow.setDate(today.getDate() + day)
  tomorrow.setHours(showTime ? 18 : 9, 15, 0, 0)

  useEffect(() => {
    const hourCurrent = new Date().getHours()

    if (hourCurrent > 9 && hourCurrent < 18) setShowTime(true)
  }, [])

  return { showTime, setShowTime, time: tomorrow.getTime() }
}
