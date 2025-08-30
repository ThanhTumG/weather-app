import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useAppContext } from "../appContext/useAppContext";

function LocationMarker({
  onSelect,
}: {
  onSelect: (lat: number, lon: number) => void;
}) {
  const { location, setLocation } = useAppContext();

  useMapEvents({
    click(e) {
      setLocation({ lat: e.latlng.lat, lon: e.latlng.lng });
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return location === null ? null : (
    <Marker position={[location.lat, location.lon]}></Marker>
  );
}

export default function WeatherMap({
  onLocationSelect,
  loc,
}: {
  onLocationSelect: (lat: number, lon: number) => void;
  loc: { lat: number; lon: number } | null;
}) {
  return (
    <MapContainer
      center={loc ? [loc.lat, loc.lon] : [10.762622, 106.660172]}
      zoom={9}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <LocationMarker onSelect={onLocationSelect} />
    </MapContainer>
  );
}
