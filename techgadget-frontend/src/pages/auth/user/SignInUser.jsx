import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSignInUserMutation } from "../../../features";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showErrorToast } from "../../../services/showErrorToast";
import SimpleInput from "../../../components/CustomInput/SimpleInput";

const SignInUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { pathname } = useLocation();
  const [signIn, { isLoading, isError }] = useSignInUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signIn({ email, password }).unwrap();

      toast.success("Sign in successful!");
      navigate("/");
    } catch (err) {
      showErrorToast(err);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div>
        <Toaster />
      </div>
      <div className="max-w-md w-full space-y-2">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome back!
          </h2>
        </div>
        <div>
          <h2 className="text-center text-xl font-medium text-gray-900 mb-8">
            Please sign in below!
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <SimpleInput
            name="email"
            label="Email"
            onChange={(value) => setEmail(value)}
            type="email"
            id="email"
            value={email}
            required
          />
          <SimpleInput
            name="password"
            label="Password"
            onChange={(value) => setPassword(value)}
            type="password"
            id="password"
            value={password}
            required
          />
          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white 
                ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-slate-800"
                }`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign In"}
            </button>
          </div>
        </form>
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="underline hover:text-slate-500"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInUser;
