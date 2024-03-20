export async function fetchCityName(latitude: number, longitude: number) {
  // Construct the API query URL
  const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

  // Make an HTTP request to the API
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    return data.address.city;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}
