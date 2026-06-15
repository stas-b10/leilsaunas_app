import { useEffect, useState } from "react";
import navLogo from "../assets/navLogo.png";
import MenuButton from "./MenuButton";

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
      <div className="container mx-auto px-4 relative flex items-center justify-between">
  
  {/* LOGO */}
  <a href="/" className="relative top-3 -left-2">
    <img
      src={navLogo}
      alt="Leil Saunas"
      className="w-auto h-12 lg:h-auto"
    />
  </a>

  {/* MENU BUTTON */}
  <div className="relative top-3 -left-2">
    <MenuButton />
  </div>

</div>
    </nav>
  );
}