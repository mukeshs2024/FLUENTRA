import SectionHeader from '../components/SectionHeader'
import Dropzone from '../components/Dropzone'
import Button from '../components/ui/button'
import Select from '../components/ui/select'
import Progress from '../components/ui/progress'
import { languages } from '../data/options'

export default function VideoCaptioning() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Video captioning"
        subtitle="Generate multilingual captions with Whisper and cultural adaptation cues."
      />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel space-y-4">
          <Dropzone
            title="Upload video"
            description="We auto-extract audio and generate subtitles"
            formats="mp4 · mov · mkv"
          />
          <div className="grid gap-3 md:grid-cols-2">
            <Select defaultValue="English">
              {languages.map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </Select>
            <Select defaultValue="Japanese">
              {languages.map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </Select>
          </div>
          <Button variant="glow">Generate captions</Button>
          <Progress value={30} />
        </div>
        <div className="glass-panel space-y-4">
          <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-100">
            Caption preview
          </h3>
          <div className="rounded-2xl border border-ink-200/70 bg-white/80 p-4 text-sm text-ink-700 dark:border-ink-700/70 dark:bg-ink-900/70 dark:text-ink-200">
            Captions will render here with cultural notes and reading speed indicators.
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost">Download .srt</Button>
            <Button variant="soft">Download transcript</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
