"use client"
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full">
        <h2 className="text-center text-3xl font-semibold mb-4">Login</h2>
        <form className="p-6 bg-gray-100 rounded-md shadow-md" onSubmit={formik.handleSubmit}>
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

          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4 w-full">Login</button>
          
          <div className="text-center">
            <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
