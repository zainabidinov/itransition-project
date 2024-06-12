import React from "react";
import { Button, Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../components/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../components/icons/EyeFilledIcon";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { UserProfile } from "../types/types";
import { signUp } from "../api/signUp";
import { Toaster, toast } from "sonner";

const SignUp: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Must be minimum 2 characters")
      .required("First Name is required"),
    lastName: Yup.string()
      .min(2, "Must be minimum 2 characters")
      .required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik<UserProfile>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await signUp(values);
        if (response.success === false) {
          toast.error(response.message);
        }
        if (response.success === true) {
          localStorage.setItem('token', response.token);
          navigate("/collections");
          formik.resetForm();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className='h-screen w-screen'>
      <Toaster richColors position='top-right' />
      <div className='flex justify-center items-center h-full w-full'>
        <form
          onSubmit={formik.handleSubmit}
          className='flex flex-col gap-4 border-1 p-12 shadow-lg rounded-lg'
        >
          <h1 className='text-2xl mb-2'>Sign Up</h1>
          <Input
            type='text'
            label='First Name'
            name='firstName'
            variant='bordered'
            size='sm'
            isRequired
            className='w-80'
            onValueChange={(value) => formik.setFieldValue("firstName", value)}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            errorMessage={
              formik.touched.firstName && formik.errors.firstName ? (
                <div>{formik.errors.firstName}</div>
              ) : null
            }
          />
          <Input
            type='text'
            label='Last Name'
            name='lastName'
            variant='bordered'
            className='w-80'
            size='sm'
            isRequired
            onValueChange={(value) => formik.setFieldValue("lastName", value)}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            errorMessage={
              formik.touched.lastName && formik.errors.lastName ? (
                <div>{formik.errors.lastName}</div>
              ) : null
            }
          />
          <Input
            type='email'
            name='email'
            label='Email'
            variant='bordered'
            className='w-80'
            size='sm'
            isRequired
            onValueChange={(value) => formik.setFieldValue("email", value)}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            errorMessage={
              formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null
            }
          />
          <Input
            type={isVisible ? "text" : "password"}
            label='Password'
            name='password'
            variant='bordered'
            className='w-80'
            size='sm'
            isRequired
            onValueChange={(value) => formik.setFieldValue("password", value)}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            errorMessage={
              formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null
            }
            endContent={
              <button
                className='focus:outline-none'
                type='button'
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none mb-1.5' />
                ) : (
                  <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none mb-1.5' />
                )}
              </button>
            }
          />
          <Button className='bg-[#1e1e1c] text-white' type='submit'>
            SIGN UP
          </Button>

          <span className='text-center'>
            Already have an account?{" "}
            <Link to='/login' className='hover:underline'>
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

// const { theme, setTheme } = useTheme();
