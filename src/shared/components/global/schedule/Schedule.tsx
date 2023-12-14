import { ISchedule } from '@interface/components/schedule/Schedule'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import React, { FC } from 'react'
import Cont from '../cont/Cont'

const Schedule: FC<ISchedule> = (props) => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Card className="py-4 w-92 h-80 flex items-between">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Lo sentimos, no estamos en horario de atención</p>
        </CardHeader>
        <CardBody className="overflow-visible flex h-full items-center justify-center py-2">
          <small className="text-default-500">
          Nuestro horario de atencion es de: 9:00 a 17:00
          </small>
          Abrimos en:
          <Cont {...props}/>
        </CardBody>
      </Card>
    </section>
  )
}

export default Schedule
