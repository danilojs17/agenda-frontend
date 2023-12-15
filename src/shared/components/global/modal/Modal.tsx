import React, { FC, useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, SelectItem, Select } from '@nextui-org/react'
import { IModal } from '@interface/components/modal/Modal'
import { Controller, useForm } from 'react-hook-form'
import { Portal } from '../portal/Portal'
import { IHandlerQuote, IQuote } from '@interface/context/quotes/Quotes'

const ModalQuote: FC<IModal> = (props) => {
  const { control, reset, handleSubmit, setValue } = useForm<IHandlerQuote>()

  const onSubmit = (data: IHandlerQuote) => {
    if (props.onAction) props.onAction(data)
    reset()
  }

  const options = {
    program: 'Programar',
    delete: 'Eliminar'
  }

  useEffect(() => {
    Object.entries(props.defaultValue).forEach(([key, value]) => {
      setValue(key as keyof IQuote, value)
    })
  }, [props.defaultValue, setValue])

  return (
    <Portal closeTime={200} portalOpen={props.isOpen} portalTag='#modal-portal'>
      <div className="flex flex-col gap-2">
        <Modal
          isOpen={props.isOpen}
          placement='bottom-center'
          onOpenChange={props.onOpenChange}
          backdrop='blur'
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">{`${options[props.option ?? 'Programar']}`} una cita</ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalBody>
                    {
                      props.option !== 'delete'
                        ? <>
                          <Controller
                            name='Day'
                            control={control}
                            rules={{
                              required: true
                            }}
                            render={({ field: { onChange, value } }) => (
                              <Select
                                label="Day"
                                className="w-full"
                                defaultSelectedKeys={[value]}
                                isDisabled
                              >
                                {[
                                  'Lunes',
                                  'Martes',
                                  'Miércoles',
                                  'Jueves',
                                  'Viernes'
                                ].map((day) => (
                                  <SelectItem
                                    key={day.toLowerCase()}
                                    value={day.toLowerCase()}
                                  >
                                    {day}
                                  </SelectItem>
                                ))}
                              </Select>
                            )
                            }
                          />
                          <Controller
                            name='Hour'
                            defaultValue={''}
                            control={control}
                            rules={{
                              validate: {
                                dateRange: (value) => {
                                  if (+value.split(':')[0] < 9) return false
                                  if (+value.split(':')[0] > 17) return false

                                  return true
                                }
                              }
                            }}
                            render={({ field: { onChange, value }, fieldState: { invalid } }) => (
                              <Input
                                isRequired
                                type='time'
                                label="Hour"
                                labelPlacement="inside"
                                onChange={onChange}
                                defaultValue={value}
                                className="w-full"
                                errorMessage={invalid ? 'El horario de atención es de 9:00 a 17:00' : ''}
                              />
                            )}
                          />
                          <Controller
                            name='Duration'
                            defaultValue={''}
                            control={control}
                            rules={{
                              required: true,
                              max: 90,
                              min: 30
                            }}
                            render={({ field: { onChange, value }, fieldState: { invalid } }) => (
                              <Input
                                isRequired
                                type="number"
                                label="Duration"
                                labelPlacement="inside"
                                onChange={onChange}
                                defaultValue={value}
                                className="w-full"
                                errorMessage={invalid ? 'La duracion de la cita debe ser entre 30 y 90 minutos.' : ''}
                              />
                            )
                            }
                          />
                        </>
                        : <p>¿Estás seguro de eliminar la cita?</p>
                    }
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      type='button'
                      color="danger"
                      variant="light"
                      onClick={() => {
                        reset()
                        onClose()
                        props.onClose()
                      }}
                    >
                  Cancelar
                    </Button>
                    <Button
                      type='submit'
                      color='primary'
                    >
                      {`${options[props.option ?? 'Programar']}`}
                    </Button>
                  </ModalFooter>
                </form>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </Portal>
  )
}

export default ModalQuote
