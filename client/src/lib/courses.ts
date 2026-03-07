import { Icon } from "lucide-react";
import { Code2, Server, Layers, Database, Smartphone, Globe } from "lucide-react";

export type Course = {
  icon: Icon;
  title: string;
  duration: string;
  students: string;
  rating: number;
  level: string;
  tags: string[];
  description: string;
  overview?: string;
  fee?: string;
  syllabus?: string[];
  badge: string | null;
  badgeColor: string;
  color: string;
};

export const courses: Course[] = [
  {
    icon: Layers,
    title: "Full Stack Development",
    duration: "6 Months",
    students: "1200+",
    rating: 4.9,
    level: "Beginner to Advanced",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    description: "Complete web development from frontend to backend. Build real-world projects with industry mentors.",
    overview:
      "A comprehensive program covering frontend, backend and deployment. Includes mentorship and real-world projects to build a production-ready portfolio.",
    fee: "₹45,000",
    syllabus: [
      "HTML, CSS, JavaScript, TypeScript",
      "React, State Management, Routing",
      "Node.js, Express, REST APIs",
      "Databases: MongoDB & SQL",
      "Authentication, Testing, Deployment",
    ],
    badge: "Most Popular",
    badgeColor: "bg-brand-orange",
    color: "from-brand-blue to-brand-blue-dark",
  },
  {
    icon: Code2,
    title: "Frontend Development",
    duration: "3 Months",
    students: "850+",
    rating: 4.8,
    level: "Beginner",
    tags: ["HTML", "CSS", "React", "Tailwind"],
    description: "Master modern frontend technologies and create stunning, responsive user interfaces.",
    overview: "Focuses on building pixel-perfect UIs, accessibility and performance with modern tooling.",
    fee: "₹25,000",
    syllabus: ["HTML & CSS fundamentals", "Responsive layouts", "React & Hooks", "Tailwind & UI patterns"],
    badge: "Trending",
    badgeColor: "bg-brand-blue",
    color: "from-brand-orange to-brand-orange-dark",
  },
  {
    icon: Server,
    title: "Backend Development",
    duration: "3 Months",
    students: "620+",
    rating: 4.7,
    level: "Intermediate",
    tags: ["Node.js", "Express", "REST API", "JWT"],
    description: "Build powerful server-side applications, APIs and handle databases like a pro.",
    overview: "Deep dive into server-side concepts, APIs, authentication and scalable architectures.",
    fee: "₹30,000",
    syllabus: ["Node.js & Express", "API design", "Authentication & Security", "Databases & ORMs"],
    badge: "New",
    badgeColor: "bg-green-500",
    color: "from-brand-blue to-brand-orange",
  },
  {
    icon: Database,
    title: "Database Management",
    duration: "2 Months",
    students: "430+",
    rating: 4.6,
    level: "Beginner",
    tags: ["MySQL", "MongoDB", "PostgreSQL", "Redis"],
    description: "Learn SQL & NoSQL databases, query optimization and data modeling techniques.",
    overview: "Covers relational & non-relational databases, indexing, optimization and backup strategies.",
    fee: "₹18,000",
    syllabus: ["SQL fundamentals", "NoSQL concepts", "Indexing & Performance", "Backup & Replication"],
    badge: null,
    badgeColor: "",
    color: "from-brand-blue-dark to-brand-blue",
  },
  {
    icon: Smartphone,
    title: "React Native Mobile",
    duration: "4 Months",
    students: "380+",
    rating: 4.8,
    level: "Intermediate",
    tags: ["React Native", "Expo", "Firebase", "Redux"],
    description: "Build cross-platform mobile apps for iOS and Android using React Native.",
    overview: "Build performant mobile applications, integrate with native modules and deploy to app stores.",
    fee: "₹32,000",
    syllabus: ["React Native basics", "Navigation & State", "Native APIs & Expo", "Publishing & Performance"],
    badge: "Hot",
    badgeColor: "bg-red-500",
    color: "from-brand-orange to-brand-orange-dark",
  },
  {
    icon: Globe,
    title: "DevOps & Cloud",
    duration: "3 Months",
    students: "290+",
    rating: 4.7,
    level: "Advanced",
    tags: ["Docker", "AWS", "CI/CD", "Linux"],
    description: "Deploy and manage applications on cloud platforms with DevOps best practices.",
    overview: "Learn containerization, CI/CD pipelines and fundamentals of cloud providers for production deployments.",
    fee: "₹35,000",
    syllabus: ["Linux basics", "Docker & Containers", "CI/CD", "AWS fundamentals"],
    badge: null,
    badgeColor: "",
    color: "from-brand-blue to-brand-orange",
  },
];

export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
