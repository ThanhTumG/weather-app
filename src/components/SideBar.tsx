import React from "react";
import { useAppContext } from "../appContext/useAppContext";
import WeatherIcon from "./WeatherIcon";
import { LocateFixed, MapPin } from "lucide-react";
const SideBar: React.FC = () => {
  const {
    weatherToday,
    locationName,
    modal,
    setModal,
    getCurrentWeather,
    isFahrenheit,
  } = useAppContext();

  const currentDate = new Date()
    .toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    })
    .replace(",", "");

  return modal ? (
    <></>
  ) : (
    <div className="flex flex-1 items-center justify-between py-10 md:py-6  flex-col w-full">
      <div className="flex items-center  justify-between w-[85%]">
        <button
          onClick={() => setModal(true)}
          className="flex justify-center space-x-2 items-center bg-[#6E707A] w-[161px] h-[40px]
                        drop-shadow-[0px_4px_4px_rgba(0,0,0,0.45)] hover:bg-[#AEAEAE] focus:bg-[#AEAEAE]
                        hover:drop-shadow-none focus:drop-shadow-none cursor-pointer"
        >
          <p className="text-[#E7E7EB] ">Search for place</p>
        </button>
        <button
          onClick={() => getCurrentWeather()}
          className="flex items-center w-[40px] h-[40px] rounded-full drop-shadow-[0px_4px_4px_rgba(0,0,0,0.45)] hover:drop-shadow-[0px_4px_4px_rgba(0,0,0,1)] justify-center bg-white/[.2] cursor-pointer"
        >
          <LocateFixed size={20} className="text-[#E7E7EB]" />
        </button>
      </div>
      <div className="flex bg-[url('./cloud.svg')] items-center justify-center mt-3 w-full min-h-[300px] md:min-h-[37%] bg-contain">
        <div className="w-[50%] animate-bounce-x">
          <WeatherIcon name={weatherToday ? weatherToday.weather : ""} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-10 ">
        <div className="flex justify-center items-center my-[-5px]">
          <p className="text-[#E7E7EB] text-[135px]">
            {isFahrenheit && weatherToday
              ? Math.floor(weatherToday.temp * (9 / 5) + 32)
              : weatherToday?.temp}
          </p>
          <p className="text-[#A09FB1] text-[50px]">
            º{isFahrenheit ? "F" : "C"}
          </p>
        </div>
        <p className="text-[#A09FB1] text-[36px] capitalize">
          {weatherToday?.weather}
        </p>
        <div className="flex flex-col text-[#88869D] text-[18px]">
          <p className=" ">{`Today • ${currentDate}`}</p>
          <div className="flex items-center justify-center space-x-1">
            <MapPin />
            <p>{locationName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
