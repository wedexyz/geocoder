
var map = L.map('map').setView([-8.371844680505642,114.17953491210939], 15);

var geocoder = L.Control.Geocoder.nominatim();
if (URLSearchParams && location.search) {
  // parse /?geocoder=nominatim from URL
  var params = new URLSearchParams(location.search);
  var geocoderString = params.get('geocoder');
  if (geocoderString && L.Control.Geocoder[geocoderString]) {
    console.log('Using geocoder', geocoderString);
    geocoder = L.Control.Geocoder[geocoderString]();
  } else if (geocoderString) {
    console.warn('Unsupported geocoder', geocoderString);
  }
}

var control = L.Control.geocoder({
  query: 'Moon',
  placeholder: 'Search here...',
  geocoder: geocoder
}).addTo(map);
var marker;

setTimeout(function() {
  control.setQuery('Earth');
}, 12000);

L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.on('click', function(e) {
  geocoder.reverse(e.latlng, map.options.crs.scale(map.getZoom()), function(results) {
    var r = results[0];
    console.log(results[0]);
    if (r) {
      if (marker) {
        marker
          .setLatLng(r.center)
          .setPopupContent(r.html || r.name)
          .openPopup();
      } else {
        marker = L.marker(r.center)
          .bindPopup(r.name)
          .addTo(map)
          .openPopup();
      }
    }
  });
});
