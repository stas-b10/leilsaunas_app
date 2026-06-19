import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function WorldMapButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate("/contacts#map")}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="
        relative
        flex
        items-center
        justify-between
        overflow-hidden
        bg-[#223300]
        border
        border-[#223300]
        border-[2px]
        h-14
        w-[195px]
        px-5
        cursor-pointer
      "
      style={{
        borderRadius: "999px 58px 999px 999px",
      }}
    >
      <motion.div
        variants={{
          rest: { scale: 0 },
          hover: { scale: 9 },
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 bg-[#E6ECD9]"
        style={{
          borderRadius: "100% 0% 100% 100% / 100% 0% 100% 100%",
        }}
      />

      <motion.span
        variants={{
          rest: { color: "#fff" },
          hover: { color: "#223300" },
        }}
        transition={{
          duration: 0.95,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 text-xl opacity-90"
        style={{
          fontFamily: "noah-bold, sans-serif",
        }}
      >
        World Map
      </motion.span>

      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-[57px] w-14 items-center justify-center"
        variants={{
          rest: { rotate: 0 },
          hover: { rotate: 8 },
        }}
        transition={{
          duration: 0.95,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          className="absolute inset-0 bg-[#E6ECD9]"
          style={{
            borderRadius: "100% 0% 100% 100% / 100% 0% 100% 100%",
          }}
        />

        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2.5"
          stroke="currentColor"
          className="relative z-30 h-6 w-6"
          variants={{
            rest: { color: "#223300", x: 1, y: -1 },
            hover: { rotate: 75 },
          }}
          transition={{
            duration: 0.95,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <polyline points="18 18 6 18 6 6" />
        </motion.svg>
      </motion.div>
    </motion.button>
  );
}