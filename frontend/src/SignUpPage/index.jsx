import React from "react";
import Input from "../global/Input.jsx";
import { useForm } from "react-hook-form";

const Register = () => {
  // const [fullName, setFullName] = useState('');
  // const [email, setEmail] = useState('');
  // const [otp, setOtp] = useState('');
  // const [password, setPassword] = useState('');
  // const [role, setRole] = useState('student');
  // const [profileImage, setProfileImage] = useState(null);
  // const [isOtpSent, setIsOtpSent] = useState(false);
  // const [isEmailVerified, setIsEmailVerified] = useState(false);
  // const [error, setError] = useState('');
  // const [success, setSuccess] = useState('');

  // // Function to request OTP
  // const requestOtp = async () => {
  //   try {
  //     const response = await axios.post(`${apiurl}/users/requestOpt`, { email });
  //     setIsOtpSent(true);
  //     setError('');
  //     setSuccess('OTP has been sent to your email');
  //   } catch (error) {
  //     setError('Error requesting OTP');
  //   }
  // };

  // // Function to verify OTP
  // const verifyOtp = async () => {
  //   try {
  //     await axios.post(`${apiurl}/users/verifyOpt`, { email, otp });
  //     setIsEmailVerified(true);
  //     setSuccess('Email verified successfully');
  //     setError('');
  //   } catch (error) {
  //     setError('Invalid OTP or verification failed');
  //   }
  // };

  // // Function to handle registration
  // const handleRegister = async (e) => {
  //   e.preventDefault();

  //   if (!isEmailVerified) {
  //     setError('Please verify your email before registering');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('fullName', fullName);
  //   formData.append('email', email);
  //   formData.append('password', password);
  //   formData.append('role', role);
  //   if (profileImage) {
  //     formData.append('profileImage', profileImage);
  //   }

  //   try {
  //     const response = await axios.post(`${apiurl}/users/register`,formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  //     setSuccess(response.data.message);
  //     setError('');
  //   } catch (error) {
  //     setError(error.response?.data?.message || 'Registration failed');
  //   }
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="grid justify-items-center content-center  min-h-screen">
      <div className=" w-full bg-blue-500 p-10  max-w-lg rounded-lg shadow-lg ">
        <h2 className="text-white font-satoshi font-extrabold text-2xl text-center mb-4">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          {/* FullName */}
          <div>
            <Input
              label="FullName"
              type="text"
              placeholder="Enter your full name"
              className={`${errors.name ? "border-red-500" : ""}`}
              {...register("name", {
                required: "FullName is required"
              })}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          {/* Email */}
          <div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your Email"
              className={`${errors.name ? "border-red-500" : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Inavlid Email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          {/* Opt */}
          <div>
            <Input
              label="Opt"
              type="text"
              placeholder="Enter Opt"
              className={`${errors.opt ? "border-red-500" : ""}`}
              {...register("opt", {
                required: "Opt is required"
              })}
            />
            {errors.opt && (
              <span className="text-red-500">{errors.opt.message}</span>
            )}
          </div>
          
          {/* Profile Image */}
          <div>
            <Input
              label="Profile Image"
              type="file"
              className={`${errors.file ? "border-red-500" : ""}`}
              {...register("file", {
                required: "Profile Image is required"
              })}
            />
            {errors.file && (
              <span className="text-red-500">{errors.file.message}</span>
            )}
          </div>

          {/* Password */}
          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter your Password"
              className={`${errors.password ? "border-red-500" : ""}`}
              {...register("password", {
                required: "Password is required"
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.paasword.message}</span>
            )}
          </div>


        </form>
      </div>
    </div>
  );
};

export default Register;
