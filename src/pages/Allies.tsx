import { motion } from "framer-motion"
import Footer from "../components/Footer"

const allies = [
  {
    id: 1,
    name: "L'Ombre du Rail",
    leader: "Aucun",
    alliance: "Générale",
    members: 15,
    emblem: "/images/emblems/lotus.png?height=100&width=100",
    description: "Nos premiers alliés",
  },
]

const Allies = () => {
  return (
    <div className="min-h-full w-full text-white flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl text-vert-tempestarii font-light tracking-widest">RÉSEAU D'ALLIANCE</h2>
        <div className="h-0.5 w-48 bg-gradient-to-r from-vert-tempestarii to-transparent mt-1"></div>
        <p className="text-vert-tempestarii/80 mt-2 text-sm">Clans alliés à notre cause</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {allies.map((ally, index) => (
          <motion.div
            key={ally.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative border border-vert-tempestarii/30 bg-black/80 backdrop-blur-sm p-6 rounded-sm hover:border-vert-tempestarii/50 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-vert-tempestarii"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-vert-tempestarii"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-vert-tempestarii"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-vert-tempestarii"></div>

            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-vert-tempestarii/20 border border-vert-tempestarii/50 rounded-sm overflow-hidden flex items-center justify-center">
                <img src={ally.emblem || "/images/emblems/lotus.png?height=100&width=100"} className="h-10 w-10 text-vert-tempestarii/70" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-vert-tempestarii">{ally.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-vert-tempestarii/20 border border-vert-tempestarii/30 rounded-sm text-vert-tempestarii">
                    {ally.alliance}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-vert-tempestarii/20">
              <p className="text-gray-400 text-sm mb-3">{ally.description}</p>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-400 text-xs">Leader</span>
                  <p className="text-white">{ally.leader}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">Membres</span>
                  <p className="text-white">{ally.members}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex-1"></div>
      <Footer />
    </div>
  )
}

export default Allies