import { fetchWeather } from "../api/weather.js"
//import { fetchGeoCode } from "../api/geocode.js";

const fetchPromise = fetch("https://api.openweathermap.org", {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "text/xml",
    "X-PINGOTHER": "pingpong",
  },
  body: "<person><name>Arun</name></person>",
});

fetchPromise.then((response) => {
  console.log(response.status);
});

//TODO: tirar daqui o local da resposta da api
const data = await fetchWeather("https://api.openweathermap.org/data/3.0/onecall?lat={34.0901}&lon={-118.4065}&appid={c8921f0324e3c6dcaeba72c9ad2a6466}"); // retorna um json
console.log("lat: " + data.coord.lat);
console.log("lon: " + data.coord.lon);

//GEOCODE --> pega lat e long atual
//TEMPO --> Usa lat e long p/ devolver clima/tempo