export async function getCurrentWeather(city) {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  if (!apiKey) {
    throw new Error('API key is missing.');
  }

  const url = `https://api.weatherapi.com/v1/current.json?q=${city}&key=${apiKey}`;
  const res = await fetch(url);

  let payload = null;
  const contentType = res.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    payload = await res.json();
  } 
  else {
    const text = await res.text();
    payload = { message: text };
  }

  if (!res.ok) {
    const apiMsg = payload?.error?.message;
    const errorMessage = `${apiMsg}`;
    throw new Error(errorMessage);
  }

  return payload;
}

export async function getForecast(city, days = 3) {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  if (!apiKey) {
    throw new Error('API key is missing.');
  }

  const url = `https://api.weatherapi.com/v1/forecast.json?q=${city}&days=${days}&key=${apiKey}`;
  const res = await fetch(url);

  let payload = null;
  const contentType = res.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    payload = await res.json();
  } 
  else {
    const text = await res.text();
    payload = { message: text };
  }

  if (!res.ok) {
    const apiMsg = payload?.error?.message;
    const errorMessage = `${apiMsg}`;
    throw new Error(errorMessage);
  }

  return payload;
}
