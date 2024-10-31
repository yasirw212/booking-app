
import { useMutation } from 'react-query'
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm'
import { useAppContext } from '../contexts/AppContext';
import { addMyHotel } from '../api-client';

export const AddHotel = () => {
    const { showToast } = useAppContext();
    const { mutate, isLoading } = useMutation(addMyHotel, {
        onSuccess: () => {
            showToast({ message: "Hotel Saved!", type: "SUCCESS"})
        }, 

        onError: () => {
            showToast({ message: "Error Saving Hotel", type: "ERROR"})
        }
    });

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData)
    }

  return (<ManageHotelForm onSave={handleSave} isLoading={isLoading} />)
}