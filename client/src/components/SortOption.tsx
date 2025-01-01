import React from 'react'

type Props = {
    selectedSortOption?: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void 
}

const SortOption = ({selectedSortOption, onChange}: Props) => {
  return (
    <select className='p-2 border rounded-md' value={selectedSortOption} onChange={onChange}>
        <option className='' value="">Sort By</option>
        <option value="starRating" >Star Rating</option>
        <option value="pricePerNightDesc" >Price Per Night(high to low)</option>
        <option value="pricePerNightAsc" >Price Per Night(low to high)</option>
    </select>
  )
}

export default SortOption