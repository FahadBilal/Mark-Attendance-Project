import mongoose, {Schema} from "mongoose";

const leaveRequestSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
          leaveDate: {
            type: Date,
            required: true,
          },
          reason: {
            type: String,
            required: true,
            trim: true,
          },
          status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
          },
    },
    {timestamps:true}
)


export const LeaveRequest = mongoose.model("LeaveRequest",leaveRequestSchema)