import { useState } from "react"
import toast from "react-hot-toast"
import { registerRequest } from "../src/services/api"
import { useNavigate } from "react-router-dom"
import { useToast } from "@chakra-ui/react"

export const useRegister = ()=>{
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const toast = useToast()

    const register = async (user) => {
        setIsLoading(true)
        const response = await registerRequest(user)
        setIsLoading(false)

        if (response?.error) {
            setError(true)
            const backend = response.error.response

            if (backend?.data?.errors) {
                backend.data.errors.forEach((err) => {
                    toast({
                        title: 'Error',
                        description: err.msg,
                        status: 'error',
                        duration: 4000,
                        isClosable: true,
                    })
                })
                return { error: backend.data.errors }
            }

            const message = backend?.data?.message || backend?.data?.msg || 'Error al registrar usuario'
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
            return { error: message }
        }

        setError(false)
        toast({ title: 'Éxito', description: 'Usuario registrado correctamente', status: 'success', duration: 4000, isClosable: true })
        return response
    }
    return {
        register,
        isLoading,
        error,
        setError,
}

}