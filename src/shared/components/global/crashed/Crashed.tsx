import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import { ICrashed } from '@interface/components/crashed/Crashed'

const Crashed: FC<ICrashed> = (props) => {
  const router = useRouter()

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Card className="py-4 w-92 h-80 flex items-between">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Ups! 👨‍🔧</p>
        </CardHeader>
        <CardBody className="overflow-visible flex h-full items-center justify-center py-2">
          <small className="text-default-500">
          Parece que agenda manager se bloqueó inesperadamente...<br/>Hemos rastreado el error y lo solucionaremos.
          </small>
        </CardBody>
        <CardFooter className="overflow-visible flex h-full items-center justify-center py-2">
          <Button
            onClick={props.onClick}
            variant='shadow'
            color='default'
          >
          Intentar de nuevo
          </Button>
          <Button
            onClick={() => router.back()}
            variant='shadow'
            color='danger'
          >
          Volver al inicio
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}

export default Crashed
