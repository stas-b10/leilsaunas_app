import { motion } from "framer-motion";

interface CloseMenuButtonProps {
  onClick: () => void;
}

export default function CloseMenuButton({
  onClick,
}: CloseMenuButtonProps) {
    
  return (
    <motion.button
    onClick={onClick}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="
        relative
        flex
        items-center
        justify-between
        overflow-hidden
        bg-[#313b2a]
        border
        border-[#313b2a]
        border-[2px]
        h-[57px]
        w-[144px]
        px-4
        cursor-pointer
      "
      style={{
        borderRadius: "999px 58px 999px 999px",
      }}
    >
      <motion.div
        variants={{
          rest: { scale: 0 },
          hover: { scale: 8 },
        }}
        transition={{
          duration: 1.05,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute
          right-2
          top-1/2
          h-10
          w-10
          -translate-y-1/2
          bg-[#E6ECD9]
        "
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
        className="relative z-10 text-[18px] ml-2"
        style={{
          fontFamily: "noah-bold, sans-serif",
        }}
      >
        Close
      </motion.span>

      <motion.div
        className="
          absolute
          right-0
          top-1/2
          -translate-y-1/2
          z-10
          flex
          h-[57px]
          w-14
          items-center
          justify-center
        "
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
          variants={{
            rest: { backgroundColor: "#E6ECD9" },
          }}
          transition={{
            duration: 0.95,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
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
            rest: {
            color: "#223300",
            rotate: 0,
        },
        hover: {
            rotate: 90,
        },
        }}
        transition={{
            duration: 0.95,
            ease: [0.22, 1, 0.36, 1],
        }}
        >
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
            </motion.svg>
        </motion.div>
    </motion.button>
  );
}