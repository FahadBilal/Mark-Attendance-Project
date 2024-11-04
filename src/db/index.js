import mongoose from 'mongoose'
import { DB_Name } from '../constants.js'

 export const ConnectDb= async ()=>{
    try {
        const connectionInatances = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`)
        console.log(`\n MongoDb Connection !! Db Host ${connectionInatances.connection.host}`);
        
    } catch (error) {
        console.log(`MongoDb Connection Failed`,error);
        process.exit(1)
        
    }
}