"use client"

import { useState, useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import BackgroundVideo from "./components/BackgroundVideo.tsx"
import AudioPlayer from "./components/AudioPlayer.tsx"
import HolographicNav from "./components/HolographicNav.tsx"
import StatusBar from "./components/StatusBar.tsx"
import Console from "./pages/Console.tsx"
import Membres from "./pages/Membres.tsx"
import Outils from "./pages/Outils.tsx"
import Allies from "./pages/Allies.tsx"
import Contact from "./pages/Contact.tsx"
import Builds from "./pages/Builds.tsx"
import Auth from "./pages/Auth.tsx"
import AuthSuccess from "./pages/AuthSuccess.tsx"
import Profile from "./pages/Profile.tsx"

function App() {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [systemStatus, setSystemStatus] = useState({
    shields: 100,
    engines: 98,
    weapons: 100,
    comms: 95,
  })

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoadingComplete(true)
    }, 2500)

    const fadeOutTimer = setTimeout(() => {
      setIsLoading(false)
    }, 3300)

    return () => {
      clearTimeout(loadingTimer)
      clearTimeout(fadeOutTimer)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus((prev) => ({
        shields: Math.max(92, Math.min(100, prev.shields + (Math.random() * 5 - 2.5))),
        engines: Math.max(90, Math.min(100, prev.engines + (Math.random() * 6 - 3))),
        weapons: Math.max(93, Math.min(100, prev.weapons + (Math.random() * 4 - 2))),
        comms: Math.max(85, Math.min(100, prev.comms + (Math.random() * 7 - 3.5))),
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <BackgroundVideo />

      {isLoading && (
        <motion.div
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          animate={{
            opacity: loadingComplete ? 0 : 1,
            backgroundColor: loadingComplete ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 1)",
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: loadingComplete ? 0.8 : 0,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-32 h-32 mb-8 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="absolute inset-0 border-2 border-vert-tempestarii/30 rounded-full"></div>
            <motion.div
              className="absolute inset-0 border-t-2 border-vert-tempestarii rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            ></motion.div>
          </motion.div>
          <h2 className="text-vert-tempestarii text-2xl font-light tracking-widest mb-2">INITIALISATION DU SYSTÈME</h2>
          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-vert-tempestarii"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5 }}
            ></motion.div>
          </div>
          <div className="mt-4 text-gray-500 text-sm">CEPHALON POSEIDIS v10.5.3</div>
        </motion.div>
      )}

      <div className="absolute inset-0 flex flex-col">
        <StatusBar systemStatus={systemStatus} />

        <div className="flex-1 flex">
          <HolographicNav />

          <div className="flex-1 overflow-hidden p-4 z-10 relative">
            <div className="railjack-window h-full w-full relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none border-2 border-vert-tempestarii/30 rounded-lg z-20">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-vert-tempestarii"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-vert-tempestarii"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-vert-tempestarii"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-vert-tempestarii"></div>
              </div>

              <div className="absolute inset-0 p-6 overflow-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Routes location={location}>
                      <Route path="/" element={<Console />} />
                      <Route path="/membres" element={<Membres />} />
                      <Route path="/outils" element={<Outils />} />
                      <Route path="/allies" element={<Allies />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/builds" element={<Builds />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/authsuccess" element={<AuthSuccess />} />
                      <Route path="/profile" element={<Profile />} />
                    </Routes>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AudioPlayer />
    </div>
  )
}

export default App
