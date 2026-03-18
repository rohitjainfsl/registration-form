import { Phone, Mail, MapPin, ArrowRight, Linkedin } from "lucide-react";
import { SiFacebook, SiX, SiInstagram, SiYoutube } from "@icons-pack/react-simple-icons";
import { useLocation } from "react-router-dom";
import bundledLogo from "@/assets/logo.png";
import { useFooter } from "@/hooks/useFooter";
import { fallbackFooter } from "@/lib/api/footer";

const logoSrc = "/images/logo.png";
const logoSrcSet = "/images/logo@2x.png 2x, /images/logo.png 1x";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Facebook: SiFacebook,
  X: SiX,
  Instagram: SiInstagram,
  Youtube: SiYoutube,
  LinkedIn: Linkedin,
  Linkedin: Linkedin,
};

const scrollTo = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
};

export default function Footer() {
  const { data: footerData = fallbackFooter } = useFooter();
  const footer = footerData ?? fallbackFooter;
  const location = useLocation();
  const isRegistrationPage = location.pathname === "/register";

  return (
    <footer className="bg-foreground text-primary-foreground">
      {!isRegistrationPage && (
        <div className="gradient-brand py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-3">
              {footer.ctaTitle}
            </h2>
            <p className="text-primary-foreground/80 mb-6 text-lg">
              {footer.ctaSubtitle}
            </p>
            <a
              href={footer.ctaButtonHref}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(footer.ctaButtonHref);
              }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-primary-foreground text-brand-blue hover:bg-primary-foreground/90 transition-all duration-300 hover:scale-105 shadow-xl"
            >
              {footer.ctaButtonLabel}
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img
              src={footer.logo}
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
              {footer.description}
            </p>
            <div className="flex items-center gap-3">
              {footer.socials.map(({ icon, href, label, _id }) => {
                const Icon = iconMap[icon] || Linkedin;
                return (
                  <a
                    key={_id || label}
                    href={href}
                    aria-label={label}
                    title={label}
                    className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-brand-orange hover:scale-110 transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {footer.sections.map((section) => (
            <div key={section._id || section.title}>
              <h4 className="font-bold text-primary-foreground mb-4 pb-2 border-b border-primary-foreground/10">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map(({ label, href, _id }) => (
                  <li key={_id || label}>
                    <a
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(href);
                      }}
                      className="text-primary-foreground/60 text-sm hover:text-brand-orange transition-colors duration-200 flex items-center gap-1 group"
                    >
                      <ArrowRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all duration-200"
                      />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-bold text-primary-foreground mb-4 pb-2 border-b border-primary-foreground/10">
              Contact Us
            </h4>
            <div className="space-y-3">
              <a
                href={`tel:${footer.contact.phone}`}
                className="flex items-start gap-3 text-primary-foreground/60 text-sm hover:text-brand-orange transition-colors group"
              >
                <Phone
                  size={16}
                  className="mt-0.5 flex-shrink-0 group-hover:text-brand-orange"
                />
                {footer.contact.phone}
              </a>
              <a
                href={`mailto:${footer.contact.email}`}
                className="flex items-start gap-3 text-primary-foreground/60 text-sm hover:text-brand-orange transition-colors group"
              >
                <Mail
                  size={16}
                  className="mt-0.5 flex-shrink-0 group-hover:text-brand-orange"
                />
                {footer.contact.email}
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/60 text-sm">
                <MapPin
                  size={16}
                  className="mt-0.5 flex-shrink-0 text-brand-orange"
                />
                <a
                  href={footer.contact.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    {footer.contact.address.split("\n").map((line, idx) => (
                      <span key={idx}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/40">
          <span>
            © {new Date().getFullYear()} Full Stack Learning. All rights
            reserved.
          </span>
          <div className="flex items-center gap-4">
            {footer.bottomLinks.map(({ label, href, _id }) => (
              <a
                key={_id || label}
                href={href}
                className="hover:text-primary-foreground/70 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
