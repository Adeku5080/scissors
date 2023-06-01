 import express,{Request,Response} from "express";
 import { requiresAuth } from "express-openid-connect";
 import  auth0Middleware from "./auth/auth0"
import * as dotenv from 'dotenv'
import path from "path";
import bodyParser, { urlencoded } from "body-parser";

 const app = express()  

dotenv.config()


app.use(bodyParser.urlencoded({extended:false}))
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')


app.use(auth0Middleware)

app.get('/',(req,res)=>{
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

app.post("/logout",(req,res)=>{
    // req.oidcLogout();
    res.redirect('/')

})

// app.use((err,req,res,next)=>{
//     console.log(err);
//     res.status(500).send('something broke')
// })
 app.listen(5000,(): void=>{
     console.log("server running")
  })