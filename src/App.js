import React, { useState } from 'react';
import axios from 'axios';




function App() {
  const [data,setData] = useState({});
  const [location,setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=940393133c64c829d05f26bc869a4079`;
  
  const searchLocation = (event) => {
  if (event.key === 'Enter') {
      axios.get(url).then((reponse) => {
        setData(reponse.data);
        console.log(reponse.data);
      })
    }
  }

  return (
    <div className="App">
      <div className="search">
        <input 
        type="text" 
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
         <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <h1>{data.weather[0].main}</h1> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              <p>Feels Like</p>
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p> : null}
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">
                {data.main ? <p className="bold">{data.wind.speed.toFixed()}MPH</p> : null}
              </p>
              <p>Wind Speed</p>
            </div>
         </div>
        }
      </div>
    </div>
  );
}

export default App;
