"use client";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormikHelpers } from "formik";
import googleIcon from "../../../public/googleIcon.png";
import githubIcon from "../../../public/githubIcon.png";
// import Component from "../components/Component";
// import SessionWrapper from "../components/SessionWrapper";

export default function SignupPage() {
  const router = useRouter();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  interface FormValues {
    username: string;
    email: string;
    password: string;
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/users/signup", values);
      // console.log("Signup success", response.data);
      alert("Signup Successfull")
      // Redirect to login page after successful signup
      router.push("/login"); // Use router.push for redirection
    } catch (error: any) {
      console.error("Signup failed", error.message);
      alert("User Already Exits")
      toast.error(error.message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    // <SessionWrapper>
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full">
        <h2 className="text-center text-3xl font-semibold mb-4">Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form className="p-6 bg-gray-100 rounded-md shadow-md">
              <div className="mb-4">
                <label
                  htmlFor="userName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  User Name
                </label>
                <Field
                  id="userName"
                  name="username"
                  type="text"
                  className={`form-input w-full px-4 py-2 rounded-md border text-black border-gray-300 ${
                    formik.errors.username ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email Address
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className={`form-input w-full px-4 py-2 rounded-md border text-black border-gray-300 ${
                    formik.errors.email ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className={`form-input w-full px-4 py-2 rounded-md border text-black border-gray-300 ${
                    formik.errors.password ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <button
                type="submit"
                className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4 w-full ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Processing..." : "Submit"}
              </button>

              {/* <div className="text-center">-------------or-------------</div>

              <div className="flex justify-between">
                <button className="bg-white py-2 px-4 rounded-md hover:bg-blue-100 w-1/2 mr-2 flex items-center justify-center">
                  <img
                    src={googleIcon.src}
                    alt="Google Icon"
                    className="w-6 h-6 mr-2"
                  />
                </button>
                <button className="bg-white py-2 px-4 rounded-md hover:bg-blue-100 w-1/2 mr-2 flex items-center justify-center">
                  <img
                    src={githubIcon.src}
                    alt="Github Icon"
                    className="w-6 h-6 mr-2"
                  />
                </button>
              </div> */}
              <div className="text-center text-blue-700 hover:bg-blue-100">
                <Link href="/login">Already have Account ? Login</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    // </SessionWrapper>
  );
}
