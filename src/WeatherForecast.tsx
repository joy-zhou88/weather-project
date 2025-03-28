import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherForecast.css';

// 定义和风天气API返回的数据类型
interface HeWeatherDailyForecast {
  fxDate: string;
  sunrise?: string;
  sunset?: string;
  moonrise?: string;
  moonset?: string;
  tempMax: string;
  tempMin: string;
  iconDay: string;
  textDay: string;
  iconNight: string;
  textNight: string;
  wind360Day: string;
  windDirDay: string;
  windScaleDay: string;
  windSpeedDay: string;
  humidity: string;
  precip: string;
  pressure: string;
  vis: string;
  cloud?: string;
  uvIndex?: string;
}

interface HeWeatherLocation {
  name: string;
  id: string;
  lat: string;
  lon: string;
  adm2: string; // 城市名
  adm1: string; // 省份名
  country: string;
  tz: string;
  utcOffset: string;
  isDst: string;
  type: string;
  rank: string;
  fxLink: string;
}

interface HeWeatherResponse {
  code: string;
  updateTime: string;
  fxLink: string;
  daily: HeWeatherDailyForecast[];
  refer: {
    sources: string[];
    license: string[];
  };
  location?: HeWeatherLocation[];
}

interface WeatherData {
  date: string;
  weather: string;
  temp: {
    max: number;
    min: number;
  };
  wind: string;
  humidity: number;
  icon: string;
}

interface ForecastResponse {
  city: string;
  forecasts: WeatherData[];
}

const WeatherForecast: React.FC = () => {
  const [city, setCity] = useState<string>('上海');
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  // 请替换为你的和风天气API Key
  const HE_WEATHER_KEY = import.meta.env.VITE_API_KEY;

  const fetchWeatherData = async (cityName: string) => {
    setLoading(true);
    setError('');
    
    try {
      // 先获取城市ID
      const locationResponse:any = await axios.get(
        `https://geoapi.qweather.com/v2/city/lookup?location=${encodeURIComponent(cityName)}&key=${HE_WEATHER_KEY}`
      );
      
      if (locationResponse.data.code !== '200' || !locationResponse.data.location?.length) {
        throw new Error('城市不存在或输入有误');
      }
      
      const locationId = locationResponse.data.location[0].id;
      const resolveCityName = locationResponse.data.location[0].name;
      
      // 获取7天天气预报
      const weatherResponse = await axios.get(
        `https://devapi.qweather.com/v7/weather/7d?location=${locationId}&key=${HE_WEATHER_KEY}`
      );
      
      if (weatherResponse.data.code !== '200') {
        throw new Error('获取天气数据失败');
      }
      
      const heWeatherData: HeWeatherResponse = weatherResponse.data;
      
      const forecastData: ForecastResponse = {
        city: resolveCityName,
        forecasts: heWeatherData.daily.map((day): WeatherData => ({
          date: day.fxDate,
          weather: day.textDay,
          temp: {
            max: parseInt(day.tempMax),
            min: parseInt(day.tempMin)
          },
          wind: `${day.windDirDay} ${day.windScaleDay}级`,
          humidity: parseInt(day.humidity),
          icon: day.iconDay
        }))
      };
      
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取天气数据失败，请稍后重试');
      console.error('Error fetching weather data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  // 获取天气图标URL
  const getWeatherIcon = (iconCode: string) => {
    return `https://cdn.heweather.com/cond_icon/${iconCode}.png`;
  };

  return (
    <div className="weather-forecast-container">
      <h1>七天天气预报</h1>
      
      <form onSubmit={handleSubmit} className="city-search">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="输入城市名称"
        />
        <button type="submit" disabled={loading}>
          {loading ? '查询中...' : '查询'}
        </button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      {forecast && (
        <div className="forecast-results">
          <h2>{forecast.city}未来七天天气预报</h2>
          <div className="forecast-list">
            {forecast.forecasts.map((day, index) => (
              <div key={index} className="forecast-day">
                <h3>{day.date}</h3>
                <img 
                  src={getWeatherIcon(day.icon)} 
                  alt={day.weather} 
                  className="weather-icon"
                />
                <p>天气: {day.weather}</p>
                <p>温度: {day.temp.max}°C / {day.temp.min}°C</p>
                <p>风力: {day.wind}</p>
                <p>湿度: {day.humidity}%</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;