"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Cpu, Terminal, Handshake, Menu, X, Radiation, Radio, ShieldUser } from "lucide-react"

export default function HolographicNav() {
  const location = useLocation()
  const [isExpanded, setIsExpanded] = useState(false)

  const links = [
    { path: "/", label: "Console", icon: <Terminal className="h-5 w-5" /> },
    { path: "/membres", label: "Équipage", icon: <Shield className="h-5 w-5" /> },
    { path: "/outils", label: "Systèmes", icon: <Cpu className="h-5 w-5" /> },
    { path: "/allies", label: "Alliés", icon: <Handshake className="h-5 w-5" /> },
    { path: "/contact", label: "Transmissions", icon: <Radio className="h-5 w-5" /> },
    { path: "/builds", label: "Arsenal", icon: <Radiation className="h-5 w-5" /> },
    { path: "/profile", label: "Tenno", icon: <ShieldUser className="h-5 w-5" /> },
  ]

  const toggleNav = () => setIsExpanded(!isExpanded)

  return (
    <>
      <button
        onClick={toggleNav}
        className="md:hidden fixed top-16 left-4 z-30 bg-black/80 border border-vert-tempestarii/50 rounded-full p-2 text-vert-tempestarii"
      >
        {isExpanded ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {isExpanded && window.innerWidth < 768 && (
          <motion.div
            className="fixed inset-0 z-20 md:hidden"
            initial={{ width: 0 }}
            animate={{ width: "16rem" }}
            exit={{ width: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-full w-64 bg-black/80 border-r border-vert-tempestarii/30 flex flex-col">
              <div className="p-4 border-b border-vert-tempestarii/30 flex items-center">
                <div className="h-10 w-10 rounded-full bg-vert-tempestarii/20 border border-vert-tempestarii/50 flex items-center justify-center mr-3">
                  <img src="/images/emblems/logo_color_circle.webp?" className="h-9 w-9 text-vert-tempestarii" />
                </div>
                <div>
                  <h1 className="text-sm font-bold tracking-wider text-vert-tempestarii">
                    THE <span className="text-white">ASHEN </span>
                  </h1>
                  <h2 className="text-xs text-white/70">TEMPESTARIIS</h2>
                </div>
              </div>

              <nav className="flex-1 p-4 overflow-y-auto">
                <div className="text-xs text-vert-tempestarii/70 mb-3 uppercase tracking-wider">Navigation</div>
                <ul className="space-y-1">
                  {links.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        onClick={() => setIsExpanded(false)}
                        className={`
                          group relative flex items-center space-x-3 px-3 py-2 rounded-sm transition-all duration-200
                          ${
                            location.pathname === link.path
                              ? "bg-vert-tempestarii/20 text-vert-tempestarii"
                              : "text-gray-400 hover:bg-vert-tempestarii/10 hover:text-vert-tempestarii"
                          }
                        `}
                      >
                        <div
                          className={`
                          absolute left-0 top-0 bottom-0 w-0.5 bg-vert-tempestarii transition-all duration-300
                          ${location.pathname === link.path ? "opacity-100" : "opacity-0 group-hover:opacity-50"}
                        `}
                        ></div>
                        <div className="flex items-center justify-center w-6">{link.icon}</div>
                        <span>{link.label}</span>

                        {location.pathname === link.path && (
                          <motion.div
                            layoutId="nav-indicator-mobile"
                            className="absolute right-2 w-1.5 h-1.5 rounded-full bg-vert-tempestarii"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="p-4 border-t border-vert-tempestarii/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-vert-tempestarii/70">STATUT SYSTÈME</div>
                  <div className="text-xs text-vert-tempestarii/70">
                    <span className="animate-pulse">◉</span> ACTIF
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Boucliers</span>
                    <span className="text-vert-tempestarii">100%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Moteurs</span>
                    <span className="text-vert-tempestarii">98%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Armement</span>
                    <span className="text-vert-tempestarii">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden md:flex h-full">
        <div className="h-full w-16 bg-black/80 border-r border-vert-tempestarii/30 flex flex-col items-center py-4">
          <div className="h-10 w-10 rounded-full bg-vert-tempestarii/20 border border-vert-tempestarii/50 flex items-center justify-center mb-8">
            <img src="/images/emblems/logo_color_circle.webp?" className="h-9 w-9 text-vert-tempestarii" />
          </div>

          <div className="flex-1 flex flex-col items-center space-y-6 pt-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  group relative flex flex-col items-center justify-center w-10 h-10 rounded-lg transition-all duration-200
                  ${
                    location.pathname === link.path
                      ? "bg-vert-tempestarii/20 text-vert-tempestarii"
                      : "text-gray-500 hover:bg-vert-tempestarii/10 hover:text-vert-tempestarii"
                  }
                `}
              >
                {link.icon}

                <div className="absolute left-full ml-2 px-2 z-50 py-1 bg-black/90 border border-vert-tempestarii/30 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {link.label}
                </div>

                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-dot"
                    className="absolute right-0 w-1 h-6 bg-vert-tempestarii rounded-l-sm"
                  />
                )}
              </Link>
            ))}
          </div>

          <button
            onClick={toggleNav}
            className="mt-auto w-10 h-10 rounded-lg text-gray-500 hover:bg-vert-tempestarii/10 hover:text-vert-tempestarii transition-all duration-200 flex items-center justify-center"
          >
            {isExpanded ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="h-full border-r border-vert-tempestarii/30 bg-black/80"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 200, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-full w-full flex flex-col p-4">
                <div className="mb-6">
                  <h1 className="text-lg font-bold tracking-wider text-vert-tempestarii">
                    THE <span className="text-white">ASHEN </span>
                  </h1>
                  <h2 className="text-sm text-white/70">TEMPESTARIIS</h2>
                </div>

                <nav className="flex-1">
                  <div className="text-xs text-vert-tempestarii/70 mb-3 uppercase tracking-wider">Navigation</div>
                  <ul className="space-y-1">
                    {links.map((link) => (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          className={`
                            group relative flex items-center space-x-3 px-3 py-2 rounded-sm transition-all duration-200
                            ${
                              location.pathname === link.path
                                ? "bg-vert-tempestarii/20 text-vert-tempestarii"
                                : "text-gray-400 hover:bg-vert-tempestarii/10 hover:text-vert-tempestarii"
                            }
                          `}
                        >
                          <div
                            className={`
                            absolute left-0 top-0 bottom-0 w-0.5 bg-vert-tempestarii transition-all duration-300
                            ${location.pathname === link.path ? "opacity-100" : "opacity-0 group-hover:opacity-50"}
                          `}
                          ></div>
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-vert-tempestarii/70">STATUT SYSTÈME</div>
                  <div className="text-xs text-vert-tempestarii/70">
                    <span className="animate-pulse">◉</span> ACTIF
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
