import React, { FC, useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea, Select, SelectItem, Input } from '@nextui-org/react'
import { IModal } from '@interface/components/modal/Modal'
import { Controller, useForm } from 'react-hook-form'
import { ITodoCrud } from '@interface/context/to-do/ToDo'
import { Portal } from '../portal/Portal'

const ModalTodo: FC<IModal> = (props) => {
  const { control, reset, handleSubmit, setValue } = useForm<ITodoCrud>()

  const onSubmit = (data: ITodoCrud) => {
    if (props.onAction) props.onAction(data)
    reset()
  }

  const options = {
    create: 'Crear',
    update: 'Actualizar',
    delete: 'Eliminar'
  }

  useEffect(() => {
    Object.entries(props.defaultValue).forEach(([key, value]) => {
      setValue(key as keyof ITodoCrud, typeof value === 'boolean' ? +value : value)
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
                <ModalHeader className="flex flex-col gap-1">{`${options[props.defaultValue.action ?? 'create']}`} tarea</ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalBody>
                    {
                      props.defaultValue.action !== 'delete'
                        ? <>
                          <Controller
                            name='title'
                            defaultValue={props.defaultValue.title ?? ''}
                            control={control}
                            rules={{
                              required: true
                            }}
                            render={({ field: { onChange, value }, formState: { isValid, errors } }) => (
                              <Input
                                isRequired
                                type="text"
                                label="Title"
                                labelPlacement="inside"
                                onChange={onChange}
                                defaultValue={value}
                                className="w-full"
                                isInvalid={isValid}
                                errorMessage={errors.title?.message}
                              />
                            )
                            }
                          />
                          <Controller
                            name='description'
                            defaultValue={props.defaultValue.description ?? ''}
                            control={control}
                            rules={{
                              required: true
                            }}
                            render={({ field: { onChange, value }, formState: { isValid, errors } }) => (
                              <Textarea
                                isRequired
                                label="Descripcion"
                                defaultValue={value}
                                onChange={onChange}
                                labelPlacement="inside"
                                placeholder="Escribe una descripción"
                                className="w-full"
                                isInvalid={isValid}
                                errorMessage={errors.description?.message}
                              />
                            )}
                          />
                          <Controller
                            name='status'
                            defaultValue={props.defaultValue.status ? +props.defaultValue.status : 0}
                            control={control}
                            rules={{
                              required: true
                            }}
                            render={({ field: { onChange, value }, formState: { isValid, errors } }) => (
                              <Select
                                isRequired
                                isInvalid={isValid}
                                errorMessage={errors.description?.message}
                                items={[
                                  { label: 'Completada', value: 1 },
                                  { label: 'Pendiente', value: 0 }
                                ]}
                                onChange={onChange}
                                defaultSelectedKeys={value.toString()}
                                label="Estado"
                                isDisabled={!(props.defaultValue.id)}
                                placeholder="Seleccionar el estado"
                                className="w-full"
                              >
                                {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
                              </Select>
                            )}
                          />
                        </>
                        : <p>¿Estás seguro de eliminar la tarea?</p>
                    }
                  </ModalBody>
                  <ModalFooter>
                    <Button type='button' color="danger" variant="light" onClick={
                      () => {
                        reset()
                        onClose()
                      }
                    }>
                  Cancelar
                    </Button>
                    <Button type='submit' color='primary'>
                      {`${options[props.defaultValue.action ?? 'create']}`}
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

export default ModalTodo
