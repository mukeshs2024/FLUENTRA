import { useState } from 'react'
import { analyzeBias, translateText } from '../lib/api'
import { languages } from '../data/options'

export default function TextLocalization() {
  const [text, setText] = useState('')
  const [targetLang, setTargetLang] = useState('Hindi')
  const [tone, setTone] = useState('Formal')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLocalize = async () => {
    setLoading(true)
    try {
      const response = await translateText({
        text,
        source_lang: 'Auto detect',
        target_lang: targetLang,
        tone,
      })
      setResult(response.localized_text || '')
    } catch (error) {
      setResult('Unable to reach the API. Start the backend first.')
    } finally {
      setLoading(false)
    }
  }

  const handleBias = async () => {
    setLoading(true)
    try {
      await analyzeBias({ text })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Text Localization</h1>
        <p>Transform your content across Indian languages with tone control.</p>
      </div>
      <div className="grid-two">
        <section className="card">
          <label className="field">
            <span>Input text</span>
            <textarea
              rows={7}
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Enter text to localize..."
            />
          </label>
          <div className="row">
            <label className="field compact">
              <span>Source language</span>
              <select>
                {languages.map(lang => (
                  <option key={lang}>{lang}</option>
                ))}
              </select>
            </label>
            <label className="field compact">
              <span>Target language</span>
              <select value={targetLang} onChange={(event) => setTargetLang(event.target.value)}>
                {languages.filter(l => l !== 'Auto detect').map(lang => (
                  <option key={lang}>{lang}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="tone-grid">
            {['Formal', 'Informal', 'Professional', 'Marketing', 'Academic'].map((item) => (
              <button
                type="button"
                key={item}
                className={tone === item ? 'chip active' : 'chip'}
                onClick={() => setTone(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="row">
            <button className="primary" onClick={handleLocalize} disabled={loading}>
              {loading ? 'Localizing...' : 'Localize content'}
            </button>
            <button className="secondary" onClick={handleBias} disabled={loading}>
              Bias check
            </button>
          </div>
        </section>
        <section className="card output-card">
          <div className="output-header">
            <h3>Results</h3>
            <span>Results will appear here</span>
          </div>
          <div className="output-pane">
            {result || 'Enter text and configure settings to generate localized output.'}
          </div>
        </section>
      </div>
    </div>
  )
}
