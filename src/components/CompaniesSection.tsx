import { useRef, useEffect, useState } from "react";

const companies = [
  "TCS", "Infosys", "Wipro", "HCL Technologies", "Tech Mahindra",
  "Capgemini", "Accenture", "Cognizant", "IBM", "Microsoft",
  "Amazon", "Deloitte", "Mphasis", "L&T Technology", "Persistent",
  "Zensar", "Hexaware", "Mindtree", "Freshworks", "Zoho",
];

const CompanyBadge = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center px-6 py-4 mx-3 bg-card rounded-xl border border-border shadow-sm hover:shadow-lg hover:border-brand-blue/40 hover:-translate-y-1 transition-all duration-300 min-w-[140px] group cursor-default">
    <span className="text-sm font-semibold text-muted-foreground group-hover:text-brand-blue transition-colors duration-200 whitespace-nowrap">
      {name}
    </span>
  </div>
);

export default function CompaniesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const doubled = [...companies, ...companies];

  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-orange-light text-brand-orange text-sm font-semibold mb-4">
            Companies Hiring Our Students
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Our Students Work At <span className="text-gradient-brand">Top Companies</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our graduates are working at the world's leading technology companies
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-1 w-12 rounded-full bg-brand-orange" />
            <div className="h-1 w-4 rounded-full bg-brand-blue" />
          </div>
        </div>

        {/* Marquee Row 1 */}
        <div className="relative mb-4">
          <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee">
            {doubled.map((c, i) => (
              <CompanyBadge key={`${c}-${i}`} name={c} />
            ))}
          </div>
        </div>

        {/* Marquee Row 2 - reverse */}
        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex" style={{ animation: "marquee 25s linear infinite reverse" }}>
            {doubled.slice().reverse().map((c, i) => (
              <CompanyBadge key={`rev-${c}-${i}`} name={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
