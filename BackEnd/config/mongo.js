import mongoose, { disconnect } from 'mongoose'
import { logger } from '../utils/logger.js'
import { InitDefaultUser } from '../src/Auth/Auth.controller.js'
export const connect = async()=>{
    try{
       
        mongoose.connection.on('error', ()=>{
            logger.error('MongoDB | Could not be connect to mongodb')
            console.log('MongoDB | Could not be connect to mongodb')
        })
        mongoose.connection.on('connecting', ()=>{
            logger.info('MongoDB | try conecting')
            console.log('MongoDB | try conecting')
        })
        mongoose.connection.on('connected', ()=>{
            logger.info('MongoDB | connected to mongodb')
            console.log('MongoDB | connected to mongodb')
            InitDefaultUser()
        })
        mongoose.connection.once('open', ()=>{
            logger.info('MongoDB | connected to database')
            console.log('MongoDB | connected to database')
        })
        mongoose.connection.on('reconnected', ()=>{
            logger.info('MongoDB | reconnected to mongodb')
            console.log('MongoDB | reconnected to mongodb')
        })
        mongoose.connection.on('disconnected', ()=>{
            logger.info('MongoDB | disconnected')
            console.log('MongoDB | disconnected')
        })

        
        await mongoose.connect(
            `${process.env.DB_SERVICE}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
            {
                maxPoolSize: 50, 
                serverSelectionTimeoutMS: 5000
            }
        )

    }catch(err){
        console.error('Database connection failed', err)
    }
}