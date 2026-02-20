import { GraduationCap, ArrowUp } from "lucide-react";

const footerLinks = {
  "Quick Links": ["Home", "About Us", "Courses", "Placements", "Contact"],
  "Courses": ["Full Stack Developer", "MERN Stack", ".NET Developer", "UI/UX Designer", "Data Analytics", "Digital Marketing"],
};

const Footer = () => {
  return (
    <footer className="bg-footer text-footer-foreground bg-[#1e8ebe] text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 md:px-8 ">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-display text-xl font-bold text-primary-foreground mb-4">
              <GraduationCap className="w-6 h-6" />
              Full Stack<span className="text-secondary">Learning</span>
            </div>
            <p className="text-sm text-footer-foreground/70 leading-relaxed">
              Empowering careers through industry-focused tech training. Join 500+ students who've transformed their futures with us.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              {["LinkedIn", "Twitter", "Instagram", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-footer-foreground/70 hover:bg-[#f26b3b] hover:text-white transition-all"
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-bold text-primary-foreground mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-footer-foreground/70 hover:text-[#f26b3b]">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-footer-foreground/70">
              <p>A-20, Murtikala Colony Gopalpura Bypass<br />Tonk Rd, Jaipur, Rajasthan 302018</p>
              <p>+91 88244 53320</p>
              <p> fullstacklearning.com</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-footer-foreground/50">© 2026 TechNest Academy. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            <ArrowUp className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
