import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import { uselogin } from '../../Shared/useLogin';
export const Login = () => {
    const { login } = uselogin()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Por favor completa todos los campos correctamente',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
      return
    }
    login(email, password)
    console.log(email,password)

  };

  return (
    <Box
      maxW="xl"
      mx="auto"
      height="50vh"
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
    >
      <VStack spacing={4}>
        <Heading size="lg">Iniciar Sesión</Heading>
        <Text>Entra a tu usuario</Text>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu email"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">
              Iniciar Sesión
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};


