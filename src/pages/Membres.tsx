"use client"

import { motion } from "framer-motion"

interface Membre {
  id: number
  name: string
  rank: string
  joinDate: string
  avatar?: string
  specialty?: string
}

const membres: Membre[] = [
  {
    id: 1,
    name: "Kyrn le Harponneur",
    rank: "Capitaine",
    specialty: "Éclaireur des mers stellaires et bras droit de la Vierge Écorchée",
    joinDate: "2021-09-13",
    avatar: "/images/avatars/kyrn.webp",
  },
  {
    id: 2,
    name: "Oni le Kuvalique",
    rank: "Capitaine",
    specialty: "Moissonneur d’échos liés et vassal du Mur Affamé",
    joinDate: "2021-09-13",
    avatar: "/images/avatars/oni.webp",
  },
  {
    id: 3,
    name: "Héphaï l'Armurier",
    rank: "Capitaine",
    specialty: "Porteur de feu vengeur et d’acier pénitent",
    joinDate: "2021-09-13",
    avatar: "/images/avatars/hephai.webp",
  },
  {
    id: 4,
    name: "Ranga le Tacticien",
    rank: "Briseur de coque",
    specialty: "Seraphin du silence et bras de la sérénité éphémère",
    joinDate: "2021-09-13",
    avatar: "/images/avatars/ranga.webp",
  },
  {
    id: 5,
    name: "Agahnim la Tisseuse d’Æther",
    rank: "Haute-Inspirée du Cercle des Sons et des Formes",
    specialty: "Évocation des formes invisibles et résonance des mondes muets",
    joinDate: "2021-09-14",
    avatar: "/images/avatars/agahnim.webp",
  },
]

const bleusailles: Membre[] = [
  { id: 6, name: "D'yS_Achlys", rank: "Matelot", joinDate: "2021-09-14" },
  { id: 7, name: "Zero le Fidèle", rank: "Matelot", joinDate: "2021-09-14" },
  { id: 8, name: "Adrinalean le Puceau", rank: "Égorgeur", joinDate: "2022-04-09" },
  { id: 9, name: "INova l'Exécuteur", rank: "Matelot", joinDate: "2023-10-20" },
  { id: 10, name: "Shinken le Trancheur", rank: "Matelot", joinDate: "2023-10-20" },
  { id: 11, name: "Abaddon Moa", rank: '"L\'ombre stellaire"', joinDate: "2023-10-26" },
  { id: 12, name: "Minoshia Z", rank: '"L\'ombre stellaire"', joinDate: "2023-11-04" },
  { id: 13, name: "Velanteinj", rank: "Matelot", joinDate: "2023-11-07" },
  { id: 14, name: "Sprix", rank: "Matelot", joinDate: "2023-11-18" },
  { id: 15, name: "Tajdin", rank: "Matelot", joinDate: "2023-12-15" },
  { id: 16, name: "The Floow", rank: "Bleusaille", joinDate: "2023-12-28" },
  { id: 17, name: "Jin.AS", rank: "Bleusaille", joinDate: "2024-01-05" },
  { id: 18, name: "TyZe", rank: "Briseur de coque", joinDate: "2024-01-08" },
  { id: 19, name: "Samael_Is_Your_DooM", rank: "Spark of War", joinDate: "2024-01-16" },
  { id: 20, name: "Akt_akashi", rank: '"Spark of War"', joinDate: "2024-01-16" },
  { id: 21, name: "Logan Shelby", rank: '"Spark of War"', joinDate: "2024-01-21" },
  { id: 22, name: "3rw2n", rank: "Bleusaille", joinDate: "2024-01-21" },
]

const MembreCard = ({ membre, index }: { membre: Membre; index: number }) => {
  return (
    <motion.div
      key={membre.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative border border-vert-tempestarii/30 bg-black/80 backdrop-blur-sm p-4 rounded-sm hover:border-vert-tempestarii/50"
    >
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-vert-tempestarii"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-vert-tempestarii"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-vert-tempestarii"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-vert-tempestarii"></div>

      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 rounded-full bg-vert-tempestarii/20 border border-vert-tempestarii/50 overflow-hidden">
          <img
            src={membre.avatar || "/images/emblems/lotus.webp"}
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
          {membre.specialty && (
            <div>
              <span className="text-gray-400 text-xs">Spécialité</span>
              <p className="text-white">{membre.specialty}</p>
            </div>
          )}
          <div>
            <span className="text-gray-400 text-xs">Membre depuis</span>
            <p className="text-white">{new Date(membre.joinDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Membres = () => {
  return (
    <div className="min-h-full flex flex-col">
      <section className="mb-8">
        <h2 className="text-xl text-vert-tempestarii font-light tracking-widest">ÉQUIPAGE DU RAILJACK</h2>
        <div className="h-0.5 w-48 bg-gradient-to-r from-vert-tempestarii to-transparent mt-1"></div>
        <p className="text-vert-tempestarii/80 mt-2 text-sm">Membres fondateurs du clan</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {membres.map((membre, index) => (
          <MembreCard key={membre.id} membre={membre} index={index} />
        ))}
      </div>

      <section className="mb-8">
        <h2 className="text-xl text-vert-tempestarii font-light tracking-widest">QUARTIER DES BLEUSAILLES</h2>
        <div className="h-0.5 w-48 bg-gradient-to-r from-vert-tempestarii to-transparent mt-1"></div>
        <p className="text-vert-tempestarii/80 mt-2 text-sm">Le reste de la flotte</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {bleusailles.map((membre, index) => (
          <MembreCard key={membre.id} membre={membre} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Membres
