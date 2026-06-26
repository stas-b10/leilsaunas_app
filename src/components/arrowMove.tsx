import { motion } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";

export default function ArrowMove() {
  return (
    <div className="relative w-14 h-14 rounded-full bg-white overflow-hidden flex items-center justify-center">
      <motion.div
              className="absolute inset-0 flex items-center justify-center bg-[#edf5e8]"
              variants={{
                hover: { rotate: 90, scale: 1.08 },
                initial: { rotate: 0, scale: 1 },
              }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                borderRadius:
                  "100% 0% 100% 100% / 100% 0% 100% 100%",
              }}
            >
        <GoArrowUpRight
          size={24}
          className="text-[#313b2a]"
        />
      </motion.div>
    </div>
  );
}