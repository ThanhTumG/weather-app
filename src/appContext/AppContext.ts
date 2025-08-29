import { createContext } from "react";
interface AppContextProps {
  locationName: string;
  setLocationName: React.Dispatch<React.SetStateAction<string>>;
  dataList: WeatherData[] | null;
  setDataList: React.Dispatch<React.SetStateAction<WeatherData[] | null>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  weatherToday: WeatherToday | null;
  setWeatherToday: React.Dispatch<React.SetStateAction<WeatherToday | null>>;
  getCurrentWeather: () => void;
  isFahrenheit: boolean;
  setIsFahrenheit: React.Dispatch<React.SetStateAction<boolean>>;
  weather4Days: weather4Days[];
}

export interface WeatherData {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: { all: number };
  wind: { speed: number; deg: number; gust: number };
  visibility: number;
  pop: number;
  rain: { "3h": number };
  sys: { pod: string };
  dt_txt: string;
}

export interface weather4Days extends WeatherData {
  tempRange: number[];
}

export interface WeatherToday {
  weather: string;
  temp: number;
  windSpeed: number;
  windDeg: number;
  humidity: number;
  visibility: number;
  airPressure: number;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);
