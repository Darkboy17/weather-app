<script>
  // Define props to receive weather data
  /**
   * @type {any}
   */
  export let temperature;
  /**
   * @type {any}
   */
  export let description;
  /**
   * @type {any}
   */
  export let windSpeed;
  /**
   * @type {any}
   */
  export let humidity;
  /**
   * @type {any}
   */
  export let uvIndex;
  /**
   * @type {any}
   */
  export let city;

  /**
   * @type {any}
   */
  export let conditions;

  import clearImg from "../static/clear.png";
</script>

<div class="max-w-sm rounded overflow-hidden shadow-lg content-center flex">
  <div class="px-8 py-4">
    <div class="font-bold text-xl mb-2">Current Weather in {city}</div>
    <p class="text-gray-700 text-base">
      <span class="font-semibold">Temperature:</span>
      {temperature}°C
    </p>
    <p class="text-gray-700 text-base">
      <span class="font-semibold">Wind Speed:</span>
      {windSpeed} m/s
    </p>
    <p class="text-gray-700 text-base">
      <span class="font-semibold">Humidity:</span>
      {humidity}%
    </p>
    <p class="text-gray-700 text-base">
      <span class="font-semibold">UV Index:</span>
      {uvIndex}
    </p>
    <p class="text-gray-700 text-base">
      <span class="font-semibold">Description:</span>
      {description}
    </p>
  </div>

  <!-- Image -->
  <div class="mr-5">
    <!-- Image container -->
    <div class="relative mt-15">
      <img
        src={clearImg}
        alt="no_image"
        class="object-contain h-48 w-48"
        style="margin-bottom: -40px;"
      />
      <!-- Overlay text -->
      <div
        class="absolute inset-x-0 flex items-center justify-center ml-4"
        style="margin-top: 0px;"
      >
        <div class="text-base">{conditions}</div>
      </div>
    </div>
  </div>
</div>
