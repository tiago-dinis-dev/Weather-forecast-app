import PropTypes from 'prop-types';
import './Forecast.css';

function Forecast(props) {
  const { data } = props;
  if (!data || data.length === 0) return <p>Loading forecast...</p>;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    });
  };

  const isToday = (dateStr) => {
    const today = new Date();
    return today.toISOString().split('T')[0] === dateStr;
  }

  const mappedData = data.map(object => (
    <div key={object.date} className="object">
      {isToday(object.date) ? 
        (<p className='date-label'>Today</p>) : 
        (<p className='date-label'>{formatDate(object.date)}</p>
      )}
      <div className="day">
        <img src={object.day.condition?.icon} alt={object.day.condition?.text} />
        <div className='details'>
          <div className='details-temp'>
            <p className='temp-label-max'>Max</p>
            <p className='temp-value'>{object.day.maxtemp_c}°C</p>
          </div>
          <div className='details-temp'>
            <p className='temp-label-min'>Min</p>
            <p className='temp-value'>{object.day.mintemp_c}°C</p>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="forecast">
      {mappedData}
    </div>
  );
}

Forecast.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      day: PropTypes.shape({
        condition: PropTypes.shape({
          text: PropTypes.string,
          icon: PropTypes.string,
          code: PropTypes.number,
        }),
        maxtemp_c: PropTypes.number,
        mintemp_c: PropTypes.number,
      }),
    })
  ),
};

export default Forecast;