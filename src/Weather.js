import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  let [temperature, setTemperature] = useState(null);
  let [description, setDescription] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [wind, setWind] = useState(null);
  let [icon, setIcon] = useState(null);
  let [city, setCity] = useState(null);
  let [search, setSearch] = useState(false);

  function submitForm(event) {
    event.preventDefault();
    let apiKey = "b4407213e455b1634cc61a84e0b730a1";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(getWeaher);
  }

  function submitCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  function getWeaher(response) {
    setSearch(true);
    setTemperature(Math.round(response.data.main.temp));
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(Math.round(response.data.wind.speed));
    setIcon(
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  if (search === true) {
    return (
      <div className="SearchForm">
        <form onSubmit={submitForm}>
          <input
            type="text"
            placeholder="Search for weatcher..."
            onChange={submitCity}
          />
          <input type="submit" value="Search" />
        </form>{" "}
        <br />
        <div>
          Temperature:<strong> {temperature}°C </strong>
          <br />
          Description:<strong> {description}</strong>
          <br />
          Humidity:<strong> {humidity}% </strong>
          <br />
          Wind:<strong> {wind}km/h </strong>
          <br />
          <img src={icon} alt="weather_icon" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="SearchForm">
        <form onSubmit={submitForm}>
          <input
            type="text"
            placeholder="Search for weatcher..."
            onChange={submitCity}
          />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}
