
import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForm'

const GuestsSection = () => {
    const { register, formState: { errors }} = useFormContext<HotelFormData>();

  return (
    <div className=''>
        <h2 className='text-2xl font-bold'>Guests</h2>
        <div className='grid grid-cols-2 gap-5 bg-gray-300 p-6 mt-3'>
            <label className='flex flex-col text-gray-700'>
                Adults
                <select className='mt-1' {...register("adultCount", {
                    required: "This field id required"
                })}>
                    {[1, 2, 3, 4, 5].map((num, index) => (
                        <option key={index} value={num}>{num}</option>
                    ))}
                </select>
                {errors.adultCount && (
                    <span className='text-red-500 text-sm font-bold'>{errors.adultCount.message}</span>
                )}
            </label>
            <label className='flex flex-col text-small text-gray-700'>
                Children
                <select className='mt-1' {...register("childCount", {
                    required: "This field is required"
                })}>
                    {[0,1,2,3,4,5].map((num, index) => (
                        <option key={index} value={num}>{num}</option>
                    ))}
                </select>
                {errors.childCount && (
                    <span className='text-red-500 text-sm font-bold'>{errors.childCount.message}</span>
                )}
            </label>
        </div>
    </div>
  )
}

export default GuestsSection