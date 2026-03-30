//TODO: Trocar url pela api

//var url = http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&appid={API key}

let cidade, estado, pais;
//tu recebe

function getURL(){
    return `http://api.openweathermap.org/geo/1.0/direct?q=$cidade,$estado,$pais&appid={API key}`
}

export async function fetchGeoCode(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 2. Parse the response body as JSON
    const data = await response.json();

    return data;

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}