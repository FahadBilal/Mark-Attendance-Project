import mongoose,{Schema}from 'mongoose'

const userSchema = new Schema(
    {
        fullName:{
            type:String,
            required:true,
            trim:true,
            index:true,
        },
        email:{
            type:String,
            required:true,
            trim:true,
            lowerCase:true,
            unique:true,
        },
        password:{
            type:String,
            required:[true,"Password is required"]
        },
        profileImage:{
            type:String,
            default:""
        },
        role:{
            type:String,
            enum:['student','admin'],
            default:"student"
        },
        attendanceRecords:{
            type:Schema.Types.ObjectId,
            ref:"Attendance"
        },
        leaveRequests:{
            type:Schema.Types.ObjectId,
            ref:"LeaveRequest"
        }

    },
    {timestamps:true}
)


export const User = mongoose.model("User",userSchema)