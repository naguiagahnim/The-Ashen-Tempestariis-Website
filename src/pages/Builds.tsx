import { useState } from "react"
import { motion } from "framer-motion"
import { Radiation, ChevronDown, ChevronUp, Shield, Zap, Target, Crosshair } from "lucide-react"
import Footer from "../components/Footer"

const builds = [
  {
    id: 1,
    name: "Revenant - Mesmer Tank et One-shot Reave",
    category: "Tank",
    author: "Agahnim",
    rating: 3.5,
    forma: 5,
    description: "Build placeholder en attendant les autres",
    details: {
      mods: [
        "Growing Power", "Power Drift", 
        "Umbral Intensify", "Primed Continuity", "Primed Flow", "Equilibrium", 
        "Blind Rage", "Transient Fortitude", "Augur Secrets", "Mesmer Shield"
      ],
      stats: [
        { name: "Durée", value: 127.5 },
        { name: "Efficacité", value: 155 },
        { name: "Portée", value: 100 },
        { name: "Force", value: 175 }
      ]
    }
  },
]

const categoryIcons = {
  "DPS": <Crosshair className="h-5 w-5" />,
  "Tank": <Shield className="h-5 w-5" />,
  "AoE": <Radiation className="h-5 w-5" />,
  "CC": <Target className="h-5 w-5" />,
  "Support": <Zap className="h-5 w-5" />,
}

const Builds = () => {
  const [expandedBuild, setExpandedBuild] = useState<number | null>(null)

  const toggleExpand = (id: number) => {
    if (expandedBuild === id) {
      setExpandedBuild(null)
    } else {
      setExpandedBuild(id)
    }
  }

  return (
    <div className="min-h-full w-full text-white flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl text-vert-tempestarii font-light tracking-widest">ARSENAL DES WARFRAMES</h2>
        <div className="h-0.5 w-48 bg-gradient-to-r from-vert-tempestarii to-transparent mt-1"></div>
        <p className="text-vert-tempestarii/80 mt-2 text-sm">Configurations optimisées par les membres du clan</p>
      </div>

      <div className="space-y-4 mb-8">
        {builds.map((build) => (
          <motion.div
            key={build.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: build.id * 0.1 }}
            className="relative border border-vert-tempestarii/30 bg-black/80 backdrop-blur-sm rounded-sm overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-vert-tempestarii"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-vert-tempestarii"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-vert-tempestarii"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-vert-tempestarii"></div>

            <div 
              className="p-4 cursor-pointer hover:bg-vert-tempestarii/10 transition-all duration-300"
              onClick={() => toggleExpand(build.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-vert-tempestarii/20 border border-vert-tempestarii/50 rounded-sm">
                    {categoryIcons[build.category as keyof typeof categoryIcons] || <Radiation className="h-5 w-5" />}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-vert-tempestarii">{build.name}</h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-vert-tempestarii/20 border border-vert-tempestarii/30 rounded-sm text-vert-tempestarii">
                        {build.category}
                      </span>
                      <span className="text-gray-400 text-xs">
                        par <span className="text-vert-tempestarii/80">{build.author}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-vert-tempestarii">{build.rating}</div>
                    <div className="text-xs text-gray-400">{build.forma} Forma</div>
                  </div>
                  
                  {expandedBuild === build.id ? (
                    <ChevronUp className="h-5 w-5 text-vert-tempestarii" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-vert-tempestarii" />
                  )}
                </div>
              </div>
              
              <p className="text-sm text-gray-400 mt-2">{build.description}</p>
            </div>

            {expandedBuild === build.id && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-vert-tempestarii/20 p-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm text-vert-tempestarii/80 mb-2">Mods utilisés</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {build.details.mods.map((mod, index) => (
                        <div key={index} className="text-sm bg-vert-tempestarii/10 border border-vert-tempestarii/20 px-2 py-1 rounded-sm">
                          {mod}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-vert-tempestarii/80 mb-2">Statistiques</h4>
                    <div className="space-y-2">
                      {build.details.stats.map((stat, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">{stat.name}</span>
                          <div className="w-48 h-3 bg-vert-tempestarii/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-vert-tempestarii" 
                              style={{ width: `${(stat.value / 300) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-white w-12 text-right">{stat.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/*<div className="mt-4 pt-4 border-t border-vert-tempestarii/20">
                  <motion.button 
                    className="w-full flex items-center justify-center space-x-2 bg-transparent border border-vert-tempestarii/50 text-vert-tempestarii hover:bg-vert-tempestarii/20 px-3 py-2 rounded-sm transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Importer la configuration</span>
                  </motion.button>
                </div>*/}
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

export default Builds