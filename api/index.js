import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRroutes from './routers/user.route.js';
import authRoutes from './routers/auth.route.js';

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

app.use('/api/user', userRroutes);
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
    console.log('Server is running on 3000!')
})
