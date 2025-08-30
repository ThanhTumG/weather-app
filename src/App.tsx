import { AppProvider } from "./appContext/WeatherAppProvider";
import DetailWeather from "./components/DetailWeather";
import SearchLocation from "./components/SearchLocation";
import SideBar from "./components/SideBar";
import "./components/ui/fixLeafletIcon";

function App() {
  return (
    <AppProvider>
      <div className="flex flex-1 md:flex-row flex-col font-raleway min-h-screen">
        <div className="flex items-center min-h-screen justify-start relative flex-col md:w-[30%] w-full bg-[#1E213A]">
          <SearchLocation />
          <SideBar />
        </div>
        <DetailWeather />
      </div>
    </AppProvider>
  );
}

export default App;
