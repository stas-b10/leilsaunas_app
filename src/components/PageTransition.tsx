import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.2 }}
        transition={{
          duration: 1.1,
          ease: "easeInOut",
        }}
        className="min-h-screen bg-[#f7f5ef]" 
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}