import { Key, useCallback, useContext, useMemo, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from '@nextui-org/react'
import Spinner from '@components/global/spinner/Spinner'
import { IHandlerQuote, IQuote, IQuoteContext, IQuoteState } from '@interface/context/quotes/Quotes'
import { QuoteContext } from '@context/quotes/QuotesContext'
import ModalQuote from '@components/global/modal/Modal'
import showToast from '@components/global/toast/Toast'
import { DeleteIcon, PlusIcon } from '@components/global/icons/icons'
import Schedule from '@components/global/schedule/Schedule'
import { useTimeTemp } from '../core/hook/time/Time'
import Cont from '@components/global/cont/Cont'

export default function IndexPage () {
  const { readQuotes, state, createQuotes, deleteQuotes } = useContext<IQuoteContext>(QuoteContext)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { setOpenSystem, openSystem, time } = useTimeTemp()
  const initialState = useMemo<IHandlerQuote>(() => {
    return {
      option: 'program',
      Day: '',
      Duration: '',
      Hour: ''
    }
  }, [])
  const [option, setOption] = useState<IHandlerQuote>(initialState)

  const quotes = useMemo<IQuoteState>(() => state, [state])

  const days = useMemo<Array<string>>(() => [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes'
  ], [])

  const handlerDay = useCallback(async (day: Set<Key>) => {
    const daySelection = Array.from(day).join(', ').replaceAll('_', ' ')
    readQuotes(daySelection)
    setOption({ ...option, Day: daySelection })
  }, [option, readQuotes])

  const handlerData = useCallback(({ option, ...data }: IHandlerQuote) => {
    const optionAvailable = {
      delete: () => deleteQuotes(data),
      program: () => createQuotes(data)
    }

    const selectOption = optionAvailable[option]
    if (!selectOption) return
    selectOption()

    setOption(initialState)
    onClose()
  }, [createQuotes, deleteQuotes, initialState, onClose])

  const deleteQuote = (quote: IQuote) => {
    setOption({ ...option, ...quote, option: 'delete' })
    onOpen()
  }

  const handlerQuote = (quote: IQuote) => {
    setOption({ ...option, ...quote, option: 'program' })
    onOpen()
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Spinner open={state.loading} />
      {
        openSystem &&
        <div className='flex gap-2 items-center'>
          <span>El sistema cierra en:</span>
          <Cont
            handlerTime={setOpenSystem}
            status={openSystem}
            time={time}
          />
        </div>
      }
      {
        openSystem
          ? <>
            <Card className='min-w-[400px]'>
              <CardHeader>
                <p>Selecciona un dia para consultar la agenda.</p>
              </CardHeader>
              <CardBody className='flex flex-row justify-between'>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      className="capitalize"
                    >
                      {state.day ?? 'Seleccionar un dia'}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={new Set([state.day ?? 'Seleccionar un dia'])}
                    onSelectionChange={(e) => handlerDay(e as Set<Key>)}
                  >
                    {
                      days.map((day) => (
                        <DropdownItem key={day.toLowerCase()}>{day}</DropdownItem>
                      ))
                    }
                  </DropdownMenu>
                </Dropdown>
                {
                  state.day &&
            <Button
              onPress={() => {
                if (state.availableSpaces.length === 0) {
                  showToast('info', 'No hay espacio disponible para programar una cita.')
                  return
                }
                onOpen()
                setOption({ ...option, option: 'program' })
              }}
              className="max-w-fit"
            >
              Programar una cita
            </Button>
                }
              </CardBody>
            </Card>
            <p>Espacio disponible: {quotes.timeAvailable}</p>
            <div className='grid lg:grid-cols-2 gap-6 md:grid-cols-1'>
              <Card className="w-96">
                <CardHeader>
                  <p>Citas programadas:</p>
                </CardHeader>
                <CardBody>
                  <div className='flex flex-col gap-2'>
                    {
                      quotes.scheduledAppoinments.map((quote) => (
                        <>
                          <div className='flex justify-between'>
                            <span>Hora inicio: {quote.Hour}</span>
                            <span>Duración: {quote.Duration}</span>
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                              <DeleteIcon onClick={() => deleteQuote(quote)} />
                            </span>
                          </div>
                          <Divider />
                        </>
                      ))
                    }
                  </div>
                </CardBody>
              </Card>
              <Card className="w-96">
                <CardHeader>
                  <p>Espacios disponibles:</p>
                </CardHeader>
                <CardBody>
                  <div className='flex flex-col gap-2'>
                    {
                      quotes.availableSpaces.map((quote) => (
                        <>
                          <div className='flex justify-between'>
                            <span>Hora inicio: {quote.Hour}</span>
                            <span>Duración: {quote.Duration}</span>
                            {
                              +quote.Duration >= 30 &&
                                <span className="text-lg text-primary cursor-pointer active:opacity-50">
                                  <PlusIcon onClick={() => handlerQuote(quote)}/>
                                </span>
                            }
                          </div>
                          <Divider />
                        </>
                      ))
                    }
                  </div>
                </CardBody>
              </Card>
            </div>
          </>
          : <Schedule
            handlerTime={() => setOpenSystem(false)}
            time={time}
            status={openSystem}
          />
      }

      <ModalQuote
        onClose={() => setOption(initialState)}
        isOpen={isOpen}
        option={option.option}
        defaultValue={{ ...option, Day: state.day }}
        onOpenChange={onOpenChange}
        onAction={handlerData}
      />
    </section>
  )
}
