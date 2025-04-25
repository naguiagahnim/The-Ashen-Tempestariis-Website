import { motion } from "framer-motion"
import { MessageSquare, Youtube, Twitch, ExternalLink, Radio } from "lucide-react"
import Footer from "../components/Footer"

const socialLinks = [
  {
    id: 1,
    name: "Discord",
    url: "https://discord.gg/e7hcyQwUfD",
    description: "Rejoignez notre serveur Discord pour discuter avec l'équipage",
    icon: <MessageSquare className="h-8 w-8" />,
    color: "bg-[#5865F2]/20 border-[#5865F2]/50",
    textColor: "text-[#5865F2]",
  },
  {
    id: 2,
    name: "YouTube",
    url: "https://youtube.com/",
    description: "Regardez nos guides de jeu et nos streams archivés",
    icon: <Youtube className="h-8 w-8" />,
    color: "bg-[#FF0000]/20 border-[#FF0000]/50",
    textColor: "text-[#FF0000]",
  },
  {
    id: 3,
    name: "Twitch",
    url: "https://www.twitch.tv/theashentempestariis",
    description: "Suivez nos streams en direct et participez aux évènements",
    icon: <Twitch className="h-8 w-8" />,
    color: "bg-[#9146FF]/20 border-[#9146FF]/50",
    textColor: "text-[#9146FF]",
  },
]

const Contact = () => {
  return (
    <div className="min-h-full w-full text-white flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl text-vert-tempestarii font-light tracking-widest">TRANSMISSIONS</h2>
        <div className="h-0.5 w-48 bg-gradient-to-r from-vert-tempestarii to-transparent mt-1"></div>
        <p className="text-vert-tempestarii/80 mt-2 text-sm">Canaux de communication du clan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`relative border ${link.color} bg-black/80 backdrop-blur-sm p-6 rounded-sm hover:shadow-lg hover:shadow-${link.textColor}/20 transition-all duration-300`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-vert-tempestarii"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-vert-tempestarii"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-vert-tempestarii"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-vert-tempestarii"></div>

            <div className="flex flex-col items-center text-center">
              <div className={`p-4 rounded-full ${link.color} mb-4`}>
                {link.icon}
              </div>
              <h3 className={`text-xl font-bold ${link.textColor} mb-2`}>
                {link.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{link.description}</p>
              <div className={`flex items-center space-x-2 mt-auto ${link.textColor}`}>
                <span>Accéder</span>
                <ExternalLink className="h-4 w-4" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="bg-black/60 border border-vert-tempestarii/30 p-6 rounded-sm mb-8">
        <div className="relative">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-vert-tempestarii"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-vert-tempestarii"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-vert-tempestarii"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-vert-tempestarii"></div>
        </div>

        <h3 className="text-xl text-vert-tempestarii font-light tracking-widest mb-4">CONTACTEZ-NOUS</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <form className="space-y-4">
              <div>
                <label className="block text-vert-tempestarii/80 text-sm mb-1">Nom d'utilisateur</label>
                <input 
                  type="text" 
                  className="w-full bg-black/50 border border-vert-tempestarii/30 rounded-sm px-3 py-2 text-white focus:outline-none focus:border-vert-tempestarii/70"
                  placeholder="Votre nom d'utilisateur"
                />
              </div>

              <div>
                <label className="block text-vert-tempestarii/80 text-sm mb-1">Objet</label>
                <select className="w-full bg-black/50 border border-vert-tempestarii/30 rounded-sm px-3 py-2 text-white focus:outline-none focus:border-vert-tempestarii/70">
                  <option value="recrutement">Demande de recrutement</option>
                  <option value="alliance">Proposition d'alliance</option>
                  <option value="support">Support technique</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-vert-tempestarii/80 text-sm mb-1">Message</label>
                <textarea 
                  className="w-full bg-black/50 border border-vert-tempestarii/30 rounded-sm px-3 py-2 text-white focus:outline-none focus:border-vert-tempestarii/70 h-32"
                  placeholder="Votre message..."
                ></textarea>
              </div>

              <motion.button 
                className="w-full flex items-center justify-center space-x-2 bg-transparent border border-vert-tempestarii text-vert-tempestarii hover:bg-vert-tempestarii/20 px-4 py-2 rounded-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                //Faut ajouter le onclick et l'envoi du mail
              >
                <span>Envoyer le message</span>
                <Radio className="h-4 w-4" />
              </motion.button>
            </form>
          </div>

          <div className="flex flex-col">
            <h4 className="text-vert-tempestarii font-medium mb-4">Informations du clan</h4>
            
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-400">Nom du clan</p>
                <p className="text-white">The Ashen Tempestariis</p>
              </div>
              
              <div>
                <p className="text-gray-400">Alliance</p>
                <p className="text-white">Ombre du Rail</p>
              </div>
              
              <div>
                <p className="text-gray-400">Région</p>
                <p className="text-white">Monde</p>
              </div>
              
              <div>
                <p className="text-gray-400">Statut de recrutement</p>
                <span className="inline-block px-2 py-0.5 bg-green-500/20 border border-green-500/50 rounded-sm text-green-400">
                  Ouvert
                </span>
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

export default Contact