"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState({ id: "", name: "Nothing" });
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    const { _id, username } = res.data.data;
    setUserData({ id: _id, name: username });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full">
        <h2 className="text-center text-3xl font-semibold mb-4">Profile</h2>
        <div className="bg-white p-6 rounded-md shadow-md">
          <p className="text-lg mb-4">Profile page</p>
          <div className="bg-green-500 rounded p-1 mb-4 text-center">
            {userData.id === "" ? (
              <p className="text-white">Nothing</p>
            ) : (
              <Link href={`/profile/${userData.id}`}>
                <p className="text-white">{`${userData.name} : ${userData.id}`}</p>
              </Link>
            )}
          </div>
          <hr className="border-gray-300 mb-4" />
          <button
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 w-full"
          >
            Logout
          </button>
          <button
            onClick={getUserDetails}
            className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            disabled={loading} // Disable the button while data is being fetched
          >
            {loading ? "Fetching..." : "Get User Details"}
          </button>
        </div>
      </div>
    </div>
  );
}
