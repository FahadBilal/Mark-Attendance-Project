import {asyncHandler} from '../utils/asyncHandler.js'
import User from '../models/user.model.js'
import ApiError from '../utils/ApiError.js' 


const registerUser = asyncHandler( async (req,res) => {
    // get user detial 
    // all fields requied
    // existed User
    // profile Image
    // upload on cloudinary
    // password 
    // create user
    // return 

    const {fullName, email, password} = req.body;

    if(
        [fullName,email,password].some((field)=> field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required")
    }

    const existedUser= await User.findOne(email);

    if(existedUser){
        throw new ApiError(400, "User already existed")
    }

    

} )


export {registerUser}