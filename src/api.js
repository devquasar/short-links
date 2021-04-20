const API_TOKEN = process.env.VUE_APP_API_TOKEN
const apiURL = 'https://t.ly/api/v1/link/'
const urlRegexp = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/i
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

const createBody = function (processType, urlToProcess) {
  return {
    [processType === 'shorten' ? 'long_url' : 'short_url']: urlToProcess,
    api_token: API_TOKEN
  }
}

export const isValid = function (url) {
  return url.match(urlRegexp)
}

export async function processLink (processType = 'shorten', urlToProcess) {
  const trimmedURL = urlToProcess.trim()
  if (!trimmedURL || !isValid(trimmedURL)) return
  const body = createBody(processType, urlToProcess)

  const response = await fetch(apiURL + processType, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
  return await response.json()
}
