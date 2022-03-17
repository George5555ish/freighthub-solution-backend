import mongoose from "mongoose";
import  config  from "config";

export async function connectToDatabase(){
    try {
        await mongoose.connect(config.get('dbUri'));
        console.log('Connected to db');
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
}