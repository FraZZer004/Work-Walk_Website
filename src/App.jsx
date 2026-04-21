import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SplashScreen from './components/SplashScreen'
import Home from './pages/Home'
import Privacy from './pages/Privacy'
import Support from './pages/Support'

export default function App() {
  // Show splash on every page load / refresh.
  // React Router navigations don't remount App, so splash only fires once.
  const [splashDone, setSplashDone] = useState(false)

  return (
    <>
      {!splashDone && (
        <SplashScreen onFinished={() => setSplashDone(true)} />
      )}

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </>
  )
}
