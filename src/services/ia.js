const PUBLIC_API_KEY = import.meta.env.PUBLIC_API_KEY
const API_GENERATE_URL = 'https://api.cohere.ai/generate'
const API_DETEC_LANGUAGE_URL = 'https://api.cohere.ai/v1/detect-language'

export async function checkIsEnglish(input) {
  const data = {
    texts: [input]
  }

  const { results } = await fetch(API_DETEC_LANGUAGE_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `BEARER ${PUBLIC_API_KEY}`,
      'Content-Type': 'application/json',
      'Cohere-Version': '2021-11-08'
    },
    body: JSON.stringify(data)
  }).then((res) => res.json())

  const [{ language_code }] = results

  return language_code === 'en'
}

export async function fixEnglish(input) {
  const data = {
    model: 'xlarge',
    prompt: `This is a spell checker generator.
--
Incorrect sample: "I are good!"
correct sample: "I am good!"
--
Incorrect sample: "I have 22 years old"
correct sample: "I am 22 years old!"
--
Incorrect sample: "I don't can know"
correct sample: "I don't know"
--
Incorrect sample: "${input}"
correct sample:`,
    max_tokens: 40,
    temperature: 0.3,
    k: 0,
    p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ['--'],
    return_likelihoods: 'NONE'
  }

  const response = await fetch(API_GENERATE_URL, {
    method: 'POST',
    headers: {
      Authorization: `BEARER ${PUBLIC_API_KEY}`,
      'Content-Type': 'application/json',
      'Cohere-Version': '2021-11-08'
    },
    body: JSON.stringify(data)
  }).then((res) => res.json())

  const { text } = response.generations[0]
  return text.replace('--', '').trim()
}
