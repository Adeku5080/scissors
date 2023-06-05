import UrlModel from "../models/Url"
import { createHash } from "crypto"
import { Request,Response } from "express"



const createUrl =async(req:Request,res:Response)=>{
    const {longUrl} = req.body
    const hashedUrl = createHash('md5').update(longUrl).digest('hex')
    const shortenedUrl = hashedUrl.slice(0,5 )

    const url = await UrlModel.create({longUrl : longUrl,shortUrl:shortenedUrl})
    console.log(url,"adeku")
    res.status(201).json({url})

}

export default createUrl