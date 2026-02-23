import { Code, Layers, PenTool, BarChart3, Terminal, Megaphone, Monitor, Palette } from "lucide-react";

export interface Course {
  title: string;
  slug: string;
  desc: string;
  detailedDesc?: string;
  duration: string;
  category: string;
  Icon: any;
  features?: string[];
  syllabus?: string[];
  price?: string;
  rating?: number;
  students?: number;
}

export const courses: Course[] = [
  {
    title: "Full Stack Developer",
    slug: "full-stack-developer",
    desc: "Master frontend & backend development with modern frameworks and deployment strategies.",
    detailedDesc: "This comprehensive course covers everything from HTML, CSS, and JavaScript fundamentals to advanced topics like React, Node.js, databases, and cloud deployment. You'll build real-world projects and learn industry best practices for full-stack development.",
    duration: "6 Months",
    category: "Development",
    Icon: Code,
    features: [
      "Frontend: React, Vue.js, Angular",
      "Backend: Node.js, Express, Python",
      "Databases: MongoDB, PostgreSQL",
      "Deployment: AWS, Vercel, Docker",
      "Version Control: Git & GitHub",
      "Testing: Jest, Cypress"
    ],
    syllabus: [
      "Month 1: HTML, CSS, JavaScript Basics",
      "Month 2: React & Frontend Frameworks",
      "Month 3: Node.js & Backend Development",
      "Month 4: Database Design & Management",
      "Month 5: API Development & Integration",
      "Month 6: Deployment & DevOps Basics"
    ],
    price: "₹50,000",
    rating: 4.8,
    students: 1250
  },
  {
    title: "MERN Stack",
    slug: "mern-stack",
    desc: "Build powerful web apps with MongoDB, Express, React & Node.js from scratch.",
    detailedDesc: "Dive deep into the MERN stack ecosystem. Learn to create scalable web applications using MongoDB for data storage, Express.js for server-side logic, React for dynamic UIs, and Node.js as the runtime environment.",
    duration: "5 Months",
    category: "Development",
    Icon: Layers,
    features: [
      "MongoDB for NoSQL databases",
      "Express.js for server-side development",
      "React for modern UI components",
      "Node.js for backend runtime",
      "RESTful API design",
      "Authentication & Security"
    ],
    syllabus: [
      "Month 1: JavaScript & Node.js Fundamentals",
      "Month 2: MongoDB & Database Design",
      "Month 3: Express.js & API Development",
      "Month 4: React Frontend Development",
      "Month 5: Full-Stack Project & Deployment"
    ],
    price: "₹45,000",
    rating: 4.9,
    students: 980
  },
  {
    title: ".NET Developer",
    slug: "dotnet-developer",
    desc: "Enterprise-grade application development with C#, ASP.NET Core and Azure cloud.",
    detailedDesc: "Master Microsoft's .NET ecosystem for building robust enterprise applications. Learn C# programming, ASP.NET Core for web development, Entity Framework for data access, and Azure cloud services for deployment.",
    duration: "5 Months",
    category: "Development",
    Icon: Monitor,
    features: [
      "C# Programming Language",
      "ASP.NET Core MVC & Web API",
      "Entity Framework & LINQ",
      "Azure Cloud Services",
      "SQL Server & Database Design",
      "Microservices Architecture"
    ],
    syllabus: [
      "Month 1: C# & .NET Fundamentals",
      "Month 2: ASP.NET Core Web Development",
      "Month 3: Database Integration with EF",
      "Month 4: Azure Cloud & Deployment",
      "Month 5: Advanced Topics & Project"
    ],
    price: "₹55,000",
    rating: 4.7,
    students: 750
  },
  {
    title: "UI/UX Designer",
    slug: "ui-ux-designer",
    desc: "Create stunning user experiences with Figma, design systems and user research methodologies.",
    detailedDesc: "Become a skilled UI/UX designer by mastering design principles, user research techniques, prototyping tools, and design systems. Learn to create intuitive and beautiful digital experiences.",
    duration: "4 Months",
    category: "Design",
    Icon: PenTool,
    features: [
      "User Research & Personas",
      "Wireframing & Prototyping",
      "Figma & Design Tools",
      "Design Systems & Components",
      "Usability Testing",
      "Visual Design Principles"
    ],
    syllabus: [
      "Month 1: Design Fundamentals & Research",
      "Month 2: Wireframing & Prototyping",
      "Month 3: UI Design & Visual Systems",
      "Month 4: UX Testing & Portfolio Project"
    ],
    price: "₹40,000",
    rating: 4.6,
    students: 620
  },
  {
    title: "Graphic Designer",
    slug: "graphic-designer",
    desc: "Master Adobe Creative Suite, branding and visual communication for digital & print media.",
    detailedDesc: "Learn professional graphic design skills using industry-standard Adobe tools. Create compelling visual content for branding, marketing, and digital media across various platforms.",
    duration: "4 Months",
    category: "Design",
    Icon: Palette,
    features: [
      "Adobe Photoshop & Illustrator",
      "Branding & Logo Design",
      "Print & Digital Media Design",
      "Typography & Color Theory",
      "Marketing Materials",
      "Portfolio Development"
    ],
    syllabus: [
      "Month 1: Design Basics & Adobe Tools",
      "Month 2: Branding & Logo Design",
      "Month 3: Digital & Print Media",
      "Month 4: Advanced Projects & Portfolio"
    ],
    price: "₹35,000",
    rating: 4.5,
    students: 580
  },
  {
    title: "Data Analytics",
    slug: "data-analytics",
    desc: "Analyze business data with Python, SQL, Power BI and machine learning fundamentals.",
    detailedDesc: "Transform raw data into actionable insights. Learn data analysis techniques, visualization tools, and basic machine learning to drive business decisions and solve real-world problems.",
    duration: "5 Months",
    category: "Development",
    Icon: BarChart3,
    features: [
      "Python for Data Analysis",
      "SQL & Database Querying",
      "Power BI & Tableau",
      "Statistical Analysis",
      "Machine Learning Basics",
      "Data Visualization"
    ],
    syllabus: [
      "Month 1: Python & Data Fundamentals",
      "Month 2: SQL & Database Management",
      "Month 3: Data Analysis & Statistics",
      "Month 4: Visualization Tools",
      "Month 5: ML & Advanced Analytics"
    ],
    price: "₹48,000",
    rating: 4.8,
    students: 890
  },
  {
    title: "Python Development",
    slug: "python-development",
    desc: "From basics to advanced Python — web apps, automation, APIs and data science.",
    detailedDesc: "Master Python programming from fundamentals to advanced applications. Build web applications, automate tasks, create APIs, and explore data science with Python's powerful ecosystem.",
    duration: "5 Months",
    category: "Development",
    Icon: Terminal,
    features: [
      "Python Programming Fundamentals",
      "Web Development with Django/Flask",
      "API Development",
      "Automation & Scripting",
      "Data Science Libraries",
      "Database Integration"
    ],
    syllabus: [
      "Month 1: Python Basics & OOP",
      "Month 2: Web Development Frameworks",
      "Month 3: API & Database Integration",
      "Month 4: Automation & Advanced Topics",
      "Month 5: Data Science & Projects"
    ],
    price: "₹42,000",
    rating: 4.7,
    students: 1100
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    desc: "SEO, SEM, social media, content strategy and performance marketing mastery.",
    detailedDesc: "Master the digital marketing landscape with comprehensive training in SEO, paid advertising, social media marketing, content strategy, and analytics. Learn to create and execute successful digital marketing campaigns.",
    duration: "3 Months",
    category: "Marketing",
    Icon: Megaphone,
    features: [
      "Search Engine Optimization (SEO)",
      "Pay-Per-Click Advertising",
      "Social Media Marketing",
      "Content Marketing Strategy",
      "Email Marketing",
      "Analytics & Reporting"
    ],
    syllabus: [
      "Month 1: Digital Marketing Fundamentals",
      "Month 2: SEO & SEM Strategies",
      "Month 3: Social Media & Content Marketing"
    ],
    price: "₹30,000",
    rating: 4.6,
    students: 720
  },
];