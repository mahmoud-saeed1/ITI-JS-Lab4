/*~~~~~$ Selectors $~~~~~*/
const weatherInfo = document.getElementById('weather-info');

/*~~~~~$ Global Variables $~~~~~*/
const apiKey = 'f11370ee45ad413fbfb122550242007';

/*~~~~~$ Renders $~~~~~*/
function displayWeather(data) {
    const { location, current } = data;
    weatherInfo.innerHTML = `
        <h2>Weather in ${location.name}</h2>
        <p>Temperature: ${current.temp_c} °C</p>
        <p>Condition: ${current.condition.text}</p>
    `;
}

/*~~~~~$ Utility $~~~~~*/
function fetchWeather(latitude, longitude) {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    fetchWeather(latitude, longitude);
});
