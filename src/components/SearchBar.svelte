<script lang="ts">
  import { createEventDispatcher } from "svelte";

  let cityName = "";

  const dispatch = createEventDispatcher();

  function search() {
    dispatch("search", cityName);
  }
</script>

<div class="flex items-center space-x-2">
  <input
    type="text"
    class="px-4 py-2 border border-gray-300 rounded-lg"
    bind:value={cityName}
    placeholder="Enter city or zip code"
  />
  <button class="bg-blue-500 text-white px-4 py-2 rounded-lg" on:click={search}
    >Search</button
  >
</div>
