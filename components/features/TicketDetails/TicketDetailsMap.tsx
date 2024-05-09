import { useState, useEffect } from "react";
// Leaflet & its CSS
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// components
import SpinnerClient from "@/components/common/SpinnerClient";

// types
import type { Ticket } from "@/types/ticket";

const Map = ({ ticket }: { ticket: Ticket }) => {
  const [loading, setLoading] = useState(true);

  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [geocodeError, setGeocodeError] = useState(false);

  //! long, lan を取得 (By State & Postcode)
  useEffect(() => {
    const fetchCoords = async () => {
      try {
        // const address = `${ticket.location.street}, ${ticket.location.city}, ${ticket.location.state}, ${ticket.location.postcode}`;
        const address = `${ticket.location.state},${ticket.location.postcode}`;
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${address},Australia`,
        );
        const data = await response.json();

        if (data.length === 0) {
          setGeocodeError(true);
          setLoading(false);
          return;
        }

        if (data.length > 0) {
          const { lat, lon } = data[0];
          // ここで緯度経度を使う
          console.log(lat, lon);
          setLat(lat);
          setLon(lon);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
        setLoading(false);
      }
    };
    fetchCoords();
  }, [ticket]);

  // Geocode が取得できない場合のエラーハンドリング
  if (geocodeError) {
    return <div className="text-2xl">No location data found</div>;
  }

  return (
    <section className="">
      {loading && <SpinnerClient />}
      {!loading && (
        // {/* MapContainerコンポーネントを使って地図のコンテナを作成。ここで地図の初期位置とズームレベルを指定 */}
        <MapContainer
          center={[lat, lon]}
          zoom={13}
          style={{ height: "300px", width: "80%", margin: "0 auto" }}
        >
          {/* TileLayerコンポーネントを使って地図の背景レイヤーを設定。このURLはOpenStreetMapの無料タイルを指す */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* CircleMarkerコンポーネントを使って地図上に円形のマーカーを配置します。centerで位置を、pathOptionsでスタイルを指定します。 */}
          <CircleMarker
            center={[lat, lon]}
            pathOptions={{ color: "red" }}
            radius={20}
            color="blue"
            fillColor="green"
            opacity={0.6}
          >
            <Popup>
              <h2>{ticket.name}</h2>
            </Popup>
          </CircleMarker>
        </MapContainer>
      )}
    </section>
  );
};

export default Map;
