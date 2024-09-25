import React from "react";
import { Link } from "react-router-dom";
import { signUp } from "../api-client";
import { useForm } from "react-hook-form";
import ErrorLabel from "../components/ErrorLabel";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
function Signup() {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.signUp, {
    onSuccess: async (data) => {
      window.localStorage.setItem("email", data.email);
      window.localStorage.setItem("firstName", data.firstName);
      window.localStorage.setItem("lastName", data.lastName);
      // console.log("registration successful!");
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error) => {
      // console.log(error.message);
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const onSubmit = (data) => {
    mutation.mutate(data);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-50 lg:px-0 w-full ">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "FirstName is required",
                    },
                    minLength: {
                      value: 3,
                      message: "FristName must be 3 chars long",
                    },
                  })}
                  id="fname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Ajay"
                />
                {errors.firstName && (
                  <ErrorLabel err={errors.firstName?.message} />
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "LastName is required",
                    },
                    minLength: {
                      value: 3,
                      message: "lastName must be 3 chars long",
                    },
                  })}
                  id="lname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Erumalla"
                />
                {errors.lastName && (
                  <ErrorLabel err={errors.lastName?.message} />
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                  })}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ajay@company.com"
                />
                {errors.email && <ErrorLabel err={errors.email?.message} />}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Password must be 6 chars long",
                    },
                  })}
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && (
                  <ErrorLabel err={errors.password?.message} />
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="confirm-password"
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Confirm password is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Password must be 6 chars long",
                    },
                    validate: {
                      isMatch: (cpassword) => {
                        if (cpassword !== password) {
                          return "Your passwords do not match";
                        }
                      },
                    },
                  })}
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.confirmPassword && (
                  <ErrorLabel err={errors.confirmPassword?.message} />
                )}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Signin here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;
