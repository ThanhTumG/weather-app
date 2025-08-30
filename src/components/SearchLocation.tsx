import React, { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar";
import { ChevronRight, Search, X } from "lucide-react";
import { getCity, getWeatherByCity } from "../api/WeatherAppAPI";
import { useAppContext } from "../appContext/useAppContext";
import WeatherMap from "./Map";

interface countryData {
  country: string;
  cities: string[];
}
const SearchLocation: React.FC = () => {
  const {
    setLocationName,
    location,
    setDataList,
    getWeatherDataByLocation,
    setModal,
    modal,
  } = useAppContext();
  const [inputText, setInputText] = useState("");
  const [country, setCountry] = useState<string[]>([]);
  const [result, setResult] = useState<string[]>([]);
  const Capitalize = (Str: string) => {
    return Str.split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const handleGetWeatherByCity = async (city: string) => {
    if (city === "") return;
    try {
      const weather = await getWeatherByCity(city);
      setLocationName(weather.city.name);
      setDataList(weather.list);
      setModal(false);
      setInputText("");
      setResult([]);
    } catch {
      alert(
        `${Capitalize(
          city
        )} is either not valid or the data has not been updated yet.`
      );
    }
  };
  useEffect(() => {
    const fetchCountries = async () => {
      const result: countryData[] = await getCity();
      const returnData = result.reduce((prev, curr) => {
        const cities = curr.cities.map((city) => city.toLowerCase());
        return prev.concat(cities);
      }, [] as string[]);
      setCountry(returnData);
    };
    fetchCountries();
  }, []);

  const handleSelect = (lat: number, lon: number) => {
    getWeatherDataByLocation(lat, lon);
    setModal(false);
    setInputText("");
    setResult([]);
  };

  return modal ? (
    <div className="h-full w-full animate-fade-in absolute inset-0 pt-6 z-40 bg-[#1E213A] items-center justify-start space-y-8 flex-col ">
      <div className="flex items-center flex-col space-y-5 w-full">
        <X
          onClick={() => {
            setModal(false);
            setInputText("");
            setResult([]);
          }}
          className="z-50 ml-6 place-self-start text-[#E7E7EB] cursor-pointer"
        />
        <div className="flex justify-between w-[85%]">
          <label className="text-[#E7E7EB] bg-transparent px-3 focus:outline-none flex items-center w-[70%] h-[48px] border-2 border-[#E7E7EB] ">
            <div className="text-[#616475]">
              <Search />
            </div>
            <SearchBar
              placeholder="search location"
              inputText={inputText}
              setInputText={setInputText}
              listData={country}
              setResults={setResult}
            ></SearchBar>
          </label>

          <button
            onClick={(e) => {
              handleGetWeatherByCity(inputText);
              e.currentTarget.blur();
            }}
            className="flex justify-center rounded space-x-2 items-center bg-[#3C47E9] w-[86px] h-[48px] 
                    hover:bg-[#0039CB] focus:bg-[#0039CB] 
                     text-[#E7E7EB] cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>
      {result.length > 0 ? (
        <div className="flex items-center flex-col space-y-2 overflow-y-auto  justify-start w-[85%]">
          {result.slice(0, 10).map((result, index) => (
            <button
              key={index}
              onClick={() => {
                handleGetWeatherByCity(result);
                setInputText(Capitalize(result));
              }}
              className="flex justify-between items-center px-4 w-full h-[55px] text-[#E7E7EB] 
            font-[500] text-[16px] hover:border-2 hover:border-[#616475]"
            >
              <p className="capitalize">{result}</p>
              <ChevronRight />
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-md m-5 height-[500px] w-auto overflow-hidden">
          <WeatherMap onLocationSelect={handleSelect} loc={location} />
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};
export default SearchLocation;
