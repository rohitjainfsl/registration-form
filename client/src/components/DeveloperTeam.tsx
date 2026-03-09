import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Layers,
  Globe,
  Sparkles,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

const devs = [
  {
    name: "Rohit Jain",
    image: "/images/Rohit.png",
    role: "Senior Developer",
    badge: "Team Lead",
    desc: "Leads the development team, architecting features and mentoring engineers.",
    skills: ["Architecture", "Mentoring", "System Design"],
    info: [
      { icon: Github, url: "https://github.com/rohitjainfsl" },
      { icon: Linkedin, url: "https://linkedin.com/in/entrep-rohit" },
      { icon: Mail, url: "rohit@fullstacklearning.com" },
    ],
  },
  {
    name: "Anant Tiwari",
    image: "/images/Anant.png",
    role: "Full Stack Developer",
    desc: "Works across frontend and backend to deliver user-focused features.",
    skills: ["C#", "Node.js", "SQL", "Mongo"],
    info: [
      { icon: Github, url: "https://github.com/ANANTTIWARI01" },
      {
        icon: Linkedin,
        url: "https://www.linkedin.com/in/anant-tiwari-5847042ba/",
      },
    ],
  },
  {
    name: "Dheeraj Jangid",
    image: "/images/Dheeraj.png",
    role: "Full Stack Developer",
    desc: "Builds APIs, integrations and ensures performant server-side logic.",
    skills: ["APIs", "DevOps", "Performance"],
    info: [
      { icon: Github, url: "https://github.com/dheeraj1566" },
      { icon: Linkedin, url: "https://www.linkedin.com/in/dheeraj-jangid/" },
    ],
  },
  {
    name: "Akshat Sharma",
    image: "/images/Akshat.png",
    role: "Full Stack Developer",
    desc: "Focuses on UI/UX improvements and smooth client-side experiences.",
    skills: ["UI/UX", "Animation", "Accessibility"],
    info: [
      { icon: Github, url: "https://github.com/akshat1803" },
      {
        icon: Linkedin,
        url: "https://www.linkedin.com/in/akshat-sharma-8170b5287/",
      },
    ],
  },
];

function TeamAvatar({ name, image, size = 56, isLead = false }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative">
      <div
        style={{
          width: size,
          height: size,
          backgroundImage: image && !imgError ? `url(${image})` : "none",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className={`flex items-center justify-center rounded-2xl shadow-md ring-1 ring-border/40 ${
          isLead ? "gradient-brand" : "gradient-brand-reverse"
        } font-display font-bold tracking-wider overflow-hidden bg-muted`}
        onError={() => setImgError(true)}
      >
        {(!image || imgError) && (
          <span
            style={{ fontSize: size * 0.35 }}
            className="text-primary-foreground"
          >
            {initials}
          </span>
        )}
      </div>

      {isLead && (
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-primary-foreground" />
        </div>
      )}
    </div>
  );
}

function SocialIcon({ info }) {
  return (
    <>
      {info.map((social, index) => {
        const Icon = social.icon;
        const href = Icon === Mail ? `mailto:${social.url}` : social.url;
        return (
          <a
            key={index}
            href={href}
            title={Icon.displayName}
            className="w-9 h-9 rounded-xl border border-border/30 bg-white/6 hover:gradient-brand hover:text-primary-foreground flex items-center justify-center text-muted-foreground transition-all duration-300"
          >
            <Icon className="w-4 h-4" />
          </a>
        );
      })}
    </>
  );
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function DeveloperTeam() {
  const lead = devs[0];
  const members = devs.slice(1);

  return (
    <section className="relative min-h-screen py-24 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />

      <div className="container relative mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-orange-light text-brand-orange text-sm font-semibold mb-4">
            Engineering Team
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            The people behind{" "}
            <span className="text-gradient-brand">Full Stack Learning</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A small, focused team building features, supporting students, and
            ensuring platform reliability.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <div className="relative p-8 md:p-10 rounded-3xl overflow-hidden bg-card/50 ring-1 ring-border/30 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <TeamAvatar
                  name={lead.name}
                  image={lead.image}
                  size={88}
                  isLead
                />

                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {lead.name}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4">
                    {lead.role}
                  </p>

                  <p className="text-foreground leading-relaxed max-w-xl">
                    {lead.desc}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-6">
                    {lead.skills?.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg bg-secondary/10 text-xs font-medium text-muted-foreground border border-border/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex md:flex-col gap-2">
                  <SocialIcon info={lead.info} />
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {members.map((dev) => (
              <motion.div key={dev.name} variants={itemVariants}>
                <div className="relative h-full p-6 ring-1 ring-border/30 rounded-2xl shadow-sm">
                  <div className="flex items-start justify-between mb-5">
                    <TeamAvatar name={dev.name} image={dev.image} size={52} />

                    <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                  </div>

                  <h4 className="text-lg font-semibold text-foreground mb-1">
                    {dev.name}
                  </h4>

                  <p className="text-sm text-muted-foreground mb-4">
                    {dev.role}
                  </p>

                  <p className="text-sm text-muted-foreground mb-5">
                    {dev.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {dev.skills?.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md bg-secondary/10 text-xs text-muted-foreground border border-border/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-5 pt-5 border-t border-border/30">
                    <SocialIcon info={dev.info} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
