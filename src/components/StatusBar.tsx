"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Shield, Zap, Cpu, Radio } from "lucide-react"

interface SystemStatusProps {
  systemStatus: {
    shields: number
    engines: number
    weapons: number
    comms: number
  }
}

export default function StatusBar({ systemStatus }: SystemStatusProps) {
  const [time, setTime] = useState(new Date())
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCoordinates({
        x: Math.floor(Math.random() * 1000),
        y: Math.floor(Math.random() * 1000),
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-12 border-b border-vert-tempestarii/30 bg-black/80 backdrop-blur-sm flex items-center px-4 z-20">
      <div className="flex-1 flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="">
              
          </div> 
          <div className="text-vert-tempestarii font-bold tracking-wider text-sm">
            THE <span className="text-white">ASHEN </span>TEMPESTARIIS
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <StatusIndicator icon={<Shield size={14} />} label="BOUCLIERS" value={systemStatus.shields} />
          <StatusIndicator icon={<Zap size={14} />} label="MOTEURS" value={systemStatus.engines} />
          <StatusIndicator icon={<Cpu size={14} />} label="ARMEMENT" value={systemStatus.weapons} />
          <StatusIndicator icon={<Radio size={14} />} label="COMMS" value={systemStatus.comms} />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden md:block text-xs text-vert-tempestarii/70">
          <span className="font-mono">
            X:{coordinates.x.toString().padStart(4, "0")} Y:{coordinates.y.toString().padStart(4, "0")}
          </span>
        </div>

        <div className="text-xs text-vert-tempestarii/70">
          <span className="font-mono">{time.toLocaleTimeString()}</span>
        </div>

        <div className="flex items-center space-x-1">
          <span className="animate-pulse text-vert-tempestarii">◉</span>
          <span className="text-xs text-vert-tempestarii/70">CONNECTÉ</span>
        </div>
      </div>
    </div>
  )
}

function StatusIndicator({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  const getColor = () => {
    if (value >= 95) return "text-vert-tempestarii"
    if (value >= 80) return "text-yellow-400"
    return "text-red-500"
  }

  return (
    <div className="flex items-center space-x-2">
      <div className={`${getColor()}`}>{icon}</div>
      <div className="flex flex-col">
        <span className="text-[10px] text-gray-400">{label}</span>
        <div className="flex items-center space-x-1">
          <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${getColor()}`}
              initial={{ width: `${value}%` }}
              animate={{ width: `${value}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className={`text-[10px] ${getColor()}`}>{Math.floor(value)}%</span>
        </div>
      </div>
    </div>
  )
}
