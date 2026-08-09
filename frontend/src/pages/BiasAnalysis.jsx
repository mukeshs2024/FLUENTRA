import { useState } from 'react'
import { ShieldAlert } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/ui/button'
import Textarea from '../components/ui/textarea'
import Progress from '../components/ui/progress'
import { analyzeBias } from '../lib/api'

export default function BiasAnalysis() {
  const [text, setText] = useState('')
  const [score, setScore] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    setLoading(true)
    try {
      const response = await analyzeBias({ text })
      setScore(response)
    } catch (error) {
      setScore({
        summary: 'Unable to reach the API. Start the backend to run analysis.',
        toxicity: 0,
        bias: 0,
        flags: [],
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Bias & toxicity detection"
        subtitle="Audit localized content for harmful language, bias, and safety risks."
      />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel space-y-4">
          <Textarea
            placeholder="Paste copy to analyze for bias and toxicity."
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <Button variant="glow" onClick={handleAnalyze} disabled={loading}>
            <ShieldAlert size={16} />
            {loading ? 'Analyzing...' : 'Run bias analysis'}
          </Button>
          <Progress value={loading ? 60 : 100} />
        </div>
        <div className="glass-panel space-y-4">
          <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-100">
            Safety snapshot
          </h3>
          <div className="rounded-2xl border border-ink-200/70 bg-white/80 p-4 text-sm text-ink-700 dark:border-ink-700/70 dark:bg-ink-900/70 dark:text-ink-200">
            <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Summary</p>
            <p className="mt-2">
              {score?.summary || 'Detection results will appear here.'}
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-ink-200/70 bg-ink-100/60 p-4 dark:border-ink-700/70 dark:bg-ink-900/60">
              <p className="text-xs uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
                Toxicity
              </p>
              <p className="mt-2 text-2xl font-semibold text-ink-900 dark:text-ink-100">
                {score ? `${Math.round(score.toxicity * 100)}%` : '--'}
              </p>
            </div>
            <div className="rounded-2xl border border-ink-200/70 bg-ink-100/60 p-4 dark:border-ink-700/70 dark:bg-ink-900/60">
              <p className="text-xs uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
                Bias risk
              </p>
              <p className="mt-2 text-2xl font-semibold text-ink-900 dark:text-ink-100">
                {score ? `${Math.round(score.bias * 100)}%` : '--'}
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-ink-200/70 bg-white/80 p-4 text-sm text-ink-700 dark:border-ink-700/70 dark:bg-ink-900/70 dark:text-ink-200">
            <p className="text-xs uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
              Flags
            </p>
            <ul className="mt-2 space-y-2">
              {(score?.flags?.length ? score.flags : ['No flags detected']).map((flag) => (
                <li key={flag}>• {flag}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
