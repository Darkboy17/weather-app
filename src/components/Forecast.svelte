<script>
  /**
   * @type {string | any[]}
   */
  export let forecastData = [];

  // Slice the forecast data to get only the next 5 days

  // Use a reactive statement to update fiveDayForecast whenever forecastData changes
  $: fiveDayForecast = forecastData.slice(1, 6);

  console.log("5 day forecast: ", fiveDayForecast);

  /**
   * @param {string | number | Date} dateString
   */
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }
</script>

<div class="card rounded overflow-hidden">
  <div class="flex gap-4 px-4 overflow-x-auto">
    {#each fiveDayForecast as { datetime, tempmax, tempmin, conditions }}
      <div class=" shrink-0 max-w-[150px] rounded shadow-lg content-center">
        <div class="px-4 py-4">
          <p class="text-gray-700 text-base">
            <span class="font-semibold">{formatDate(datetime)}:</span>
          </p>
          <p class="text-gray-700 text-base"></p>
          <p class="font-semibold">Max Temp: {tempmax}°C</p>
          <p class="text-gray-700 text-base"></p>
          <p class="font-semibold">Min Temp: {tempmin}°C</p>
          <div class="mt-2 text-base">
            <span class="font-semibold">Conditions:</span>
            <span>{conditions}</span>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  @media (max-width: 700px) {
    .card {
      max-width: 24rem;
    }
  }
</style>
