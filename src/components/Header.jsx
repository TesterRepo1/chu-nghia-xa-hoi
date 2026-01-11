import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BookOpen, Sparkles, Maximize2 } from "lucide-react";

export const Header = ({ onTogglePage, currentPage }) => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#banner");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const toggleButtonLabel = currentPage === 'notebook' ? "Khám phá Chi tiết" : "Về Trang chủ";
  const ToggleIcon = currentPage === 'notebook' ?  Sparkles : BookOpen;

  const navLinks = [
    { href: "#banner", label: "Trang chủ" },
    { href: "#introduction", label: "Tổng quan CNXH" },
    { href: "#book-section", label: "Hình mẫu sổ tay" },
    { href: "#characteristics", label: "Điều kiện ra đời & Đặc trưng bản chất" },
    { href: "#transition", label: "Thời kỳ quá độ" },
    { href: "#technology-banner", label: "Công nghệ" },
    { href: "#about-us", label: "Đội ngũ phát triển" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      if (currentPage === 'notebook') {
        const scrollY = window.scrollY;
        let current = "#banner";
        navLinks.forEach(({ href }) => {
          const section = document.querySelector(href);
          if (section) {
            const sectionTop = section.offsetTop - 120;
            if (scrollY >= sectionTop) current = href;
          }
        });
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, navLinks]);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-red-900/95 backdrop-blur-xl shadow-2xl shadow-red-950/50" 
          : "bg-gradient-to-r from-red-900 via-red-800 to-red-900"
      } border-b-2 border-yellow-500/50`}
    >
      {/* Container chuyển sang Grid để canh giữa tuyệt đối */}
      <div className="max-w-[1920px] mx-auto px-6 lg:px-8 py-3 grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-center">
        
        {/* 1. Logo Section - Canh trái (justify-self-start) */}
        <motion.div
          className="flex items-center gap-4 cursor-pointer select-none group justify-self-start"
          onClick={() => {
            if(currentPage !== 'notebook') onTogglePage();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-30 group-hover:opacity-50 transition-opacity animate-pulse"></div>
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                <polygon
                  points="50,5 61,40 98,40 68,62 79,97 50,75 21,97 32,62 2,40 39,40"
                  fill="#FBBF24"
                  stroke="#FCD34D"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col leading-tight whitespace-nowrap">
            <h1 className="text-lg md:text-xl font-bold text-yellow-400 tracking-wide">
              Chủ nghĩa Mác - Lênin
            </h1>
            <span className="text-xs text-yellow-200/70 tracking-wider uppercase">
              CNXH & Thời kỳ quá độ
            </span>
          </div>
        </motion.div>

        {/* 2. Desktop Navigation - Canh giữa tuyệt đối (justify-self-center) */}
        <nav className="hidden lg:flex justify-self-center px-4">
          {currentPage === 'notebook' && (
            <ul className="flex items-center gap-8 xl:gap-10">
              {navLinks.map(({ href, label }) => (
                <li key={href} className="list-none flex-shrink-0">
                  <motion.a
                    href={href}
                    className={`relative px-2 py-2 transition-all duration-300 whitespace-nowrap block ${
                      activeSection === href 
                        ? "text-yellow-400 font-bold" 
                        : "text-yellow-100/80 hover:text-yellow-400"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-base font-medium">{label}</span>
                    {activeSection === href && (
                      <motion.div
                        className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full bg-yellow-400"
                        layoutId="activeIndicator"
                      />
                    )}
                  </motion.a>
                </li>
              ))}
            </ul>
          )}
        </nav>

        {/* 3. Right Side (Buttons/Menu) - Canh phải (justify-self-end) */}
        <div className="flex items-center gap-3 whitespace-nowrap justify-self-end">
          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {currentPage === 'notebook' && (
              <motion.button
                onClick={() => navigate('/fullscreen-book')}
                className="flex items-center gap-2 bg-red-800 hover:bg-red-700 text-yellow-400 px-4 py-2.5 rounded-xl transition-all border border-yellow-500/30 hover:border-yellow-500/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Maximize2 className="w-4 h-4" />
                <span className="text-sm font-medium">Xem 3D</span>
              </motion.button>
            )}

            <motion.button
              onClick={onTogglePage}
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-red-900 font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-yellow-500/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm">{toggleButtonLabel}</span>
              <ToggleIcon className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2.5 rounded-xl bg-red-800/50 hover:bg-red-700/50 text-yellow-400 transition"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="lg:hidden bg-red-900/98 backdrop-blur-xl border-t border-yellow-500/20"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <ul className="flex flex-col px-6 py-6 space-y-1">
              {currentPage === 'notebook' && navLinks.map(({ href, label }) => (
                <li key={href} className="list-none">
                  <a
                    href={href}
                    className={`block w-full text-base font-medium transition-all px-4 py-3 rounded-xl ${
                      activeSection === href 
                        ? "text-yellow-400 bg-yellow-400/10" 
                        : "text-yellow-100/80 hover:text-yellow-400 hover:bg-red-800/50"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="pt-4 space-y-3">
                {currentPage === 'notebook' && (
                  <button 
                    onClick={() => {
                      navigate('/fullscreen-book');
                      setOpen(false);
                    }}
                    className="w-full bg-red-800 text-yellow-400 font-medium px-6 py-3 rounded-xl flex items-center justify-center gap-2 border border-yellow-500/30"
                  >
                    <Maximize2 size={18} /> Xem Sổ Tay 3D
                  </button>
                )}
                <button 
                  onClick={() => {
                    onTogglePage();
                    setOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  {toggleButtonLabel} <ToggleIcon size={18} />
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;