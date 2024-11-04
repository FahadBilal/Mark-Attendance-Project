import mongoose, {Schema} from "mongoose";


const attendanceSchema = new Schema(
    {
        userId:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        date: {
            type: Date,
            required: true,
            unique: true, // Ensures that attendance can only be marked once per day per user
          },
          status: {
            type: String,
            enum: ['present', 'absent'],
            default: 'present',
          },
    },
    {timestamps:true}
)


export const Attendance = mongoose.model("Attendance",attendanceSchema)