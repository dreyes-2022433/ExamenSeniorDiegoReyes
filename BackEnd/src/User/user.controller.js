import { checkPassword,encrypt } from "../../utils/encrypt.js"
import User from "./user.model.js"
import { generateJwt } from "../../utils/jwt.js"
import { logger } from "../../utils/logger.js"

export const allUsers = async (req, res) => {
    try{
         const { limit = 20, skip = 0 } = req.query
        const users = await User.find().skip(skip)
        .limit(limit);
        if(users.length === 0){
            return (
            logger.info(`No users found with limit ${limit} and skip ${skip}`),
            res.status(200).json({ message: 'No users found' })
            )
        }
        return(
        logger.info(`Fetched users with limit ${limit} and skip ${skip}`),
        res.status(200).json(users)
        );

    }catch(err){
        console.error('Error fetching users', err);
        res.status(500).json({ message: 'Internal server error' })
        logger.error('Error fetching users', err)   
    }
}

export const DeleteUser = async (req, res) => {
    const { id } = req.params;
    try{
        console.log(`Attempting to delete user with id: ${id}`);
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return (
            logger.error(`User with id ${id} not found for deletion`),
            res.status(404).json({ message: 'User not found' })
            )
        }
        return (
        logger.info(`User ${user.email} deleted successfully`),
        res.status(200).json({ message: 'User deleted successfully' })
        )

    }catch(err){
        res.status(500).json({ message: 'Internal server error' })
        logger.error('Error deleting user', err)
    }

}


export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, lastname, email,status, password } = req.body;
    try{
        const userToUpdate = await User.findById(id);
        if (!userToUpdate) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (email && email !== userToUpdate.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
        }
       const updatedData = await User.findByIdAndUpdate(id,
        {
            name,lastname,email,status,password: password ? await encrypt(password) : userToUpdate.password
        },
        { new: true }
        )
        return (
        logger.info(`User ${updatedData.email} updated successfully`),
        res.status(200).json(updatedData)
        )

    }catch(err){
        console.error('Error updating user', err)
        res.status(500).json({ message: 'Internal server error' })
        logger.error('Error updating user', err)
    }
}