import axios from 'axios';
import { $ } from './bling';

const mapOptions = {
    center: {lat: 43.2, lng: -79.8},
    zoom: 9
}

function loadPlaces(map, lat = 43.2, lng = -79.8) {
    axios.get(`api/v1/stores/near?lat=${lat}&lng=${lng}`)
    .then(res => {
        const places = res.data;
        if (!places.length) {
            // TODO - handle no places found elegantly
            return;
        }

        // create a bound for auto-zoom
        const bounds = new google.maps.LatLngBounds();
        const infoWindow = new google.maps.InfoWindow();

        const markers = places.map(place => {
            const [placeLng, placeLat] = place.location.coordinates;
            const position = {lat: placeLat, lng: placeLng};
            bounds.extend(position);
            const marker = new google.maps.Marker({ map, position });
            marker.place = place;
            return marker;
        });

        // when someone clicks on the markers, show details of the place
        markers.forEach(marker => marker.addListener('click', function() {
            const html = `
                <div class="popup">
                    <a href="/store/${this.place.slug}">
                        <img src="/uploads/${this.place.photo || 'store.png'}" alt="${this.place.name}" />
                    </a>
                    <p>${this.place.name} - ${this.place.location.address}</p>
                </div>
            `;
            infoWindow.setContent(html);
            infoWindow.open(map, this); // show on top of marker
        }));

        // zoom the map to fit marker
        map.setCenter(bounds.getCenter());
        map.fitBounds(bounds);
    });
}

function makeMap(mapDiv) {
    if (!mapDiv) return;

    // make our map
    const map = new google.maps.Map(mapDiv, mapOptions);
    loadPlaces(map);

    const input = $('[name="geolocate"]');
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        console.log(place);
        loadPlaces(map, place.geometry.location.lat(), place.geometry.location.lng());
    });
}

export default makeMap;
