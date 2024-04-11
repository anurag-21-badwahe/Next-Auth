"use client"
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  userName: string;
  email: string;
  password: string;
}

const SignupForm: React.FC = () => {

  const formik = useFormik<FormValues>({
    initialValues: {
      userName: '',
      email: '',
      password: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: Yup.object().shape({
      userName: Yup.string().required('User Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long'),
    }),
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full">
        <h2 className="text-center text-3xl font-semibold mb-4">Sign Up</h2>
        <form className="p-6 bg-gray-100 rounded-md shadow-md" onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userName" className="block text-gray-700 font-bold mb-2">User Name</label>
            <input
              id="userName"
              name="userName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.userName}
              className={`form-input w-full px-4 py-2 rounded-md border-gray-300 ${formik.errors.userName ? 'border-red-500' : ''}`}
            />
            {formik.errors.userName && <p className="text-red-500 text-xs mt-1">{formik.errors.userName}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className={`form-input w-full px-4 py-2 rounded-md border-gray-300 ${formik.errors.email ? 'border-red-500' : ''}`}
            />
            {formik.errors.email && <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className={`form-input w-full px-4 py-2 rounded-md border-gray-300 ${formik.errors.password ? 'border-red-500' : ''}`}
            />
            {formik.errors.password && <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>}
          </div>

          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4 w-full">Submit</button>
          
          <div className="flex justify-between">
            <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 w-1/2 mr-2">Login with Google</button>
            <button className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 w-1/2 ml-2">Login with GitHub</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
