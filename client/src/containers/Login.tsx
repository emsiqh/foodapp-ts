import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { LoginBg, Logo } from "../assets";
import { FaEnvelope, FaLock, FcGoogle, FaRunning } from "../assets/icons";
import LoginInput from "../components/LoginInput";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture: string;
  bio: string;
}

const Login = () => {
  const [isSignUp, setIsSignUp] = useState<Boolean>(true);
  const initialState: FormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
    bio: "",
  };
  const [formData, setFormData] = useState<FormData>(initialState);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      {/* Background image */}
      <img
        src={LoginBg}
        alt=""
        className="w-full h-full object-cover absolute top-0 left-0"
      />

      {/* Content box */}
      <div className="flex flex-col items-center bg-cardOverlay w-[80%] md:w-[400px] h-full z-10 backdrop-blur-md p-4 px-4 pt-8 gap-6">
        {/* Top logo section */}
        <div className="flex items-center justify-start gap-4 w-full">
          <img src={Logo} className="w-8" alt="logo" />
          <p className="text-headingColor font-semibold text-2xl">City</p>
        </div>

        {/* Welcome text */}
        <p className="text-3xl font-semibold text-headingColor">Welcome Back</p>
        <p className="text-xl text-textColor -mt-6">
          {isSignUp ? "Sign up" : "Sign in"} with following
        </p>

        {/* Input section */}
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-1">
          <LoginInput
            placeHolder={"Email"}
            icon={<FaEnvelope className="text-xl text-textColor" />}
            inputState={formData.email}
            inputStateFunc={handleChange}
            type="email"
            isSignUp={isSignUp}
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-1">
          <LoginInput
            placeHolder={"Password"}
            icon={<FaLock className="text-xl text-textColor" />}
            inputState={formData.password}
            inputStateFunc={handleChange}
            type="password"
            isSignUp={isSignUp}
          />
        </div>
        {isSignUp && (
          <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-1">
            <LoginInput
              placeHolder={"Confirm Password"}
              icon={<FaLock className="text-xl text-textColor" />}
              inputState={formData.confirmPassword}
              inputStateFunc={handleChange}
              type="password"
              isSignUp={isSignUp}
            />
          </div>
        )}

        {/* Text */}
        <p>
          {isSignUp ? (
            <>
              Already have an account:{" "}
              <motion.button
                className="text-yellow-700 text-xl underline cursor-pointer bg-transparent"
                onClick={() => setIsSignUp(false)}
              >
                Sign in
              </motion.button>
            </>
          ) : (
            <>
              Doesn't have an account:{" "}
              <motion.button
                className="text-yellow-700 text-xl underline cursor-pointer bg-transparent"
                onClick={() => setIsSignUp(true)}
              >
                Sign up
              </motion.button>
            </>
          )}
        </p>

        {/* Button section */}
      </div>
    </div>
  );
};

export default Login;
