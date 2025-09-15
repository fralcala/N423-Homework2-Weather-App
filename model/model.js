const apiKey = "9755ba3369a34a1e91205727251409";

export function getWeatherByLocation(searchResult) {
  let currentURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchResult}&aqi=no`;

  // console.log(currentURL);

  $.getJSON(currentURL, (data) => {
    // console.log(data);

    let location = data.location;
    let current = data.current;

    let weatherContent = `
      <h1>${location.region}</h1>
      <h2>${location.name}</h2>
      <div class="current">
        <div>
        <img src="${current.condition.icon}"/>
        <h3> ${current.temp_f}&deg F</h3></div>
        <div class="celsius">${current.temp_c}&deg C</div>
        <div>${current.condition.text}</div>
        <div>Feels: ${current.feelslike_f}&deg</div>
      </div>
    `;

    $(".currentWeatherHolder").html(weatherContent);
  }).fail((error) => {
    console.log("error fetching weather", error);
  });
}

export function getForecast(searchResult) {
  let forecastURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey} &q=${searchResult}&days=7&aqi=no&alerts=no
  `;
  $.getJSON(forecastURL, (data) => {
    console.log(data.forecast);

    let weatherForecast = ``;

    let forecastWeth = data.forecast;

    let dayCount = 0;
    for (let i = dayCount; i <= 6; i++) {
      let dayCast = forecastWeth.forecastday[`${i}`];
      console.log(dayCast.day.condition);
      weatherForecast += `
      <div class="forecastDay">
      <img src="${dayCast.day.condition.icon}"/>
      <li class="temp">${dayCast.day.avgtemp_f}&deg</li>
      <li>${dayCast.day.condition.text}</li>
      <li class="date">${dayCast.date}</li>
      </div>`;
    }

    $(".forecastHolder").html(weatherForecast);
  });
}
