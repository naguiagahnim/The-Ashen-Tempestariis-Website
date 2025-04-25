"use client"

import { Volume2, VibrateOffIcon as VolumeOff, Music } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [muted, setMuted] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [volume, setVolume] = useState(50)

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted
      setMuted(!muted)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseInt(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume / 100
    if (muted) {
      audio.muted = true
    } else {
      audio.muted = false
    }

  }, [volume, muted])

  return (
    <div className="fixed bottom-4 right-4 z-20">
      <audio ref={audioRef} src="/music/ashen_2_lowqual.mp3" autoPlay loop playsInline />

      <div className="relative">
        <button
          onClick={() => setShowControls(!showControls)}
          className="bg-black/50 border border-vert-tempestarii/30 text-vert-tempestarii p-2 rounded-full hover:bg-vert-tempestarii/20 transition-colors"
        >
          <Music className="h-5 w-5" />
        </button>

        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-full right-0 mb-2 p-3 bg-black/80 border border-vert-tempestarii/30 rounded-lg w-48"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-vert-tempestarii">AMBIANCE SONORE</span>
                <button onClick={toggleMute} className="text-vert-tempestarii hover:text-vert-tempestarii/70">
                  {muted ? <VolumeOff size={16} /> : <Volume2 size={16} />}
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-vert-tempestarii"
                />
                <span className="text-xs text-vert-tempestarii/70 w-8 text-right">{volume}%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AudioPlayer
