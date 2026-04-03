import axios from 'axios'
import { useToast } from '@chakra-ui/react';


const api = axios.create({
    baseURL: 'http://localhost:3678/api',
    timeout: 5000,
})

export const loginRequest = async (user) => {
    try {
        return  await api.post('/login', user,
            {type: 'multipart/form-data'}
        )
    }catch (error) {
        console.error('Login failed', error)
    }
}


export const registerRequest = async (user) => {
    try {
        const token = localStorage.getItem('token');
        return await api.post('/users', user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
       
        return { error };
    }
}

export const getUsersRequest = async () => {
    try {
        const token = localStorage.getItem('token');
        return await api.get(`/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
    }catch (error) {
        return { error };
    }
}

export const deleteUser = async (id) => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            return await api.delete(`/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } else {
            console.error('No token found. User might not be authenticated.')
            return { error: 'No token found' }
        }
    } catch (error) {
        return { error };
    }
}

export const updateUserRequest = async (user) => {
    try {
        const token = localStorage.getItem('token');
        return await api.put(`/users/${user.id}`, user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        return { error };
    }
}