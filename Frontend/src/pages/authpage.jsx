import { useState } from "react";

import Register from "../components/Register";
import Login from "../components/Login";

function AuthPage() {
  const [isLogin, setIsLogin] =
    useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-10">
        {/* LOGO/TITLE */}
        <h1 className="text-5xl font-bold text-center text-green-500 mb-6">
          AI Platform
        </h1>

        <h2 className="text-2xl font-semibold text-center mb-8">
          {isLogin
            ? "Enter your login credentials"
            : "Create your account"}
        </h2>

        {/* FORM */}
        {isLogin ? (
          <Login />
        ) : (
          <Register />
        )}

        {/* TOGGLE */}
        <p className="text-center mt-8 text-gray-600">
          {isLogin
            ? "Not registered?"
            : "Already have an account?"}

          <button
            onClick={() =>
              setIsLogin(!isLogin)
            }
            className="text-blue-500 ml-2 hover:underline"
          >
            {isLogin
              ? "Create an account"
              : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;