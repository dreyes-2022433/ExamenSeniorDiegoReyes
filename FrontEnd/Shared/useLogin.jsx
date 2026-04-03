import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { loginRequest } from "../src/services/api"
import { useToast } from "@chakra-ui/react"

export const uselogin = () => {
    const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const toast = useToast()

  const login = async (email, password) => {
    setIsLoading(true)
    
    const user = { email, password }
    
    try {
      const response = await loginRequest(user)

      setIsLoading(false)

      if (response.error) {
        setError(true)

        if (response?.error?.response?.data?.message) {
          toast.error(response?.error?.response?.data?.message)
          console.error(response.error.response.data.message)
        } else {
          toast.error("Error al intentar loguearte. Intenta de nuevo.")
          console.error("Error al intentar loguearte. Intenta de nuevo.")
        }
        return
      }

      setError(false)
      const { token, loggerUser } = response.data
      console.log(response.data)
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(loggerUser))
      localStorage.setItem('uid', loggerUser.uid)


      toast(
        {
          title: 'Login exitoso',
          description: `Bienvenido ${loggerUser.name}!`,
          status: 'success',
          duration: 4000,
          isClosable: true
        }
      )

      if (loggerUser) {
        navigate('/users')
        }
    } catch (err) {
      setIsLoading(false)
      setError(true)
      console.error(err)
      toast({
        title: 'Error',
        description: `Email o contraseña incorrectos. Intenta de nuevo.`,
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    }
  }

  return {
    login,
    isLoading,
    error
  }


}