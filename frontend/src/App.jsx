import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import TextLocalization from './pages/TextLocalization'
import AudioTranslation from './pages/AudioTranslation'
import VideoTranslation from './pages/VideoTranslation'
import DocumentTranslation from './pages/DocumentTranslation'
import BiasCheck from './pages/BiasCheck'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/text" element={<TextLocalization />} />
        <Route path="/audio" element={<AudioTranslation />} />
        <Route path="/video" element={<VideoTranslation />} />
        <Route path="/document" element={<DocumentTranslation />} />
        <Route path="/bias" element={<BiasCheck />} />
      </Route>
    </Routes>
  )
}

export default App
