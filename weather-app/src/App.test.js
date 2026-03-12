import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import * as fetchData from './components/fetchData';

jest.mock('./components/SearchBar/SearchBar', () => () => <div>SearchBar</div>);
jest.mock('./components/CurrentWeather/CurrentWeather', () => () => <div>CurrentWeather</div>);
jest.mock('./components/TemperatureChart/TemperatureChart', () => () => <div>TemperatureChart</div>);
jest.mock('./components/Forecast/Forecast', () => () => <div>Forecast</div>);

// Mock API calls
const mockWeather = { current: { temp_c: 20 }, location: { name: 'Coimbra' } };
const mockForecast = {
  forecast: {
    forecastday: [
      {
        hour: [{ time: '10:00', temp_c: 20 }],
      },
    ],
  },
};

describe('App Component', () => {
  beforeEach(() => {
    jest.spyOn(fetchData, 'getCurrentWeather').mockResolvedValue(mockWeather);
    jest.spyOn(fetchData, 'getForecast').mockResolvedValue(mockForecast);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', async () => {
    render(<App />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());
  });

  test('renders child components after data fetch', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('SearchBar')).toBeInTheDocument();
      expect(screen.getByText('CurrentWeather')).toBeInTheDocument();
      expect(screen.getByText('TemperatureChart')).toBeInTheDocument();
      expect(screen.getByText('Forecast')).toBeInTheDocument();
    });
  });

  test('handles API error gracefully', async () => {
    jest.spyOn(fetchData, 'getCurrentWeather').mockRejectedValue(new Error('API Error'));
    jest.spyOn(fetchData, 'getForecast').mockRejectedValue(new Error('API Error'));
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/API Error/i)).toBeInTheDocument();
    });
  });
});
