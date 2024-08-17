import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpUserMutation } from "../../../features";
import { showErrorToast } from "../../../services/showErrorToast";
import toast from "react-hot-toast";
import SimpleInput from "../../../components/CustomInput/SimpleInput";

const SignUpUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [signUp, { isLoading, isError }] = useSignUpUserMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    //Add your sign-up logic here
    console.log(
      "Sign Up clicked with email:",
      email,
      "and password:",
      password,
      "and code:",
      secretCode
    );
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await signUp({
        firstName,
        lastName,
        email,
        password,
      }).unwrap();

      toast.success("Sign up successful! You can now sign in.");
      navigate("/");
    } catch (error) {
      showErrorToast(error);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <SimpleInput
            name="firstName"
            label="First Name"
            onChange={(value) => setFirstName(value)}
            type="text"
            id="firstName"
            value={firstName}
            placeholder="First Name"
            required
          />
          <SimpleInput
            name="lastName"
            label="Last Name"
            onChange={(value) => setLastName(value)}
            type="text"
            id="lastName"
            value={lastName}
            placeholder="Last Name"
            required
          />
          <SimpleInput
            name="email"
            label="Email"
            onChange={(value) => setEmail(value)}
            type="email"
            id="email"
            value={email}
            placeholder="Email"
            required
          />
          <SimpleInput
            name="password"
            label="Password"
            onChange={(value) => setPassword(value)}
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            required
          />
          <SimpleInput
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            onChange={(value) => setConfirmPassword(value)}
            type="password"
            value={confirmPassword}
            placeholder="Re-enter password"
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
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/signin" className="underline hover:text-slate-500">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpUser;
