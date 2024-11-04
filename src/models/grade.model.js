import mongoose, {Schema} from "mongoose";

const gradeSchema = new Schema(
    {
        gradeName: {
            type: String,
            required: true,
            trim: true,
          },
          minAttendancePercentage: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
          },
          description: {
            type: String,
            trim: true,
          },
    },
    {timestamps:true}
)

export const Grade = mongoose.model("Grade",gradeSchema);