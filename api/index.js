import express from 'express';
import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://zaidkhan:zaidkhan@mern-blog.tngdpp0.mongodb.net/?retryWrites=true&w=majority&appName=mern-blog')
    .then(() => {
        console.log('MongoDb is connected');
    })
    .catch((error) => {
        console.log(error);
    })

const app = express();


app.listen(3000, () => {
    console.log('Server is running on 3000!')
})
