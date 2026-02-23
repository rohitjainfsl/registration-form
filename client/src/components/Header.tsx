import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import bundledLogo from "@/assets/logo.png";

// Use public images to allow Vercel to serve retina variants from /public/images/
const logoSrc = "/images/logo.png";
const logoSrcSet = "/images/logo@2x.png 2x, /images/logo.png 1x";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Placements", href: "#placements" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#enquiry" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleEnrollClick = () => {
    window.open(
      "https://registration-form-1-mbw5.onrender.com/registration",
      "_blank"
    );
  };

  return (
    <>
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
          href="mailto:info@fullstacklearning.com"
          className="hover:text-brand-orange transition-colors duration-200"
        >
          info@fullstacklearning.com
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
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
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
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-brand-blue transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand-orange after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}

            {/* Updated Enroll Now Button */}
            <a
              href="https://registration-form-1-mbw5.onrender.com/registration"
              onClick={(e) => {
                e.preventDefault();
                handleEnrollClick();
              }}
              className="ml-4 px-5 py-2.5 rounded-lg text-sm font-semibold text-primary-foreground gradient-brand hover:opacity-90 transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              Enroll Now
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-brand-blue hover:bg-brand-blue-light transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 bg-background border-t border-border ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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
            <a
              href="https://registration-form-1-mbw5.onrender.com/registration"
              onClick={(e) => {
                e.preventDefault();
                handleEnrollClick();
              }}
              className="mt-2 px-5 py-3 rounded-lg text-sm font-semibold text-center text-primary-foreground gradient-brand hover:opacity-90 transition-all duration-200"
            >
              Enroll Now
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}