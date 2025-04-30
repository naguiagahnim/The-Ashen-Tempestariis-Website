"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Crosshair, Radiation, Target, Plus, Trash2, X, Save, AlertTriangle, CheckCircle, HeartPlus } from 'lucide-react'
import { supabase } from "../lib/supabase"

interface Stat {
  name: string
  value: number
}

interface BuildFormProps {
  onClose: () => void
  onSuccess: () => void
}

const CATEGORIES = ["DPS", "Tank", "AoE", "CC", "Supp"]
const DEFAULT_STATS = [
  { name: "Durée", value: 100 },
  { name: "Efficacité", value: 100 },
  { name: "Portée", value: 100 },
  { name: "Force", value: 100 },
]

const categoryIcons = {
  DPS: <Crosshair className="h-5 w-5" />,
  Tank: <Shield className="h-5 w-5" />,
  AoE: <Radiation className="h-5 w-5" />,
  CC: <Target className="h-5 w-5" />,
  Supp: <HeartPlus className="h-5 w-5" />,
}

export default function BuildForm({ onClose, onSuccess }: BuildFormProps) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("Tank")
  const [forma, setForma] = useState(0)
  const [description, setDescription] = useState("")
  const [mods, setMods] = useState<string[]>([])
  const [currentMod, setCurrentMod] = useState("")
  const [stats, setStats] = useState<Stat[]>(DEFAULT_STATS)

  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        setUser(data.user)
      }
    }

    getUser()
  }, [])

  const handleAddMod = () => {
    if (currentMod.trim() && !mods.includes(currentMod.trim()) && mods.length <= 10) {
      setMods([...mods, currentMod.trim()])
      setCurrentMod("")
    }
  }

  const handleRemoveMod = (modToRemove: string) => {
    setMods(mods.filter((mod) => mod !== modToRemove))
  }

  const handleStatChange = (index: number, value: number) => {
    const newStats = [...stats]
    newStats[index].value = value
    setStats(newStats)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || mods.length === 0) {
      setNotification({
        type: "error",
        message: "Veuillez remplir tous les champs obligatoires",
      })
      return
    }

    if (!user) {
      setNotification({
        type: "error",
        message: "Vous devez être connecté pour créer un build",
      })
      return
    }

    setIsLoading(true)
    setNotification({ type: null, message: "" })

    try {
    const buildData = {
        name,
        category,
        author_name: user.user_metadata?.pseudo || user.email?.split("@")[0] || "Tenno",
        author_id: user.id,
        rating: 0,
        forma,
        description,
        details: {
            mods,
            stats,
        },
        status: "hidden",
        }
          

      const { error } = await supabase.from("builds").insert(buildData)

      if (error) {
        throw error
      }

      setNotification({
        type: "success",
        message: "Build créé avec succès",
      })

      setTimeout(() => {
        onSuccess()
      }, 1500)
    } catch (error: any) {
      setNotification({
        type: "error",
        message: error.message || "Une erreur est survenue lors de la création du build",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <AnimatePresence>
        <motion.div
          className="relative w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative backdrop-blur-sm bg-black/90 border border-vert-tempestarii/30 rounded-lg overflow-hidden">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-vert-tempestarii"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-vert-tempestarii"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-vert-tempestarii"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-vert-tempestarii"></div>

            <div className="h-1 w-full bg-gradient-to-r from-transparent via-vert-tempestarii to-transparent"></div>

            <div className="p-6 border-b border-vert-tempestarii/30 flex justify-between items-center">
              <h2 className="text-xl font-bold tracking-wider text-vert-tempestarii">
                NOUVEAU <span className="text-white">BUILD</span>
              </h2>
              <button
                onClick={onClose}
                className="p-2 bg-black/50 border border-vert-tempestarii/30 rounded-full text-vert-tempestarii hover:bg-vert-tempestarii/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {notification.type && (
              <motion.div
                className={`mx-6 mt-6 p-3 rounded flex items-center gap-2 text-sm ${
                  notification.type === "success"
                    ? "bg-green-900/30 border border-green-500/50 text-green-200"
                    : "bg-red-900/30 border border-red-500/50 text-red-200"
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {notification.type === "success" ? (
                  <CheckCircle size={16} className="flex-shrink-0" />
                ) : (
                  <AlertTriangle size={16} className="flex-shrink-0" />
                )}
                <span>{notification.message}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-vert-tempestarii/80 mb-1">
                      Nom du build <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full py-3 px-4 bg-black/50 border border-vert-tempestarii/30 rounded-sm text-white focus:outline-none focus:border-vert-tempestarii/70 focus:ring-1 focus:ring-vert-tempestarii/30 transition-all"
                      placeholder="Ex: Revenant - Mesmer Tank"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-vert-tempestarii/80 mb-1">Catégorie</label>
                    <div className="grid grid-cols-5 gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategory(cat)}
                          className={`py-2 px-3 border rounded-sm flex items-center justify-center transition-all ${
                            category === cat
                              ? "bg-vert-tempestarii/30 border-vert-tempestarii text-vert-tempestarii"
                              : "bg-black/30 border-vert-tempestarii/30 text-gray-400 hover:bg-vert-tempestarii/10"
                          }`}
                        >
                          <div className="mr-2">{categoryIcons[cat as keyof typeof categoryIcons]}</div>
                          <span>{cat}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-vert-tempestarii/80 mb-1">Nombre de Forma</label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={forma}
                        onChange={(e) => setForma(parseInt(e.target.value))}
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-vert-tempestarii"
                      />
                      <span className="ml-4 text-vert-tempestarii font-bold min-w-[2rem] text-center">{forma}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-vert-tempestarii/80 mb-1">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full py-3 px-4 bg-black/50 border border-vert-tempestarii/30 rounded-sm text-white focus:outline-none focus:border-vert-tempestarii/70 focus:ring-1 focus:ring-vert-tempestarii/30 transition-all"
                      placeholder="Décrivez votre build..."
                      rows={3}
                    ></textarea>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-vert-tempestarii/80 mb-1">
                      Mods <span className="text-red-400">*</span>
                    </label>
                    <div className="flex mb-2">
                      <input
                        type="text"
                        value={currentMod}
                        onChange={(e) => setCurrentMod(e.target.value)}
                        className="flex-1 py-3 px-4 bg-black/50 border border-vert-tempestarii/30 rounded-sm text-white focus:outline-none focus:border-vert-tempestarii/70 focus:ring-1 focus:ring-vert-tempestarii/30 transition-all"
                        placeholder="Nom du mod"
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddMod())}
                      />
                      <button
                        type="button"
                        onClick={handleAddMod}
                        className="ml-2 px-3 bg-vert-tempestarii/20 border border-vert-tempestarii/50 text-vert-tempestarii rounded-sm hover:bg-vert-tempestarii/30 transition-all"
                      >
                        <Plus size={20} />
                      </button>
                    </div>

                    <div className="max-h-40 overflow-y-auto p-2 bg-black/30 border border-vert-tempestarii/20 rounded-sm">
                      {mods.length === 0 ? (
                        <p className="text-gray-500 text-center py-2">Aucun mod ajouté</p>
                      ) : (
                        <ul className="space-y-1">
                          {mods.map((mod, index) => (
                            <li
                              key={index}
                              className="flex items-center justify-between py-1 px-2 bg-black/40 rounded-sm"
                            >
                              <span className="text-white">{mod}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveMod(mod)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-vert-tempestarii/80 mb-1">Statistiques</label>
                    <div className="space-y-3">
                      {stats.map((stat, index) => (
                        <div key={index} className="flex items-center">
                          <span className="w-24 text-white">{stat.name}</span>
                          <div className="flex-1 mx-2">
                            <input
                              type="range"
                              min="0"
                              max="300"
                              value={stat.value}
                              onChange={(e) => handleStatChange(index, parseInt(e.target.value))}
                              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-vert-tempestarii"
                            />
                          </div>
                          <span className="w-12 text-right text-vert-tempestarii">{stat.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-4 bg-red-900/20 border border-red-500/30 text-red-400 rounded-sm hover:bg-red-900/30 transition-all"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="py-2 px-4 bg-vert-tempestarii/20 border border-vert-tempestarii/50 text-vert-tempestarii rounded-sm hover:bg-vert-tempestarii/30 transition-all flex items-center"
                >
                  {isLoading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-t-transparent border-vert-tempestarii/70 rounded-full animate-spin mr-2"></div>
                      <span>Création en cours...</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      <span>Créer le build</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

