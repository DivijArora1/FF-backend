// const express = require('express')//common js module
import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';//.js likhna mt bhoolna       
import authRoutes from './routes/authRoute.js'
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";


dotenv.config();//our file is in root so no need to mention the path

//database config
connectDB()

//rest object
const app = express()

//middleware
app.use(express.json())//req/send in jason format
app.use(morgan('dev'))//method of request

//routes
app.use('/api/v1/auth', authRoutes)
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);


app.use(bodyParser.json());
// app.use(cors());
//instead
const corsOptions = {
    origin: 'https://stellar-bubblegum-7a9e2e.netlify.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

//rest Api create
app.get('/', (req, res) => {

    res.send(
        "Welcomne to ecommerce app"
    )
})

//PORT
const PORT = process.env.PORT || 8080;


//run
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `.bgCyan.white)
})
