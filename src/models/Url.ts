import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
 longUrl:{
    type:String,
    required:true
 },

 shortUrl : {
   type:String,
 },
 email: {
  type:String
 }
})

 const UrlModel =  mongoose.model('Url',UrlSchema);

 export default UrlModel
