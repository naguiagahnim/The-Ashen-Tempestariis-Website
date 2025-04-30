"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Shield, Cpu, Handshake, Terminal, Radiation, Radio, ShieldUser } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"

export default function Console() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [hoverOption, setHoverOption] = useState<number | null>(null)
  const navigate = useNavigate()

  const options = [
    {
      id: 1,
      title: "CONSOLE",
      description: "Accéder à la console principale",
      icon: <Terminal className="h-8 w-8" />,
      route: "/",
    },
    {
      id: 2,
      title: "ÉQUIPAGE",
      description: "Voir les membres du clan",
      icon: <Shield className="h-8 w-8" />,
      route: "/membres",
    },
    {
      id: 3,
      title: "SYSTÈMES",
      description: "Accéder aux outils du clan",
      icon: <Cpu className="h-8 w-8" />,
      route: "/outils",
    },
    {
      id: 4,
      title: "ALLIÉS",
      description: "Voir nos alliés",
      icon: <Handshake className="h-8 w-8" />,
      route: "/allies",
    },
    {
      id: 5,
      title: "COMMUNICATIONS",
      description: "Nous contacter",
      icon: <Radio className="h-8 w-8" />,
      route: "/contact",
    },
    {
      id: 6,
      title: "ARSENAL",
      description: "Voir les builds disponibles",
      icon: <Radiation className="h-8 w-8" />,
      route: "/builds",
    },
    {
      id: 7,
      title: "TENNO",
      description: "Accéder à votre espace",
      icon: <ShieldUser className="h-8 w-8" />,
      route: "/profile",
    },
  ]

  const handleSelect = (optionId: number) => {
    setSelectedOption(optionId)
  }

  const handleNavigate = (route: string) => {
    navigate(route)
  }

  return (
    <div className="min-h-full w-full text-white flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl text-vert-tempestarii font-light tracking-widest">CONSOLE PRINCIPALE</h2>
        <div className="h-0.5 w-48 bg-gradient-to-r from-vert-tempestarii to-transparent mt-1"></div>
        <p className="text-vert-tempestarii/80 mt-2 text-sm">Sélectionnez une option pour continuer, Tenno</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {options.map((option) => (
          <motion.div
            key={option.id}
            className={`
              relative border border-vert-tempestarii/50 bg-black/80 backdrop-blur-sm p-6 rounded-sm
              hover:border-vert-tempestarii/70 transition-all duration-300 cursor-pointer
              ${selectedOption === option.id ? "border-vert-tempestarii ring-1 ring-vert-tempestarii/50" : ""}
            `}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 15px rgba(174, 194, 191, 0.3)",
            }}
            onClick={() => handleSelect(option.id)}
            onMouseEnter={() => setHoverOption(option.id)}
            onMouseLeave={() => setHoverOption(null)}
          >
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-vert-tempestarii"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-vert-tempestarii"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-vert-tempestarii"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-vert-tempestarii"></div>

            {hoverOption === option.id && (
              <div className="absolute inset-0 border border-vert-tempestarii/30 rounded-sm blur-sm"></div>
            )}

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-vert-tempestarii/30 rounded-sm border border-vert-tempestarii/50">
                {option.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold tracking-wider text-vert-tempestarii">{option.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{option.description}</p>
              </div>
            </div>

            <div
              className={`
              mt-4 h-0.5 bg-gradient-to-r from-vert-tempestarii/80 to-transparent
              transition-all duration-500 ease-in-out
              ${selectedOption === option.id ? "w-full" : "w-1/3"}
            `}
            ></div>

            {selectedOption === option.id && (
              <motion.div
                className="mt-4 flex justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  className="bg-transparent border border-vert-tempestarii z-10 text-vert-tempestarii hover:bg-vert-tempestarii/20 hover:cursor-pointer px-4 py-2 rounded-sm flex items-center"
                  onClick={() => handleNavigate(option.route)}
                >
                  Sélectionner <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex-1"></div>
      <Footer />
    </div>
  )
}
