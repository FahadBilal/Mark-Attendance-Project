import mongoose, {Schema} from "mongoose";

const gradeSchema = new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
      },
      attendancePercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100, // Attendance percentage should be between 0 and 100
      },
      grade: {
        type: String,
        required: true,
        enum: ['A', 'B', 'C', 'D', 'F'], // Only these grades are allowed
      },
      description: {
        type: String,
        required: true,
        trim: true,
    },
  },
    {timestamps:true}
)

export const Grade = mongoose.model("Grade",gradeSchema);