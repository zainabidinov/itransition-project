import React from "react";
import { useTheme } from "next-themes";
import { Button, Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../components/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../components/EyeFilledIcon";
import { useFormik } from "formik";
import * as Yup from "yup";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

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

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Values", values);
    },
  });

  const { theme, setTheme } = useTheme();
  return (
    <div className='h-screen w-screen'>
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
                  <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                ) : (
                  <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                )}
              </button>
            }
          />
          <Button color='primary' type='submit'>
            Sign Up
          </Button>
        </form>
      </div>
      <Button
        color='primary'
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        Switch Theme
      </Button>{" "}
      */
    </div>
  );
};

export default SignUp;

// const { theme, setTheme } = useTheme();
