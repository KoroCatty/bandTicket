"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// components
import SpinnerClient from "@/components/common/SpinnerClient";

// TYPES
import type { Ticket } from "@/types/ticket";
type MapProps = {
  selectedTicket: Ticket | null;
};

import L from "leaflet";

// マーカーアイコンの設定
const markerIcon = new L.Icon({
  iconUrl: "/images/house.png",
  // iconRetinaUrl: '/marker-icon-2x.png',
  iconRetinaUrl: "/images/house.png",
  // shadowUrl: '/marker-shadow.png',
  shadowUrl: "/images/house.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapComponent = ({ position }: any) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, map.getZoom()); // Fly to the selected ticket
  }, [position, map]);
  return (
    <Marker position={position} icon={markerIcon}>
      <Popup>{position[2]}</Popup>
    </Marker>
  );
};

const Map = ({ selectedTicket }: MapProps) => {
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState<[number, number, any] | null>(null);
  const [geocodeError, setGeocodeError] = useState(false);

  useEffect(() => {
    const fetchCoords = async () => {
      if (!selectedTicket) return;
      // setLoading(true);
      try {
        const address = `${selectedTicket.location.street},${selectedTicket.location.city}, ${selectedTicket.location.state}, ${selectedTicket.location.postcode}`;
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${address},Australia`,
        );
        const data = await response.json();

        if (data.length === 0) {
          setGeocodeError(true);
          setLoading(false);
          return;
        }
        const { lat, lon } = data[0];
        setPosition([lat, lon, selectedTicket?.name]); // 場所・地名を登録
      } catch (error) {
        console.error("Failed to fetch coordinates:", error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, [selectedTicket]);

  if (geocodeError) {
    return <div className="text-2xl">No location data found</div>;
  }

  if (loading) {
    return <SpinnerClient />;
  }

  if (loading || !position) {
    return <SpinnerClient />;
  }

  return (
    <section className="flex w-[45%] max-[1000px]:w-[80%] max-[480px]:w-[100%] mx-auto mt-8">
      <div className="w-[100%]">
        {!position ? (
          <SpinnerClient />
        ) : (
          <MapContainer
            key={selectedTicket?._id} // Stop Map container is already initialized error
            center={position}
            zoom={14}
            className="h-[700px] w-[100%] mx-aut max-[1000px]:h-[400px] max-[480px]:h-[320px] "
          >
            {/* 地図の背景レイヤーを設定。このURLはOpenStreetMapの無料タイルを指す */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapComponent position={position} />
          </MapContainer>
        )}
      </div>
    </section>
  );
};

export default Map;
