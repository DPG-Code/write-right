<script>
  import { checkIsEnglish } from '../services/ia'
  import { isValidInput } from './store'
  import debounce from 'just-debounce-it'

  const handleChange = async (e) => {
    const { value } = e.target
    const isValid = value.length > 0
    if (!isValid) {
      isValidInput.set(false)
      return
    }
    const isEnglish = await checkIsEnglish(value)
    isValidInput.set(isEnglish)
  }

  // Debounce to have only request each 600ms
  const handleChangeDebounced = debounce(handleChange, 600)
</script>

<textarea
  on:input={handleChangeDebounced}
  id="result"
  class="flex-1 w-full p-4 text-base text-white placeholder-neutral-500 bg-[#0f0f0f9c] border border-none rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent   xl:text-lg"
  placeholder="Your text to correct here!"
  name="comment"
  rows="5"
  cols="40"
/>
