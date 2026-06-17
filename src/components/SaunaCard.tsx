import { motion } from "framer-motion";

const SaunaCard = ({ title, outside, inside, outsideClass = "", insideClass = "" }) => {
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      animate="rest"
      variants={{
        rest: { borderTopRightRadius: 16 },
        hover: { borderTopRightRadius: 170 },
      }}
      transition={{ duration: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#EDE9DF] p-10 flex flex-col items-center rounded-xl min-h-[560px]"
    >
      <h3
        className="text-[44px] mb-12 text-[#2E3A2F]"
        style={{ fontFamily: "sogo-light, sans-serif" }}
      >
        {title}
      </h3>

      <motion.div
        className="relative flex items-center justify-center w-full h-[340px]"
        initial="rest"
        whileHover="hover"
      >
        <img
          src={inside}
          alt={`${title} Inside`}
          className={`h-[400px] w-[499px] object-contain ${insideClass}`}
        />

        <motion.div
          variants={{
            rest: { clipPath: "inset(0% 0% 0% 0%)" },
            hover: { clipPath: "inset(0% 0% 100% 0%)" },
          }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute flex items-center justify-center"
        >
          <img
            src={outside}
            alt={`${title} Outside`}
            className={`h-[390px] w-full object-contain ${outsideClass}`}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SaunaCard;