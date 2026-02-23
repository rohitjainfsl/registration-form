import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight } from "lucide-react";
import bundledLogo from "@/assets/logo.png";

const logoSrc = "/images/logo.png";
const logoSrcSet = "/images/logo@2x.png 2x, /images/logo.png 1x";

const footerLinks = {
  "Quick Links": [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Courses", href: "#courses" },
    { label: "Placements", href: "#placements" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#enquiry" },
  ],
  "Our Courses": [
    { label: "Full Stack Development", href: "#courses" },
    { label: "Frontend Development", href: "#courses" },
    { label: "Backend Development", href: "#courses" },
    { label: "Database Management", href: "#courses" },
    { label: "React Native", href: "#courses" },
    { label: "DevOps & Cloud", href: "#courses" },
  ],
};

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const scrollTo = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* CTA Banner */}
      <div className="gradient-brand py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-3">
            Ready to Start Your Tech Career?
          </h2>
          <p className="text-primary-foreground/80 mb-6 text-lg">
            Join 5000+ students who transformed their lives with FSL
          </p>
          <a
            href="#enquiry"
            onClick={(e) => { e.preventDefault(); scrollTo("#enquiry"); }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-primary-foreground text-brand-blue hover:bg-primary-foreground/90 transition-all duration-300 hover:scale-105 shadow-xl"
          >
            Enroll Now — It's Free to Enquire!
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <img
              src={logoSrc}
              srcSet={logoSrcSet}
              alt="FullStack Learning"
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
              className="h-16 w-auto mb-4"
            />

            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-4">
              FSL is Rajasthan's premier full stack development training institute, helping students launch successful tech careers since 2018.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-brand-orange hover:scale-110 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-primary-foreground mb-4 pb-2 border-b border-primary-foreground/10">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                      className="text-primary-foreground/60 text-sm hover:text-brand-orange transition-colors duration-200 flex items-center gap-1 group"
                    >
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all duration-200" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="font-bold text-primary-foreground mb-4 pb-2 border-b border-primary-foreground/10">
              Contact Us
            </h4>
            <div className="space-y-3">
              <a href="tel:918824453320" className="flex items-start gap-3 text-primary-foreground/60 text-sm hover:text-brand-orange transition-colors group">
                <Phone size={16} className="mt-0.5 flex-shrink-0 group-hover:text-brand-orange" />
                +91-8824453320
              </a>
              <a href="mailto:info@fullstacklearning.com" className="flex items-start gap-3 text-primary-foreground/60 text-sm hover:text-brand-orange transition-colors group">
                <Mail size={16} className="mt-0.5 flex-shrink-0 group-hover:text-brand-orange" />
                info@fullstacklearning.com
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/60 text-sm">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-brand-orange" />
                <span>FullStack Learning Institute,<br />Jaipur, Rajasthan 302001</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/40">
          <span>© {new Date().getFullYear()} FullStack Learning. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary-foreground/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground/70 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-foreground/70 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

 
