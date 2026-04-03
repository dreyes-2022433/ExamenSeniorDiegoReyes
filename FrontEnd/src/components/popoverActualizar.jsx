import { updateUserRequest } from "../services/api"
import { useState, useRef } from "react"
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Box, FormLabel, Input, Stack, Button, Select } from "@chakra-ui/react"
import { useToast, useDisclosure } from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons"

export const ActualizarPopover = ({ user, onUserUpdated }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = useRef()
    const toast = useToast()
    const [formData, setFormData] = useState({
        id: user?._id,
        name: user?.name || '',
        lastname: user?.lastname || '',
        email: user?.email || '',
        status: user?.status || 'active'
    })

    const handleValueChange = (value, field) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.name || !formData.lastname || !formData.email) {
            toast({
                title: 'Error',
                description: 'Por favor completa todos los campos correctamente',
                status: 'error',
                duration: 4000,
                isClosable: true
            })
            return
        }

        const response = await updateUserRequest(formData)

        if (response?.error) {
            const backend = response.error.response
            const message = backend?.data?.message || 'Error al actualizar usuario'
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 4000,
                isClosable: true
            })
            return
        }

        toast({
            title: 'Éxito',
            description: 'Usuario actualizado correctamente',
            status: 'success',
            duration: 4000,
            isClosable: true
        })

        if (onUserUpdated) onUserUpdated()
        onClose()
    }

    return (
        <>
            <Button leftIcon={<EditIcon />} colorScheme='blue' size='sm' onClick={onOpen}>Editar</Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                initialFocusRef={firstField}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        Actualizar usuario
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing='24px'>
                            <Box>
                                <FormLabel htmlFor='name'>Nombre</FormLabel>
                                <Input
                                    ref={firstField}
                                    value={formData.name}
                                    onChange={(e) => handleValueChange(e.target.value, 'name')}
                                    id='name'
                                    placeholder='Introduce el nombre del usuario'
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor='lastname'>Apellido</FormLabel>
                                <Input
                                    value={formData.lastname}
                                    onChange={(e) => handleValueChange(e.target.value, 'lastname')}
                                    id='lastname'
                                    placeholder='Introduce el apellido del usuario'
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor='email'>Email</FormLabel>
                                <Input
                                    value={formData.email}
                                    onChange={(e) => handleValueChange(e.target.value, 'email')}
                                    id='email'
                                    placeholder='Introduce el email del usuario'
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor='status'>Estado</FormLabel>
                                <Select
                                    value={formData.status}
                                    onChange={(e) => handleValueChange(e.target.value, 'status')}
                                    id='status'
                                >
                                    <option value='active'>Activo</option>
                                    <option value='inactive'>Inactivo</option>
                                </Select>
                            </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme='blue' type='submit' onClick={handleSubmit}>Actualizar Usuario</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}