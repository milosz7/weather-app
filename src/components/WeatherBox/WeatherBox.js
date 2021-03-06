import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback, useState } from 'react';

const WeatherBox = () => {

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback(city => {
    setError(false);
    setLoading(true);
    setWeatherData(null);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`)
  .then(res => {
    if (res.ok) {
      return res.json()
      .then(data => {
        setWeatherData({
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main,
        })
        setLoading(false)
      })
    } else {
      setError(true);
      setLoading(false);
    }
  })
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      {weatherData && <WeatherSummary {...weatherData} />}
      {loading && <Loader />}
      {error && <ErrorBox />}
    </section>
  );
};

export default WeatherBox;
