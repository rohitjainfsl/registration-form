import { motion } from "framer-motion";

const companies = [
  "Infosys", "TCS", "Wipro", "Accenture", "HCL", "Cognizant",
  "Tech Mahindra", "Capgemini", "Mindtree", "Mphasis", "LTIMindtree", "Persistent",
];

const CompaniesSection = () => {
  return (
    <section className="section-padding bg-muted/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Our Network</span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">
            Where Our Students <span className="gradient-text">Work</span>
          </h2>
        </motion.div>

        {/* Scrolling logos */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/80 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/80 to-transparent z-10" />
          <div className="flex animate-slide-logos">
            {[...companies, ...companies].map((company, i) => (
              <div
                key={i}
                className="flex-shrink-0 mx-6 flex items-center justify-center rounded-xl border border-border bg-card px-8 py-5 min-w-[160px] grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-md"
              >
                <span className="font-display font-bold text-lg text-muted-foreground hover:text-primary transition-colors">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
