"use client";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormikHelpers } from "formik";


export default function LoginPage() {
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  interface FormValues {
    email: string;
    password: string;
  }

  const validationSchema = Yup.object().shape({
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
      const response = await axios.post("/api/users/login", values);
      // console.log("Login success", response.data);
      alert("Login Successfull")
      router.push("/");
    } catch (error: any) {
      console.error("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full">
        <h2 className="text-center text-3xl font-semibold mb-4">Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form className="p-6 bg-gray-100 rounded-md shadow-md">
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
                  className={`form-input w-full px-4 py-2 rounded-md border border-gray-300 ${
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
                  className={`form-input w-full px-4 py-2 rounded-md border border-gray-300 ${
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

              <div className="text-center">
                <Link href="/signup">
                  <p className="text-blue-500 hover:underline">
                    Don&apos;t have an account? Sign Up
                  </p>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
