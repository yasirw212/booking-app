import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query';
import { signIn } from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { Router, useNavigate } from 'react-router-dom';

export type SignInFormData = {
    email: string;
    password: string
}

export const SignIn = () => {
    const { register, handleSubmit, formState: {errors} } = useForm<SignInFormData>()
    const { showToast } = useAppContext()
    const navigate = useNavigate();

    const mutation = useMutation(signIn, {
        onSuccess: async () => {
            showToast({message: "Sign in Successful!", type: "SUCCESS"})
            navigate("/")
        },

        onError: async (error: Error) => {
            showToast({message: error.message, type: "ERROR"})
        }
    })

    // handleSubmit will make sure the form and it's fields are valid
    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data)
    })

  return (
    <form action="" className='flex flex-col gap-5' onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold"></h2>

        <label htmlFor="" className="text-gray-700 text-small font-bold flex-1">
          Email
          <input className='border rounded w-full py-1 px-2 font-normal' {...register("email", {required: "This field is required"})} type="email" />
          {errors.email && (
            <span className="red-text-500">{errors.email.message}</span>
          )}
      </label>
      <label htmlFor="" className="text-gray-700 text-small font-bold flex-1">
          Password
          <input 
          className='border rounded w-full py-1 px-2 font-normal' 
          {...register("password", {
            required: "This field is required", 
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters"
            }
          })} 
          type="password" />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
      </label><span>
        <button type='submit' className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
          Sign In
        </button>
      </span>
    </form>
  )
}



export default SignIn