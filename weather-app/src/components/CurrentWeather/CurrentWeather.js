import PropTypes from 'prop-types';
import './CurrentWeather.css';

function CurrentWeather(props) {
  const { data } = props;
  if (!data) return <p>Loading current weather...</p>;
 
  const formatFullDate = (dateStr) => {
    const date = new Date(dateStr);

    const time = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const dayWeek = date.toLocaleDateString('en-GB', { weekday: 'long' });
    const dayMonthYear = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    return `${time}, ${dayWeek}, ${dayMonthYear}`;
  };

  return (
    <div className="current-weather">  
      <p className='date'>{formatFullDate(data.last_updated)}</p>
      <h2>{data.temp_c}°C</h2>  
      <h4>Feels like: {data.feelslike_c}°C</h4>
      <img title={data.condition?.text} src={data.condition?.icon} alt={data.condition?.text} />
      <p className='condition-text'>{data.condition?.text}</p>
 
      <div className="current-weather__details">
        <div className="detail">
          <p className="label">Humidity</p>
          <p>{data.humidity}%</p>
        </div>
        <div className="detail">
          <p className="label">Wind Speed</p>
          <p>{data.wind_kph} km/h</p>
        </div>
      </div>
    </div>
  );
}

CurrentWeather.propTypes = {
  data: PropTypes.shape({
    last_updated: PropTypes.string,
    temp_c: PropTypes.number,
    feelslike_c: PropTypes.number,
    condition: PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.string,
      code: PropTypes.number,
    }),
    humidity: PropTypes.number,
    wind_kph: PropTypes.number,
  }),
};

export default CurrentWeather;