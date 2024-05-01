import { useEffect, useState } from "react";
import "./Weather.css";
import config from "../../config";

export default function Weather() {
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({
    temperature: 0,
    realFeel: 0,
    humidity: 0,
    wind: 0,
    icon: "",
    description: "",
    rain: 0,
  });

  const getWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Bragadiru&units=metric&appid=${config.weather.openWeatherMapKey}`
    )
    const data = await response.json()
      
    setWeather({
      temperature: Math.round(data.main.temp),
      realFeel: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      wind: Math.round(data.wind.speed),
      icon: data.weather[0].icon,
      description: data.weather[0].description,
      rain: data.rain ? data.rain["1h"] : 0,
    });
  };

  useEffect(() => {
    if (loaded) return;
    getWeather().then(() => setLoaded(true));
  }, []);

  const interval = setInterval(getWeather, 1000 * 60 * 60);  

  useEffect(() => {
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(weather);
    if (!weather.icon) return
  }, [weather]);

  return (
    <div className="weather">
      <div className="left-side">
        <div>{weather.description}</div>
        <br />
        <div>Temperature: {weather.temperature}°C</div>
        <div>Real feel: {weather.realFeel}°C</div>
        <div>Humidity: {weather.humidity}%</div>
        <div>Wind: {weather.wind} m/s</div>
        <div>Rain: {weather.rain}mm</div>
      </div>
      {weather.icon ? (
        <img
          className="weather-icon"
          src={require(`../../icons/${weather.icon}.png`)}
          alt="weather icon"
        />
      ) : null}
    </div>
  );
}
