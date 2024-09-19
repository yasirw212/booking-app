import React from 'react'

type Props = {}

const Register = (props: Props) => {
  return (
    <form action="" className="flex flex-col gap-5">
        <h2 className='text-3xl font-bold'>Create an Account</h2>
        <div className="flex flex-col md:flex-row gap-5">
            <label htmlFor="" className="text-gray-700 text-small font-bold flex-1">
                First Name
                <input className='border rounded w-full py-1 px-2 font-normal' type="text" />
            </label>
            <label htmlFor="" className="text-gray-700 text-small font-bold flex-1">
                Last Name
                <input className='border rounded w-full py-1 px-2 font-normal' type="text" />
            </label>
        </div>
    </form>
  )
}

export default Register