'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { limiter } from '../middlewares/rate.limit.js'
import 'dotenv/config'
import morgan from 'morgan'
import authRoutes from '../src/Auth/Auth.routes.js'
import userRoutes from '../src/User/user.routes.js'
import winston from 'winston'
import { logger } from '../utils/logger.js'
export const config = (app) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())
    app.use(helmet())
    app.use(limiter)
    app.use(morgan('dev'))
   }
   export const routes = (app) => {
    app.use('/api',authRoutes)
    app.use('/api', userRoutes)
   }

   export const initServer = async()=>{
        const app = express()
        try{
            config(app)
            routes(app)
            app.listen(process.env.PORT)
            logger.info(`Server running on port ${process.env.PORT}`)
        }catch(error){
            logger.error(error)
        }
   }