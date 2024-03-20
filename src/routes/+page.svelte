<script lang="ts">
  import { onMount } from "svelte";
  import { fetchWeatherData } from "../weatherAPI";
  import { fetchCityName } from "../reverseGeolocationAPI";
  import WeatherInfo from "../components/WeatherInfo.svelte";
  import SearchBar from "../components/SearchBar.svelte";
  import Forecast from "../components/Forecast.svelte";

  // Your Visual Crossing Weather API key

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  // Define a more specific type for weatherData that includes the days property
  type WeatherData = {
    description: any;
    currentConditions: {
      temp: any;
      conditions: any;
      windspeed: any;
      humidity: any;
      uvindex: any;
    };
    latitude?: any;
    longitude?: any;
    days?: any[]; // Assuming days is an array, adjust the type as necessary
  } | null;

  let weatherData: WeatherData = null;
  let city: any;
  let forecastData: any[] | undefined = undefined; // Initialize forecastData as undefined
  let cityName = ""; // Initialize cityName

  let isLoading = false; // Add a loading state variable

  // Fetch weather data when the component is mounted
  onMount(async () => {
    try {
      isLoading = true; // Set loading state to true
      weatherData = await fetchWeatherData(cityName, API_KEY);
      forecastData = weatherData?.days || [];
      console.log("weather data: ", weatherData);

      // Define the latitude and longitude coordinates
      const latitude = weatherData?.latitude;
      const longitude = weatherData?.longitude;

      city = await fetchCityName(latitude, longitude);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      isLoading = false; // Set loading state to false after fetching data
    }
  });

  // Function to handle search event
  function handleSearch(event: { detail: string }) {
    cityName = event.detail;
    fetchWeather();
  }

  // Function to fetch weather data for the current city
  async function fetchWeather() {
    try {
      isLoading = true; // Set loading state to true
      // Clear forecast data
      forecastData = undefined;
      weatherData = await fetchWeatherData(cityName, API_KEY);
      forecastData = weatherData?.days;
      console.log("weather data: ", weatherData);

      // Define the latitude and longitude coordinates
      const latitude = weatherData?.latitude;
      const longitude = weatherData?.longitude;

      city = await fetchCityName(latitude, longitude);
      console.log("City: ", city);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      isLoading = false; // Set loading state to false after fetching data
    }
  }
</script>

<main class="container mx-auto my-auto p-2">
  <h2
    class="mb-2 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl text-center"
  >
    My Weather App
  </h2>

  <div class="flex items-center justify-center mt-10">
    <!-- Display search bar -->
    <SearchBar on:search={handleSearch} />
  </div>
  <div class="flex items-center justify-center mt-5">
    {#if isLoading}
      <!-- Check the loading state -->
      <div
        class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200"
      >
        Loading...
      </div>
      <!-- Display loading message -->
    {:else if weatherData}
      <!-- Display weather information -->
      <WeatherInfo
        {city}
        conditions={weatherData.currentConditions.conditions}
        temperature={weatherData.currentConditions.temp}
        description={weatherData.description}
        windSpeed={weatherData.currentConditions.windspeed}
        humidity={weatherData.currentConditions.humidity}
        uvIndex={weatherData.currentConditions.uvindex}
      />
    {/if}
  </div>

  <!-- Display forecast -->
  <style>
    @media (max-width: 414px) {
      .flex-column-responsive {
        flex-direction: row;
      }
    }
  </style>
  {#if weatherData && weatherData.days && !isLoading}
    <div>
      <h2 class="text-lg font-semibold mt-5 flex items-center justify-center">
        5-Day Forecast
      </h2>
    </div>

    <div class="scrollbar-hidden flex items-center justify-center">
      <Forecast forecastData={weatherData.days} />
    </div>
  {/if}
</main>
