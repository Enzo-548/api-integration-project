//TODO: Trocar url pela api
export async function fetchWeather(url) {
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