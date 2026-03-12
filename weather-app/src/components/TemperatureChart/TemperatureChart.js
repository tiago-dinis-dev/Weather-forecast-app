import { Line } from 'react-chartjs-2';
import './TemperatureChart.css';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function TemperatureChart(props) {
  const { data } = props;

  if (!data || data.length === 0) return <p>Loading chart...</p>;

  const labels = Array.from({ length: 24 }, (_, i) => i);
  const temps = data.slice(0, 24).map(hour => hour.temp_c);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temps,
        borderColor: '#4681f4',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
          gradient.addColorStop(0, '#F7F8FF');
          gradient.addColorStop(1, '#F2F4FF');
          return gradient;
        },
        tension: 0.4,
        fill: true,
        pointRadius: 0,
      }
    ]
  };
 
  const options = {
    responsive: true,
    interaction: {
    mode: 'nearest',
    intersect: false
  },
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Hourly Temperature Forecast' }, 
      tooltip: {
        enabled: true,
        callbacks: {  
          title: (context) => `Hour: ${context[0].label}h`,
          label: (context) => {
            const index = context.dataIndex;
            const condition = data[index]?.condition?.text || 'No data';
            return `Temp: ${context.parsed.y}°C (${condition})`;
          }
        }
      },
    },     
    scales: {
      x: { display: false },
      y: {
        title: { display: true, text: '°C' },
        grid: { display: false },
        ticks: { color: '#666', callback: value => `${value}°C` }
      }
    }
  };


  return (
    <div className="temperature-chart">
      <Line data={chartData} options={options} alt="Temperature chart" />
    </div>
  );
}

TemperatureChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      temp_c: PropTypes.number,
      condition: PropTypes.shape({
        text: PropTypes.string,
        icon: PropTypes.string,
        code: PropTypes.number,
      }),
    })
  )
};

export default TemperatureChart;