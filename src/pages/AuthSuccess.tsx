"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, ChevronRight, Shield, Cpu, User, Radiation } from "lucide-react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { supabase } from "../lib/supabase"
import Footer from "../components/Footer"

export default function AuthSuccess() {
  const [countdown, setCountdown] = useState(10)
  const [userInfo, setUserInfo] = useState<{
    email: string | null
    username: string | null
  }>({
    email: null,
    username: null,
  })
  const navigate = useNavigate()
  const location = useLocation()

  const isSignup = location.state?.isSignup || false

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data: userData } = await supabase.auth.getUser()

        if (userData.user) {
          setUserInfo({
            email: userData.user.email ?? null,
            username: userData.user.user_metadata?.pseudo || userData.user.email?.split("@")[0] || "Tenno",
          })
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des informations utilisateur:", error)
      }
    }

    getUserInfo()
  }, [])

  useEffect(() => {
    if (countdown <= 0) {
      navigate("/")
      return
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, navigate])

  const particles = Array.from({ length: 20 }, (_, i) => i)

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
        <div className="absolute inset-0">
          {particles.map((i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-vert-tempestarii/50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0 }}
              animate={{
                y: [0, -100],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
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
        className="relative z-10 w-full max-w-lg mx-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative backdrop-blur-sm bg-black/70 border border-vert-tempestarii/30 rounded-lg overflow-hidden">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-vert-tempestarii"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-vert-tempestarii"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-vert-tempestarii"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-vert-tempestarii"></div>

          <div className="h-1 w-full bg-gradient-to-r from-transparent via-vert-tempestarii to-transparent"></div>

          <div className="flex justify-center -mt-6">
            <motion.div
              className="relative w-16 h-16 rounded-full bg-black/80 border-2 border-vert-tempestarii flex items-center justify-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }}>
                <CheckCircle size={32} className="text-vert-tempestarii" />
              </motion.div>

              <motion.div
                className="absolute inset-0 rounded-full border border-vert-tempestarii"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
            </motion.div>
          </div>

          <div className="p-8 pt-6 text-center">
            <motion.h1
              className="text-2xl font-bold tracking-wider text-vert-tempestarii mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {isSignup ? "INSCRIPTION RÉUSSIE" : "CONNEXION RÉUSSIE"}
            </motion.h1>

            <motion.div
              className="h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-vert-tempestarii/70 to-transparent mb-6"
              initial={{ width: 0 }}
              animate={{ width: "8rem" }}
              transition={{ delay: 0.7, duration: 0.8 }}
            />

            {userInfo.email && (
              <motion.div
                className="flex items-center justify-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="h-16 w-16 rounded-full bg-vert-tempestarii/20 border border-vert-tempestarii/50 flex items-center justify-center mr-4">
                  <User size={32} className="text-vert-tempestarii" />
                </div>
                <div className="text-left">
                  <h3 className="text-vert-tempestarii font-bold">{userInfo.username}</h3>
                  <p className="text-gray-400 text-sm">{userInfo.email}</p>
                </div>
              </motion.div>
            )}

            <motion.p
              className="text-white/80 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {isSignup
                ? "Bienvenue à bord du Railjack, Tenno. Votre accès aux systèmes du clan THE ASHEN TEMPESTARIIS sera validé après avoir suivi les instructions de la transmission reçue sur votre boîte mail."
                : "Bon retour parmi nous, Tenno. Votre session a été authentifiée avec succès."}
            </motion.p>

            <motion.div
              className="mb-8 p-4 bg-black/40 border border-vert-tempestarii/20 rounded-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="animate-pulse text-vert-tempestarii">◉</span>
                <span className="text-sm text-vert-tempestarii/80">INITIALISATION DES SYSTÈMES</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Authentification</span>
                  <span className="text-vert-tempestarii">100%</span>
                </div>
                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-vert-tempestarii"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 1.2 }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Chargement des données</span>
                  <span className="text-vert-tempestarii">100%</span>
                </div>
                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-vert-tempestarii"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 1.4 }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Préparation de l'interface</span>
                  <span className="text-vert-tempestarii">100%</span>
                </div>
                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-vert-tempestarii"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: 1.6 }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <p className="text-sm text-vert-tempestarii/70 mb-3">
                Redirection automatique dans <span className="text-vert-tempestarii font-bold">{countdown}</span>{" "}
                secondes...
              </p>

              <Link
                to="/"
                className="block w-full py-3 bg-vert-tempestarii/20 border border-vert-tempestarii/50 text-vert-tempestarii rounded-sm hover:bg-vert-tempestarii/30 transition-all group"
              >
                <span className="flex items-center justify-center">
                  Accéder à la console principale
                  <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <div className="grid grid-cols-2 gap-3 mt-4">
                {isSignup ? (
                  <>
                    <Link
                      to="/account"
                      className="py-2 px-3 bg-black/40 border border-vert-tempestarii/30 text-vert-tempestarii/80 rounded-sm hover:bg-vert-tempestarii/10 transition-all text-sm flex items-center justify-center"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Mon profil
                    </Link>
                    <Link
                      to="/membres"
                      className="py-2 px-3 bg-black/40 border border-vert-tempestarii/30 text-vert-tempestarii/80 rounded-sm hover:bg-vert-tempestarii/10 transition-all text-sm flex items-center justify-center"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Voir l'équipage
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/builds"
                      className="py-2 px-3 bg-black/40 border border-vert-tempestarii/30 text-vert-tempestarii/80 rounded-sm hover:bg-vert-tempestarii/10 transition-all text-sm flex items-center justify-center"
                    >
                      <Radiation className="mr-2 h-4 w-4" />
                      Arsenal
                    </Link>
                    <Link
                      to="/outils"
                      className="py-2 px-3 bg-black/40 border border-vert-tempestarii/30 text-vert-tempestarii/80 rounded-sm hover:bg-vert-tempestarii/10 transition-all text-sm flex items-center justify-center"
                    >
                      <Cpu className="mr-2 h-4 w-4" />
                      Systèmes
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </div>

          <Footer />
        </div>

        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-vert-tempestarii/30 to-transparent"></div>
      </motion.div>
    </div>
  )
}
