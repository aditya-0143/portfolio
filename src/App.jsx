import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, Linkedin, Mail, ExternalLink, Moon, Sun, 
  ChevronRight, Terminal, Database, Code2, Layout, 
  Briefcase, GraduationCap, Award, Phone, ArrowUpRight
} from 'lucide-react';

// --- CUSTOM HOOKS ---

// Hook for scroll progress indicator
const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setProgress(Number((currentScrollY / scrollHeight).toFixed(4)) * 100);
      }
    };
    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progress;
};

// Hook for scroll reveal animations (Replaces Framer Motion for zero-dependency reliability)
const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.disconnect();
    };
  }, [threshold]);

  return { ref, isVisible };
};

// --- COMPONENTS ---

const RevealWrapper = ({ children, delay = 0, className = '', direction = 'up' }) => {
  const { ref, isVisible } = useScrollReveal();
  
  const baseClasses = "transition-all duration-1000 ease-out";
  const hiddenClasses = {
    up: "opacity-0 translate-y-12",
    down: "opacity-0 -translate-y-12",
    left: "opacity-0 translate-x-12",
    right: "opacity-0 -translate-x-12",
    scale: "opacity-0 scale-95"
  };
  
  const visibleClasses = "opacity-100 translate-y-0 translate-x-0 scale-100";

  return (
    <div 
      ref={ref} 
      className={`${baseClasses} ${isVisible ? visibleClasses : hiddenClasses[direction]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const GlassCard = ({ children, className = '', hover = true }) => {
  return (
    <div className={`
      relative overflow-hidden rounded-2xl
      bg-white/40 dark:bg-slate-900/40 
      backdrop-blur-xl 
      border border-white/40 dark:border-white/10 
      shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
      ${hover ? 'transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:bg-white/60 dark:hover:bg-slate-800/50 hover:border-white/60 dark:hover:border-white/20' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

const SectionHeading = ({ title, subtitle }) => (
  <RevealWrapper className="mb-16 md:mb-24 text-center">
    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-slate-900 dark:text-white">
      {title}
    </h2>
    {subtitle && (
      <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light">
        {subtitle}
      </p>
    )}
    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-8 rounded-full opacity-80" />
  </RevealWrapper>
);

// --- DATA ---

const DATA = {
  hero: {
    name: "Aditya_Patil",
    role: "Junior Data Analyst / MIS Executive",
    bio: "Data Analyst with hands-on experience in Python, SQL, and Power BI, specializing in sales and customer data analysis. Completed a 6-month internship delivering dashboards and trend analysis to support business decisions. Strong foundation in data cleaning, EDA, and performance reporting.",
  },
  experience: [
    {
      role: "Admin Executive",
      company: "Vijsag Rental Solution",
      duration: "2026 - Present",
      achievements: [
        "Managed and updated customer records and transaction data in CRM system.",
        "Maintained structured data for order tracking and operational reporting.",
        "Assisted team in retrieving customer and order data for internal use."
      ]
    },
    {
      role: "Data Analyst Internship",
      company: "NexGen Analytix",
      duration: "6 Months",
      achievements: [
        "Cleaned and transformed datasets containing 10K+ records to improve analysis accuracy.",
        "Built Power BI dashboards tracking KPIs such as revenue, profit, and customer retention.",
        "Assisted in preparing monthly reporting dashboards for business monitoring."
      ]
    }
  ],
  projects: [
    {
      title: "Exploratory Data Analysis – Superstore Sales Dataset",
      description: "Analyzed 9,000+ sales records to identify profit leakage across categories. Discovered discounts above 30% reduced profit margins by 18%. Identified top 5 revenue-generating states contributing 45% of total sales",
      tech: ["Python", "Matplotlib", "Seaborn"],
      github: "https://github.com/aditya-0143/EDA-Superstore-Project",
      demo: "https://github.com/aditya-0143/EDA-Superstore-Project",
      color: "from-blue-500 to-cyan-400"
    },
    {
      title: "E-commerce Orders Business Analysis",
      description: "Wrote complex JOIN and window function queries on 50K+ order records. Identified top 20% customers contributing 65% of total revenue. Conducted month-over-month growth analysis revealing seasonal peak in Q4",
      tech: ["MySQL"],
      github: "https://github.com/aditya-0143/SQL-Ecommerce-Business-Analysis",
      demo: "https://github.com/aditya-0143/SQL-Ecommerce-Business-Analysis",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Blinkit Sales Analysis Dashboard",
      description: "Built an interactive Excel dashboard to analyze Blinkit sales performance. Used Pivot Tables, Pivot Charts, and Slicers for dynamic filtering. Analyzed 8523 items across multiple outlet locations and sizes. Created KPIs for Total Sales ($1.2M), Average Sales, Item Count, and Ratings. Visualized trends such as sales by outlet type, outlet size, and item category.",
      tech: ["Advance Excel", "Pivot table", "Pivot Chart"],
      github: "https://github.com/aditya-0143/blinkit-sales-dashboard-excel",
      demo: "https://github.com/aditya-0143/blinkit-sales-dashboard-excel",
      color: "from-emerald-400 to-cyan-500"
    }
  ],
  skills: [
    {
      category: "Languages",
      icon: <Terminal className="w-5 h-5" />,
      items: ["Python", "SQL"]
    },
    {
      category: "Libraries",
      icon: <Layout className="w-5 h-5" />,
      items: ["Pandas", "Numpy", "Matplotlib", "Seaborn"]
    },
    {
      category: "Visulisation",
      icon: <Layout className="w-5 h-5" />,
      items: ["Power BI", "Excel"]
    },
    {
      category: "Databases",
      icon: <Database className="w-5 h-5" />,
      items: ["MySQL"]
    },
    {
      category: "Concepts",
      icon: <Code2 className="w-5 h-5" />,
      items: ["Data Cleaning", "KPI Reporting", "Reporting", "Data Modeling"]
    }
  ],
  education: {
    degree: "B.Sc in Computer Science",
    institute: "S.S.V.P.S College, Dhule",
    year: "2025"
  },
  certifications: [
    { name: "Data Analytics and Data Science", provider: "Ethan`s Tech, Pune" }
  ],
  contact: {
    email: "mr.aditya0110@gmail.com",
    phone: "+919764770726",
    linkedin: "https://www.linkedin.com/in/aditya-patil-812145262/",
    github: "https://github.com/aditya-0143"
  }
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    // Smooth scrolling via CSS
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1a] text-slate-900 dark:text-slate-50 font-sans selection:bg-purple-500/30 transition-colors duration-700 relative overflow-hidden">
        
        {/* --- GLOBAL STYLES FOR ANIMATIONS --- */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes float {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-20px) scale(1.05); }
          }
          @keyframes drift {
            0% { transform: rotate(0deg) translate(50px) rotate(0deg); }
            100% { transform: rotate(360deg) translate(50px) rotate(-360deg); }
          }
          .animate-float { animation: float 10s ease-in-out infinite; }
          .animate-drift { animation: drift 20s linear infinite; }
          .glass-nav {
            background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }
          .dark .glass-nav {
            background: linear-gradient(135deg, rgba(15,23,42,0.6), rgba(15,23,42,0.4));
          }
        `}} />

        {/* --- ANIMATED BACKGROUND --- */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[100px] animate-float mix-blend-multiply dark:mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-[120px] animate-drift mix-blend-multiply dark:mix-blend-screen" style={{ animationDelay: '-5s' }} />
          <div className="absolute top-[40%] left-[60%] w-[30vw] h-[30vw] rounded-full bg-cyan-400/10 dark:bg-cyan-500/10 blur-[80px] animate-float mix-blend-multiply dark:mix-blend-screen" style={{ animationDelay: '-2s' }} />
        </div>

        {/* --- CONTENT WRAPPER --- */}
        <div className="relative z-10 flex flex-col items-center w-full">

          {/* Scroll Progress Bar */}
          <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 z-50 transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%` }} />

          {/* --- NAVBAR --- */}
          <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-5xl rounded-full glass-nav border border-white/20 dark:border-white/10 shadow-lg px-6 py-3 flex justify-between items-center transition-all duration-300">
            <div className="font-bold text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
              {DATA.hero.name.split(' ')[0]}<span className="text-blue-500">.</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              {['Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full bg-white/20 dark:bg-white/5 hover:bg-white/40 dark:hover:bg-white/10 transition-colors border border-white/20 dark:border-white/5"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-yellow-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </nav>

          <main className="w-full max-w-6xl px-6 flex flex-col items-center">
            
            {/* --- HERO SECTION --- */}
            <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center pt-20">
              <RevealWrapper direction="scale" className="mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Available for new opportunities
                </div>
              </RevealWrapper>
              
              <RevealWrapper delay={100}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6 text-slate-900 dark:text-white leading-tight">
                  Junior <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500">Data/MIS</span><br/>Analyst.
                </h1>
              </RevealWrapper>

              <RevealWrapper delay={200}>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                  {DATA.hero.bio}
                </p>
              </RevealWrapper>

              <RevealWrapper delay={300} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a href="#projects" className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-blue-500/25 flex items-center justify-center gap-2">
                  <span className="relative z-10">View My Work</span>
                  <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:bg-gradient-to-r dark:from-blue-400 dark:to-purple-400 mix-blend-overlay" />
                </a>
                <a href="#contact" className="px-8 py-4 rounded-full font-medium border border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2">
                  Contact Me
                </a>
              </RevealWrapper>
            </section>

            {/* --- WORK EXPERIENCE --- */}
            <section id="experience" className="w-full py-24 md:py-32">
              <SectionHeading title="Experience" subtitle="My professional journey so far." />
              
              <div className="max-w-4xl mx-auto space-y-8 relative">
                {/* Timeline line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-300 dark:via-white/10 to-transparent transform md:-translate-x-1/2 hidden sm:block" />

                {DATA.experience.map((exp, index) => (
                  <RevealWrapper key={index} direction={index % 2 === 0 ? 'right' : 'left'} delay={index * 100}>
                    <div className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      
                      {/* Timeline dot */}
                      <div className="hidden sm:flex absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-blue-500 transform -translate-x-1/2 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10" />
                      
                      <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                        <GlassCard className="p-8">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                            <span className="text-sm font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 w-fit">
                              {exp.duration}
                            </span>
                          </div>
                          <div className="text-blue-600 dark:text-blue-400 font-medium mb-6 flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            {exp.company}
                          </div>
                          <ul className="space-y-3">
                            {exp.achievements.map((item, i) => (
                              <li key={i} className="text-slate-600 dark:text-slate-400 text-sm flex items-start gap-3">
                                <ChevronRight className="w-4 h-4 mt-0.5 text-purple-500 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </GlassCard>
                      </div>
                      <div className="hidden md:block w-1/2" />
                    </div>
                  </RevealWrapper>
                ))}
              </div>
            </section>

            {/* --- PROJECTS --- */}
            <section id="projects" className="w-full py-24 md:py-32">
              <SectionHeading title="Selected Works" subtitle="A collection of my recent projects and experiments." />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {DATA.projects.map((project, index) => (
                  <RevealWrapper key={index} delay={index * 150} direction="up" className="h-full">
                    <GlassCard className="h-full flex flex-col group">
                      <div className={`h-48 w-full bg-gradient-to-br ${project.color} opacity-80 group-hover:opacity-100 transition-opacity duration-500 relative overflow-hidden`}>
                         <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
                         {/* Abstract shape for visual interest */}
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/20 backdrop-blur-md rounded-full transform group-hover:scale-150 transition-transform duration-700 ease-out" />
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow text-sm leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tech.map((t, i) => (
                            <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-white/10 mt-auto">
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <Github className="w-4 h-4" /> Code
                          </a>
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors ml-auto">
                            <ExternalLink className="w-4 h-4" /> Live Demo
                          </a>
                        </div>
                      </div>
                    </GlassCard>
                  </RevealWrapper>
                ))}
              </div>
            </section>

            {/* --- SKILLS --- */}
            <section id="skills" className="w-full py-24 md:py-32">
              <SectionHeading title="Technical Arsenal" subtitle="Tools and technologies I use to bring ideas to life." />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DATA.skills.map((skillGroup, index) => (
                  <RevealWrapper key={index} delay={index * 100} direction="scale">
                    <GlassCard className="p-8 h-full">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                          {skillGroup.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          {skillGroup.category}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {skillGroup.items.map((item, i) => (
                          <div key={i} className="px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors cursor-default">
                            {item}
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  </RevealWrapper>
                ))}
              </div>
            </section>

            {/* --- EDUCATION & CERTIFICATIONS --- */}
            <section className="w-full py-24 md:py-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Education */}
                <RevealWrapper direction="right">
                  <div className="flex items-center gap-4 mb-8">
                    <GraduationCap className="w-8 h-8 text-purple-500" />
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Education</h2>
                  </div>
                  <GlassCard className="p-8">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{DATA.education.degree}</h3>
                    <div className="text-slate-600 dark:text-slate-400 mb-4">{DATA.education.institute}</div>
                    <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-medium">
                      {DATA.education.year}
                    </div>
                  </GlassCard>
                </RevealWrapper>

                {/* Certifications */}
                <RevealWrapper direction="left" delay={200}>
                  <div className="flex items-center gap-4 mb-8">
                    <Award className="w-8 h-8 text-cyan-500" />
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Certifications</h2>
                  </div>
                  <div className="space-y-4">
                    {DATA.certifications.map((cert, index) => (
                      <GlassCard key={index} className="p-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{cert.name}</h3>
                        <div className="text-slate-600 dark:text-slate-400 text-sm">{cert.provider}</div>
                      </GlassCard>
                    ))}
                  </div>
                </RevealWrapper>
              </div>
            </section>

            {/* --- CONTACT --- */}
            <section id="contact" className="w-full py-24 md:py-32 mb-20">
              <RevealWrapper direction="scale">
                <GlassCard className="p-10 md:p-16 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />
                  <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />
                  
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-slate-900 dark:text-white relative z-10">
                    Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Extraordinary</span>
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 font-light relative z-10">
                    Whether you have a project in mind or just want to chat about technology, my inbox is always open.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-6 relative z-10">
                    <a href={`mailto:${DATA.contact.email}`} className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 hover:-translate-y-1 hover:shadow-xl hover:border-blue-500/50 transition-all text-slate-700 dark:text-slate-200 font-medium group">
                      <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
                        <Mail className="w-5 h-5" />
                      </div>
                      Email Me
                    </a>
                    
                    <a href={`${DATA.contact.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 hover:-translate-y-1 hover:shadow-xl hover:border-blue-500/50 transition-all text-slate-700 dark:text-slate-200 font-medium group">
                      <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
                        <Linkedin className="w-5 h-5" />
                      </div>
                      LinkedIn
                    </a>

                    <a href={`${DATA.contact.github}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 hover:-translate-y-1 hover:shadow-xl hover:border-blue-500/50 transition-all text-slate-700 dark:text-slate-200 font-medium group">
                      <div className="p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white group-hover:scale-110 transition-transform">
                        <Github className="w-5 h-5" />
                      </div>
                      GitHub
                    </a>
                  </div>
                </GlassCard>
              </RevealWrapper>
            </section>

          </main>
          
          {/* --- FOOTER --- */}
          <footer className="w-full py-8 text-center border-t border-slate-200 dark:border-white/10 mt-auto bg-white/30 dark:bg-slate-900/30 backdrop-blur-md">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              © {new Date().getFullYear()} {DATA.hero.name}. All rights reserved. <br className="sm:hidden" />
              Designed with <span className="text-purple-500">♥</span> using React & Tailwind.
            </p>
          </footer>

        </div>
      </div>
    </div>
  );
}
