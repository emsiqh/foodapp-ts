import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoute from './routes/userRoute.js';
// import profile from './routes/profile.js';

const app = express();
dotenv.config();

app.use((express.json({ limit: "30mb", extended: true })))
app.use((express.urlencoded({ limit: "30mb", extended: true })))
app.use((cors()))

app.use('/users', userRoute);
// app.use('/profiles', profile);

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Server is running');
});



mongoose.connect(DB_URL, {})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))