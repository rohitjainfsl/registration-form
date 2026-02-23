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
  syllabus?: { title: string; skills: string[] }[];
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
      { title: "Month 1: HTML, CSS, JavaScript Basics", skills: ["HTML5", "CSS3", "JavaScript ES6", "DOM Manipulation", "Responsive Design"] },
      { title: "Month 2: React & Frontend Frameworks", skills: ["React Components", "State Management", "Hooks", "Routing", "Context API"] },
      { title: "Month 3: Node.js & Backend Development", skills: ["Node.js Runtime", "Express.js", "Middleware", "Error Handling", "Authentication"] },
      { title: "Month 4: Database Design & Management", skills: ["SQL Databases", "NoSQL (MongoDB)", "Schema Design", "CRUD Operations", "Data Modeling"] },
      { title: "Month 5: API Development & Integration", skills: ["RESTful APIs", "GraphQL", "API Testing", "Third-party Integrations", "Security"] },
      { title: "Month 6: Deployment & DevOps Basics", skills: ["Cloud Deployment", "Docker", "CI/CD", "Version Control", "Monitoring"] }
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
      { title: "Month 1: JavaScript & Node.js Fundamentals", skills: ["JavaScript ES6+", "Node.js Basics", "NPM", "Asynchronous Programming", "Modules"] },
      { title: "Month 2: MongoDB & Database Design", skills: ["MongoDB Setup", "CRUD Operations", "Schema Design", "Indexing", "Aggregation"] },
      { title: "Month 3: Express.js & API Development", skills: ["Express Routing", "Middleware", "Error Handling", "Validation", "Security"] },
      { title: "Month 4: React Frontend Development", skills: ["React Components", "State Management", "Hooks", "API Integration", "UI/UX"] },
      { title: "Month 5: Full-Stack Project & Deployment", skills: ["Project Architecture", "Deployment", "Testing", "Performance", "Best Practices"] }
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
      { title: "Month 1: C# & .NET Fundamentals", skills: ["C# Syntax", ".NET Framework", "OOP Principles", "LINQ", "Collections"] },
      { title: "Month 2: ASP.NET Core Web Development", skills: ["MVC Pattern", "Razor Pages", "Controllers", "Views", "Routing"] },
      { title: "Month 3: Database Integration with EF", skills: ["Entity Framework", "Code First", "Migrations", "Relationships", "Queries"] },
      { title: "Month 4: Azure Cloud & Deployment", skills: ["Azure Services", "App Service", "Storage", "Authentication", "CI/CD"] },
      { title: "Month 5: Advanced Topics & Project", skills: ["Microservices", "API Design", "Testing", "Security", "Performance"] }
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
      { title: "Month 1: Design Fundamentals & Research", skills: ["Design Principles", "User Research", "Personas", "User Journey", "Wireframing"] },
      { title: "Month 2: Wireframing & Prototyping", skills: ["Low/High Fidelity", "Prototyping Tools", "Interaction Design", "Usability", "Feedback"] },
      { title: "Month 3: UI Design & Visual Systems", skills: ["Visual Hierarchy", "Typography", "Color Theory", "Design Systems", "Component Libraries"] },
      { title: "Month 4: UX Testing & Portfolio Project", skills: ["Usability Testing", "A/B Testing", "Analytics", "Portfolio Creation", "Client Presentation"] }
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
      { title: "Month 1: Design Basics & Adobe Tools", skills: ["Photoshop Basics", "Illustrator Basics", "Design Theory", "File Formats", "Color Modes"] },
      { title: "Month 2: Branding & Logo Design", skills: ["Brand Identity", "Logo Creation", "Typography", "Color Psychology", "Brand Guidelines"] },
      { title: "Month 3: Digital & Print Media", skills: ["Web Graphics", "Print Design", "Social Media Assets", "Banner Ads", "Packaging"] },
      { title: "Month 4: Advanced Projects & Portfolio", skills: ["Advanced Techniques", "Client Projects", "Portfolio Design", "Presentation", "Industry Standards"] }
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
      { title: "Month 1: Python & Data Fundamentals", skills: ["Python Basics", "Data Types", "Pandas", "NumPy", "Data Cleaning"] },
      { title: "Month 2: SQL & Database Management", skills: ["SQL Queries", "Joins", "Aggregations", "Database Design", "Data Warehousing"] },
      { title: "Month 3: Data Analysis & Statistics", skills: ["Statistical Methods", "Hypothesis Testing", "Regression", "Correlation", "Data Visualization"] },
      { title: "Month 4: Visualization Tools", skills: ["Power BI", "Tableau", "Matplotlib", "Seaborn", "Dashboard Creation"] },
      { title: "Month 5: ML & Advanced Analytics", skills: ["Machine Learning Basics", "Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Predictive Analytics"] }
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
      { title: "Month 1: Python Basics & OOP", skills: ["Python Syntax", "Data Structures", "OOP Concepts", "Exception Handling", "File I/O"] },
      { title: "Month 2: Web Development Frameworks", skills: ["Django/Flask", "Templates", "Forms", "Authentication", "REST APIs"] },
      { title: "Month 3: API & Database Integration", skills: ["API Design", "Database Connections", "ORM", "Serialization", "Caching"] },
      { title: "Month 4: Automation & Advanced Topics", skills: ["Scripting", "Web Scraping", "Multithreading", "Async Programming", "Testing"] },
      { title: "Month 5: Data Science & Projects", skills: ["Data Analysis", "Visualization", "Machine Learning", "Project Deployment", "Best Practices"] }
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
      { title: "Month 1: Digital Marketing Fundamentals", skills: ["Marketing Basics", "Digital Channels", "Customer Journey", "Campaign Planning", "Analytics Basics"] },
      { title: "Month 2: SEO & SEM Strategies", skills: ["On-page SEO", "Off-page SEO", "Google Ads", "Keyword Research", "PPC Campaigns"] },
      { title: "Month 3: Social Media & Content Marketing", skills: ["Social Platforms", "Content Strategy", "Community Management", "Influencer Marketing", "Email Marketing"] }
    ],
    price: "₹30,000",
    rating: 4.6,
    students: 720
  },
];