"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Shield, Calendar, LogOut, Edit, Save, X, AlertTriangle, CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import Footer from "../components/Footer"

export default function Profile() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [notification, setNotification] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const [userInfo, setUserInfo] = useState<{
    id: string | null
    email: string | null
    username: string | null
    createdAt: string | null
    lastSignIn: string | null
  }>({
    id: null,
    email: null,
    username: null,
    createdAt: null,
    lastSignIn: null,
  })

  const [editedUsername, setEditedUsername] = useState("")

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setIsLoading(true)

        const { data: sessionData } = await supabase.auth.getSession()

        if (!sessionData.session) {
          navigate("/auth")
          return
        }

        const { data: userData } = await supabase.auth.getUser()

        if (userData.user) {
          const username = userData.user.user_metadata?.pseudo || userData.user.email?.split("@")[0] || "Tenno"

          setUserInfo({
            id: userData.user.id,
            email: userData.user.email ?? null,
            username: username,
            createdAt: userData.user.created_at ? new Date(userData.user.created_at).toLocaleDateString() : null,
            lastSignIn: userData.user.last_sign_in_at
              ? new Date(userData.user.last_sign_in_at).toLocaleDateString()
              : null,
          })

          setEditedUsername(username)
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des informations utilisateur:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getUserInfo()
  }, [navigate])

  const handleUpdateUsername = async () => {
    try {
      setIsLoading(true)

      const { error } = await supabase.auth.updateUser({
        data: { pseudo: editedUsername },
      })

      if (error) {
        throw error
      }

      setUserInfo({
        ...userInfo,
        username: editedUsername,
      })

      setIsEditing(false)
      setNotification({
        type: "success",
        message: "Nom d'utilisateur mis à jour avec succès",
      })

      setTimeout(() => {
        setNotification({ type: null, message: "" })
      }, 3000)
    } catch (error: any) {
      setNotification({
        type: "error",
        message: error.message || "Erreur lors de la mise à jour du nom d'utilisateur",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      await supabase.auth.signOut()
      navigate("/auth")
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute h-px bg-vert-tempestarii/30"
              style={{ top: `${15 + i * 20}%`, left: 0, right: 0 }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: 1,
                opacity: [0, 0.5, 0.2],
                transition: {
                  duration: 2 + i,
                  delay: i * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                },
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-4xl mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-12 w-12 border-2 border-t-transparent border-vert-tempestarii rounded-full animate-spin mb-4"></div>
            <p className="text-vert-tempestarii">Chargement des données...</p>
          </div>
        ) : (
          <div className="relative backdrop-blur-sm bg-black/70 border border-vert-tempestarii/30 rounded-lg overflow-hidden">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-vert-tempestarii"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-vert-tempestarii"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-vert-tempestarii"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-vert-tempestarii"></div>

            <div className="h-1 w-full bg-gradient-to-r from-transparent via-vert-tempestarii to-transparent"></div>

            <div className="p-6 border-b border-vert-tempestarii/30">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="h-16 w-16 rounded-full bg-vert-tempestarii/20 border border-vert-tempestarii/50 flex items-center justify-center mr-4">
                    <User size={32} className="text-vert-tempestarii" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold tracking-wider text-vert-tempestarii">
                      PROFIL <span className="text-white">TENNO</span>
                    </h1>
                    <p className="text-vert-tempestarii/70 text-sm">Informations personnelles</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="py-2 px-4 bg-red-900/20 border border-red-500/30 text-red-400 rounded-sm hover:bg-red-900/30 transition-all flex items-center"
                >
                  <LogOut size={16} className="mr-2" />
                  Déconnexion
                </button>
              </div>
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

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-vert-tempestarii mb-4 flex items-center">
                      <User className="mr-2 h-5 w-5" /> Identité Tenno
                    </h2>

                    <div className="mb-4">
                      <label className="block text-sm text-vert-tempestarii/80 mb-1">Nom d'utilisateur</label>
                      <div className="relative">
                        {isEditing ? (
                          <div className="flex">
                            <input
                              type="text"
                              value={editedUsername}
                              onChange={(e) => setEditedUsername(e.target.value)}
                              className="flex-1 py-3 px-4 bg-black/50 border border-vert-tempestarii/30 rounded-sm text-white focus:outline-none focus:border-vert-tempestarii/70 focus:ring-1 focus:ring-vert-tempestarii/30 transition-all"
                            />
                            <button
                              onClick={handleUpdateUsername}
                              disabled={isLoading}
                              className="ml-2 px-3 bg-vert-tempestarii/20 border border-vert-tempestarii/50 text-vert-tempestarii rounded-sm hover:bg-vert-tempestarii/30 transition-all"
                            >
                              {isLoading ? (
                                <div className="h-5 w-5 border-2 border-t-transparent border-vert-tempestarii/70 rounded-full animate-spin"></div>
                              ) : (
                                <Save size={18} />
                              )}
                            </button>
                            <button
                              onClick={() => {
                                setIsEditing(false)
                                setEditedUsername(userInfo.username || "")
                              }}
                              className="ml-2 px-3 bg-red-900/20 border border-red-500/30 text-red-400 rounded-sm hover:bg-red-900/30 transition-all"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex">
                            <div className="flex-1 py-3 px-4 bg-black/50 border border-vert-tempestarii/30 rounded-sm text-white">
                              {userInfo.username}
                            </div>
                            <button
                              onClick={() => setIsEditing(true)}
                              className="ml-2 px-3 bg-vert-tempestarii/20 border border-vert-tempestarii/50 text-vert-tempestarii rounded-sm hover:bg-vert-tempestarii/30 transition-all"
                            >
                              <Edit size={18} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-vert-tempestarii/80 mb-1">Adresse email</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail size={18} className="text-vert-tempestarii/50" />
                        </div>
                        <input
                          type="email"
                          value={userInfo.email || ""}
                          readOnly
                          className="w-full py-3 pl-10 pr-3 bg-black/50 border border-vert-tempestarii/30 rounded-sm text-white focus:outline-none focus:border-vert-tempestarii/70 focus:ring-1 focus:ring-vert-tempestarii/30 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-vert-tempestarii mb-4 flex items-center">
                      <Shield className="mr-2 h-5 w-5" /> Statut du compte
                    </h2>

                    <div className="space-y-4 p-4 bg-black/40 border border-vert-tempestarii/20 rounded-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-400">
                          <Calendar size={16} className="mr-2" />
                          <span>Date d'enrôlement</span>
                        </div>
                        <span className="text-white">{userInfo.createdAt || "Inconnue"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-400">
                          <Calendar size={16} className="mr-2" />
                          <span>Dernière connexion</span>
                        </div>
                        <span className="text-white">{userInfo.lastSignIn || "Inconnue"}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-400">
                          <Shield size={16} className="mr-2" />
                          <span>Statut</span>
                        </div>
                        <span className="text-vert-tempestarii">Actif</span>
                      </div>

                      <div className="pt-4 mt-4 border-t border-vert-tempestarii/20">
                        <div className="text-xs text-gray-500 mb-1">Identifiant unique</div>
                        <div className="text-xs text-gray-400 font-mono bg-black/30 p-2 rounded overflow-x-auto">
                          {userInfo.id}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        )}

        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-vert-tempestarii/30 to-transparent"></div>
      </motion.div>
    </div>
  )
}
