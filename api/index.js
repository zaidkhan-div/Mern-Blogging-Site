import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRroutes from './routers/user.route.js';
import authRoutes from './routers/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const MONGO_KEY = process.env.MONGO;

mongoose.connect(MONGO_KEY)
    .then(() => {
        console.log('MongoDb is connected');
    })
    .catch((error) => {
        console.log(error);
    })

const app = express();
app.use(express.json())
app.use(cookieParser())

app.use('/api/user', userRroutes);
app.use('/api/auth', authRoutes);


app.use((err, req, res, next) => {
    const StatusCode = err.StatusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(StatusCode).json({
        success: false,
        StatusCode,
        message
    })
})

// Middlewere is a simple function that has ability to handle request and response objects in a server. 
// Middleware can be is used while -
// Execution of any type of code during updation of request and response objects
// during the completion of request response iterations
// Through this we can call the next middleware also

app.listen(3000, () => {
    console.log('Server is running on 3000!')
})
