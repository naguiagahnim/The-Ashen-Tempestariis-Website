"use client"

import { motion } from "framer-motion"

const membres = [
  {
    id: 1,
    name: "Kyrn le Harponneur",
    rank: "Capitaine",
    specialty: "Éclaireur des mers stellaires et bras droit de la Vierge Écorchée",
    joinDate: "2021-09-13",
    avatar: "/images/avatars/kyrn.png?height=100&width=100",
  },
  {
    id: 2,
    name: "Oni le Kuvalique",
    rank: "Capitaine",
    specialty: "Servant du Mur, héraut du Rouge",
    joinDate: "2021-09-13",
    avatar: "/images/avatars/mitw.png?height=100&width=100",
  },
  {
    id: 3,
    name: "Héphaï l'Armurier",
    rank: "Capitaine",
    specialty: "Porteur de feu vengeur et d’acier pénitent",
    joinDate: "2021-09-13",
    avatar: "/images/avatars/hephai.png?height=100&width=100",
  },
  {
    id: 4,
    name: "Ranga le Tacticien",
    rank: "Briseur de coque",
    specialty: "Seraphin du silence et bras de la sérénité éphémère",
    joinDate: "2021-09-13",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Agahnim la Tisseuse d’Æther",
    rank: "Haute-Inspirée du Cercle des Sons et des Formes",
    specialty: "Évocation des formes invisibles et résonance des mondes muets",
    joinDate: "2021-09-14",
    avatar: "/images/avatars/zarionis.png?height=100&width=100",
  },
]

const Membres = () => {
  return (
    <div className="min-h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl text-vert-tempestarii font-light tracking-widest">ÉQUIPAGE DU RAILJACK</h2>
        <div className="h-0.5 w-48 bg-gradient-to-r from-vert-tempestarii to-transparent mt-1"></div>
        <p className="text-vert-tempestarii/80 mt-2 text-sm">Liste des membres actifs du clan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {membres.map((membre, index) => (
          <motion.div
            key={membre.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative border border-vert-tempestarii/30 bg-black/80 backdrop-blur-sm p-4 rounded-sm"
          >
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-vert-tempestarii"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-vert-tempestarii"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-vert-tempestarii"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-vert-tempestarii"></div>

            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-vert-tempestarii/20 border border-vert-tempestarii/50 overflow-hidden">
                <img
                  src={membre.avatar || "/placeholder.svg"}
                  alt={membre.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-vert-tempestarii">{membre.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-vert-tempestarii/20 border border-vert-tempestarii/30 rounded-sm text-vert-tempestarii">
                    {membre.rank}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-vert-tempestarii/20">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-400 text-xs">Spécialité</span>
                  <p className="text-white">{membre.specialty}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">Membre depuis</span>
                  <p className="text-white">{new Date(membre.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Membres
