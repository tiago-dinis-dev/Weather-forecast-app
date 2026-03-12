import { useEffect, useState, useCallback } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import TemperatureChart from './components/TemperatureChart/TemperatureChart';
import Forecast from './components/Forecast/Forecast';
import './App.css';
import { getCurrentWeather, getForecast } from './components/fetchData';


function App() {  
  const [city, setCity] = useState('Coimbra');
  const [weatherData, setWeatherData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCurrentWeather = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getCurrentWeather(city);
      setWeatherData(data.current || data);
    } catch (error) {
      setError(error.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [city]);

  const fetchForecast = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getForecast(city);
      setChartData(data.forecast?.forecastday[0].hour || []);
      setForecastData(data.forecast?.forecastday || []);
    } catch (error) {
      setError(error.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    fetchCurrentWeather();
    fetchForecast();
  }, [fetchCurrentWeather, fetchForecast]);

  const handleCityChange = (newCity) => {
    setCity(newCity);
  };

  return (    
    <div className="app-container">
      <div className="search-row">
        <SearchBar city={city} onCityChange={handleCityChange} />
        <div className="status-group" aria-live="polite">
          {loading && <p className="status status--loading">Loading...</p>}
          {error && <p className="status status--error">{error}</p>}
        </div>
      </div>

      <div className="main-content">
        <CurrentWeather data={weatherData} />
        <div className="right-column">
          <TemperatureChart data={chartData} />
          <Forecast data={forecastData} />
        </div>
      </div>
    </div>
  );
}

export default App;
