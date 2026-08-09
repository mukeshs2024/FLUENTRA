import { motion } from 'framer-motion'
import { Globe2, Sparkles, Subtitles, AudioLines, FileText, ShieldAlert } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import FeatureStat from '../components/FeatureStat'
import Badge from '../components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

const features = [
  {
    title: 'Multilingual Intelligence',
    description: 'mT5 translation with contextual cultural tuning and adaptive tone control.',
    icon: Globe2,
  },
  {
    title: 'Live Captions',
    description: 'Whisper-powered captioning with language-specific style guides.',
    icon: Subtitles,
  },
  {
    title: 'Voice Localization',
    description: 'Sarvam speech pipelines for instant voice re-synthesis.',
    icon: AudioLines,
  },
  {
    title: 'Document AI',
    description: 'OCR + layout aware document translation workflows.',
    icon: FileText,
  },
  {
    title: 'Bias Detection',
    description: 'Detoxify analytics with suggestion overlays.',
    icon: ShieldAlert,
  },
  {
    title: 'Cultural Adaptation',
    description: 'Gemini prompts tuned for regional resonance.',
    icon: Sparkles,
  },
]

const stats = [
  { label: 'Live locales', value: '6+' },
  { label: 'Avg. response', value: '1.4s' },
  { label: 'Accuracy', value: '94%' },
]

const realtime = [
  {
    title: 'Realtime translation chat',
    detail: 'Stream multilingual chat responses with per-speaker tone maps.',
  },
  {
    title: 'AI subtitle generator',
    detail: 'Auto-generate captions and apply cultural edits in seconds.',
  },
  {
    title: 'Accessibility mode',
    detail: 'Auto-captioning and high-contrast localized overlays.',
  },
  {
    title: 'Voice translation',
    detail: 'Bidirectional speech translation for live meetings.',
  },
  {
    title: 'Multilingual AI assistant',
    detail: 'Context-aware assistant that answers in local dialects.',
  },
]

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Badge tone="success">Enterprise localization</Badge>
          <h1 className="text-4xl font-semibold leading-tight text-ink-900 dark:text-ink-100 md:text-5xl">
            Localize content with cultural intelligence, not just translation.
          </h1>
          <p className="text-lg text-ink-600 dark:text-ink-300">
            FLUENTRA orchestrates multilingual content workflows across text, audio, video, and
            documents with real-time accessibility and bias defense built in.
          </p>
          <div className="flex flex-wrap gap-3">
            <Badge tone="neutral">mT5 Translation</Badge>
            <Badge tone="neutral">Gemini Adaptation</Badge>
            <Badge tone="neutral">Whisper Captions</Badge>
            <Badge tone="neutral">Sarvam Audio</Badge>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-panel space-y-5"
        >
          <SectionHeader
            title="Localization signal map"
            subtitle="Track tone shifts, cultural risks, and accessibility coverage across regions."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <FeatureStat key={stat.label} {...stat} />
            ))}
          </div>
          <div className="rounded-2xl border border-ink-200/60 bg-white/70 p-4 dark:border-ink-700/70 dark:bg-ink-900/70">
            <p className="text-xs uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
              Live accessibility
            </p>
            <p className="mt-3 text-sm text-ink-700 dark:text-ink-200">
              Auto-captioning + language toggles are enabled for meetings and broadcasts.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="AI modules"
          subtitle="Build localization workflows with composable AI services."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader className="flex items-center gap-3">
                <div className="rounded-2xl bg-ink-100 p-3 text-ink-700">
                  <feature.icon size={20} />
                </div>
                <div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 text-xs text-ink-500">
                  <span>Secure</span>
                  <span>•</span>
                  <span>Composable</span>
                  <span>•</span>
                  <span>Monitored</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="Realtime studio"
          subtitle="Activate advanced workflows for live localization and accessibility."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {realtime.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.detail}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-xs uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
                  Coming online
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
