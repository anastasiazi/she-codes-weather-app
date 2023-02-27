// ⏰Feature #1
// In your project, display the current date and time using JavaScript: Tuesday 16:00
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const apiKey = "b2d9fa1f2b35557e4615dd5fab218834";

let currentDay = document.querySelector("#current-day");
let currentTime = document.querySelector("#current-time");
let mainCondition = document.querySelector(".main-condition");

function showCurrentDay(currentDate) {
    let month = MONTHS[currentDate.getMonth()].substring(0, 3);
    let date = currentDate.getDate();
    return `${month} ${date}`;
}

function showCurrentTime(currentDate) {
    let day = DAYS[currentDate.getDay()];
    let time = currentDate.toLocaleTimeString('en-US', {
        hour12: true, hour: "numeric", minute: "numeric"
    });
    return `${day} ${time}`;
}

currentDay.innerHTML = showCurrentDay(new Date());
currentTime.innerHTML = showCurrentTime(new Date());

// Feature #2
// Add a search engine, when searching for a city (i.e. Paris),
// display the city name on the page after the user submits the form.
let searchInput = document.querySelector("#search-input");
let mainCity = document.querySelector(".main-city");
let searchButton = document.querySelector("#basic-addon2");

function getWeather(response) {
    let currentTemperature = Math.round(response.data.main.temp);
    let currentMaxTemperature = Math.round(response.data.main.temp_max);
    let currentMinTemperature = Math.round(response.data.main.temp_min);
    let currentHumidity = Math.round(response.data.main.humidity);
    let currentPressure = Math.round(response.data.main.pressure);
    let currentCondition = response.data.weather[0].main;
    let currentLocation = response.data.name;

    temperature.innerHTML = currentTemperature;
    mainCondition.innerHTML = currentCondition;
    mainCity.innerHTML = currentLocation;
}

function displaySearchedCity(event) {
    event.preventDefault();
    if (searchInput.value !== '') {
        let city = searchInput.value.trim();
        mainCity.innerHTML = city;


        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        axios.get(url).then(getWeather);
    }
}

searchButton.addEventListener("click", displaySearchedCity);

//Bonus Feature
// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit.
// When clicking on it, it should convert the temperature to Fahrenheit.
// When clicking on Celsius, it should convert it back to Celsius.
let temp = 17;

let fahrenheit = document.querySelector("#fahrenheit");
let celsius = document.querySelector("#celsius");
let temperature = document.querySelector("#temperature");
temperature.innerHTML = Math.round(temp).toString();

function displayCelsius() {
    temperature.innerHTML = Math.round(temp).toString();
    fahrenheit.classList.remove("active");
    fahrenheit.classList.add("text-muted");
    celsius.classList.add("active");
    celsius.classList.remove("text-muted");
}

function displayFahrenheit() {
    temperature.innerHTML = Math.round((temp * 9 / 5) + 32).toString();
    celsius.classList.remove("active");
    celsius.classList.add("text-muted");
    fahrenheit.classList.add("active");
    fahrenheit.classList.remove("text-muted");
}

fahrenheit.addEventListener('click', displayFahrenheit);
celsius.addEventListener('click', displayCelsius);

function showCurrentLocation (position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    axios.get(getUrlByLatAndLon(lat, lon)).then(getWeather);
}

function getUrlByLatAndLon(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
}
function displayCurrentLocation(event) {
    event.preventDefault();
    mainCity.innerHTML = '... wait for magic';
    navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentLocationBtn = document.querySelector("#current-location");
currentLocationBtn.addEventListener('click', displayCurrentLocation);

