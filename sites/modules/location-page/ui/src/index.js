export default () => {
  setTimeout(() => {
    run();
  }, 4000);// fml
  function run() {
    const canvasEl = document.querySelector('[data-map]');
    if (canvasEl) {
      L.mapquest.key = '6cnUq9ifi2O36Aq7vJrrfBCUyCfGI4gD';

      const map = L.mapquest.map(canvasEl, {
        center: [ 37.7749, -122.4194 ],
        layers: L.mapquest.tileLayer('map'),
        zoom: 18
      });

      // plot markers
      const markers = JSON.parse(canvasEl.getAttribute('data-map'));
      markers.forEach(marker => {
        L.marker(marker.latlng, { title: marker.title }).addTo(map);
      });

      // center map on markers
      map.fitBounds(markers.map(m => m.latlng));
      map.setZoom(6);
    }
  }
};
