import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon broken by Webpack/Vite asset handling
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

/**
 * @param {{ projects: Array }} props
 */
export default function ProjectMap({ projects }) {
  const center =
    projects.length > 0
      ? [projects[0].lat, projects[0].lng]
      : [47.6062, -122.3321];

  return (
    <div className="leaflet-wrapper" style={{ height: 400 }}>
      <MapContainer
        center={center}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {projects.map((p) =>
          p.lat && p.lng ? (
            <Marker key={p.id} position={[p.lat, p.lng]}>
              <Popup>
                <strong>{p.displayName}</strong>
                <br />
                {p.program} &bull; {p.city}
                <br />
                {p.units} unit{p.units !== 1 ? 's' : ''} &bull; {p.status}
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}
