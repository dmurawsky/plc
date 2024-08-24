"use client";
import { signIn } from "@/services/soil/auth";
import React, { useCallback, useState } from "react";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showPasswordField, setShowPasswordField] = useState(true);

  const handleSignIn = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      signIn(email, password, setError);
    },
    [email, password]
  );

  return (
    <form className="bg-white p-4 rounded shadow-md" onSubmit={handleSignIn}>
      <div className="mb-4">
        <input
          type="email"
          name="signin-email"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {showPasswordField && (
        <div className="mb-4">
          <input
            type="password"
            name="signin-password"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      )}
      <p className="text-red-600">{error}</p>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        {showPasswordField ? "Sign In" : "Send Password Reset Email"}
      </button>
      <button
        type="button"
        onClick={() => setShowPasswordField((prev) => !prev)}
        className="mt-4"
      >
        {showPasswordField ? "Forgot Password" : "Sign In"}
      </button>
    </form>
  );
}
