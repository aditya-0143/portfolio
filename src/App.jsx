import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, Linkedin, Mail, ExternalLink, Moon, Sun, 
  ChevronRight, Terminal, Database, Code2, Layout, 
  Briefcase, GraduationCap, Award, Phone, ArrowUpRight
} from 'lucide-react';

// --- CUSTOM HOOKS ---

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
    return () => { if (currentRef) observer.disconnect(); };
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
      bg-white/40 dark:bg-[#0A1828]/60
      backdrop-blur-xl
      border border-white/40 dark:border-[#178582]/20
      shadow-[0_8px_32px_0_rgba(23,133,130,0.07)] dark:shadow-[0_8px_32px_0_rgba(23,133,130,0.15)]
      ${hover ? 'transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:bg-white/60 dark:hover:bg-[#0d2137]/60 hover:border-white/60 dark:hover:border-[#178582]/40' : ''}
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
    <div className="w-24 h-1 bg-gradient-to-r from-[#178582] to-[#BFA181] mx-auto mt-8 rounded-full opacity-80" />
  </RevealWrapper>
);

// --- DATA ---

const DATA = {
  hero: {
    name: "Aditya_Patil",
    role: "Junior Data Analyst / MIS Executive",
    bio: "Data Analyst aspirant currently working as an MIS Executive, with hands-on experience in Python, MySQL, Power BI, and Google Sheets. Completed a Data Analyst internship building dashboards and performing data analysis. Skilled in data cleaning, EDA, and report automation, aiming to transition into a Data Analyst role.",
  },
  experience: [
    {
      role: "MIS Executive",
      company: "Trident Engineers",
      duration: "2026 - Present",
      achievements: [
        "Analyzed data to track delays, vendor performance, and operational efficiency",
        "Automated data processing tasks using advanced formulas (MAP-LAMBDA, ARRAYFORMULA, XLOOKUP, QUERY, etc.)",
        "Developed dashboards and reports for management decision-making"
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
      color: "from-[#178582] to-[#0A1828]"
    },
    {
      title: "E-commerce Orders Business Analysis",
      description: "Wrote complex JOIN and window function queries on 50K+ order records. Identified top 20% customers contributing 65% of total revenue. Conducted month-over-month growth analysis revealing seasonal peak in Q4",
      tech: ["MySQL"],
      github: "https://github.com/aditya-0143/SQL-Ecommerce-Business-Analysis",
      demo: "https://github.com/aditya-0143/SQL-Ecommerce-Business-Analysis",
      color: "from-[#BFA181] to-[#178582]"
    },
    {
      title: "Blinkit Sales Analysis Dashboard",
      description: "Built an interactive Excel dashboard to analyze Blinkit sales performance. Used Pivot Tables, Pivot Charts, and Slicers for dynamic filtering. Analyzed 8523 items across multiple outlet locations and sizes. Created KPIs for Total Sales ($1.2M), Average Sales, Item Count, and Ratings.",
      tech: ["Advance Excel", "Pivot table", "Pivot Chart"],
      github: "https://github.com/aditya-0143/blinkit-sales-dashboard-excel",
      demo: "https://github.com/aditya-0143/blinkit-sales-dashboard-excel",
      color: "from-[#0A1828] to-[#178582]"
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
      category: "Visualisation",
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
    { name: "Data Analytics and Data Science", provider: "Ethan's Tech, Pune" }
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
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0A1828] text-slate-900 dark:text-slate-50 font-sans selection:bg-[#178582]/30 selection:text-[#BFA181] transition-colors duration-700 relative overflow-hidden">

        {/* --- GLOBAL STYLES --- */}
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
            background: linear-gradient(135deg, rgba(10,24,40,0.75), rgba(10,24,40,0.5));
          }
        `}} />

        {/* --- ANIMATED BACKGROUND --- */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#178582]/15 dark:bg-[#178582]/10 blur-[100px] animate-float mix-blend-multiply dark:mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#BFA181]/15 dark:bg-[#BFA181]/8 blur-[120px] animate-drift mix-blend-multiply dark:mix-blend-screen" style={{ animationDelay: '-5s' }} />
          <div className="absolute top-[40%] left-[60%] w-[30vw] h-[30vw] rounded-full bg-[#0A1828]/10 dark:bg-[#178582]/8 blur-[80px] animate-float mix-blend-multiply dark:mix-blend-screen" style={{ animationDelay: '-2s' }} />
        </div>

        {/* --- CONTENT WRAPPER --- */}
        <div className="relative z-10 flex flex-col items-center w-full">

          {/* Scroll Progress Bar */}
          <div
            className="fixed top-0 left-0 h-1 z-50 transition-all duration-300 ease-out"
            style={{
              width: `${scrollProgress}%`,
              background: 'linear-gradient(90deg, #178582, #BFA181, #178582)'
            }}
          />

          {/* --- NAVBAR --- */}
          <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-5xl rounded-full glass-nav border border-white/20 dark:border-[#178582]/20 shadow-lg px-6 py-3 flex justify-between items-center transition-all duration-300">
            <div className="font-bold text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
              {DATA.hero.name.split(' ')[0]}<span className="text-[#178582]">.</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              {['Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-600 dark:text-slate-300 hover:text-[#178582] dark:hover:text-[#178582] transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full bg-white/20 dark:bg-white/5 hover:bg-white/40 dark:hover:bg-[#178582]/10 transition-colors border border-white/20 dark:border-[#178582]/20"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#BFA181]" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </nav>

          <main className="w-full max-w-6xl px-6 flex flex-col items-center">

            {/* --- HERO SECTION --- */}
            <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center pt-20">
              <RevealWrapper direction="scale" className="mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#178582]/10 border border-[#178582]/25 text-[#178582] dark:text-[#178582] text-sm font-medium mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#178582] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#178582]"></span>
                  </span>
                  Available for new opportunities
                </div>
              </RevealWrapper>

              <RevealWrapper delay={100}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6 text-slate-900 dark:text-white leading-tight">
                  Junior <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#178582] via-[#BFA181] to-[#178582]">Data/MIS</span><br />Analyst.
                </h1>
              </RevealWrapper>

              <RevealWrapper delay={200}>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                  {DATA.hero.bio}
                </p>
              </RevealWrapper>

              <RevealWrapper delay={300} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a
                  href="#projects"
                  className="group relative px-8 py-4 bg-slate-900 dark:bg-[#178582] text-white dark:text-[#0A1828] rounded-full font-medium overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-[#178582]/30 flex items-center justify-center gap-2"
                >
                  <span className="relative z-10">View My Work</span>
                  <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#178582] to-[#BFA181] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 rounded-full font-medium border border-slate-300 dark:border-[#178582]/30 hover:bg-slate-100 dark:hover:bg-[#178582]/10 transition-all text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2"
                >
                  Contact Me
                </a>
              </RevealWrapper>
            </section>

            {/* --- WORK EXPERIENCE --- */}
            <section id="experience" className="w-full py-24 md:py-32">
              <SectionHeading title="Experience" subtitle="My professional journey so far." />

              <div className="max-w-4xl mx-auto space-y-8 relative">
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#178582]/30 dark:via-[#178582]/20 to-transparent transform md:-translate-x-1/2 hidden sm:block" />

                {DATA.experience.map((exp, index) => (
                  <RevealWrapper key={index} direction={index % 2 === 0 ? 'right' : 'left'} delay={index * 100}>
                    <div className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="hidden sm:flex absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-[#178582] transform -translate-x-1/2 shadow-[0_0_15px_rgba(23,133,130,0.6)] z-10" />
                      <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                        <GlassCard className="p-8">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                            <span className="text-sm font-medium px-3 py-1 rounded-full bg-[#178582]/10 text-[#178582] border border-[#178582]/20 w-fit">
                              {exp.duration}
                            </span>
                          </div>
                          <div className="text-[#178582] font-medium mb-6 flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            {exp.company}
                          </div>
                          <ul className="space-y-3">
                            {exp.achievements.map((item, i) => (
                              <li key={i} className="text-slate-600 dark:text-slate-400 text-sm flex items-start gap-3">
                                <ChevronRight className="w-4 h-4 mt-0.5 text-[#BFA181] shrink-0" />
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
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#BFA181]/20 backdrop-blur-md rounded-full transform group-hover:scale-150 transition-transform duration-700 ease-out" />
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-[#178582] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow text-sm leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tech.map((t, i) => (
                            <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#178582]/10 text-[#178582] border border-[#178582]/20">
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 pt-4 border-t border-[#178582]/20 mt-auto">
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-[#178582] dark:hover:text-[#178582] transition-colors">
                            <Github className="w-4 h-4" /> Code
                          </a>
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-[#BFA181] dark:hover:text-[#BFA181] transition-colors ml-auto">
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
                        <div className="p-3 rounded-xl bg-[#178582]/10 text-[#178582]">
                          {skillGroup.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          {skillGroup.category}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {skillGroup.items.map((item, i) => (
                          <div
                            key={i}
                            className="px-4 py-2 rounded-lg bg-slate-50 dark:bg-[#0A1828]/60 border border-slate-200 dark:border-[#178582]/15 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-[#178582] dark:hover:border-[#178582] hover:bg-[#178582]/5 dark:hover:bg-[#178582]/10 hover:text-[#178582] transition-colors cursor-default"
                          >
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
                    <GraduationCap className="w-8 h-8 text-[#BFA181]" />
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Education</h2>
                  </div>
                  <GlassCard className="p-8">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{DATA.education.degree}</h3>
                    <div className="text-slate-600 dark:text-slate-400 mb-4">{DATA.education.institute}</div>
                    <div className="inline-block px-3 py-1 rounded-full bg-[#BFA181]/10 text-[#BFA181] border border-[#BFA181]/25 text-sm font-medium">
                      {DATA.education.year}
                    </div>
                  </GlassCard>
                </RevealWrapper>

                {/* Certifications */}
                <RevealWrapper direction="left" delay={200}>
                  <div className="flex items-center gap-4 mb-8">
                    <Award className="w-8 h-8 text-[#178582]" />
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
                  <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#178582]/15 rounded-full blur-[80px]" />
                  <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-[#BFA181]/15 rounded-full blur-[80px]" />

                  <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-slate-900 dark:text-white relative z-10">
                    Let's Build Something{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#178582] to-[#BFA181]">
                      Extraordinary
                    </span>
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 font-light relative z-10">
                    Whether you have a project in mind or just want to chat about technology, my inbox is always open.
                  </p>

                  <div className="flex flex-wrap justify-center gap-6 relative z-10">
                    <a
                      href={`mailto:${DATA.contact.email}`}
                      className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white dark:bg-[#0A1828]/80 border border-slate-200 dark:border-[#178582]/20 hover:-translate-y-1 hover:shadow-xl hover:border-[#178582]/60 transition-all text-slate-700 dark:text-slate-200 font-medium group"
                    >
                      <div className="p-2 rounded-full bg-[#178582]/10 text-[#178582] group-hover:scale-110 transition-transform">
                        <Mail className="w-5 h-5" />
                      </div>
                      Email Me
                    </a>

                    <a
                      href={DATA.contact.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white dark:bg-[#0A1828]/80 border border-slate-200 dark:border-[#178582]/20 hover:-translate-y-1 hover:shadow-xl hover:border-[#178582]/60 transition-all text-slate-700 dark:text-slate-200 font-medium group"
                    >
                      <div className="p-2 rounded-full bg-[#178582]/10 text-[#178582] group-hover:scale-110 transition-transform">
                        <Linkedin className="w-5 h-5" />
                      </div>
                      LinkedIn
                    </a>

                    <a
                      href={DATA.contact.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white dark:bg-[#0A1828]/80 border border-slate-200 dark:border-[#178582]/20 hover:-translate-y-1 hover:shadow-xl hover:border-[#BFA181]/50 transition-all text-slate-700 dark:text-slate-200 font-medium group"
                    >
                      <div className="p-2 rounded-full bg-[#BFA181]/10 text-[#BFA181] group-hover:scale-110 transition-transform">
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
          <footer className="w-full py-8 text-center border-t border-[#178582]/15 mt-auto bg-white/30 dark:bg-[#0A1828]/50 backdrop-blur-md">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              © {new Date().getFullYear()} {DATA.hero.name}. All rights reserved. <br className="sm:hidden" />
              Designed with <span className="text-[#BFA181]">♥</span> using React & Tailwind.
            </p>
          </footer>

        </div>
      </div>
    </div>
  );
}
