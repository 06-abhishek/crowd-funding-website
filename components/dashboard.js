"use client";
import React, { useEffect, useState } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchUser, updateProfile } from "@/actions/userAction";

const Dashboard = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({});
  const [profileUpdated, setProfileUpdated] = useState(false);

  useEffect(() => {
    getData();
    if (!session) {
      router.push;
    }
  }, [router, session]);

  const getData = async () => {
    let u = await fetchUser(session.user.name);
    setForm(u);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page

    let a = await updateProfile(form, session.user.name);

    setProfileUpdated(true);
    setTimeout(() => {
      setProfileUpdated(false);
    }, 5000);
  };

  return (
    <>
      {profileUpdated && (
        <div className="flex justify-end fixed top-8 right-8 z-50">
          <div
            id="toast-success"
            className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow"
            role="alert"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="sr-only">Check icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">
              Profile Updated
            </div>
            <button
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
              data-dismiss-target="#toast-success"
              aria-label="Close"
              onClick={() => {
                setProfileUpdated(false);
              }}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <form
        className="flex flex-col items-center mt-12"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-2xl text-center mb-7">
          Welcome to your Profile !
        </h1>

        {/* Input for Name */}
        <div className="mb-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Name
          </label>
          <input
            required
            value={form.name ? form.name : ""}
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
            placeholder="Enter Name"
            className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg p-2 w-[40vw]"
          />
        </div>

        {/* Input for Email */}
        <div className="mb-2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            required
            value={form.email ? form.email : ""}
            onChange={handleChange}
            type="text"
            name="email"
            id="email"
            placeholder="Enter Email"
            className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg p-2 w-[40vw]"
          />
        </div>

        {/* Input for Username */}
        <div className="mb-2">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Username
          </label>
          <input
            required
            value={form.username ? form.username : ""}
            onChange={handleChange}
            type="text"
            name="username"
            id="username"
            placeholder="Enter Username"
            className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg p-2 w-[40vw]"
          />
        </div>

        {/* Input for Passion (Bio) */}
        <div className="mb-2">
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Role
          </label>
          <input
            required
            value={form.role ? form.role : ""}
            onChange={handleChange}
            type="text"
            name="role"
            id="role"
            placeholder="Enter Role"
            className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg p-2 w-[40vw]"
          />
        </div>

        {/* Input for Profile Picture */}
        <div className="mb-2">
          <label
            htmlFor="profilePic"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Profile Picture
          </label>
          <input
            required
            value={form.profilePic ? form.profilePic : ""}
            onChange={handleChange}
            type="text"
            name="profilePic"
            id="profilePic"
            placeholder="Enter Profile Picture"
            className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg p-2 w-[40vw]"
          />
        </div>

        {/* Input for Razorpay ID */}
        <div className="mb-2">
          <label
            htmlFor="razorpayid"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Razorpay ID
          </label>
          <input
            required
            value={form.razorpayid ? form.razorpayid : ""}
            onChange={handleChange}
            type="password"
            name="razorpayid"
            id="razorpayid"
            placeholder="Enter Razorpay ID"
            className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg p-2 w-[40vw]"
          />
        </div>

        {/* Input for Razorpay SECRET */}
        <div className="mb-2">
          <label
            htmlFor="razorpaysecret"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Razorpay Secret
          </label>
          <input
            required
            value={form.razorpaysecret ? form.razorpaysecret : ""}
            onChange={handleChange}
            type="password"
            name="razorpaysecret"
            id="razorpaysecret"
            placeholder="Enter Razorpay Secret"
            className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg p-2 w-[40vw]"
          />
        </div>

        <button
          className="w-[40vw] text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-7 py-2 cursor-pointer"
          type="submit"
        >
          Save
        </button>
      </form>
    </>
  );
};

export default Dashboard;
