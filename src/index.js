import { ConnectDb } from "./db/index.js";
import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config({
    path:"./.env"
})


ConnectDb()
.then(()=>{
    app.listen("8000",()=>{
        console.log(`Server is listening at port ${process.env.PORT}`);   
    })
})
.catch((err)=>{
    console.log("MongoDb connection is failed",err)
})