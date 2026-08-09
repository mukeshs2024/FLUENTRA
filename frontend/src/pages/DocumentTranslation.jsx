export default function DocumentTranslation() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Document Translation</h1>
        <p>Translate PDFs, slides, and documents with layout preservation.</p>
      </div>
      <div className="grid-two">
        <section className="card">
          <div className="upload-box">Drop documents here or click to upload</div>
          <div className="row">
            <label className="field compact">
              <span>Target language</span>
              <select>
                <option>English</option>
                <option>Hindi</option>
                <option>French</option>
              </select>
            </label>
            <label className="field compact">
              <span>Region</span>
              <select>
                <option>India</option>
                <option>Europe</option>
                <option>USA</option>
              </select>
            </label>
          </div>
          <button className="primary">Translate document</button>
        </section>
        <section className="card output-card">
          <div className="output-header">
            <h3>Document output</h3>
            <span>Download localized file</span>
          </div>
          <div className="output-pane">Translated document preview will appear here.</div>
        </section>
      </div>
    </div>
  )
}
