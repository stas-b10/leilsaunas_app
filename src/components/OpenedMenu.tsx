import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import CloseMenuButton from "./CloseMenuButton";
import navLogo from "../assets/navLogo.png";
import { useEffect, useState } from "react";
import type { Category } from "../utils/types/categories";
import type { Collection } from "../utils/types/collection";
import type { Series } from "../utils/types/series";
import { supabase } from "../utils/supabase";
import { useLocation } from "react-router-dom";

interface OpenedMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OpenedMenu({
  isOpen,
  onClose,
}: OpenedMenuProps) {

    const [categories, setCategories] = useState<Category[]>([]);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [series, setSeries] = useState<Series[]>([]);
    const location = useLocation();

    useEffect(() => {
      onClose();
    }, [location.pathname]);

    useEffect(() => {
      const load = async () => {
        const [{ data: categoriesData }, { data: collectionsData }, { data: seriesData }] =
          await Promise.all([
            supabase.from("categories").select("*"),
            supabase.from("collections").select("*"),
            supabase.from("series").select("*"),
          ]);
    
        setCategories(categoriesData || []);
        setCollections(collectionsData || []);
        setSeries(seriesData || []);
      };
    
      load();
    }, []);

  return (
    <AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100]"
    >
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className="
          absolute
          top-2
          right-[130px]
          w-[950px]
          h-[700px]
          rounded-[8px]
          bg-[#313b2a]
          shadow-2xl
          overflow-hidden
        "
      >
        <div className="flex items-center justify-between px-8 pt-4 pb-8">
  <h2 style={{fontFamily: "sogo-light, sans-serif"}} className="text-[42px] text-white">
    Our saunas, made to last
  </h2>
  <CloseMenuButton onClick={onClose} />
</div>

        <div className="px-8 pb-12 ">
          <div className="grid grid-cols-[0.5fr_0.5fr_2fr]">
            <div className="border-r border-[#C6C0AF] pr-8">
            <h3 className="mb-2 text-[26px] text-white" style={{ fontFamily: "sogo-light, sans-serif" }}>
              Categories
            </h3>

            <div className="space-y-3 text-[#C6C0AF] text-[16px]">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/sauna-category/${category.slug}`}
                  className="block hover:text-white transition"
                  style={{ fontFamily: "noah-regular, sans-serif" }}
                >
                  {category.category_name}
                </Link>
              ))}
            </div>
          </div>

          
            <div className="border-r border-[#C6C0AF] px-8">
            <h3 className="mb-2 text-[26px] text-white" style={{ fontFamily: "sogo-light, sans-serif" }}>
              Collections
            </h3>

            <div className="space-y-3 text-[#C6C0AF] text-[16px]">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  to={`/sauna-collection/${collection.slug}`}
                  className="block hover:text-white transition"
                  style={{ fontFamily: "noah-regular, sans-serif" }}
                >
                  {collection.collection_name}
                </Link>
              ))}
              </div>
          </div>

          <div className="pl-8">
            <h3 className="mb-2 text-[26px] text-white" style={{ fontFamily: "sogo-light, sans-serif" }}>
              Series
            </h3>

            <div className="text-[#C6C0AF] text-[16px] grid grid-cols-3 gap-y-4 gap-x-6">
              {series.map((series) => (
                <Link
                  key={series.id}
                  to={`/series/${series.slug}`}
                  className="block whitespace-nowrap hover:text-white transition"
                  style={{ fontFamily: "noah-regular, sans-serif" }}
                >
                  {series.series_name}
                </Link>
              ))}
              <Link
                to="/series"
                className="block text-[#C6C0AF] hover:text-white transition"
                style={{ fontFamily: "noah-regular, sans-serif" }}
              >
                View all Series
              </Link>
            </div>
          </div>
          </div>
          <div className="grid grid-cols-[0.5fr_2fr]">
            <ul>
              <li className="mt-16">
                <a href="/about" className="text-white text-[42px] whitespace-nowrap" style={{ fontFamily: "sogo-light, sans-serif" }}>
                  About Us
                </a>
              </li>
              <li className="">
                <a href="/news" className="text-white text-[42px] whitespace-nowrap" style={{ fontFamily: "sogo-light, sans-serif" }}>
                  News
                </a>
              </li>
              <li className="">
                <a href="/faq" className="text-white text-[42px] whitespace-nowrap" style={{ fontFamily: "sogo-light, sans-serif" }}>
                  FAQ
                </a>
              </li>
              <li className="">
                <a href="/contacts" className="text-white text-[42px] whitespace-nowrap" style={{ fontFamily: "sogo-light, sans-serif" }}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
  );
}