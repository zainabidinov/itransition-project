import React from "react";
import { Button, Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../components/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../components/icons/EyeFilledIcon";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../api/logIn";
import { toast, Toaster } from "sonner";
import { UserProfile } from "../types/types";

const LogIn: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik<UserProfile>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await logIn(values);
        if (response.success === false) {
          toast.error(response.message);
        }
        if (response.success === true) {
          localStorage.setItem("token", response.token);
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
          <h1 className='text-2xl mb-2'>Log In</h1>
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
            LOGIN
          </Button>

          <span className='text-center'>
            Don't have an account yet?
            <Link to='/signup' className='hover:underline ml-1'>
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
