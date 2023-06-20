import express, { Request, Response } from 'express';
import { requiresAuth } from 'express-openid-connect';
import auth0Middleware from './auth/auth0';
import * as dotenv from 'dotenv';
import path from 'path';
import connect from './database/connect';
import bodyParser, { urlencoded } from 'body-parser';
import  cors from 'cors'
dotenv.config();
import urlRouter from './routes/url';

//database
connect(process.env.MONGO_URI);

const app = express();
app.use(cors({
  origin: "*"
}));



app.use(bodyParser.urlencoded({extended:false}))



app.use(express.json());

//route
app.use('/api/v1/url', urlRouter);

//server
app.listen(5000, (): void => {
  console.log('server running');
});
