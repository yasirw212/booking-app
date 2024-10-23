import { useMutation, useQueryClient } from 'react-query'
import { signOut } from '../api-client';
import { useAppContext } from '../contexts/AppContext';

const SignOutButton = () => {
    const  queryClient = useQueryClient();
    const { showToast } = useAppContext();

    const mutation = useMutation(signOut, {
        onSuccess: async () => {
            console.log('1')
            await queryClient.invalidateQueries("validateToken");
            showToast({message: "Signed Out!", type: "SUCCESS"});
            console.log('2')
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