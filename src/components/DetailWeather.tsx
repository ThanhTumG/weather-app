import { useAppContext } from "../appContext/useAppContext";
import WeatherWidget from "./WeatherWidget";
import { Navigation2 } from "lucide-react";
function DetailWeather() {
  const today = new Date();
  const { setIsFahrenheit, isFahrenheit, weather4Days, weatherToday } =
    useAppContext();

  const windDirection = (deg: number) => {
    let direction = "";
    let rotate = "";
    if ((deg > 348.75 && deg <= 360) || (deg >= 0 && deg <= 11.25))
      direction = "N";
    else if (deg > 11.25 && deg <= 33.75) {
      direction = "NNE";
      rotate = "rotate-[22.5deg]";
    } else if (deg > 33.75 && deg <= 56.25) {
      direction = "NE";
      rotate = "rotate-45";
    } else if (deg > 56.25 && deg <= 78.75) {
      direction = "ENE";
      rotate = "rotate-[67.5deg]";
    } else if (deg > 78.75 && deg <= 101.25) {
      direction = "E";
      rotate = "rotate-90";
    } else if (deg > 101.25 && deg <= 123.75) {
      direction = "ESE";
      rotate = "rotate-[112.5deg]";
    } else if (deg > 123.75 && deg <= 146.25) {
      direction = "SE";
      rotate = "rotate-[135deg]";
    } else if (deg > 146.25 && deg <= 168.75) {
      direction = "SSE";
      rotate = "rotate-[157.5deg]";
    } else if (deg > 168.75 && deg <= 191.25) {
      direction = "S";
      rotate = "rotate-180";
    } else if (deg > 191.25 && deg <= 213.75) {
      direction = "SSW";
      rotate = "rotate-[202.5deg]";
    } else if (deg > 213.75 && deg <= 236.25) {
      direction = "SW";
      rotate = "rotate-[225deg]";
    } else if (deg > 236.25 && deg <= 258.75) {
      direction = "WSW";
      rotate = "rotate-[247.5deg]";
    } else if (deg > 258.75 && deg <= 281.25) {
      direction = "W";
      rotate = "rotate-[270deg]";
    } else if (deg > 281.25 && deg <= 303.75) {
      direction = "WNW";
      rotate = "rotate-[292.5deg]";
    } else if (deg > 303.75 && deg <= 326.25) {
      direction = "NW";
      rotate = "rotate-[315deg]";
    } else if (deg > 326.25 && deg <= 348.75) {
      direction = "NNW";
      rotate = "rotate-[337.5deg]";
    } else direction = "unknown";
    return (
      <div className="flex items-center justify-center space-x-2">
        <div className="flex items-center w-[30px] h-[30px] justify-center rounded-full bg-white/[.3]">
          <Navigation2 size={20} className={`transform  ${rotate}`} />
        </div>
        <p className="font-[500] text-center text-[14px]">{direction}</p>
      </div>
    );
  };

  return (
    <div className="flex items-center flex-col md:w-[70%] w-full bg-[#100E1D] pt-6 pb-10 px-[15%] space-y-10">
      <div className="flex place-self-end space-x-2   ">
        <button
          onClick={() => setIsFahrenheit(false)}
          className={`w-[40px] h-[40px] rounded-full text-[18px] font-[700] text-center cursor-pointer ${
            isFahrenheit
              ? "bg-[#585676] text-[#E7E7EB]"
              : "bg-[#E7E7EB] text-[#110E3C]"
          }`}
        >
          &deg;C
        </button>
        <button
          onClick={() => setIsFahrenheit(true)}
          className={`w-[40px] h-[40px] rounded-full text-[18px] font-[700] text-center cursor-pointer ${
            !isFahrenheit
              ? "bg-[#585676] text-[#E7E7EB]"
              : "bg-[#E7E7EB] text-[#110E3C]"
          }`}
        >
          &deg;F
        </button>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-6 self-center">
        {weather4Days.map((weather, index) => (
          <WeatherWidget
            key={index}
            date={{ today: today, index: index }}
            weather={weather.weather[0].description}
            isFahrenheit={isFahrenheit}
            temp={[
              Math.max(...weather.tempRange),
              Math.min(...weather.tempRange),
            ]}
          />
        ))}
      </div>
      <div className="flex flex-col text-[#E7E7EB] w-[90%] space-y-6">
        <p className="text-left  font-[700] text-[24px]">
          Today’s Hightlights{" "}
        </p>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 self-center w-full">
          {/* Wind */}
          <div className="flex flex-col rounded items-center justify-between h-[204px] bg-[#1E213A] py-4">
            <p className="text-center text-[16px]">Wind status</p>
            <div className="flex items-center">
              <p className="text-center font-[700] text-[64px]">
                {weatherToday?.windSpeed}
              </p>
              <p className="text-center font-[500] text-[36px]">{`mph`}</p>
            </div>
            {windDirection(weatherToday ? weatherToday.windDeg : 0)}
          </div>
          {/* Humidity */}
          <div className="flex flex-col rounded items-center justify-between h-[204px] bg-[#1E213A] py-4">
            <p className="text-center text-[16px]">Humidity</p>
            <div className="flex items-center">
              <p className="text-center font-[700] text-[64px]">
                {weatherToday?.humidity}
              </p>
              <p className="text-center font-[400] text-[36px]">%</p>
            </div>
            <div className="flex flex-col justify-center w-[70%] ">
              <div className="flex justify-between items-center">
                <label className="place-self-end text-[12px] text-[#A09FB1] font-[700]">
                  0
                </label>
                <label className="place-self-end text-[12px] text-[#A09FB1] font-[700]">
                  50
                </label>
                <label className="place-self-end text-[12px] text-[#A09FB1] font-[700]">
                  100
                </label>
              </div>
              <span className="relative rounded-[80px] w-full  block h-[8px]  bg-[#E7E7EB]  ">
                <span
                  style={{ width: `${weatherToday?.humidity}%` }}
                  className="absolute rounded-[80px]  block h-[8px] bg-[#FFEC65]  transition-all duration-300"
                ></span>
              </span>
              <label className="place-self-end text-[12px] text-[#A09FB1] font-[700]">
                %
              </label>
            </div>
          </div>
          {/* Visibility */}
          <div className="flex items-center flex-col rounded h-[159px] py-4 bg-[#1E213A]">
            <p className="text-center text-[16px]">Visibility</p>
            <div className="flex items-center space-x-2">
              <p className="text-center font-[700] text-[64px]">
                {weatherToday?.visibility}
              </p>
              <p className="text-center font-[500] text-[36px]">miles</p>
            </div>
          </div>
          {/* Air Pressure */}
          <div className="flex items-center flex-col rounded h-[159px] py-4 bg-[#1E213A]">
            <p className="text-center text-[16px]">Air Pressure</p>
            <div className="flex items-center space-x-2">
              <p className="text-center font-[700] text-[64px]">
                {weatherToday?.airPressure}
              </p>
              <p className="text-center font-[500] text-[36px]">mb</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailWeather;
