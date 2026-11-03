/**
 * Baryashan — Студия массажа
 * Clean minimal scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  const mapElement = document.getElementById('map');
  if (mapElement && typeof L !== 'undefined') {
    // Irkutsk center: [52.2870, 104.2810]
    const coords = [52.2870, 104.2810];
    const map = L.map('map', {
      center: coords,
      zoom: 14,
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
        г. Иркутск<br>
        <span style="font-size: 11px; color: #6E6962;">Ежедневно 09:00 — 21:00 (по записи)</span>
      </div>
    `).openPopup();
  }
});
