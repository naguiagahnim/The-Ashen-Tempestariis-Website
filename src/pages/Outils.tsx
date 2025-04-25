import { motion } from "framer-motion"
import {Bot, Github, Globe } from "lucide-react"
import Footer from "../components/Footer"

const tools = [
  {
    id: 1,
    name: "Céphalon Poseidis",
    category: "Discord",
    description: "Bot Discord pour les informations sur l'état actuel du jeu",
    icon: <Bot className="h-8 w-8" />,
    features: [
      "Afficher le weekly reset hebdomadaire",
      "Afficher les cycles actuels (Cetus, Duviri, Deimos...)",
      "Et bien d'autre à venir..."
    ],
    status: "Hors-ligne",
    statusColor: "red"
  },

  {
    id: 2,
    name: "The Ashen Tempestariis Website",
    category: "Web",
    description: "Le site web sur lequel vous vous trouvez actuellement",
    icon: <Globe className="h-8 w-8" />,
    features: [
      "Présenter le clan, ses membres, ses alliés et ses outils",
      "Présenter les builds crées par les membres",
      "Permettre de candidater en tant que membre du clan"
    ],
    status: "En ligne",
    statusColor: "green"
  },
]

const handleDlClick = () => {
  window.open("https://github.com/naguiagahnim?tab=repositories", "_blank");
}

/*const handleDocClick = () => {
  window.open("https://the-ashen-tempestariis.vercel.app", "_blank");
}*/

const Outils = () => {
  return (
    <div className="min-h-full w-full text-white flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl text-vert-tempestarii font-light tracking-widest">SYSTÈMES AUXILIAIRES</h2>
        <div className="h-0.5 w-48 bg-gradient-to-r from-vert-tempestarii to-transparent mt-1"></div>
        <p className="text-vert-tempestarii/80 mt-2 text-sm">Outils et utilitaires développés pour le clan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative border border-vert-tempestarii/30 bg-black/80 backdrop-blur-sm rounded-sm overflow-hidden hover:border-vert-tempestarii/50 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-vert-tempestarii"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-vert-tempestarii"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-vert-tempestarii"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-vert-tempestarii"></div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-vert-tempestarii/20 border border-vert-tempestarii/50 rounded-sm">
                    {tool.icon}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-vert-tempestarii">{tool.name}</h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-vert-tempestarii/20 border border-vert-tempestarii/30 rounded-sm text-vert-tempestarii">
                        {tool.category}
                      </span>
                      
                      <div className="flex items-center space-x-1">
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${
                          tool.statusColor === "green"
                            ? "bg-green-500"
                            : tool.statusColor === "red"
                            ? "bg-red-500"
                            : tool.statusColor === "amber"
                            ? "bg-amber-500"
                            : "bg-gray-500"
                        }`}
                      />

                        <span className="text-xs text-gray-400">{tool.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-400 mb-4">{tool.description}</p>
              
              <div className="mb-4">
                <h4 className="text-xs text-vert-tempestarii/70 uppercase tracking-wider mb-2">Fonctionnalités</h4>
                <ul className="space-y-1">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="text-sm flex items-start">
                      <span className="inline-block w-1 h-1 bg-vert-tempestarii rounded-full mt-1.5 mr-2"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-1 gap-2 mt-4 pt-4 border-t border-vert-tempestarii/20">
                <motion.button 
                  className="flex items-center justify-center space-x-2 bg-transparent border border-vert-tempestarii/50 text-vert-tempestarii hover:bg-vert-tempestarii/20 px-3 py-2 rounded-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDlClick}
                >
                  <Github className="h-4 w-4" />
                  <span>Github</span>
                </motion.button>
                
                {/*À garder pour plus tard si j'écris de la doc
                
                <motion.button 
                  className="flex items-center justify-center space-x-2 bg-transparent border border-vert-tempestarii/50 text-vert-tempestarii hover:bg-vert-tempestarii/20 px-3 py-2 rounded-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDocClick}
                >
                  <span>Documentation</span>
                  <ExternalLink className="h-4 w-4" />
                </motion.button>*/}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-black/60 border border-vert-tempestarii/30 p-6 rounded-sm mb-8">
        <div className="relative">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-vert-tempestarii"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-vert-tempestarii"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-vert-tempestarii"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-vert-tempestarii"></div>
        </div>

        <h3 className="text-xl text-vert-tempestarii font-light tracking-widest mb-4">CONTRIBUER AUX PROJETS</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-300 mb-4">
              Outils développés par Agahnim. Si vous souhaitez signaler un bug, veuillez utiliser l'onglet Issues via Github.
            </p>
            
            <h4 className="text-vert-tempestarii/80 text-sm uppercase tracking-wider mb-2">Langages utilisés</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded-sm text-blue-400">TypeScript</span>
              <span className="text-xs px-2 py-1 bg-pink-500/20 border border-pink-500/30 rounded-sm text-pink-400">Rust</span>
              <span className="text-xs px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-sm text-green-400">React</span>
              <span className="text-xs px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-sm text-red-400">Node.js</span>
              <span className="text-xs px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-sm text-purple-400">HTML</span>
              <span className="text-xs px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-sm text-yellow-400">CSS</span>
            </div>
          </div>
          <div>
            <h4 className="text-vert-tempestarii/80 text-sm uppercase tracking-wider mb-2">Projets en cours</h4>
            
            <div className="space-y-3">
              <div className="border border-vert-tempestarii/20 p-3 rounded-sm bg-black/50">
                <div className="flex justify-between items-center">
                  <h5 className="text-vert-tempestarii">Céphalon Poseidis</h5>
                  <span className="text-xs px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded-sm text-blue-400">En développement</span>
                </div>
                <div className="mt-2 h-2 bg-gray-800 rounded-full">
                  <div className="h-full bg-vert-tempestarii rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              
              <div className="border border-vert-tempestarii/20 p-3 rounded-sm bg-black/50">
                <div className="flex justify-between items-center">
                  <h5 className="text-vert-tempestarii">Site web</h5>
                  <span className="text-xs px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded-sm text-green-400">Terminé</span>
                </div>
                <div className="mt-2 h-2 bg-gray-800 rounded-full">
                  <div className="h-full bg-vert-tempestarii rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1"></div>
      <Footer />
    </div>
  )
}

export default Outils