import { useEffect, useState } from "react";
import navLogo from "../assets/navLogo.png";
import MenuButton from "./MenuButton";
import { Link, useLocation } from "react-router-dom";
import OpenedMenu from "../components/OpenedMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
  if (!isHome) {
    setScrolled(true);
    return;
  }

  setScrolled(false);

  const handleScroll = () => {
    setScrolled(window.scrollY > 80);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [isHome]);

  

  return (
    <>
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300 ease-in-out 
        ${scrolled
      ? "h-26 bg-gray/10 backdrop-blur-md border-white/50"
      : "h-26 bg-transparent backdrop-blur-0"
        }
      `}
    >
      <div
        className={`
          absolute bottom-0 left-0 w-full h-[1px]
          transition-opacity duration-300 ease-in-out
          ${scrolled ? "opacity-100 delay-150 bg-white/20" : "opacity-0"}
        `}
      />

      <div className="container mx-auto px-4 relative flex items-center justify-between">
  

  <a href="/" className="relative top-3 -left-2">
            <img
              src={navLogo}
              alt="Leil Saunas"
              className="w-auto h-12 lg:h-auto"
            />
          </a>

  <div className="relative top-3 -left-2">
            <MenuButton
              menuOpen={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            />
          </div>

</div>
    </nav>
    <OpenedMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}