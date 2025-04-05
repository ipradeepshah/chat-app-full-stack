"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";

const Signup = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    
    formState: { errors, isSubmitting },
  } = useForm();

  

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("gender", data.gender);
    

    try {
      const response = await axios.post(
        "http://localhost:8080/user/register",
        formData,   
        { headers: { "Content-Type": "application/json" } } 
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/login");
      }
    } catch (error) {
      const { message } = error.response?.data;

      if (error.response) {
        if (error.response.status === 400) {
          toast.error(message);
        }
        if (error.response.status === 409) {
          toast.error(message);
        }
        if (error.response.status === 500) {
          toast.error(message);
        }
      }
    }
  };

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <div className="min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400  bg-clip-padding backdrop-filter            backdrop-blur-md bg-opacity-10 border border-gray-100">
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={250}
            height={100}
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-center">Sign Up Page</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="my-2">
              <label className="label p-2">
                <span className="label-text text-base">Full Name</span>
              </label>
              
              <input
                className="input input-bordered w-full h-10"
                type="text"
                placeholder="Enter your full name"
                {...register("fullName", {
                  required: "Full Name is required",
                  minLength: {
                    value: 2,
                    message: "Full Name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Full Name must not exceed 50 characters",
                  },
                })}
              />
              <div className="text-red-500 text-sm ml-1 ">
                {errors.fullName?.message}
              </div>
            </div>
            <div className="my-2">
              <label className="label p-2 ">
                <span className="label-text text-base">Username</span>
              </label>
              <input
                className="input input-bordered w-full h-10"
                type="text"
                placeholder="Enter your Username"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 2,
                    message: "Username must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Username must not exceed 50 characters",
                  },
                })}
              />
              <div className="text-red-500 text-sm ml-1 ">
                {errors.username?.message}
              </div>
            </div>
            <div className="my-2">
              <label className="label p-2 ">
                <span className="label-text text-base">Password</span>
              </label>
              <input
                className="input input-bordered w-full h-10"
                type="password"
                placeholder="Enter your password "
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <div className="text-red-500 text-sm ml-1">
                {errors.password?.message}
              </div>
            </div>

            {/* Radio buttons */}
            <div className="flex items-center my-4">
              <label className="flex items-center mr-4">
                <input
                  type="radio"
                  value="male"
                  {...register("gender", { required: "Gender is required" })}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="female"
                  {...register("gender", { required: "Gender is required" })}
                  className="mr-2"
                />
                Female
              </label>
            </div>
            <div className="flex items-center ">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-600 to-purple-700 hover:from-gray-700 hover:to-purple-800 text-white font-bold py-3 px-4 rounded-lg transition-all"
              >
                <span>Join Vibe Chat</span>
              </button>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href={"login"}
                  className="text-purple-600 hover:text-purple-800 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
