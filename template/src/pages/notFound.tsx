import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Ghost, Home, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-4 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />

      {/* Floating Ghost Animation */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="mb-8 relative"
      >
        <Ghost className="w-32 h-32 text-primary" strokeWidth={1.5} />
        
        {/* Animated Question Marks */}
        <motion.div
          animate={{ opacity: [0, 1, 0], y: [0, -10], x: [0, 10] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          className="absolute -top-4 -right-2 text-2xl font-bold text-muted-foreground"
        >
          ?
        </motion.div>
        <motion.div
          animate={{ opacity: [0, 1, 0], y: [0, -15], x: [0, -15] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
          className="absolute top-2 -left-4 text-xl font-bold text-muted-foreground"
        >
          ?
        </motion.div>
      </motion.div>

      {/* Glitchy 404 Text */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <h1 className="text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50 mb-4 drop-shadow-sm">
          404
        </h1>
      </motion.div>

      {/* Funny Message */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
          <AlertCircle className="w-6 h-6 text-destructive" />
          Houston, on a un problème.
        </h2>
        <p className="text-muted-foreground text-lg">
          Vous avez atterri dans une dimension parallèle. La page que vous cherchez a probablement été mangée par un trou noir.
        </p>
      </motion.div>

      {/* Action Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <Button asChild size="lg" className="rounded-full gap-2 shadow-lg hover:shadow-primary/25 transition-all">
          <Link to="/">
            <Home className="w-4 h-4" />
            Ramenez-moi sur Terre
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}

export default NotFound
