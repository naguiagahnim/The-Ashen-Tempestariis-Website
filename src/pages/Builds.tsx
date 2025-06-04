"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Radiation,
  ChevronDown,
  ChevronUp,
  Shield,
  Target,
  Crosshair,
  HeartIcon as HeartPlus,
  Zap,
  Gem,
} from "lucide-react"
import Footer from "../components/Footer"
import { supabase } from "../lib/supabase"
import BuildForm from "../components/BuildsForm"

const categoryIcons = {
  DPS: <Crosshair className="h-5 w-5" />,
  Tank: <Shield className="h-5 w-5" />,
  AoE: <Radiation className="h-5 w-5" />,
  CC: <Target className="h-5 w-5" />,
  Supp: <HeartPlus className="h-5 w-5" />,
}

export default function Builds() {
  const [expandedBuild, setExpandedBuild] = useState<number | null>(null)
  const [builds, setBuilds] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const handleBuildCreated = () => {
    fetchBuilds()
    setShowForm(false)
  }

  const fetchBuilds = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from("builds")
      .select("*")
      .eq("status", "public")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setBuilds(data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchBuilds()
  }, [])

  const toggleExpand = (id: number) => {
    setExpandedBuild(expandedBuild === id ? null : id)
  }

  return (
    <div className="min-h-full w-full text-white flex flex-col">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-xl text-vert-tempestarii font-light tracking-widest">ARSENAL DES WARFRAMES</h2>
          <div className="h-0.5 w-48 bg-gradient-to-r from-vert-tempestarii to-transparent mt-1"></div>
          <p className="text-vert-tempestarii/80 mt-2 text-sm">Configurations optimisées par les membres du clan</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-vert-tempestarii/30 text-white border border-vert-tempestarii rounded-sm hover:bg-vert-tempestarii/50 transition-all duration-300 flex items-center gap-2"
        >
          <span className="text-sm">Nouveau build</span>
          <span className="text-lg leading-none">+</span>
        </button>
      </div>

      {showForm && <BuildForm onClose={() => setShowForm(false)} onSuccess={handleBuildCreated} />}

      {isLoading ? (
        <div className="text-vert-tempestarii/70 flex justify-center items-center py-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "linear" }}
          >
            <Radiation className="h-8 w-8 text-vert-tempestarii" />
          </motion.div>
          <span className="ml-3">Chargement des builds...</span>
        </div>
      ) : builds.length === 0 ? (
        <div className="text-red-400 py-8 text-center border border-red-400/30 bg-red-400/10 rounded-sm">
          Aucun build public disponible pour l'instant.
        </div>
      ) : (
        <div className="space-y-6 mb-8">
          {builds.map((build, index) => (
            <motion.div
              key={build.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
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
                          par <span className="text-vert-tempestarii/80">{build.author_name}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-xs text-gray-400">{build.forma} Forma</div>
                    </div>

                    {expandedBuild === build.id ? (
                      <ChevronUp className="h-5 w-5 text-vert-tempestarii" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-vert-tempestarii" />
                    )}
                  </div>
                </div>

                {build.description && <p className="text-sm text-gray-400 mt-2">{build.description}</p>}
              </div>

              <AnimatePresence>
                {expandedBuild === build.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-vert-tempestarii/20 p-4"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm text-vert-tempestarii/80 mb-2 flex items-center gap-2">
                            <Radiation className="h-4 w-4" />
                            Mods utilisés
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {build.details.mods.map((mod: string, index: number) => (
                              <div
                                key={index}
                                className="text-sm bg-vert-tempestarii/10 border border-vert-tempestarii/20 px-2 py-1 rounded-sm"
                              >
                                {mod}
                              </div>
                            ))}
                          </div>
                        </div>

                        {build.details.archon_shards && (
                          <div>
                            <h4 className="text-sm text-vert-tempestarii/80 mb-2 flex items-center gap-2">
                              <Gem className="h-4 w-4" />
                              Archon Shards
                            </h4>
                            <div className="text-sm bg-purple-900/20 border border-purple-500/30 px-3 py-2 rounded-sm text-purple-200">
                              {build.details.archon_shards}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm text-vert-tempestarii/80 mb-2">Statistiques</h4>
                          <div className="space-y-2">
                            {build.details.stats.map((stat: any, index: number) => (
                              <div key={index} className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">{stat.name}</span>
                                <div className="w-32 h-2 bg-vert-tempestarii/10 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-vert-tempestarii"
                                    style={{ width: `${(stat.value / 550) * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-white w-12 text-right">{stat.value}%</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {build.details.arcanes && build.details.arcanes.length > 0 && (
                          <div>
                            <h4 className="text-sm text-vert-tempestarii/80 mb-2 flex items-center gap-2">
                              <Zap className="h-4 w-4" />
                              Arcanes
                            </h4>
                            <div className="space-y-2">
                              {build.details.arcanes.map((arcane: any, index: number) => (
                                <div
                                  key={index}
                                  className="bg-orange-900/20 border border-orange-500/30 px-3 py-2 rounded-sm"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-orange-200">{arcane.name}</span>
                                    <span className="text-xs text-orange-300">Rang {arcane.rank}</span>
                                  </div>
                                  {arcane.description && (
                                    <p className="text-xs text-orange-200/70 mt-1">{arcane.description}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex-1"></div>
      <Footer />
    </div>
  )
}
