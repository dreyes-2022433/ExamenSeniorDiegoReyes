

import User from "../User/user.model.js";
import { checkPassword,encrypt } from "../../utils/encrypt.js";
import { generateJwt } from "../../utils/jwt.js";
import { logger } from "../../utils/logger.js";


export const registerUser = async (req, res) => {
    const {name, lastname, email,status,password} = req.body;
    try {
        let existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
            const user = new User({
                name,
                lastname,
                email,
                status,
                password
            })
            user.password = await encrypt(password);
            await user.save();
            return (
            logger.info(`User ${user.email} registered successfully`),
            res.status(201).json({ message: 'User registered successfully' })
            );
    }catch (err) {
        logger.error('Error registering user', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email ' });
        }
        if (user.status === 'inactive') {
            return res.status(403).json({ message: 'User is inactive' });
        }
        if (user && await checkPassword(user.password, password)) {
            let loggerUser = {
                uid: user._id,
                email: user.email,
                name: user.name,
        }
       let token = await generateJwt(loggerUser);
       return (
       logger.info(`User ${user.email} logged in successfully`),
       res.status(200).json({ token, loggerUser })
       );
        }
    }catch(err){
        logger.error('Error logging in user', err);
        res.status(500).json({ message: 'Internal server error' });
    }

}

export const InitDefaultUser = async(req, res) => {
    try {
        const defaultUser = await User.findOne(
            { 
                email: 'diego12345@gmail.com' 
            }
        )
        
        if (!defaultUser) {
            const defaultUserData = {
                name: 'defaultUser',
                lastname: 'defaultUser',
                email: 'diego12345@gmail.com',
                password: 'Diego-15'
            }

            const newdefaultUser = new User(defaultUserData)
            newdefaultUser.password = await encrypt(newdefaultUser.password)
            await newdefaultUser.save();
            
            console.log('Default user created successfully!')
        } else {
           
        }
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                message: 'Error creating admin user:', 
                err
            }
        )
    }
}