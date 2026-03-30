
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