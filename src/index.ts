import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import connect from './database/connect';
import bodyParser, { urlencoded } from 'body-parser';
import cookieparser from "cookie-parser"
import  cors from 'cors'
dotenv.config();
import urlRouter from './routes/url';
import authRouter from './routes/auth';
import morgan from "morgan";


//database
connect(process.env.MONGO_URI);



const app = express();
app.use(morgan('dev'))

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieparser(process.env.JWT_SECRET));


app.use(cors({
  origin: "*"
}));


//route
app.use('/api/v1/url', urlRouter);
app.use("/api/v1/auth",authRouter)

//server
app.listen(8000, (): void => {
  console.log('server running');
});
