import { fetchWeather, getWeatherURL } from "../api/weather.js";
import { fetchGeoCode, getGeoURL } from "../api/geocode.js";

const API_KEY = "SUA_API_KEY";

// ==========================
// STATE
// ==========================
let hourlyForecast = [];
let lastLocation = null;

// ==========================
// DOM
// ==========================
const slices = [
  document.querySelector("#slice_1"),
  document.querySelector("#slice_2"),
  document.querySelector("#slice_3"),
  document.querySelector("#slice_4"),
];

const tempAtual = document.querySelector("#tempAtual");
const lblWind = document.querySelector("#wind");
const lblHumi = document.querySelector("#humidity");
const lblPress = document.querySelector("#pressure");
const lblFeels = document.querySelector("#feels");
const txtInput = document.querySelector("#txtInput");

// ==========================
// EVENTS
// ==========================
txtInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    await init(true);
  }
});

document.addEventListener("DOMContentLoaded", () => init(false));

// ==========================
// INIT
// ==========================
async function init(force = false) {
  try {
    const location = await getUserLocation();
    if (!location) return;

    lastLocation = location;

    const data = await getWeatherData(location);

    if (txtInput.value === "Cidade, EF, BR") {
      txtInput.value = data.city.name;
    }

    renderWeather(data);

    hourlyForecast = build24hForecast(data.list);
    renderForecastSlices();

  } catch (error) {
    console.error(error);
    tempAtual.textContent = "Erro ao carregar clima";
  }
}

// ==========================
// API
// ==========================
async function getWeatherData({ lat, lon }) {
  const url = getWeatherURL(lat, lon, API_KEY);
  return await fetchWeather(url);
}

// ==========================
// LOCATION
// ==========================
async function getUserLocation() {
  const loc = txtInput.value.trim();

  if (loc !== "" && loc !== "Cidade, EF, BR") {
    const partes = loc.split(",").map((p) => p.trim());

    const cidade = partes[0];
    const estado = partes[1] || "";
    const pais = partes[2] || "";

    const url = getGeoURL(cidade, estado, pais, API_KEY);
    const geoData = await fetchGeoCode(url);

    if (!geoData || geoData.length === 0) {
      alert("Formato: Cidade, UF, BR");
      return null;
    }

    return {
      lat: geoData[0].lat,
      lon: geoData[0].lon,
    };
  }

  return await getCurrentLocation();
}

// ==========================
// GEO
// ==========================
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation não suportado");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        }),
      () => reject("Erro localização")
    );
  });
}

// ==========================
// BUILD 24H FORECAST
// ==========================
function build24hForecast(list) {
  const result = [];

  for (let i = 0; i < list.length - 1; i++) {
    const current = list[i];
    const next = list[i + 1];

    const t1 = current.main.temp;
    const t2 = next.main.temp;

    for (let h = 0; h < 3; h++) {
      const ratio = h / 3;
      const temp = t1 + (t2 - t1) * ratio;

      const date = new Date(current.dt_txt);
      date.setHours(date.getHours() + h);

      result.push({
        time: date,
        temp: Math.round(temp),
        icon: current.weather[0].icon,
      });
    }
  }

  return result.slice(0, 24);
}

// ==========================
// RENDER CURRENT
// ==========================
function renderWeather(data) {
  const atual = data.list[0];

  const temp = Math.round(atual.main.temp);
  const descricao = atual.weather[0].description;
  const feels = Math.round(atual.main.feels_like);
  const wind = Math.round(atual.wind.speed * 3.6);
  const humidity = atual.main.humidity;
  const pressure = atual.main.pressure;
  const icon = atual.weather[0].icon;

  const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  tempAtual.innerHTML = `
    <img src="${iconURL}" alt="${descricao}" />
    <div class="weather__current-info">
      <div class="weather__temperature">${temp}°C</div>
      <p class="weather__description">${descricao}</p>
    </div>
  `;

  lblWind.textContent = `${wind} km/h`;
  lblHumi.textContent = `${humidity}%`;
  lblPress.textContent = `${pressure} hPa`;
  lblFeels.textContent = `${feels}°C`;
}

// ==========================
// RENDER FORECAST (DINÂMICO)
// ==========================
function renderForecastSlices() {
  const now = new Date();

  slices.forEach((slice, i) => {
    const future = new Date(now);
    future.setHours(now.getHours() + i);

    const match = hourlyForecast.find(item =>
      item.time.getHours() === future.getHours()
    );

    if (!match) return;

    const hora = future.toTimeString().slice(0, 5);
    const iconURL = `https://openweathermap.org/img/wn/${match.icon}.png`;

    slice.innerHTML = `
      <span class="card__label">${hora}</span>
      <img src="${iconURL}" class="card__icon" alt="forecast icon" />
      <span class="card__value">${match.temp}°C</span>
    `;
  });
}

// ==========================
// INTERVALS
// ==========================

// Atualiza UI a cada 1h
setInterval(() => {
  renderForecastSlices();
}, 60 * 60 * 1000);

// Refetch a cada 3h (usa última localização válida)
setInterval(async () => {
  if (!lastLocation) return;

  try {
    const data = await getWeatherData(lastLocation);
    hourlyForecast = build24hForecast(data.list);
  } catch (err) {
    console.error("Erro refetch:", err);
  }
}, 3 * 60 * 60 * 1000);