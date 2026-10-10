import { useEffect, useState } from 'react'

const COOKIE_NAME = 'portfolio_cookie_consent'
const DEFAULT_PREFERENCES = { necessary: true, analytics: false, personalization: false }

function readConsent() {
  const entry = document.cookie
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${COOKIE_NAME}=`))

  if (!entry) return null

  const value = entry.slice(COOKIE_NAME.length + 1)
  if (value === 'accepted' || value === 'necessary') return DEFAULT_PREFERENCES

  let consent
  try {
    consent = JSON.parse(decodeURIComponent(value))
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof URIError) return null
    throw error
  }

  if (consent?.version !== 1 || typeof consent.analytics !== 'boolean' || typeof consent.personalization !== 'boolean') {
    return null
  }

  return { necessary: true, analytics: consent.analytics, personalization: consent.personalization }
}

function saveConsent(preferences) {
  const value = encodeURIComponent(JSON.stringify({ ...preferences, version: 1 }))
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${COOKIE_NAME}=${value}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`
}

export default function CookieConsent() {
  const [consent, setConsent] = useState(readConsent)
  const [preferences, setPreferences] = useState(() => readConsent() || DEFAULT_PREFERENCES)
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    const openSettings = () => {
      const savedConsent = readConsent()
      setPreferences(savedConsent || DEFAULT_PREFERENCES)
      setConsent(savedConsent)
      setSettingsOpen(true)
    }

    window.addEventListener('open-cookie-settings', openSettings)
    return () => window.removeEventListener('open-cookie-settings', openSettings)
  }, [])

  const choose = (nextPreferences) => {
    saveConsent(nextPreferences)
    setConsent(nextPreferences)
    setSettingsOpen(false)
  }

  if (consent && !settingsOpen) return null

  return (
    <aside className="cookie-consent" aria-label="Cookie preferences">
      <div className="cookie-consent-copy">
        <strong>{settingsOpen ? 'Cookie preferences' : 'Your privacy matters'}</strong>
        <p>
          This portfolio uses an essential cookie to remember your choice. Optional analytics and
          personalization are not currently active.
        </p>
        {!settingsOpen && (
          <button
            className="cookie-settings-link"
            aria-expanded={settingsOpen}
            aria-controls="cookie-preferences-panel"
            onClick={() => setSettingsOpen(true)}
          >
            Customize preferences
          </button>
        )}
      </div>
      <div className="cookie-preferences" id="cookie-preferences-panel" hidden={!settingsOpen}>
          <label>
            <span><strong>Essential</strong><small>Required to remember these settings</small></span>
            <input type="checkbox" checked disabled />
          </label>
          <label>
            <span><strong>Analytics</strong><small>No analytics service is currently enabled</small></span>
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={(event) => setPreferences({ ...preferences, analytics: event.target.checked })}
            />
          </label>
          <label>
            <span><strong>Personalization</strong><small>No personalization cookies are currently used</small></span>
            <input
              type="checkbox"
              checked={preferences.personalization}
              onChange={(event) => setPreferences({ ...preferences, personalization: event.target.checked })}
            />
          </label>
      </div>
      <div className="cookie-actions">
        {settingsOpen ? (
          <>
            <button className="cookie-secondary" onClick={() => setSettingsOpen(false)}>Cancel</button>
            <button className="cookie-primary" onClick={() => choose(preferences)}>Save preferences</button>
          </>
        ) : (
          <>
            <button className="cookie-secondary" onClick={() => choose(DEFAULT_PREFERENCES)}>
              Essential only
            </button>
            <button className="cookie-primary" onClick={() => choose({ necessary: true, analytics: true, personalization: true })}>
              Accept all
            </button>
          </>
        )}
      </div>
    </aside>
  )
}
