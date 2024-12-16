import mongoose from "mongoose";
import config from "../config";
import app from "../../app"
export const  connection = async() => {
    try {
        await mongoose.connect(config.database_url as string).then(()=>console.log("Connection established successfully")).catch((e)=> console.error(e))
    
  
      } catch (err) {
        console.log(err);
      }
} 