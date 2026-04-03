import React from 'react';
import { Heading, Card, CardBody, Text, Stack, CardHeader, Button, Flex, HStack,Drawer,DrawerOverlay,DrawerContent,DrawerCloseButton 
   ,Box,DrawerHeader,DrawerBody,DrawerFooter,FormControl,FormLabel,Input,InputGroup,InputLeftAddon,InputRightAddon,Select,Textarea }from '@chakra-ui/react';
import {DeleteIcon, EditIcon,AddIcon} from '@chakra-ui/icons'
import { useEffect } from 'react';
import { useState } from 'react';
import { getUsersRequest } from '../services/api';
import { useRegister } from '../../Shared/useAddUser';
import { useDisclosure } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { EliminarPopover } from './popover';
import { ActualizarPopover } from './popoverActualizar';
export const Userslist = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()
    const [users, setUsers] = useState([])
        const toast = useToast()
    const [formData, setFormData] = useState({

        name: '',
        lastname: '',
        email: '',
        password: '',
        status: 'active'
    })
    const { register } = useRegister()
        const fetchUsers = async () => {
            const response = await getUsersRequest()
            setUsers(response.data)
        }

        useEffect(() => {
            fetchUsers()
        }, [])
        
const handleValueChange = (value, field) => {
        setFormData(prevData => ({
      ...prevData,
      [field]: value
    }))
  }


        const handleSubmit = async (e) => {
            e.preventDefault()
            if (!formData.name || !formData.lastname || !formData.email || !formData.password) {
                toast({
                    title: 'Error',
                    description: 'Por favor completa todos los campos correctamente',
                    status: 'error',
                    duration: 4000,
                    isClosable: true    
                })
                return
            }     
            const result = await register(formData)
            if (!result || !result?.error) {
                await fetchUsers()            
            }
            setFormData({
                name: '',
                lastname: '',
                email: '',
                password: '',
                status: 'active'
            })
            onClose()
        }

    return(
        <div>
             <>
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
            Crear nuevo usuario
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
              <Box>
                <FormLabel htmlFor='Nombre'>Nombre</FormLabel>
                <Input
                  ref={firstField}
                  onChange={(value) => handleValueChange(value.target.value, 'name')}
                  id='name'
                  placeholder='Introduce el nombre del usuario'
                />
              </Box>
             <Box>
                <FormLabel htmlFor='lastname'>Apellido</FormLabel>
                <Input
                  ref={firstField}
                  id='lastname'
                    onChange={(value) => handleValueChange(value.target.value, 'lastname')}
                  placeholder='Introduce el apellido del usuario'
                />
              </Box>

              <Box>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input
                  ref={firstField}
                    onChange={(value) => handleValueChange(value.target.value, 'email')}
                  id='email'
                  placeholder='Introduce el email del usuario'
                />
              </Box>

               <Box>
                <FormLabel htmlFor='Contraseña'>Contraseña</FormLabel>
                <Input
                type='password'
                ref={firstField}
                onChange={(value) => handleValueChange(value.target.value, 'password')}
                  id='password'
                  placeholder='Introduce la contraseña del usuario'
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
            <Button colorScheme='blue' type='submit' onClick={handleSubmit}>Crear Usuario</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
            <Flex justify='space-between' align='center' mb='4'>
            <Text fontSize='2xl' mb='4'>LISTA DE USUARIOS </Text>
              <Button leftIcon={<AddIcon />} colorScheme='teal' onClick={onOpen}>
                 Crear Usuario
                </Button>
            </Flex>
                <Stack spacing='4'>
            {users.map((user) => (
            <Card key={user._id} variant='elevated'>
            <CardHeader>
                <Flex justify='space-between' align='center'>
                    <Heading size='md'>{user.name + ' ' + user.lastname}</Heading>
                    <HStack spacing={2}>
                        <ActualizarPopover user={user} onUserUpdated={fetchUsers} />
                        <EliminarPopover id={user._id} onUserDeleted={fetchUsers} />
                    </HStack>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text>Email: {user.email}</Text>
                <Text>Uid: {user._id}</Text>
                <Text>Status: {user.status}</Text>
            </CardBody>
            </Card>
        ))}
        </Stack>

        </div>

    )


}