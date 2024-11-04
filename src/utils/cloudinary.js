import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});


const uploadOnCloudinary = async(localFilePath)=>{
    try {
        const response = cloudinary.uploader.upload(localFilePath,{resource_type:"auto"});
        console.log(response.url)
        // file upload on cloudinary successfully
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
        
    }
}

export {uploadOnCloudinary}