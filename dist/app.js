/**
 * Baryashan — Студия массажа
 * Clean minimal scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  const mapElement = document.getElementById('map');
  if (mapElement && typeof L !== 'undefined') {
    // KDC Arun, Sovetskaya 23a, Ulan-Ude: [51.8302, 107.5868]
    const coords = [51.8302, 107.5868];
    const map = L.map('map', {
      center: coords,
      zoom: 16,
      scrollWheelZoom: false,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    const marker = L.circleMarker(coords, {
      radius: 9,
      color: '#F8F5F0',
      weight: 3,
      fillColor: '#A82F35',
      fillOpacity: 1
    }).addTo(map);

    marker.bindPopup(`
      <div style="font-family: sans-serif; font-size: 13px; line-height: 1.4; color: #161514;">
        <strong style="font-size: 14px; color: #A82F35;">BARYASHAN</strong><br>
        ул. Советская, 23а (КДЦ «Арун»)<br>
        <span style="font-size: 11px; color: #6E6962;">Ежедневно 09:00 — 21:00</span>
      </div>
    `).openPopup();
  }
});
