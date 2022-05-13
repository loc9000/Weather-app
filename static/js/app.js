const apiKey = '086df9247d480bd1d1ed15e2f44dba8d'
const apiLink = 'https://api.openweathermap.org/data/2.5/weather'

let weatherForm = document.querySelector('#weatherForm');
let cityTitle = document.querySelector('#cityTitle'); 
let weatherInfo = document.querySelector('#weatherInfo'); 

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let city = e.target.city.value;
    let state = e.target.state.value;

    console.log(city)

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ city },${ state }&appid=${ apiKey }&units=imperial`) //snuck in &imperial units for Fahrenheit
        .then(res => res.json())
        .then(data => {
            let weatherData = {
                name: data.name,
                weather: {
                    forecast: data.weather[0].main,
                    temp: {
                        current: data.main.temp,
                        low: data.main.temp_min,
                        high: data.main.temp_max,
                        humidity: data.main.humidity
                    }
                }
            }
            // console.log(weatherData)
            cityTitle.innerText = `${ weatherData.name }, ${ state }`

            let addToWeatherData = (label, value) => {
                weatherInfo.innerHTML +=
                `<li class="list-group-item">${ label } <span class="float-right">
                ${ value }
                </span>
                </li>`
            }
            // Derek suggested a function to avoid a long ugly code string
            addToWeatherData('Forecast', weatherData.weather.forecast);
            addToWeatherData('Current', `${Math.floor(weatherData.weather.temp.current)} F`);
            addToWeatherData('Low', `${Math.floor(weatherData.weather.temp.low)} F`);
            addToWeatherData('High', `${Math.floor(weatherData.weather.temp.high)} F`);
            addToWeatherData('Humidity', `${weatherData.weather.temp.humidity}%`);

            // weatherInfo.innerHTML +=
            // `<li class="list-group-item">${ 'Forecast' } <span class="float-right">
            //     ${ weatherData.weather.forecast }
            // </span>
            // </li>`
        })
})
