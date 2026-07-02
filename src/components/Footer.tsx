import navLogo from "../assets/navLogo.png";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import type { Category } from "../utils/types/categories";
import type { Collection } from "../utils/types/collection";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { Link } from "react-router-dom";

export default function Footer() {

  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [email, setEmail] = useState("");

useEffect(() => {
  const load = async () => {
    const [{ data: categoriesData }, { data: collectionsData }] =
      await Promise.all([
        supabase.from("categories").select("*"),
        supabase.from("collections").select("*"),
      ]);

    setCategories(categoriesData || []);
    setCollections(collectionsData || []);
  };

  load();
}, []);

const handleSubscribe = async () => {
  if (!email) return;

  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert([{ email }]);

  if (!error) {
    alert("Subscribed!");
    setEmail("");
  } else {
    console.log(error);
  }
};


  return (
    <footer className="bg-[#171D12] text-white">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_1.8fr] gap-12 mt-2">
          <div className="">
            <a href="/">
            <img
              src={navLogo}
              alt="Leil"
              className="w-[140px] -ml-4 text-white"
            />
            </a>

            <p className="text-[#C6C0AF] text-[16px]" style={{ fontFamily: "noah-regular, sans-serif" }}>
              Website made by{" "}
              <a className="text-white" href="https://github.com/stas-b10">
                me
              </a>
            </p>
          </div>

          <div className="mt-2 pl-8">
            <h3 className="text-[20px] mb-2" style={{ fontFamily: "noah-bold, sans-serif" }}>
              Products
            </h3>

            <div className="space-y-1 text-[#C6C0AF] text-[16px]">
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

          <div className="mt-2 pl-8">
            <h3 className="text-xl mb-2" style={{ fontFamily: "noah-bold, sans-serif" }}>
              Collections
            </h3>

            <div className="space-y-1 text-[#C6C0AF] text-[16px]">
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

          <div className="mt-2 pl-8">
            <h3 className="text-xl mb-2" style={{ fontFamily: "noah-bold, sans-serif" }}>
              Company
            </h3>

            <div className="space-y-1 text-[#C6C0AF] text-[16px]">
              <a href="/about" className="block hover:text-white" style={{ fontFamily: "noah-regular, sans-serif" }}>
                About us
              </a>

              <a href="/contacts" className="block hover:text-white" style={{ fontFamily: "noah-regular, sans-serif" }}>
                Contact
              </a>
            </div>
          </div>

          <div className="mt-2 pl-8">
            <h3 className="font-semibold text-xl mb-2" style={{ fontFamily: "noah-bold, sans-serif" }}>
              Resources
            </h3>

            <div className="space-y-1 text-[#C6C0AF] text-[16px]">
              <a href="/news" className="block hover:text-white" style={{ fontFamily: "noah-regular, sans-serif" }}>
                News
              </a>

              <a href="#" className="block hover:text-white" style={{ fontFamily: "noah-regular, sans-serif" }}>
                Leil.ee
              </a>
            </div>
          </div>

          <div className="lg:col-span-1 mt-2 pl-8">
            <h3 className="mb-2 text-[20px] whitespace-nowrap" style={{fontFamily: "noah-bold, sans-serif"}}>
              Subscribe to the newsletter
            </h3>

            <div className="flex items-center gap-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-[52px] flex-1 rounded-[8px] bg-[#313b2a] px-4 text-white placeholder:text-[#8D9487] outline-none text-[20px]"
                style={{ fontFamily: "noah-regular, sans-serif" }}
              />

              <button onClick={handleSubscribe} className="w-[50px] h-13 bg-white rounded-md flex items-center justify-center text-[#171D12] hover:bg-gray-200 transition">
                <HiArrowRight size={21} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap gap-4 text-[#C6C0AF] text-[16px]" style={{ fontFamily: "noah-regular, sans-serif" }}>
              <span>©2026 LEIL</span>

              <a href="/privacy-policy" className="hover:text-white transition" >
                Privacy Policy
              </a>

              <a href="/terms-conditions" className="hover:text-white transition">
                Terms & Conditions
              </a>
            </div>

            <div className="flex gap-8 text-[27px]">
              <a href="https://www.facebook.com/share/1akghPaUb4/" className="hover:text-[#E4D1A2] transition">
                <FaFacebook />
              </a>

              <a href="https://www.linkedin.com/in/stas-baltag-899ab141a/" className="hover:text-[#E4D1A2] transition">
                <FaLinkedin />
              </a>

              <a href="https://www.instagram.com/stas_ftbl/" className="hover:text-[#E4D1A2] transition">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}