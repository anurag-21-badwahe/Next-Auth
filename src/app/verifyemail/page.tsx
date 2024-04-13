"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error:any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token,verifyUserEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Verify Email</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg mb-4">{token ? `Token: ${token}` : "No token"}</h2>
        {verified && (
          <div>
            <h2 className="text-lg mb-4">Email Verified</h2>
            <Link href="/login">
              <a className="text-blue-500">Login</a>
            </Link>
          </div>
        )}
        {error && (
          <div>
            <h2 className="text-lg text-red-500 mb-4">Error</h2>
          </div>
        )}
      </div>
    </div>
  );
}
