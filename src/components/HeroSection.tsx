import { motion } from "framer-motion";
import { ArrowRight, Play, Code, Database, Layout, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

import bg1 from "@/assets/bg1.jpg";
import bg2 from "@/assets/bg2.jpg";
import bg3 from "@/assets/bg3.png";
import bg4 from "@/assets/bg4.jpg";

const IMAGES = [bg1, bg2, bg3, bg4];

const floatingIcons = [
  { Icon: Code, className: "top-[20%] left-[8%] w-10 h-10 text-secondary", delay: 0 },
  { Icon: Database, className: "top-[60%] left-[5%] w-8 h-8 text-primary", delay: 1 },
  { Icon: Layout, className: "top-[30%] right-[6%] w-9 h-9 text-accent", delay: 0.5 },
  { Icon: Sparkles, className: "bottom-[20%] right-[10%] w-8 h-8 text-secondary", delay: 1.5 },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % IMAGES.length);
        setFade(true);
      }, 600);

    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      // style={{ background: "var(--hero-gradient)" }}
    >
      
      {/* Background Image Slider */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${IMAGES[current]})`,
        }}
      />

      {/* Optional overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Floating shapes */}
      <div className="floating-shape w-72 h-72 bg-primary top-[-5%] left-[-5%]" />
      <div className="floating-shape w-96 h-96 bg-secondary bottom-[-10%] right-[-8%]" style={{ animationDelay: "2s" }} />
      <div className="floating-shape w-48 h-48 bg-accent top-[40%] right-[20%]" style={{ animationDelay: "4s" }} />

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, className, delay }, i) => (
        <motion.div
          key={i}
          className={`absolute hidden lg:block ${className}`}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay }}
        >
          <Icon className="w-full h-full opacity-30" />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center px-4 pt-24 pb-16 md:px-8">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-urgent/20 px-4 py-1.5 text-xs font-semibold text-urgent mb-6">
            <span className="w-2 h-2 rounded-full bg-urgent animate-pulse" />
          </span>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-primary-foreground mb-6">
            Become A{" "}
            <span className="text-secondary">Full Stack Developer</span>
          </h1>

          <p className="text-lg text-primary-foreground/70 max-w-lg mb-8">
            Placement-focused training programs designed by industry leaders. Master in-demand skills and land your dream tech job with 100% placement assistance.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#courses"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
            >
              Explore Courses <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl glass-card px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-white/10 transition-all"
            >
              <Play className="w-4 h-4" /> Book Free Demo
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-8">
            {[
              { value: "500+", label: "Students Trained" },
              { value: "95%", label: "Placement Rate" },
              { value: "100+", label: "Hiring Partners" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-xs text-primary-foreground/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right image (unchanged, empty as in your code) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative hidden lg:block"
        >
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

// import { motion } from "framer-motion";
// import { ArrowRight, Play, Code, Database, Layout, Sparkles } from "lucide-react";
// import heroImage from "@/assets/hero-image.jpg";

// const floatingIcons = [
//   { Icon: Code, className: "top-[20%] left-[8%] w-10 h-10 text-secondary", delay: 0 },
//   { Icon: Database, className: "top-[60%] left-[5%] w-8 h-8 text-primary", delay: 1 },
//   { Icon: Layout, className: "top-[30%] right-[6%] w-9 h-9 text-accent", delay: 0.5 },
//   { Icon: Sparkles, className: "bottom-[20%] right-[10%] w-8 h-8 text-secondary", delay: 1.5 },
// ];

// const HeroSection = () => {
//   return (
//     <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
//       {/* Floating shapes */}
//       <div className="floating-shape w-72 h-72 bg-primary top-[-5%] left-[-5%]" />
//       <div className="floating-shape w-96 h-96 bg-secondary bottom-[-10%] right-[-8%]" style={{ animationDelay: "2s" }} />
//       <div className="floating-shape w-48 h-48 bg-accent top-[40%] right-[20%]" style={{ animationDelay: "4s" }} />

//       {/* Floating icons */}
//       {floatingIcons.map(({ Icon, className, delay }, i) => (
//         <motion.div
//           key={i}
//           className={`absolute hidden lg:block ${className}`}
//           animate={{ y: [0, -15, 0] }}
//           transition={{ duration: 4, repeat: Infinity, delay }}
//         >
//           <Icon className="w-full h-full opacity-30" />
//         </motion.div>
//       ))}

//       <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center px-4 pt-24 pb-16 md:px-8">
//         {/* Left content */}
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.7 }}
//         >
//           <span className="inline-flex items-center gap-2 rounded-full bg-urgent/20 px-4 py-1.5 text-xs font-semibold text-urgent mb-6">
//             <span className="w-2 h-2 rounded-full bg-urgent animate-pulse" />
//             {/* Limited Seats Available — Enroll Now! */}
//           </span>

//           <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-primary-foreground mb-6">
//             Become A{" "}
//             <span className="text-secondary">Full Stack Developer</span>
//           </h1>

//           <p className="text-lg text-primary-foreground/70 max-w-lg mb-8">
//             Placement-focused training programs designed by industry leaders. Master in-demand skills and land your dream tech job with 100% placement assistance.
//           </p>

//           <div className="flex flex-wrap gap-4">
//             <a
//               href="#courses"
//               className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
//             >
//               Explore Courses <ArrowRight className="w-4 h-4" />
//             </a>
//             <a
//               href="#contact"
//               className="inline-flex items-center gap-2 rounded-xl glass-card px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-white/10 transition-all"
//             >
//               <Play className="w-4 h-4" /> Book Free Demo
//             </a>
//           </div>

//           {/* Stats */}
//           <div className="mt-12 flex gap-8">
//             {[
//               { value: "500+", label: "Students Trained" },
//               { value: "95%", label: "Placement Rate" },
//               { value: "100+", label: "Hiring Partners" },
//             ].map((stat) => (
//               <div key={stat.label}>
//                 <p className="font-display text-2xl font-bold text-primary-foreground">{stat.value}</p>
//                 <p className="text-xs text-primary-foreground/60">{stat.label}</p>
//               </div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Right image */}
//         <motion.div
//           initial={{ opacity: 0, x: 40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.7, delay: 0.2 }}
//           className="relative hidden lg:block"
//         >
          

//           {/* Floating badge */}
//           {/* <motion.div
//             animate={{ y: [0, -8, 0] }}
//             transition={{ duration: 3, repeat: Infinity }}
//             className="absolute -bottom-4 -left-4 glass-card rounded-xl px-5 py-3 shadow-xl"
//           >
//             <p className="text-xs font-semibold text-primary-foreground">🎯 350+ Students Placed</p>
//           </motion.div> */}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
