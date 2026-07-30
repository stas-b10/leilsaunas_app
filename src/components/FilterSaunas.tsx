import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../utils/supabase";
import { Link } from "react-router-dom";

interface FilterSaunasProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter: (filteredResults: any[]) => void;
}

export default function FilterSaunas({
  isOpen,
  onClose,
  onApplyFilter,
}: FilterSaunasProps) {
  const [categories, setCategories] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [series, setSeries] = useState<any[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<any | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      const { data: categoryData } = await supabase
        .from("categories")
        .select("*")
        .order("category_name");

      const { data: collectionData } = await supabase
        .from("collections")
        .select("*")
        .order("sort_order");

      const { data: seriesData } = await supabase
        .from("series")
        .select(`
          *,
          category:categories(
            id,
            category_name
          ),
          collection:collections(
            id,
            collection_name
          )
        `);

      setCategories(categoryData || []);
      setCollections(collectionData || []);
      setSeries(seriesData || []);
    };

    fetchData();
  }, []);

  const filteredResults = useMemo(() => {
    return series.filter((item) => {
      const categoryMatch =
        !selectedCategory || item.category_id === selectedCategory.id;

      const collectionMatch =
        !selectedCollection || item.collection_id === selectedCollection.id;

      return categoryMatch && collectionMatch;
    });
  }, [series, selectedCategory, selectedCollection]);

  const handleApply = () => {
    onApplyFilter(filteredResults);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-36 right-0 w-[1020px] h-[720px] bg-[#f7f5ef] z-[9999] rounded-md shadow-2xl overflow-y-auto flex flex-col border border-[#D8D2C2]"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="flex justify-between items-center px-4.5 py-4 border-b border-[#D8D2C2]">
            <h2
              className="text-[20px] text-[#313C2B]"
              style={{ fontFamily: "noah-bold, sans-serif" }}
            >
              View our products
            </h2>

            <button
              onClick={onClose}
              className="text-[#313C2B] text-3xl"
            >
              ×
            </button>
          </div>

          <div className="px-5 py-4 space-y-4">
            <div>
              <h3
                className="text-[20px] mb-5 text-[#313C2B]"
                style={{ fontFamily: "noah-bold, sans-serif" }}
              >
                Category
              </h3>

              <div className="flex gap-3 flex-wrap grid grid-cols-2 h-[65px]">
                {categories.map((category) => {
                  const active = selectedCategory?.id === category.id;

                  return (
                    <Link
                      key={category.id}
                      to={`/sauna-category/${category.slug}`}
                      onClick={() => {
                        setSelectedCategory(category);
                        if (window.location.pathname !== `/sauna-category/${category.slug}`) {
                          onClose();
                        }
                      }}
                      style={{ fontFamily: "noah-bold, sans-serif" }}
                      className={`flex items-center justify-center text-center px-5 py-2 rounded-md border border-[#c6c0af] text-[20px]  ${
                        active
                          ? "bg-[#3D4733] text-white"
                          : "text-[#313C2B]"
                      }`}
                    >
                      {category.category_name}
                    </Link>
                  );
                })}
              </div>
              <div className="border-b border-[#D8D2C2] mt-6 -mx-5"/>
            </div>

            <div>
              <h3
                className="text-[20px] mb-3 text-[#313C2B]"
                style={{ fontFamily: "noah-bold, sans-serif" }}
              >
                Collection
              </h3>

              <div className="flex gap-3 flex-wrap grid grid-cols-3 h-[60px] ">
                {collections.map((collection) => {
                  const active = selectedCollection?.id === collection.id;

                  return (
                    <Link
                      key={collection.id}
                      to={`/sauna-collection/${collection.slug}`}
                      onClick={() => {
                        setSelectedCollection(collection);
                        onClose();
                      }}
                      style={{ fontFamily: "noah-bold, sans-serif" }}
                      className={`flex items-center justify-center text-center px-5 py-2 rounded-md border border-[#c6c0af] text-[20px] ${
                        active
                          ? "bg-[#3D4733] text-white"
                          : "text-[#313C2B]"
                      }`}
                    >
                      {collection.collection_name}
                    </Link>
                  );
                })}
              </div>
              <div className="border-b border-[#D8D2C2] mt-6 -mx-5"/>
            </div>

            <div>
              <h3
                className="text-[20px] mb-3 text-[#313C2B]"
                style={{ fontFamily: "noah-bold, sans-serif" }}
              >
                Series
              </h3>

              <div className="grid grid-cols-6 gap-3 mt-4">
                {filteredResults.map((item) => (
                  <Link
                    key={item.id}
                    to={`/series/${item.slug}`}
                    className="rounded-lg border border-[#D8D2C2] p-2 bg-[#FBF9F3] flex flex-col  cursor-pointer"
                  >
                    <img
                      src={item.image_url}
                      alt={item.series_name}
                      className="w-[90%] aspect-[4/3] object-cover rounded-md mx-auto mt-2"
                    />

                    <p
                      className="text-center mt-4 text-[#313C2B] text-[20px]"
                      style={{ fontFamily: "noah-regular, sans-serif" }}
                    >
                      {item.series_name}
                    </p>
                    <p
                      className="text-center text-[#313C2B] text-[14px]"
                      style={{ fontFamily: "noah-regular, sans-serif" }}
                    >
                      {item.category?.category_name}
                    </p>
                    <p
                      className="text-center text-[#313C2B] text-[14px]"
                      style={{ fontFamily: "noah-regular, sans-serif" }}
                    >
                      {item.collection?.collection_name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}