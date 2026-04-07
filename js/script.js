import { fetchWeather, getWeatherURL } from "../api/weather.js";
import { fetchGeoCode, getGeoURL } from "../api/geocode.js";

const API_KEY = "c8921f0324e3c6dcaeba72c9ad2a6466";

// DOM
const slice1 = document.querySelector("#slice_1");
const slice2 = document.querySelector("#slice_2");
const slice3 = document.querySelector("#slice_3");
const slice4 = document.querySelector("#slice_4");

const lblTemp = document.querySelector("#temperature");
const lblWind = document.querySelector("#wind");
const lblHumi = document.querySelector("#humidity");
const lblPress = document.querySelector("#pressure");

const txtInput = document.querySelector("#input");

inputCity.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    await init();
  }
});

// INIT
document.addEventListener("DOMContentLoaded", init);

async function init() {
  try {
    location = await getUserLocation();
    console.log("location:", location);

    const data = await getWeatherData(location);
    console.log("data:", data);

    renderWeather(data);
    renderForecast(data.list);
  } catch (error) {
    console.error("Erro:", error.message);
  }
}

// Weather
async function getWeatherData({ lat, lon }) {
  const url = getWeatherURL(lat, lon, API_KEY);
  return await fetchWeather(url);
}

// Location
async function getUserLocation() {
  if (txtInput.trim() !== "") {
    const cidade = inputCity.value.trim();

    const url = getGeoURL(cidade, API_KEY);
    const geoData = await fetchGeoCode(url);

    return {
      lat: geoData[0].lat,
      lon: geoData[0].lon,
    };
  } else {
    return await getCurrentLocation({
      enableHighAccuracy: true,
      timeout: 10000,
    });
  }
}

function getCurrentLocation(options = {}) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation não suportada."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        resolve({
          lat: latitude,
          lon: longitude,
        });
      },
      (error) => {
        let msg = "Erro desconhecido";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            msg = "Permissão negada";
            break;
          case error.POSITION_UNAVAILABLE:
            msg = "Localização indisponível";
            break;
          case error.TIMEOUT:
            msg = "Tempo esgotado";
            break;
        }

        reject(new Error(msg));
      },
      options,
    );
  });
}

// UI
function renderWeather(data) {
  const atual = data.list[0];

  lblTemp.textContent = `${Math.round(atual.main.temp)}°C`;
  lblWind.textContent = `${atual.wind.speed} km/h`;
  lblHumi.textContent = `${atual.main.humidity}%`;
  lblPress.textContent = `${atual.main.pressure} hPa`;
}

function renderForecast(list) {
  const slices = [slice1, slice2, slice3, slice4];

  list.slice(0, 4).forEach((item, index) => {
    if (slices[index]) {
      slices[index].textContent = `${Math.round(item.main.temp)}°C`;
    }
  });
}
