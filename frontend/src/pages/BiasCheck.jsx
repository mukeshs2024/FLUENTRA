import { useState } from 'react'
import { analyzeBias } from '../lib/api'

export default function BiasCheck() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    setLoading(true)
    try {
      const response = await analyzeBias({ text })
      setResult(response)
    } catch (error) {
      setResult({ summary: 'Unable to reach the API.', toxicity: 0, bias: 0 })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Bias Check</h1>
        <p>Detect bias, toxicity, and cultural sensitivity issues.</p>
      </div>
      <div className="grid-two">
        <section className="card">
          <label className="field">
            <span>Input text</span>
            <textarea
              rows={8}
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Paste content to analyze..."
            />
          </label>
          <button className="primary" onClick={handleAnalyze} disabled={loading}>
            {loading ? 'Analyzing...' : 'Run bias check'}
          </button>
        </section>
        <section className="card output-card">
          <div className="output-header">
            <h3>Safety summary</h3>
            <span>Score breakdown</span>
          </div>
          <div className="output-pane">
            <p>{result?.summary || 'Analysis results will appear here.'}</p>
            <div className="row">
              <div className="metric">
                <span>Toxicity</span>
                <strong>{result ? `${Math.round(result.toxicity * 100)}%` : '--'}</strong>
              </div>
              <div className="metric">
                <span>Bias</span>
                <strong>{result ? `${Math.round(result.bias * 100)}%` : '--'}</strong>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
