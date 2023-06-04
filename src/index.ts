 import express,{Request,Response} from "express";
 import { requiresAuth } from "express-openid-connect";
 import  auth0Middleware from "./auth/auth0"
import * as dotenv from 'dotenv'
import path from "path";
import bodyParser, { urlencoded } from "body-parser";
import  morgan from 'morgan'
import urlRouter from "./routes/url";

 const app = express()  

dotenv.config()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')


app.use(auth0Middleware)

app.get('/',(req,res)=>{
    console.log(req.oidc.user , "ali")
    res.render('index',{
        user:req.oidc.user
    })
})

app.get('/profile',requiresAuth(),(req,res)=>{
    console.log(req.oidc.user)
    res.render('profile',{
        user:req.oidc.user
    })
})

app.get('/callback',(req,res)=>{
    console.log(req.oidc.user)
})

app.use("/api/v1/url",urlRouter)

 app.listen(5000,(): void=>{
     console.log("server running")
  })