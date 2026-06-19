import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

interface Collection {
  id: number;
  collection_name: string;
  description: string;
  image_url: string;
  sort_order: number;
}

export default function CollectionCards() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      const { data, error } = await supabase
        .from("collections")
        .select("*")
        .order("sort_order");

      if (!error && data) {
        setCollections(data);
      }
    };

    fetchCollections();
  }, []);

  
  return (
    <div className="max-w-[2000px] mx-auto grid grid-cols-3 gap-2">
      {collections.map((collection) => (
        <motion.div
          key={collection.id}
          onClick={() =>
            navigate(
              `/sauna-collection/${collection.collection_name.toLowerCase()}`
            )
          }
          className="group relative h-[570px] overflow-hidden rounded-[12px] cursor-pointer"
          whileHover="hover"
        >
          <img
            src={collection.image_url}
            alt={collection.collection_name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-black/25" />

          <div className="absolute left-7 top-7 h-[50px] w-[50px]">
            <motion.div
              className="absolute inset-0 bg-[#edf5e8]"
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
            />

            <motion.div
              className="absolute inset-0 flex items-center justify-center text-black"
              variants={{
                hover: { rotate: 90 },
                initial: { rotate: 0 },
              }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <FiPlus size={22} />
            </motion.div>
          </div>

          <div
            className="absolute right-5 top-[30px] rounded-full bg-white/10 px-[27px] py-[12px] text-[19px] text-white backdrop-blur-sm border border-white/20"
            style={{ fontFamily: "noah-bold, sans-serif" }}
          >
            {collection.collection_name}
          </div>

          <div className="absolute bottom-6 left-6 right-6 ">
            <p
              className="text-[36px] leading-[1.2] text-white "
              style={{ fontFamily: "noah-regular, sans-serif" }}
            >
              {collection.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}