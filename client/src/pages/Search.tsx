import React, { useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useQuery } from "react-query";
import { searchHotels } from "../api-client";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import HotelFacilitiesFilter from "../components/HotelFacilitiesFilter";
import PriceFilter from "../components/PriceFilter";
import SortOption from "../components/SortOption";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedHotelFacilities, setSelectedHotelFacilities] = useState<
    string[]
  >([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string | undefined>();
 
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedHotelFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption: sortOption
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    searchHotels(searchParams)
  );

  const handleStarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prevHotelTypes) =>
      event.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((prevHotelType) => prevHotelType !== hotelType)
    );
  };

  const handleHotelFacilityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelFacility = event.target.value;

    setSelectedHotelFacilities((prevHotelFacilities) =>
      event.target.checked
        ? [...prevHotelFacilities, hotelFacility]
        : prevHotelFacilities?.filter(
            (prevFacility) => prevFacility !== hotelFacility
          )
    );
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <HotelFacilitiesFilter
            selectedHotelFacilities={selectedHotelFacilities}
            onChange={handleHotelFacilityChange}
          />
          <PriceFilter selectedPrice={selectedPrice} onChange={(value?: number) => setSelectedPrice(value) } />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.data.length} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <SortOption selectedSortOption={sortOption} onChange={(e) => setSortOption(e.target.value)}/>
        </div>
        {hotelData?.data.map((hotel) => (
          <SearchResultCard hotel={hotel} />
        ))}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
