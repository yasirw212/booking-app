import React from "react";
import { hotelFacilities } from "../config/hotel-options-config";

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedHotelFacilities: string[];
};

const HotelFacilitiesFilter = ({
  onChange,
  selectedHotelFacilities,
}: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Facilities</h4>
      {hotelFacilities.map((facility) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectedHotelFacilities.includes(facility)}
            value={facility}
            className="rounded"
            onChange={onChange}
          />
          <span>{facility}</span>
        </label>
      ))}
    </div>
  );
};

export default HotelFacilitiesFilter;
