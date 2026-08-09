import { useState } from 'react'
import { languages } from '../data/options'

export default function VideoTranslation() {
  const [file, setFile] = useState(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [targetLang, setTargetLang] = useState('Hindi')
  const [tone, setTone] = useState('Professional')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleProcess = async () => {
    if (!file && !videoUrl) return alert('Please upload a video file or provide a URL')
    setLoading(true)
    const formData = new FormData()
    if (file) formData.append('file', file)
    if (videoUrl) formData.append('video_url', videoUrl)
    formData.append('target_lang', targetLang)
    formData.append('tone', tone)

    try {
      const resp = await fetch('http://localhost:8000/translate/video', {
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
        <h1>Video Translation</h1>
        <p>Generate multilingual captions with Whisper and cultural adaptation via Gemini.</p>
      </div>
      <div className="grid-two">
        <section className="card">
          <div
            className="upload-box"
            onClick={() => document.getElementById('video-input').click()}
          >
            {file ? file.name : 'Drop video files here or click to upload'}
            <input
              id="video-input"
              type="file"
              hidden
              accept="video/*,.mp4,.mov,.mkv"
              onChange={(e) => {
                setFile(e.target.files[0])
                setVideoUrl('') // Clear URL if file is selected
              }}
            />
          </div>

          <div className="divider">OR</div>

          <label className="field">
            <span>Video URL</span>
            <input
              type="text"
              placeholder="https://example.com/video.mp4"
              value={videoUrl}
              onChange={(e) => {
                setVideoUrl(e.target.value)
                setFile(null) // Clear file if URL is entered
              }}
            />
          </label>

          <div className="row mt-4">
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
            onClick={handleProcess}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Generate captions'}
          </button>
        </section>
        <section className="card output-card">
          <div className="output-header">
            <h3>Caption output</h3>
            {result?.srt && (
              <button
                className="text-link"
                onClick={() => {
                  const blob = new Blob([result.srt], { type: 'text/plain' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = 'captions.srt'
                  a.click()
                }}
              >
                Download .srt
              </button>
            )}
          </div>
          <div className="output-pane">
            {result ? (
              <div className="segments-list">
                {result.segments.map((s, i) => (
                  <div key={i} className="segment-item">
                    <span className="timestamp">[{s.start.toFixed(2)} - {s.end.toFixed(2)}]</span>
                    <p>{s.text}</p>
                  </div>
                ))}
              </div>
            ) : 'Caption preview will appear here.'}
          </div>
        </section>
      </div>
    </div>
  )
}
