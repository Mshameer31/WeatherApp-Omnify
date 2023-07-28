import React, { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
import cloudyIcon from './image/pcloudy.jpeg';
import rainyIcon from './image/Rain.jpeg';
import sunnyIcon from './image/sunny.jpeg';
import defaultIcon from './image/moon.jpeg';

const weatherIcons = {
  Clouds: cloudyIcon,
  Rain: rainyIcon,
  Drizzle: rainyIcon,
  Thunderstorm: rainyIcon,
  Clear: sunnyIcon,
};

function App() {
  const [cityData, setCityData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const weatherCondition = cityData.weather?.[0]?.main || "";
  const weatherIcon = weatherIcons[weatherCondition] || defaultIcon;

  const getData = async (city) => {
    try {
      const apiKey = "d2041b1529222fa7726893595ab5b814";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      setCityData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData('Coimbatore');
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    getData(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <> 
    {cityData.weather && <>
        <center>
          <h1>Weather Application</h1>
          <input className="search" type="search"
            placeholder="Enter City Name..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <button style={{margin:'10px 0 0 0',backgroundColor:'lightblue'}} onClick={handleSearchClick}>
            Search
          </button>
        </center>
        <div id="container">
          <div className="card">
            <div className="box">
              <img style={{width:'80px',height:'80px'}} src={weatherIcon} alt=""/>
              <center style={{fontSize:'40px'}}>{(cityData.main.temp - 273.15).toFixed(1)}°C</center>
            </div>
            <div className="card__details">
              {cityData.weather && cityData.weather.length > 0 && (
                <span className="tag">{cityData.weather[0]?.main}</span>
              )}
              <span className="tag">Feel Like {(cityData.main?.feels_like - 273.15).toFixed(0)}°C</span>
              <div className="name">{cityData?.name}</div>
              <center>
                <div className="weather-info">
                  <div><b>Humidity</b> {cityData.main?.humidity}</div>
                  <div><b>Wind(Km/h) </b>{cityData.wind?.speed}</div>
                </div>
                <div className="weather-info">
                  <div><b>Pressure</b> {cityData.main?.pressure}</div>
                  <div><b>Visibility</b> {cityData.visibility}</div>
                </div>
              </center>
            </div>
          </div>
        </div>
    </>}
    </>
  );
}

export default App;