import { useEffect } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useToast } from "@chakra-ui/react"
import { Userslist } from "../components/userslist"
import { useState } from "react"
import { getUsersRequest } from "../services/api"


export function UsersPage() {
    const navigate = useNavigate()
    const toast = useToast()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/')
            toast({
                title: 'Access Denied',
                description: 'You must be logged in to access this page',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [navigate])

    return (
        <div style={{padding: '5%'}}>
        <Userslist />
        </div>

    )
}