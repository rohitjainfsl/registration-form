import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, GraduationCap } from "lucide-react";
import Logo from "../assets/fsl logo.png"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Courses", href: "#courses" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Placements", href: "#placements" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card bg-card/80 backdrop-blur-xl border-b border-border"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-1 md:px-8">
        <a href="#home" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
        <div className="w-20 h-20"><img src={Logo} alt="" /></div>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Book Free Demo
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border bg-card px-4 pb-4"
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-primary px-5 py-2 text-center text-sm font-semibold text-primary-foreground"
          >
            Book Free Demo
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
