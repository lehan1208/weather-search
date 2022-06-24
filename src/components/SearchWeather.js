import React, { useState, useEffect } from 'react';

function SearchWeather() {
  const [search, setSearch] = useState('Hanoi');
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');

  let componentMounted = true;

  // DATE
  var d = new Date();
  var date = d.getDate();
  var year = d.getFullYear();
  var month = d.toLocaleString('en-GB', { month: 'long' });
  var day = d.toLocaleString('en-GB', { weekday: 'long' });

  //TIME

  let time = d.toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  useEffect(() => {
    const fetchWeather = async () => {
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=32e7a9d44328b80875530d35b7c40b6f`
      );
      if (componentMounted) {
        setData(await res.json());
        console.log(data);
      }
      return () => {
        componentMounted = false;
      };
    };
    fetchWeather();
  }, [search]);

  let emoji = null;

  if (typeof data.main != 'undefined') {
    if (data.weather[0].main === 'Clouds') {
      emoji = 'fa-cloud';
    } else if (data.weather[0].main === 'Thunderstorm') {
      emoji = 'fa-cloud-bolt';
    } else if (data.weather[0].main === 'Drizzle') {
      emoji = 'fa-cloud-drizzle';
    } else if (data.weather[0].main === 'Rain') {
      emoji = 'fa-cloud-showers-heavy';
    } else if (data.weather[0].main === 'Snow') {
      emoji = 'fa-snowflake';
    } else {
      emoji = 'fa-smog';
    }
  } else {
    return <div>...Loading</div>;
  }

  let temper = (data.main.temp - 273.15).toFixed(1);
  let tempMin = (data.main.temp_min - 273.15).toFixed(1);
  let tempMax = (data.main.temp_max - 273.15).toFixed(1);

  //LOGIC
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(input);
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-4'>
          <div className='card text-white text-center border-0'>
            <img
              src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`}
              className='card-img'
              alt='nature'
            />
            <div className='card-img-overlay'>
              <form onSubmit={handleSubmit}>
                <div className='input-group mb-4 w-75 mx-auto'>
                  <input
                    type='search'
                    className='form-control'
                    placeholder='Search City'
                    aria-label='Search City'
                    aria-describedby='basic-addon2'
                    name='search'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <button
                    type='submit'
                    className='input-group-text'
                    id='basic-addon2'
                  >
                    <i className='fas fa-search' />
                  </button>
                </div>
              </form>
              <div className='bg-dark bg-opacity-50 py-3'>
                <h5 className='card-title'>{data.name}</h5>
                <p className='card-text lead'>
                  {day}, {date} {month} , {year}
                  <br />
                  {time}
                </p>
                <hr />
                <i className={`fas ${emoji} fa-4x`} />
                <h1 className='fw-bolder mb-5'> {temper} &deg;C</h1>
                <p className='lead fw-bolder mb-0'>{data.weather[0].main}</p>
                <p className='lead'>
                  {tempMin} &deg;C | {tempMax} &deg;C
                </p>
                <p className='lead'>Humidity: {data.main.humidity}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchWeather;
