import { motion } from "framer-motion"
import { MessageSquare, Youtube, Twitch, ExternalLink } from "lucide-react"
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

      <div className="flex-1"></div>
      <Footer />
    </div>
  )
}

export default Contact