import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300
        ${scrolled
          ? "backdrop-blur-md bg-black/40 shadow-md h-20"
          : "backdrop-blur-0 bg-transparent h-28"
        }
      `}
    >
      <div className="flex items-center justify-between px-6 h-full">
        <div className="text-white font-bold">Leil Saunas</div>

        <button className="text-white px-4 py-2 rounded-full bg-white/10">
          Menu
        </button>
      </div>
    </nav>
  );
}