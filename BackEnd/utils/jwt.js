'use strict'

import jwt from 'jsonwebtoken';
export const generateJwt = async (payload) => {
    try{
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h',algorithm: 'HS256'  });
    }catch(err){
        console.error('Error generating JWT', err)
    }
}