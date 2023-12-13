import { Key, useCallback, useContext, useMemo, useState } from 'react'
import { Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from '@nextui-org/react'
import ModalTodo from '@components/global/modal/Modal'
import Spinner from '@components/global/spinner/Spinner'
import { IQuote, IQuoteContext } from '@interface/context/quotes/Quotes'
import { QuoteContext } from '@context/quotes/QuotesContext'

export default function IndexPage () {
  const { readQuotes, state } = useContext<IQuoteContext>(QuoteContext)
  const [selectedDay, setSelectedDay] = useState<string>('Seleccionar un dia')

  const quotes = useMemo<Array<IQuote>>(() => state.list, [state.list])

  const days = useMemo<Array<string>>(() => [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes'
  ], [])

  const handlerDay = useCallback((day: Set<Key>) => {
    const daySelection = Array.from(day).join(', ').replaceAll('_', ' ')
    setSelectedDay(daySelection)
    readQuotes(daySelection)
  }, [readQuotes])

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Spinner open={state.loading} />
      <Card>
        <CardBody>
          <p>Selecciona un dia para consultar la agenda.</p>
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="bordered"
                className="capitalize"
              >
                {selectedDay}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={new Set([selectedDay])}
              onSelectionChange={(e) => handlerDay(e as Set<Key>)}
            >
              {
                days.map((day) => (
                  <DropdownItem key={day.toLowerCase()}>{day}</DropdownItem>
                ))
              }
            </DropdownMenu>
          </Dropdown>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <p>Make beautiful websites regardless of your design experience.</p>
          {
            quotes.map((quote) => (
              <span>{quote.Hour} {quote.Duration}</span>
            ))
          }
        </CardBody>
      </Card>
      {/* <ModalTodo
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        defaultValue={{ ...dataTodo }}
        onAction={(data) => handlerData(data)}
      /> */}
    </section>
  )
}
