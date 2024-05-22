import React from "react";
import { Button, Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../components/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../components/EyeFilledIcon";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

interface FormValues {
  email: string;
  password: string;
}

const LogIn: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Values", values);
    },
  });

  return (
    <div className='h-screen w-screen'>
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

          <span className='text-center '>
            Don't have an account yet?{" "}
            <Link to='/signup' className='hover:underline'>
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
