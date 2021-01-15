// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let map;
let service;
let infowindow;
let latitud = 25.651869533567535;  
let longitud = -100.2898404100351;

function initMap() {

    var watchID = navigator.geolocation.watchPosition(function (position) {
        latitud = (position.coords.latitude);
        longitud = (position.coords.longitude);
        console.log(typeof (latitud))
        console.log('longitud: ' + longitud)
    });

    setTimeout(function () {
        const usuario = new google.maps.LatLng(latitud, longitud);
        infowindow = new google.maps.InfoWindow();
        map = new google.maps.Map(document.getElementById("map"), {
            center: {
                lat: latitud,
                lng: longitud
            },
            zoom: 15,
        });

        const request = {
            query: "reciclaje",
            fields: ["name", "geometry"],
        };

        service = new google.maps.places.PlacesService(map);
        service.findPlaceFromQuery(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log(results)
                for (let i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
                map.setCenter(usuario);
            }
        });
    }, 2000);


}



function createMarker(place) {
    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
    });
    google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(place.name);
        infowindow.open(map);
    });
}