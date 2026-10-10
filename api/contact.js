const MAX_FIELD_LENGTHS = {
  name: 120,
  email: 254,
  subject: 160,
  message: 5000,
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function sendJson(res, status, body) {
  res.status(status).json(body)
}

function isValidPayload(body) {
  return body &&
    typeof body.name === 'string' &&
    body.name.trim().length > 0 &&
    body.name.length <= MAX_FIELD_LENGTHS.name &&
    typeof body.email === 'string' &&
    EMAIL_PATTERN.test(body.email.trim()) &&
    body.email.length <= MAX_FIELD_LENGTHS.email &&
    (body.subject === undefined || (
      typeof body.subject === 'string' &&
      body.subject.length <= MAX_FIELD_LENGTHS.subject
    )) &&
    typeof body.message === 'string' &&
    body.message.trim().length > 0 &&
    body.message.length <= MAX_FIELD_LENGTHS.message
}

export default async function handler(req, res) {
  const requestOrigin = req.headers?.origin
  const allowedOrigin = process.env.PORTFOLIO_ORIGIN ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : '')

  if (requestOrigin && (!allowedOrigin || requestOrigin !== allowedOrigin)) {
    return sendJson(res, 403, { message: 'This website is not allowed to send contact requests.' })
  }

  if (requestOrigin && allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin)
    res.setHeader('Vary', 'Origin')
  }

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type')
    res.setHeader('Access-Control-Max-Age', '86400')
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS')
    return sendJson(res, 405, { message: 'Method not allowed.' })
  }

  res.setHeader('Cache-Control', 'no-store')

  if (!isValidPayload(req.body)) {
    return sendJson(res, 400, { message: 'Please provide a name, valid email, and message.' })
  }

  const { RESEND_API_KEY, CONTACT_FROM_EMAIL } = process.env
  const recipient = process.env.CONTACT_TO_EMAIL || 'parvezsiddiqui26@navgurukul.org'

  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL) {
    console.error('Contact endpoint is missing RESEND_API_KEY or CONTACT_FROM_EMAIL.')
    return sendJson(res, 503, { message: 'The contact service is not configured yet. Please email me directly.' })
  }

  const { name, email, subject = '', message } = req.body
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [recipient],
        reply_to: email.trim(),
        subject: subject.trim() || `Portfolio message from ${name.trim()}`,
        text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
      }),
      signal: controller.signal,
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error('Resend rejected the contact email:', response.status, errorBody)
      return sendJson(res, 502, { message: 'Email delivery failed. Please try again or email me directly.' })
    }

    return sendJson(res, 202, { message: 'Message received. Thank you for reaching out.' })
  } catch (error) {
    console.error('Contact email delivery failed:', error)
    return sendJson(res, 502, {
      message: error.name === 'AbortError'
        ? 'Email delivery timed out. Please try again.'
        : 'Email delivery is temporarily unavailable. Please try again or email me directly.',
    })
  } finally {
    clearTimeout(timeout)
  }
}
