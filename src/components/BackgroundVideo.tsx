"use client"

import { useEffect, useRef } from "react"

const BackgroundVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.style.filter = "brightness(0.4) contrast(1.2) saturate(0.8)"
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src="/videos/lua.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-70"></div>
      <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none"></div>
    </div>
  )
}

export default BackgroundVideo
