<script>
  import Copy from './icons/Copy.svelte'
  import { isValidInput, textToFix } from './store'
  let copied = false

  const copyToClipboard = () => {
    navigator.clipboard.writeText($textToFix)
    copied = true
    setTimeout(() => {
      copied = false
    }, 3500)
  }
</script>

<button
  on:click={copyToClipboard}
  disabled={!$isValidInput}
  type="button"
  class={`${
    !$isValidInput ? 'pointer-events-none opacity-50' : ''
  } py-2 px-4 flex justify-center items-center bg-[#0f0f0f9c] text-white hover:bg-[#0f0f0f] text-center text-sm font-semibold shadow-md gap-2 rounded-lg absolute right-0 -top-12   xl:-top-16 xl:text-lg xl:gap-3`}
>
  <Copy />
  Copy
</button>

{#if copied}
  <span
    class="text-xs text-white font-semibold opacity-70 absolute right-28 -top-9   xl:text-sm xl:right-32 xl:-top-[52px]"
    >Copied!</span
  >
{/if}
