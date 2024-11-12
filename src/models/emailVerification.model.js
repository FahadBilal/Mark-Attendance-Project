import mongoose,{Schema} from "mongoose";

const emailVerificationSchema = new Schema(
  {
    email:{
      type:String,
      required:true,
    },
    opt:{
      type:String,
    },
    optExpiry:{
      type:Date
    },
    isVerified:{
      type:Boolean,
      default:false,
    }
  },
  {timestamps:true}
)

export const EmailVerification = mongoose.model("EmailVerification", emailVerificationSchema);
