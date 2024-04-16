import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { setAuthState, useSignInMutation } from "../../features";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, { isLoading, isError }] = useSignInMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const resultAction = await signIn({ email, password });


      localStorage.setItem("token", resultAction.data.token);
      localStorage.setItem("adminId", resultAction.data.adminId);

      dispatch(setAuthState());
      navigate("/admin");
    } catch (err) {
      toast.error(err.data.message);
    }

    // localStorage.setItem("token", authData.token);
    // localStorage.setItem("adminId", authData.adminId);
    // const remainingMilliseconds = 60 * 60 * 1000;
    //     const expiryDate = new Date(
    //       new Date().getTime() + remainingMilliseconds
    //     );
    //     localStorage.setItem('expiryDate', expiryDate.toISOString());
    //     this.setAutoLogout(remainingMilliseconds);

    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem('token')}`
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div>
        <Toaster />
      </div>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign In
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 h-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 h-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/admin_auth/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
