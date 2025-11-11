# Vica Weather App

A beautiful, responsive weather application that provides real-time weather information and 5-day forecasts for any location worldwide.

## Features

- 🌍 Search weather by city name
- 📍 Get weather for your current location
- 🌡️ Real-time temperature, humidity, wind speed, and more
- 📅 5-day weather forecast
- 🎨 Modern, responsive design
- 📱 Mobile-friendly interface
- 🌈 Beautiful gradient UI with smooth animations

## Preview

The app displays:
- Current temperature and weather conditions
- "Feels like" temperature
- Humidity percentage
- Wind speed
- Atmospheric pressure
- Visibility distance
- 5-day weather forecast with icons

## Setup Instructions

1. **Get an API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key

2. **Configure the App**
   - Open `script.js`
   - Replace `YOUR_API_KEY_HERE` with your actual API key:
     ```javascript
     const API_KEY = 'your_actual_api_key';
     ```

3. **Run the App**
   - Open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js http-server
     npx http-server
     ```

## Usage

### Search by City
1. Enter a city name in the search box
2. Click "Search" or press Enter
3. View the current weather and forecast

### Use Current Location
1. Click the location button (compass icon)
2. Allow location access when prompted
3. Weather data for your location will be displayed

## Technologies Used

- HTML5
- CSS3 (with modern features like Grid and Flexbox)
- Vanilla JavaScript (ES6+)
- OpenWeatherMap API

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## API Information

This app uses the [OpenWeatherMap API](https://openweathermap.org/api):
- Current Weather Data API
- 5-Day Weather Forecast API

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons provided by OpenWeatherMap
