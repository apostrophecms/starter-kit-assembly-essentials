export default () => {
  const canvasEl = document.querySelector('[data-map]');
  if (canvasEl) {
    L.mapquest.key = '6cnUq9ifi2O36Aq7vJrrfBCUyCfGI4gD';

    // 'map' refers to a <div> element with the ID map
    const map = L.mapquest.map(canvasEl, {
      center: [ 37.7749, -122.4194 ],
      layers: L.mapquest.tileLayer('map'),
      zoom: 12
    });
    const markers = JSON.parse(canvasEl.getAttribute('data-map'));
    markers.forEach(marker => {
      L.marker(marker.latlng, { title: marker.title }).addTo(map);
    });
  }
};
