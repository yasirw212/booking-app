
import { useMutation } from 'react-query'
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm'
import { useAppContext } from '../contexts/AppContext';
import { addMyHotel } from '../api-client';
import { useNavigate } from 'react-router-dom';


export const AddHotel = () => {
    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const { mutate, isLoading } = useMutation(addMyHotel, {
        onSuccess: () => {
            showToast({ message: "Hotel Saved!", type: "SUCCESS"})
            navigate("/my-hotels")
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