import UrlModel from "../models/Url"
import { createHash } from "crypto"
import { Request,Response } from "express"



const createUrl = (req:Request,res:Response)=>{
    const {longUrl} = req.body
    const hashedurl = createHash('md5').update(longUrl).digest('hex')
    console.log(hashedurl);


    // const url = UrlModel.create(req.body)

}

export default createUrl