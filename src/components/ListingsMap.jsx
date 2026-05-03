import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const STATUS_COLORS = {
  for_sale: '#b85c5c',
  sold: '#c9a227',
  for_rent: '#7d6b9e',
};

/** Outer hit area / layout size (px); keep in sync with `.listings-map-pin` in CSS. */
const PIN_OUTER = 40;

function statusIcon(status) {
  const color = STATUS_COLORS[status] || STATUS_COLORS.sold;
  const half = PIN_OUTER / 2;
  return L.divIcon({
    className: 'listings-map-marker-wrap',
    html: `<div class="listings-map-pin"><div class="listings-map-dot" style="background:${color}"></div></div>`,
    iconSize: [PIN_OUTER, PIN_OUTER],
    iconAnchor: [half, half],
  });
}

function FitBounds({ markers }) {
  const map = useMap();

  useEffect(() => {
    const valid = markers.filter(
      (m) => typeof m.lat === 'number' && typeof m.lng === 'number' && !Number.isNaN(m.lat + m.lng)
    );
    if (valid.length === 0) {
      map.setView([47.55, -122.18], 11);
      return;
    }
    if (valid.length === 1) {
      map.setView([valid[0].lat, valid[0].lng], 14);
      return;
    }
    const bounds = L.latLngBounds(valid.map((m) => [m.lat, m.lng]));
    map.fitBounds(bounds, { padding: [6, 6], maxZoom: 14 });
  }, [map, markers]);

  return null;
}

/**
 * @param {{ markers: Array<{ id: string, lat: number, lng: number, status: 'for_sale'|'sold'|'for_rent', title: string, subtitle?: string }> }} props
 */
export default function ListingsMap({ markers }) {
  const valid = markers.filter(
    (m) => typeof m.lat === 'number' && typeof m.lng === 'number'
  );
  const center =
    valid.length > 0 ? [valid[0].lat, valid[0].lng] : [47.55, -122.18];

  return (
    <div className="leaflet-wrapper listings-map-shell">
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <FitBounds markers={markers} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((m) =>
          m.lat != null && m.lng != null ? (
            <Marker key={m.id} position={[m.lat, m.lng]} icon={statusIcon(m.status)}>
              <Popup>
                <strong>{m.title}</strong>
                {m.subtitle && (
                  <>
                    <br />
                    {m.subtitle}
                  </>
                )}
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}
