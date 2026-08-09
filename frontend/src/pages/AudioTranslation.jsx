import { useState } from 'react'
import { languages } from '../data/options'

export default function AudioTranslation() {
  const [file, setFile] = useState(null)
  const [targetLang, setTargetLang] = useState('Hindi')
  const [tone, setTone] = useState('Professional')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleUpload = async () => {
    if (!file) return alert('Please upload an audio file')
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('target_lang', targetLang)
    formData.append('tone', tone)

    try {
      const resp = await fetch('http://localhost:8000/translate/audio', {
        method: 'POST',
        body: formData,
      })
      const data = await resp.json()
      setResult(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Audio Translation</h1>
        <p>Upload speech and generate localized voice tracks.</p>
      </div>
      <div className="grid-two">
        <section className="card">
          <div
            className="upload-box"
            onClick={() => document.getElementById('audio-input').click()}
          >
            {file ? file.name : 'Drop audio files here or click to upload'}
            <input
              id="audio-input"
              type="file"
              hidden
              accept="audio/*,.mp3,.wav,.m4a,.webm,.ogg"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="row">
            <label className="field compact">
              <span>Target language</span>
              <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </label>
            <label className="field compact">
              <span>Tone</span>
              <select value={tone} onChange={(e) => setTone(e.target.value)}>
                <option>Professional</option>
                <option>Casual</option>
                <option>Excited</option>
                <option>Serious</option>
              </select>
            </label>
          </div>
          <button
            className="primary"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Translate audio'}
          </button>
        </section>
        <section className="card output-card">
          <div className="output-header">
            <h3>Localized voice output</h3>
            {result?.audio_url && (
              <a href={result.audio_url} target="_blank" rel="noreferrer">
                Download Audio
              </a>
            )}
          </div>
          <div className="output-pane">
            {result ? (
              <div className="result-content">
                <p><strong>Transcript:</strong> {result.transcript}</p>
                <p><strong>Translated ({tone}):</strong> {result.localized_text}</p>
                {result.audio_url && (
                  <audio controls src={result.audio_url} className="w-full mt-4" />
                )}
              </div>
            ) : 'Processed audio and transcript will appear here.'}
          </div>
        </section>
      </div>
    </div>
  )
}
