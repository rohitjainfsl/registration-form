import { useState, useEffect } from "react";
import { Menu, X, Phone, LogIn, LogOut } from "lucide-react";
import bundledLogo from "@/assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import LoginPage from "@/pages/Login";
import { useAdminContext } from "@/Context/Admincontext";

// Use public images to allow Vercel to serve retina variants from /public/images/
const logoSrc = "/images/logo.png";
const logoSrcSet = "/images/logo@2x.png 2x, /images/logo.png 1x";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Placements", href: "#placements" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Life at FSL", href: "/lifeatfsl" },
  { label: "Career", href: "/career" },
  { label: "Contact", href: "#enquiry" },
];

const enrollButtonClasses =
  "px-5 py-2.5 rounded-lg text-sm font-semibold text-primary-foreground gradient-brand hover:opacity-90 transition-all duration-200 hover:shadow-lg hover:scale-105";

const loginButtonClasses =
  "px-4 py-2.5 rounded-lg text-sm font-semibold border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-200 flex items-center gap-2";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, role, logout } = useAdminContext();
  const isStudentLoggedIn = isAuthenticated && role === "student";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (hash: string) => {
    if (!hash || !hash.startsWith("#")) return;
    requestAnimationFrame(() => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate(`/${href}`);
        return;
      }
      scrollToSection(href);
      return;
    }
    navigate(href);
  };

  const handleLogoClick = () => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAuthAction = async () => {
    setMobileOpen(false);

    if (isStudentLoggedIn) {
      await logout();
      setLoginOpen(false);
      navigate("/");
      return;
    }

    setLoginOpen(true);
  };

  // Auto-open login when navigation state requests it (e.g., after registration)
  useEffect(() => {
    if ((location.state as { openLogin?: boolean } | null)?.openLogin) {
      setLoginOpen(true);
      // Clear the state flag so it doesn't reopen on back/forward
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <>
      {loginOpen && <LoginPage onClose={() => setLoginOpen(false)} />}
      {/* Top bar */}
      <div className="bg-brand-blue text-primary-foreground text-sm py-2 px-4 flex items-center justify-center gap-6">
        <a
          href="tel:918824453320"
          className="flex items-center gap-1 hover:text-brand-orange transition-colors duration-200"
        >
          <Phone size={14} />
          +91-8824453320
        </a>
        <span className="text-primary-foreground/50">|</span>
        <a
          href="mailto:rohit@fullstacklearning.com"
          className="hover:text-brand-orange transition-colors duration-200"
        >
          rohit@fullstacklearning.com
        </a>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-400 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-lg"
            : "bg-background shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleLogoClick();
            }}
            className="flex items-center gap-2 group"
          >
            <img
              src={logoSrc}
              srcSet={logoSrcSet}
              alt="FullStack Learning Logo"
              loading="eager"
              decoding="async"
              style={{ imageRendering: "auto" }}
              onError={(e) => {
                const t = e.currentTarget as HTMLImageElement;
                if (!t.dataset.fallback) {
                  t.src = bundledLogo;
                  t.removeAttribute("srcset");
                  t.dataset.fallback = "1";
                }
              }}
              className="h-[68px] sm:h-[70px] md:h-[80px] lg:h-[90px] xl:h-[87px] w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="relative px-2 py-2 text-sm font-medium text-foreground/80 hover:text-brand-blue transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand-orange after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}

            {/* Updated Enroll Now Button */}
            {!isStudentLoggedIn && (
              <a
                href="/register"
                className={`ml-4 ${enrollButtonClasses}`}
              >
                Enroll Now
              </a>
            )}
            <button
              type="button"
              onClick={handleAuthAction}
              className={loginButtonClasses}
              aria-label={isStudentLoggedIn ? "Log out" : "Go to login"}
            >
              {isStudentLoggedIn ? <LogOut size={16} /> : <LogIn size={16} />}
              {isStudentLoggedIn ? "Logout" : "Login"}
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-brand-blue hover:bg-brand-blue-light transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 bg-background border-t border-border ${
            mobileOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-4 py-3 rounded-lg text-sm font-medium text-foreground/80 hover:text-brand-blue hover:bg-brand-blue-light transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}

            {/* Updated Enroll Now Button */}
            {!isStudentLoggedIn && (
              <a
                href="/register"
                className={`mt-2 w-full text-center ${enrollButtonClasses}`}
              >
                Enroll Now
              </a>
            )}
            <button
              type="button"
              onClick={handleAuthAction}
              className={`mt-2 w-full justify-center ${loginButtonClasses}`}
              aria-label={isStudentLoggedIn ? "Log out" : "Go to login"}
            >
              {isStudentLoggedIn ? <LogOut size={16} /> : <LogIn size={16} />}
              {isStudentLoggedIn ? "Logout" : "Login"}
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
