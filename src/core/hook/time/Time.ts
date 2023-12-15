import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type Time = {
  openSystem: boolean;
  setOpenSystem: Dispatch<SetStateAction<boolean>>;
  time: number;
}

export const useTimeTemp = (): Time => {
  const [showTime, setShowTime] = useState(false)

  const today = new Date()
  const tomorrow = new Date(today)
  const day = showTime ? 0 : 1
  tomorrow.setDate(today.getDate() + day)
  tomorrow.setHours(showTime ? 17 : 9, 0)

  useEffect(() => {
    const hourCurrent = new Date().getHours()

    if (hourCurrent >= 9 && hourCurrent < 17) setShowTime(true)
  }, [])

  return { openSystem: showTime, setOpenSystem: setShowTime, time: tomorrow.getTime() }
}
