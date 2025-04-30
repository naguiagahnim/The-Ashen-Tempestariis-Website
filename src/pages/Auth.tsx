"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, AlertTriangle, Mail, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import Footer from "../components/Footer"

export default function Auth() {
  const [mail, setMail] = useState("")
  const [pseudo, setPseudo] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRegisterMode, setRegisterMode] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      let error
      if (isRegisterMode) {
        const result = await supabase.auth.signUp({
          email: mail,
          password: password,
          options: {
            data: {
              pseudo: pseudo
            }
          }
        })
        error = result.error
      }
      else {
        const result = await supabase.auth.signInWithPassword({
          email: mail,
          password: password
        })
        error = result.error
      }
      if (error) {
        setError(`${isRegisterMode ? "Inscription" : "Connexion"} échouée : ${error.message}`)
      }
      else {
        navigate("/authsuccess", { state: {isSignup: isRegisterMode} })
      }
    }
    catch(err) {
      setError("Une erreur est survenue.")
    }
    finally {
      setIsLoading(false)
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
              key={i}
              className="absolute h-px bg-vert-tempestarii/30"
              style={{ top: `${15 + i * 20}%`, left: 0, right: 0 }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: 1,
                opacity: [0, 0.5, 0.2],
                transition: {
                  duration: 2 + i,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            />
          ))}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute w-px bg-vert-tempestarii/30"
              style={{ left: `${20 + i * 30}%`, top: 0, bottom: 0 }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{
                scaleY: 1,
                opacity: [0, 0.5, 0.2],
                transition: {
                  duration: 3 + i,
                  delay: i * 0.7,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative mx-4 backdrop-blur-sm bg-black/70 border border-vert-tempestarii/30 rounded-lg overflow-hidden">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-vert-tempestarii"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-vert-tempestarii"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-vert-tempestarii"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-vert-tempestarii"></div>
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-vert-tempestarii to-transparent"></div>

          <div className="p-6 text-center">
            <h1 className="text-2xl font-bold tracking-wider text-vert-tempestarii mb-1">
              CEPHALON<span className="text-white">POSEIDIS</span>
            </h1>
            <p className="text-vert-tempestarii/70 text-sm">
              {isRegisterMode ? "Créer un nouveau compte Tenno" : "Système d'authentification sécurisé"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 pt-2">
            {error && (
              <motion.div
                className="mb-6 p-3 bg-red-900/30 border border-red-500/50 rounded flex items-center gap-2 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertTriangle size={16} className="text-red-400" />
                <span className="text-red-200">{error}</span>
              </motion.div>
            )}

            <div className="space-y-6">
            {isRegisterMode && (
                <div className="space-y-2">
                  <label className="block text-sm text-vert-tempestarii/80 mb-1">Identifiant Tenno</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User size={18} className="text-vert-tempestarii/50" />
                    </div>
                    <input
                      type="text"
                      value={pseudo}
                      onChange={(e) => setPseudo(e.target.value)}
                      className="w-full py-3 pl-10 pr-3 bg-black/50 border border-vert-tempestarii/30 rounded-sm text-white focus:outline-none focus:border-vert-tempestarii/70 focus:ring-1 focus:ring-vert-tempestarii/30 transition-all"
                      placeholder="Entrez votre identifiant"
                    />
                  </div>
                </div>
            )}

              <div className="space-y-2">
                <label className="block text-sm text-vert-tempestarii/80 mb-1">Mail Tenno</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail size={18} className="text-vert-tempestarii/50" />
                  </div>
                  <input
                    type="text"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    className="w-full py-3 pl-10 pr-3 bg-black/50 border border-vert-tempestarii/30 rounded-sm text-white focus:outline-none focus:border-vert-tempestarii/70 focus:ring-1 focus:ring-vert-tempestarii/30 transition-all"
                    placeholder="Entrez votre mail"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-vert-tempestarii/80 mb-1">Code d'accès</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock size={18} className="text-vert-tempestarii/50" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-3 pl-10 pr-10 bg-black/50 border border-vert-tempestarii/30 rounded-sm text-white focus:outline-none focus:border-vert-tempestarii/70 focus:ring-1 focus:ring-vert-tempestarii/30 transition-all"
                    placeholder="Entrez votre code d'accès"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-vert-tempestarii/50 hover:text-vert-tempestarii transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-vert-tempestarii/20 border border-vert-tempestarii/50 text-vert-tempestarii rounded-sm hover:bg-vert-tempestarii/30 focus:outline-none focus:ring-2 focus:ring-vert-tempestarii/30 transition-all relative overflow-hidden group"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="h-5 w-5 border-2 border-t-transparent border-vert-tempestarii/70 rounded-full animate-spin mr-2"></div>
                      <span>{isRegisterMode ? "Inscription..." : "Authentification..."}</span>
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10">
                        {isRegisterMode ? "Créer un compte" : "Connexion au système"}
                      </span>
                      <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-vert-tempestarii/20"></div>
                    </>
                  )}
                </button>
              </div>

              <div className="flex justify-between text-xs text-vert-tempestarii/60 pt-2">
                <button
                  type="button"
                  onClick={() => setRegisterMode(!isRegisterMode)}
                  className="hover:text-vert-tempestarii transition-colors"
                >
                  {isRegisterMode ? "J'ai déjà un compte" : "Créer un compte Tenno"}
                </button>
              </div>
            </div>
          </form>

          <Footer />
        </div>

        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-vert-tempestarii/30 to-transparent"></div>
      </motion.div>
    </div>
  )
}
