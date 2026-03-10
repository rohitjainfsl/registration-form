import { useState, useEffect, FormEvent } from "react";
import { Menu, X, Phone, LogIn } from "lucide-react";
import bundledLogo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

// Use public images to allow Vercel to serve retina variants from /public/images/
const logoSrc = "/images/logo.png";
const logoSrcSet = "/images/logo@2x.png 2x, /images/logo.png 1x";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Placements", href: "#placements" },
  { label: "Testimonials", href: "#testimonials" },
    { label: "LifeAtFSL", href: "/lifeatfsl" },
  { label: "Contact", href: "#enquiry" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginDrawerOpen, setLoginDrawerOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const navigate=useNavigate();

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



  const openLoginDrawer = () => {
    setMobileOpen(false);
    setLoginDrawerOpen(true);
    setLoginError("");
    setLoginSuccess("");
  };

  const closeLoginDrawer = () => {
    setLoginDrawerOpen(false);
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError("");
    setLoginSuccess("");

    if (!loginEmail || !loginPassword) {
      setLoginError("Please enter both email and password.");
      return;
    }

    try {
      const apiBase = import.meta.env.VITE_API_URL || "https://registration-form-17dw.onrender.com";
      const res = await fetch(`${apiBase}/api/auth/studentLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.message || "Invalid email or password.");
        return;
      }

      setLoginSuccess(data.message || "Login successful");
      setLoginEmail("");
      setLoginPassword("");

      setTimeout(() => {
        setLoginDrawerOpen(false);
        window.location.href = "/";
      }, 400);
    } catch (error) {
      console.error("Login submit failed", error);
      setLoginError("Server error. Please try again later.");
    }
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
          href="mailto:rohit@fullstacklearning.com"
          className="hover:text-brand-orange transition-colors duration-200"
        >
          rohit@fullstacklearning.com
        </a>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-400 ${scrolled
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
              href="/register"
              className="ml-4 px-5 py-2.5 rounded-lg text-sm font-semibold text-primary-foreground gradient-brand hover:opacity-90 transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              Enroll Now
            </a>
            <button
              type="button"
              onClick={openLoginDrawer}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-200 flex items-center gap-2"
              aria-label="Open login drawer"
            >
              <LogIn size={16} />
              Login
            </button>
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
          className={`md:hidden overflow-hidden transition-all duration-300 bg-background border-t border-border ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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
              href="/register"
              className="mt-2 px-5 py-3 rounded-lg text-sm font-semibold text-center text-primary-foreground gradient-brand hover:opacity-90 transition-all duration-200"
            >
              Enroll Now
            </a>
            <button
              type="button"
              onClick={openLoginDrawer}
              className="mt-2 px-5 py-3 rounded-lg text-sm font-semibold text-center border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
              aria-label="Open login drawer"
            >
              <LogIn size={16} />
              Login
            </button>
          </nav>
        </div>
      </header>

      <Sheet open={loginDrawerOpen} onOpenChange={setLoginDrawerOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Student Login</SheetTitle>
            <SheetDescription>
              Enter your email and password to continue.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
            {loginError ? (
              <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                {loginError}
              </div>
            ) : null}
            {loginSuccess ? (
              <div className="rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-700">
                {loginSuccess}
              </div>
            ) : null}
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <SheetFooter className="gap-2 sm:gap-3">
              <Button type="button" variant="outline" onClick={closeLoginDrawer}>
                Cancel
              </Button>
              <Button type="submit">Login</Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
