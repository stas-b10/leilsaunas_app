import { useEffect, useState } from "react";
import navLogo from "../assets/navLogo.png";
import MenuButton from "./MenuButton";
import { useLocation, useNavigate } from "react-router-dom";
import OpenedMenu from "../components/OpenedMenu";
import { getComparisonCount, subscribeToComparison, } from "../utils/compare";
import { MdOutlineBalance } from "react-icons/md";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [comparisonCount, setComparisonCount] = useState(getComparisonCount());
  

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const isSaunaModel = location.pathname.startsWith("/sauna/");

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

 useEffect(() => { 
  const refreshComparison = () => { 
      setComparisonCount(getComparisonCount()); 
    };

   refreshComparison(); 
   return subscribeToComparison(refreshComparison); 
  }, []);
  

  return (
    <>
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300 ease-in-out 
        ${isSaunaModel
          ? "h-26 bg-[#1B2017]"
          : scrolled
      ? "h-26 bg-gray/10 backdrop-blur-md border-white/50"
      : "h-26 bg-transparent backdrop-blur-0"
        }
      `}
    >
      <div
        className={`
          absolute bottom-0 left-0 w-full h-[1px]
          transition-opacity duration-300 ease-in-out
          ${scrolled || isSaunaModel ? "opacity-100 delay-150 bg-white/20" : "opacity-0"}
        `}
      />

      <div className="container mx-auto px-4 relative flex items-center justify-between">
  

    <a href="/" className="relative top-3 left-[50px]">
      <img src={navLogo} alt="Leil Saunas" className="w-auto h-12 lg:h-auto" />
    </a>

    <div className="relative top-3 right-[50px] flex items-center gap-3">
     <MenuButton menuOpen={menuOpen} onClick={() => setMenuOpen((prev) => !prev)}/>
      <button type="button" onClick={() => navigate("/compare")} className="relative w-11 h-11 hover:bg-[#E6ECD9] rounded-full border border-white/40 text-[#313C2B] flex items-center justify-center hover:text-[#313C2B] transition-all duration-300 cursor-pointer">
        <MdOutlineBalance className="w-5 h-5"/>
        {comparisonCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-[#778658] text-white text-[9px] leading-none flex items-center justify-center border border-[#1B2017]">{comparisonCount}</span>
        )}
      </button>
    </div>

    </div>
   </nav>
      <OpenedMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)}/>
    </>
  );
}