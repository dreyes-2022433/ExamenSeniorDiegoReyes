import { Popover,PopoverTrigger,Button,PopoverContent,PopoverArrow,PopoverCloseButton,PopoverHeader,PopoverBody } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { deleteUser } from "../services/api"
import { useToast } from "@chakra-ui/react"
import { useRef } from "react"

export const EliminarPopover = ({ id, onUserDeleted }) => {
    const toast = useToast()
    const finalFocusRef = useRef(null)

    const handleDelete = async (e) => {
        e.preventDefault()
        if (!id) {
            toast({
                title: 'Error',
                description: 'El Id no se encuentra disponible',
                status: 'error',
                duration: 4000,
                isClosable: true
            })
            return
        }

        const response = await deleteUser(id)
        
        if (response?.error) {
            const message = response.error?.response?.data?.message || 'Error al eliminar usuario'
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
            description: 'Usuario eliminado correctamente',
            status: 'success',
            duration: 4000,
            isClosable: true
        })

        if (onUserDeleted) onUserDeleted()
    }

    return (
        <Popover finalFocusRef={finalFocusRef}>
            <PopoverTrigger>
                <Button ref={finalFocusRef} leftIcon={<DeleteIcon />} colorScheme='red' size='sm'>Eliminar</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Confirmar eliminación</PopoverHeader>
                <PopoverBody>¿Estás seguro de eliminar este usuario?</PopoverBody>
                <Button colorScheme='red' size='sm' onClick={handleDelete} w='full' mt={2}>Eliminar</Button>
            </PopoverContent>
        </Popover>
    )
}