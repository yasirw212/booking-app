import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { signOut } from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {
    const  queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const navigate = useNavigate();

    const mutation = useMutation(signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken")
            showToast({message: "Signed Out!", type: "SUCCESS"})
            navigate("/sign-in")
        },

        onError: (error: Error) => {
            showToast({message: error.message, type: "ERROR"})
        }
    });
    
    const handleSignOut = () => {
        mutation.mutate()
    }

  return (
    <button onClick={handleSignOut} className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-200">
        Sign Out
    </button>
  )
}

export default SignOutButton