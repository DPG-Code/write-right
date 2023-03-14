<script>
  import { fixEnglish } from '../services/ia.js'
  import Loading from './icons/Loading.svelte'
  import Upload from './icons/Upload.svelte'
  import { isValidInput, textToFix } from './store.js'
  let promise = null

  const handleClick = async () => {
    const text = document.getElementById('result').value
    promise = fixEnglish(text)
    const value = await promise
    document.getElementById('result').value = value
    textToFix.set(value)
    promise = null
  }
</script>

{#if promise === null}
  <button
    on:click={handleClick}
    disabled={!$isValidInput}
    type="button"
    class={`${
      !$isValidInput ? 'pointer-events-none opacity-50' : ''
    } py-2 px-4 flex justify-center items-center bg-[#bc52ee] text-white w-full text-center text-base font-semibold shadow-md gap-2 rounded-lg   xl:text-lg xl:gap-3`}
  >
    <Upload />
    Fix it!
  </button>
{:else}
  {#await promise}
    <button
      type="button"
      class="pointer-events-none py-2 px-4 flex justify-center items-center bg-white text-black w-full text-center text-base font-semibold shadow-md gap-2 rounded-lg   xl:text-lg xl:gap-3"
    >
      <Loading />
      Loading
    </button>
  {/await}
{/if}
{#if !$isValidInput}
  <span class="w-full text-white text-xs text-center font-medium   xl:text-base"
    >This is not English or the sentence is too short!</span
  >
{/if}
