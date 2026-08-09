import { Sparkles, ShieldAlert, Search, Languages } from 'lucide-react'
import StatCard from '../components/StatCard'
import ToolCard from '../components/ToolCard'

export default function Dashboard() {
  return (
    <div className="page">
      <section className="hero-card">
        <div className="hero-content">
          <p className="hero-kicker">AI Localization</p>
          <h1>
            Localize content for <span>every</span> market
          </h1>
          <p>
            AI-powered translation, cultural adaptation, and bias detection built for
            high-stakes localization teams.
          </p>
          <div className="hero-actions">
            <button className="primary">Start Localizing</button>
            <button className="secondary">Try SEO Tools</button>
          </div>
        </div>
      </section>

      <section className="stat-grid">
        <StatCard icon={<Languages size={18} />} label="Languages" value="11+" />
        <StatCard icon={<Sparkles size={18} />} label="Tone Modes" value="5" />
        <StatCard icon={<ShieldAlert size={18} />} label="Accuracy" value="99%" />
      </section>

      <section className="section">
        <h2>Available tools</h2>
        <div className="tool-grid">
          <ToolCard
            icon={<Languages size={18} />}
            title="Text Localization"
            tag="Popular"
            description="Translate and culturally adapt content into Indian languages with tone control."
          />
          <ToolCard
            icon={<Search size={18} />}
            title="SEO Localization"
            tag="SEO"
            description="Localize metadata and keywords for regional search engines."
          />
          <ToolCard
            icon={<ShieldAlert size={18} />}
            title="Bias & Sensitivity"
            tag="Safety"
            description="Detect bias and cultural sensitivity issues before publishing."
          />
        </div>
      </section>
    </div>
  )
}
