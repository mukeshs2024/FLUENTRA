import { useState } from 'react'
import { ArrowRightLeft, Copy, Sparkles } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/ui/button'
import Textarea from '../components/ui/textarea'
import Select from '../components/ui/select'
import Input from '../components/ui/input'
import Progress from '../components/ui/progress'
import { languages, tones, currencies } from '../data/options'
import { translateText, localizeCurrency, localizeDate } from '../lib/api'

export default function TextTranslation() {
  const [payload, setPayload] = useState({
    text: '',
    source_lang: 'English',
    target_lang: 'Tamil',
    tone: 'Marketing',
  })
  const [result, setResult] = useState('')
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [currencyPayload, setCurrencyPayload] = useState({
    amount: 50,
    source_currency: 'USD',
    target_currency: 'INR',
    locale: 'en_IN',
  })
  const [currencyResult, setCurrencyResult] = useState('')
  const [datePayload, setDatePayload] = useState({
    date_value: '05/07/2026',
    locale: 'en_IN',
  })
  const [dateResult, setDateResult] = useState('')

  const handleTranslate = async () => {
    setLoading(true)
    setProgress(35)
    try {
      const response = await translateText(payload)
      setResult(response.localized_text || '')
      setProgress(100)
    } catch (error) {
      setResult('Unable to reach the API. Please ensure the backend is running.')
      setProgress(0)
    } finally {
      setLoading(false)
    }
  }

  const handleCurrency = async () => {
    try {
      const response = await localizeCurrency(currencyPayload)
      setCurrencyResult(response.formatted)
    } catch (error) {
      setCurrencyResult('Currency localization unavailable.')
    }
  }

  const handleDate = async () => {
    try {
      const response = await localizeDate(datePayload)
      setDateResult(response.formatted)
    } catch (error) {
      setDateResult('Date localization unavailable.')
    }
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Text translation"
        subtitle="Translate and culturally adapt text with bias screening in one pass."
      />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel space-y-4">
          <div className="flex flex-wrap gap-3">
            <Select
              value={payload.source_lang}
              onChange={(event) =>
                setPayload({ ...payload, source_lang: event.target.value })
              }
            >
              {languages.map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </Select>
            <Select
              value={payload.target_lang}
              onChange={(event) =>
                setPayload({ ...payload, target_lang: event.target.value })
              }
            >
              {languages.map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </Select>
          </div>
          <Textarea
            placeholder="Paste the source text, marketing copy, or product description."
            value={payload.text}
            onChange={(event) => setPayload({ ...payload, text: event.target.value })}
          />
          <div className="grid gap-3 md:grid-cols-2">
            <Select
              value={payload.tone}
              onChange={(event) => setPayload({ ...payload, tone: event.target.value })}
            >
              {tones.map((tone) => (
                <option key={tone}>{tone}</option>
              ))}
            </Select>
          </div>
          <Button variant="glow" onClick={handleTranslate} disabled={loading}>
            <ArrowRightLeft size={16} />
            {loading ? 'Translating...' : 'Translate & adapt'}
          </Button>
          <Progress value={progress} />
        </div>
        <div className="glass-panel space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-100">
              Localized output
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigator.clipboard.writeText(result)}
            >
              <Copy size={14} />
              Copy
            </Button>
          </div>
          <div className="min-h-[240px] rounded-2xl border border-ink-200/70 bg-white/80 p-4 text-sm text-ink-700 dark:border-ink-700/70 dark:bg-ink-900/70 dark:text-ink-200">
            {result || 'Localized copy will appear here.'}
          </div>
          <div className="rounded-2xl border border-ink-200/70 bg-ink-100/60 p-4 text-sm text-ink-700 dark:border-ink-700/70 dark:bg-ink-900/60 dark:text-ink-200">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
              <Sparkles size={14} />
              Cultural adaptation
            </div>
            <p className="mt-3">
              Gemini will rephrase idioms, holidays, and promotions based on the cultural context.
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel space-y-4">
          <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-100">
            Currency localization
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              type="number"
              value={currencyPayload.amount}
              onChange={(event) =>
                setCurrencyPayload({
                  ...currencyPayload,
                  amount: Number(event.target.value),
                })
              }
            />
            <Select
              value={currencyPayload.source_currency}
              onChange={(event) =>
                setCurrencyPayload({
                  ...currencyPayload,
                  source_currency: event.target.value,
                })
              }
            >
              {currencies.map((currency) => (
                <option key={currency}>{currency}</option>
              ))}
            </Select>
            <Select
              value={currencyPayload.target_currency}
              onChange={(event) =>
                setCurrencyPayload({
                  ...currencyPayload,
                  target_currency: event.target.value,
                })
              }
            >
              {currencies.map((currency) => (
                <option key={currency}>{currency}</option>
              ))}
            </Select>
            <Input
              value={currencyPayload.locale}
              onChange={(event) =>
                setCurrencyPayload({
                  ...currencyPayload,
                  locale: event.target.value,
                })
              }
            />
          </div>
          <Button variant="soft" onClick={handleCurrency}>
            Localize currency
          </Button>
          <div className="rounded-2xl border border-ink-200/70 bg-white/80 p-4 text-sm text-ink-700 dark:border-ink-700/70 dark:bg-ink-900/70 dark:text-ink-200">
            {currencyResult || 'Localized currency will appear here.'}
          </div>
        </div>
        <div className="glass-panel space-y-4">
          <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-100">
            Date localization
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              value={datePayload.date_value}
              onChange={(event) =>
                setDatePayload({ ...datePayload, date_value: event.target.value })
              }
            />
            <Input
              value={datePayload.locale}
              onChange={(event) =>
                setDatePayload({ ...datePayload, locale: event.target.value })
              }
            />
          </div>
          <Button variant="soft" onClick={handleDate}>
            Localize date
          </Button>
          <div className="rounded-2xl border border-ink-200/70 bg-white/80 p-4 text-sm text-ink-700 dark:border-ink-700/70 dark:bg-ink-900/70 dark:text-ink-200">
            {dateResult || 'Localized date will appear here.'}
          </div>
        </div>
      </div>
    </div>
  )
}
