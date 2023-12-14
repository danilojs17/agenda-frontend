import { useRouter } from 'next/router'
import React from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'

function ErrorPage () {
  const router = useRouter()

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Card className="py-4 w-92 h-80 flex items-between">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{router.asPath}</p>
        </CardHeader>
        <CardBody className="overflow-visible flex h-full items-center justify-center py-2">
          <h1>
            <strong>404</strong>
          </h1>
          <br />
          <small className="text-default-500">
          Lo sentimos, la página que estás buscando no existe.
          </small>
        </CardBody>
        <CardFooter className="overflow-visible flex h-full items-center justify-center py-2">
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

export default ErrorPage
