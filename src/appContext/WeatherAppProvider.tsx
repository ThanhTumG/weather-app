import { useCallback, useEffect, useState, type ReactNode } from "react";
import { getWeatherByLocation } from "../api/WeatherAppAPI";
import {
  AppContext,
  type weather4Days,
  type WeatherData,
  type WeatherToday,
} from "./AppContext";
import { getCurrentPosition } from "../utils/getCurrentLocation";

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [locationName, setLocationName] = useState<string>("Unknown");
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [dataList, setDataList] = useState<WeatherData[] | null>(null);
  const [weatherToday, setWeatherToday] = useState<WeatherToday | null>(null);
  const [isFahrenheit, setIsFahrenheit] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [weather4Days, setWeather4Days] = useState<weather4Days[]>([]);

  const getWeatherDataByLocation = async (lat: number, lon: number) => {
    const newWeather = await getWeatherByLocation(lat, lon);
    setLocationName(newWeather.city.name);
    setDataList(newWeather.list);
  };

  const getData = useCallback(() => {
    const weatherNext4Day = dataList?.filter((_, index) => {
      if (index % 8 === 0 && index !== 0) return true;
      return false;
    });
    let tempRange4Day: number[][] = [];
    let tempRange: number[] = [];
    let day = dataList ? new Date(dataList[0].dt_txt).getDate() : 0;
    dataList?.forEach((ele) => {
      if (new Date(ele.dt_txt).getDate() === day) {
        tempRange.push(ele.main.temp);
      } else {
        day = new Date(ele.dt_txt).getDate();
        tempRange4Day.push(tempRange);
        tempRange = [];
        tempRange.push(ele.main.temp);
      }
    });
    if (tempRange.length) tempRange4Day.push(tempRange);
    tempRange4Day = tempRange4Day.slice(1, 5); // get next 4 day

    const returnArr: weather4Days[] = weatherNext4Day
      ? weatherNext4Day.map((weather, index) => {
          return { ...weather, tempRange: tempRange4Day[index] };
        })
      : [];

    setWeather4Days(returnArr);
    const weather = dataList ? dataList[0] : null;
    if (weather)
      setWeatherToday({
        weather: weather.weather[0].description,
        temp: Math.floor(weather.main.temp),
        windSpeed: Math.ceil(weather.wind.speed * 2.23693629),
        windDeg: weather.wind.deg,
        humidity: weather.main.humidity,
        visibility: parseFloat(
          (weather.visibility * 0.000621371192).toFixed(1)
        ),
        airPressure: weather.main.pressure,
      });
  }, [dataList]);

  useEffect(() => {
    if (dataList) getData();
  }, [dataList, getData]);

  useEffect(() => {
    const getCurrentWeather = async () => {
      const pos = await getCurrentPosition();
      if (pos?.latitude && pos.longitude) {
        setLocation({ lat: pos.latitude, lon: pos.longitude });
        getWeatherDataByLocation(pos.latitude, pos.longitude);
      }
    };
    getCurrentWeather();
  }, []);
  return (
    <AppContext.Provider
      value={{
        locationName,
        setLocationName,
        location,
        setLocation,
        dataList,
        setDataList,
        modal,
        setModal,
        weatherToday,
        setWeatherToday,
        getWeatherDataByLocation,
        isFahrenheit,
        setIsFahrenheit,
        weather4Days,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
