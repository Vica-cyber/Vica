// API Configuration
const API_KEY = 'YOUR_API_KEY_HERE'; // Users need to add their OpenWeatherMap API key
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const weatherData = document.getElementById('weatherData');
const loading = document.getElementById('loading');
const errorDiv = document.getElementById('error');

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherByCity(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherByCity(city);
        }
    }
});

locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        showLoading();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                getWeatherByCoords(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                showError('Unable to retrieve your location. Please enter a city manually.');
            }
        );
    } else {
        showError('Geolocation is not supported by your browser.');
    }
});

// Fetch weather by city name
async function getWeatherByCity(city) {
    showLoading();
    try {
        const currentWeatherUrl = `${API_BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(currentWeatherUrl);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        await getForecast(data.coord.lat, data.coord.lon);
        displayWeather(data);
    } catch (error) {
        showError('City not found. Please try again.');
    }
}

// Fetch weather by coordinates
async function getWeatherByCoords(lat, lon) {
    try {
        const currentWeatherUrl = `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        const response = await fetch(currentWeatherUrl);
        
        if (!response.ok) {
            throw new Error('Unable to fetch weather data');
        }
        
        const data = await response.json();
        await getForecast(lat, lon);
        displayWeather(data);
    } catch (error) {
        showError('Unable to fetch weather data. Please try again.');
    }
}

// Fetch 5-day forecast
async function getForecast(lat, lon) {
    try {
        const forecastUrl = `${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        const response = await fetch(forecastUrl);
        
        if (!response.ok) {
            throw new Error('Unable to fetch forecast data');
        }
        
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Forecast error:', error);
    }
}

// Display current weather
function displayWeather(data) {
    hideLoading();
    hideError();
    
    // Update DOM elements
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('currentDate').textContent = formatDate(new Date());
    document.getElementById('temp').textContent = Math.round(data.main.temp);
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('feelsLike').textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    
    // Update weather icon
    const iconCode = data.weather[0].icon;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    document.getElementById('weatherIcon').alt = data.weather[0].description;
    
    weatherData.classList.remove('hidden');
}

// Display 5-day forecast
function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';
    
    // Get one forecast per day (at 12:00 PM if available)
    const dailyForecasts = [];
    const processedDates = new Set();
    
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateString = date.toDateString();
        
        if (!processedDates.has(dateString) && dailyForecasts.length < 5) {
            processedDates.add(dateString);
            dailyForecasts.push(item);
        }
    });
    
    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        
        forecastItem.innerHTML = `
            <div class="date">${formatForecastDate(date)}</div>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" 
                 alt="${day.weather[0].description}">
            <div class="forecast-temp">${Math.round(day.main.temp)}°C</div>
            <div class="forecast-desc">${day.weather[0].description}</div>
        `;
        
        forecastContainer.appendChild(forecastItem);
    });
}

// Utility functions
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatForecastDate(date) {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function showLoading() {
    loading.classList.remove('hidden');
    weatherData.classList.add('hidden');
    errorDiv.classList.add('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showError(message) {
    hideLoading();
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    weatherData.classList.add('hidden');
}

function hideError() {
    errorDiv.classList.add('hidden');
}

// Load default city on page load (optional)
window.addEventListener('load', () => {
    // Uncomment to load a default city on page load
    // getWeatherByCity('London');
});
