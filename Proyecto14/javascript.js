let map;
let autocomplete;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });

    const input = document.getElementById('autocomplete');
    const options = {
        types: ['geocode']
    };

    autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.addListener('place_changed', onPlaceChanged);
}

async function onPlaceChanged() {
    const place = autocomplete.getPlace();

    map.setCenter(place.geometry.location);
    map.setZoom(14);

    const lat = place.geometry.location.lat();
    const long = place.geometry.location.lng();
    fetchWeather(lat, long);
}

async function fetchWeather(lat, long) {
    console.log(lat,long);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        Weather(data.current_weather);
    } catch (error) {
        console.error('Error al obtener el clima:', error);
    }
}

function Weather(weather) {
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = `
        <h3>Clima Actual</h3>
        <p>Temperatura: ${weather.temperature} °C</p>
    `;
}
