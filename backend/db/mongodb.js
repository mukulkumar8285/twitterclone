import  mongoose from "mongoose";

const connectMongoDB = async() =>{
    try{
        const conn = await mongoose.connect("mongodb+srv://mukulved07:Tav5SRuyZppKtzoL@cluster0.7ebyt.mongodb.net/twitter-db");
        console.log("MongoDB connected");

    }catch(error){
        console.log(`Error Connection To MongoDB: ${error.message}`);
        process.exit(1);
    }
}


export default  connectMongoDB;
