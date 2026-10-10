const configuredApiUrl = import.meta.env.VITE_API_URL?.trim()
const API_BASE_URL = (configuredApiUrl || '').replace(/\/+$/, '')

async function request(endpoint, { timeoutMs = 15000, ...options } = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...options.headers
  }

  const controller = new AbortController()
  let timedOut = false
  const timeoutId = window.setTimeout(() => {
    timedOut = true
    controller.abort()
  }, timeoutMs)

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal
    })
    const responseText = await response.text()
    let data = {}

    if (responseText) {
      try {
        data = JSON.parse(responseText)
      } catch {
        throw new Error('The server returned an invalid response. Please try again later.')
      }
    }

    if (!response.ok) {
      throw new Error(data?.message || `Request failed (${response.status}). Please try again.`)
    }

    return data
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      if (timedOut) {
        throw new Error('The request timed out. Please try again.')
      }
      throw new Error('The request was interrupted. Please try again.')
    }

    if (error instanceof TypeError) {
      console.error('Network request failed:', { url, error })
      throw new Error('Could not reach the contact service. Check the API URL, backend availability, and CORS policy.')
    }

    console.error('API request error:', error)
    throw error
  } finally {
    window.clearTimeout(timeoutId)
  }
}

export const api = {
  get: (endpoint) => request(endpoint, { method: 'GET' }),
  post: (endpoint, body) => request(endpoint, { 
    method: 'POST', 
    body: JSON.stringify(body) 
  }),
  put: (endpoint, body) => request(endpoint, { 
    method: 'PUT', 
    body: JSON.stringify(body) 
  }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' })
}
