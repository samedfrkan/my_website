"use client";

import { useState, useEffect, type ReactNode } from "react";
import Image from "next/image";
import { 
  Code, 
  Database, 
  Brain, 
  Globe, 
  Github, 
  ExternalLink, 
  Mail, 
  Linkedin, 
  ChevronRight,
  Sparkles,
  Zap,
  Target,
  Layers,
  Menu,
  X
} from "lucide-react";

type Project = {
  title: string;
  description: string;
  techs: string[];
  github: string;
  longDescription: string;
  gradient: string;
  icon: ReactNode;
  index?: number;
};

export default function PersonalWebsite() {
  const [modalContent, setModalContent] = useState<Project | null>(null);
  const [hoveredTech, setHoveredTech] = useState<number | null>(null);
  const [socialLinks, setSocialLinks] = useState<{ mail?: string; linkedin?: string; github?: string }>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Auto-close mobile menu when viewport is md and up
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = () => {
      if (mediaQuery.matches) {
        setMobileMenuOpen(false);
      }
    };
    mediaQuery.addEventListener ? mediaQuery.addEventListener('change', handleChange) : mediaQuery.addListener(handleChange);

    const normalizeMail = (value: string) => {
      const trimmed = value.trim();
      return trimmed.startsWith("mailto:") ? trimmed : `mailto:${trimmed}`;
    };

    const ensureHttps = (url: string) => {
      if (/^https?:\/\//i.test(url)) return url;
      return `https://${url}`;
    };

    const normalizeLinkedIn = (value: string) => {
      const trimmed = value.trim();
      if (trimmed.includes("linkedin.com")) return ensureHttps(trimmed);
      if (trimmed.startsWith("linked/in/")) {
        const handle = trimmed.replace(/^linked\/in\//, "");
        return `https://www.linkedin.com/in/${handle}`;
      }
      if (trimmed.startsWith("in/")) {
        const handle = trimmed.replace(/^in\//, "");
        return `https://www.linkedin.com/in/${handle}`;
      }
      return ensureHttps(trimmed);
    };

    const normalizeGithub = (value: string) => {
      const trimmed = value.trim();
      if (trimmed.includes("github.com")) return ensureHttps(trimmed);
      if (trimmed.startsWith("github/")) {
        const handle = trimmed.replace(/^github\//, "");
        return `https://github.com/${handle}`;
      }
      return ensureHttps(trimmed);
    };

    fetch("/links.txt")
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error("Failed to load links.txt"))))
      .then((text) => {
        const result: { mail?: string; linkedin?: string; github?: string } = {};
        text
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean)
          .forEach((line) => {
            const [keyPart, ...rest] = line.split(":");
            const value = rest.join(":").trim();
            const key = keyPart.toLowerCase();
            if (key.startsWith("mail address")) {
              result.mail = normalizeMail(value);
            } else if (key.startsWith("linked address")) {
              result.linkedin = normalizeLinkedIn(value);
            } else if (key.startsWith("github address")) {
              result.github = normalizeGithub(value);
            }
          });
        setSocialLinks(result);
      })
      .catch(() => {
        // ignore if file missing; keep icons non-clickable
      });
    return () => {
      mediaQuery.removeEventListener ? mediaQuery.removeEventListener('change', handleChange) : mediaQuery.removeListener(handleChange);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const technologies = [
    { name: "Python", category: "Programming", color: "from-blue-500 to-blue-600", icon: <Code size={20} /> },
    { name: "C/C++", category: "Programming", color: "from-yellow-400 to-yellow-500", icon: <Code size={20} /> },
    { name: "React", category: "Frontend", color: "from-cyan-400 to-cyan-500", icon: <Globe size={20} /> },
    { name: "Node.js", category: "Backend", color: "from-green-500 to-green-600", icon: <Database size={20} /> },
    { name: "Machine Learning", category: "AI/ML", color: "from-purple-500 to-purple-600", icon: <Brain size={20} /> },
    { name: "Deep Learning", category: "AI/ML", color: "from-indigo-500 to-indigo-600", icon: <Target size={20} /> },
    { name: "MongoDB", category: "Database", color: "from-emerald-500 to-emerald-600", icon: <Database size={20} /> },
    { name: "MSSQL", category: "Database", color: "from-blue-600 to-blue-700", icon: <Database size={20} /> },
    { name: "Docker", category: "DevOps", color: "from-sky-500 to-sky-600", icon: <Layers size={20} /> },
    { name: "Git", category: "Version Control", color: "from-orange-500 to-orange-600", icon: <Github size={20} /> },
    { name: "Tailwind CSS", category: "Frontend", color: "from-teal-400 to-teal-500", icon: <Sparkles size={20} /> },
    { name: "TensorFlow", category: "AI/ML", color: "from-amber-500 to-amber-600", icon: <Brain size={20} /> },
    { name: "OpenCV", category: "AI/ML", color: "from-red-500 to-red-600", icon: <Target size={20} /> },
    { name: "Pandas", category: "Data Science", color: "from-violet-500 to-violet-600", icon: <Zap size={20} /> },
    { name: "Scikit-learn", category: "Data Science", color: "from-pink-500 to-pink-600", icon: <Brain size={20} /> }
  ];

  const projects: Project[] = [
    {
      title: "Car Price Prediction",
      description: "Machine learning model to predict car selling prices using historical data and market analysis.",
      techs: ["Python", "Machine Learning", "Pandas", "Scikit-learn"],
      github: "https://github.com/samedfrkan/Predict-car-selling-prices",
      longDescription: "A comprehensive machine learning project analyzing car features and market data to predict optimal selling prices with 92% accuracy.",
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      icon: <Target size={20} />
    },
    {
      title: "Weather Forecasting",
      description: "Real-time weather prediction application with location-based forecasting and interactive maps.",
      techs: ["Python", "API Integration", "Data Analysis", "Web Scraping"],
      github: "https://github.com/samedfrkan/weather-forecasting",
      longDescription: "An intelligent weather forecasting system providing accurate predictions based on atmospheric data with beautiful visualizations.",
      gradient: "from-cyan-400 via-blue-500 to-indigo-600",
      icon: <Globe size={20} />
    },
    {
      title: "Zero-DCE Video Processing",
      description: "Advanced video enhancement using Zero-Reference Deep Curve Estimation for low-light conditions.",
      techs: ["Python", "Computer Vision", "Deep Learning", "OpenCV"],
      github: "https://github.com/samedfrkan/Video-Processing",
      longDescription: "Enhances low-light videos using cutting-edge deep learning techniques, dramatically improving brightness and color balance.",
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      icon: <Sparkles size={20} />
    },
    {
      title: "Vaccine Record System",
      description: "Comprehensive vaccination tracking and management system for healthcare providers and patients.",
      techs: ["C++", "Database Design", "User Management", "Reporting"],
      github: "https://github.com/samedfrkan/VaccineRecordSystem",
      longDescription: "A full-stack web application enabling healthcare professionals to efficiently manage patient vaccination records with automated reporting.",
      gradient: "from-rose-400 via-pink-500 to-purple-600",
      icon: <Database size={20} />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white font-inter">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-purple-500/10 via-cyan-500/5 to-pink-500/10 animate-pulse rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-blue-500/10 via-teal-500/5 to-purple-500/10 animate-pulse rounded-full blur-3xl"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex justify-between items-center px-4 sm:px-8 py-4 sm:py-6 backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
            <Sparkles size={16} className="sm:hidden text-white" />
            <Sparkles size={20} className="hidden sm:block text-white" />
          </div>
          <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            <span className="hidden sm:inline">Samed Furkan DEMİR</span>
            <span className="sm:hidden">S. F. DEMİR</span>
          </h1>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-cyan-400 transition-colors duration-300 font-medium"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('tech')}
            className="hover:text-cyan-400 transition-colors duration-300 font-medium"
          >
            Technologies
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="hover:text-cyan-400 transition-colors duration-300 font-medium"
          >
            Projects
          </button>
          <a 
            href="/CV.pdf" 
            download="Samed_Furkan_DEMIR_CV.pdf"
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 font-medium"
          >
            Download CV
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative flex flex-col items-center justify-center h-full space-y-8 text-center px-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-2xl font-medium hover:text-cyan-400 transition-colors duration-300"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('tech')}
              className="text-2xl font-medium hover:text-cyan-400 transition-colors duration-300"
            >
              Technologies
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-2xl font-medium hover:text-cyan-400 transition-colors duration-300"
            >
              Projects
            </button>
            <a 
              href="/CV.pdf" 
              download="Samed_Furkan_DEMIR_CV.pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl font-medium text-xl"
            >
              Download CV
            </a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="about" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8 relative">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-1 shadow-2xl shadow-purple-500/25">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/profile_pic.jpg" 
                  alt="Samed Furkan DEMÄ°R" 
                  width={192} 
                  height={192} 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
            </div>
            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Creative Developer
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Passionate software developer specializing in <span className="text-cyan-400 font-semibold">machine learning</span>, 
            <span className="text-purple-400 font-semibold"> data science</span>, and 
            <span className="text-pink-400 font-semibold"> full-stack development</span>. 
            I create innovative AI-powered solutions that bridge the gap between cutting-edge technology and practical applications.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 px-4">
            <button
              type="button"
              onClick={() => {
                if (socialLinks.mail) {
                  window.location.href = socialLinks.mail;
                }
              }}
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 w-full sm:w-auto"
            >
              <Mail size={20} />
              <span className="font-medium">Get In Touch</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="flex items-center justify-center gap-2 border border-slate-600 hover:border-cyan-400 px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 hover:bg-cyan-400/10 backdrop-blur-sm w-full sm:w-auto"
            >
              <Github size={20} />
              <span className="font-medium">View Work</span>
            </button>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section id="tech" className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Technologies & Skills
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto px-4">
              Crafting digital experiences with cutting-edge technologies and creative solutions
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {technologies.map((tech, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredTech(i)}
                onMouseLeave={() => setHoveredTech(null)}
                className={`group relative p-4 sm:p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${
                  hoveredTech === i ? 'shadow-2xl' : 'hover:shadow-xl'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                
                <div className="relative z-10 text-center">
                  <div className={`inline-flex p-2 sm:p-3 rounded-xl bg-gradient-to-r ${tech.color} text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {tech.icon}
                  </div>
                  
                  <span className="block text-xs font-semibold text-cyan-400 mb-1 sm:mb-2 uppercase tracking-wider">
                    {tech.category}
                  </span>
                  
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    {tech.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto px-4">
              Innovative solutions combining AI, machine learning, and modern web technologies
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative p-6 sm:p-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl hover:border-white/20 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className={`p-3 sm:p-4 rounded-2xl bg-gradient-to-br ${project.gradient} text-white shadow-lg`}>
                      {project.icon}
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      <button
                        onClick={() => window.open(project.github, '_blank')}
                        className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 rounded-xl transition-all duration-300 hover:scale-110"
                      >
                        <Github size={16} className="sm:hidden" />
                        <Github size={18} className="hidden sm:block" />
                      </button>
                      <button
                        onClick={() => setModalContent({...project, index})}
                        className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 rounded-xl transition-all duration-300 hover:scale-110"
                      >
                        <ExternalLink size={16} className="sm:hidden" />
                        <ExternalLink size={18} className="hidden sm:block" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {project.description}
                  </p>

                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-xs sm:text-sm font-semibold text-cyan-400 mb-2 sm:mb-3 uppercase tracking-wider">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techs.map((tech, techIndex) => (
                        <span 
                          key={techIndex} 
                          className="px-2 sm:px-3 py-1 bg-white/10 border border-white/20 text-slate-200 text-xs sm:text-sm rounded-full hover:bg-white/20 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setModalContent({...project, index})}
                    className="group/btn flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 font-medium text-sm sm:text-base"
                  >
                    <span>Learn More</span>
                    <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Modal */}
      {modalContent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className={`absolute inset-0 bg-gradient-to-br ${modalContent.gradient} opacity-5 rounded-3xl pointer-events-none z-0`}></div>
            
            <button 
              type="button"
              aria-label="Close"
              onClick={() => setModalContent(null)} 
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 hover:bg-white/10 rounded-xl transition-colors duration-300 z-20 pointer-events-auto"
            >
              <X size={20} className="sm:hidden" />
              <X size={24} className="hidden sm:block" />
            </button>

            <div className="relative z-10">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 pr-12">
                <div className={`p-2 sm:p-3 rounded-2xl bg-gradient-to-br ${modalContent.gradient} text-white`}>
                  {modalContent.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {modalContent.title}
                </h3>
              </div>
              
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
                {modalContent.longDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => window.open(modalContent.github, '_blank')}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 font-medium shadow-lg"
                >
                  <Github size={18} />
                  View Repository
                </button>
                <button
                  onClick={() => setModalContent(null)}
                  className="px-6 py-3 border border-slate-600 hover:border-cyan-400 rounded-xl transition-all duration-300 hover:bg-cyan-400/10 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Footer */}
      <footer className="relative mt-16 sm:mt-20 md:mt-24 border-t border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 text-center">
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3 sm:mb-4">
              Let&apos;s Build Something Amazing Together
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              Always excited to collaborate on innovative projects and explore new technological frontiers.
            </p>
          </div>

          <div className="flex justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <button
              type="button"
              onClick={() => {
                if (socialLinks.mail) {
                  window.location.href = socialLinks.mail;
                }
              }}
              disabled={!socialLinks.mail}
              className="p-3 sm:p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mail size={20} className="sm:hidden text-cyan-400" />
              <Mail size={24} className="hidden sm:block text-cyan-400" />
            </button>
            <button
              type="button"
              onClick={() => socialLinks.linkedin && window.open(socialLinks.linkedin, "_blank")}
              disabled={!socialLinks.linkedin}
              className="p-3 sm:p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Linkedin size={20} className="sm:hidden text-purple-400" />
              <Linkedin size={24} className="hidden sm:block text-purple-400" />
            </button>
            <button
              type="button"
              onClick={() => socialLinks.github && window.open(socialLinks.github, "_blank")}
              disabled={!socialLinks.github}
              className="p-3 sm:p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-400/50 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Github size={20} className="sm:hidden text-pink-400" />
              <Github size={24} className="hidden sm:block text-pink-400" />
            </button>
          </div>

          <div className="border-t border-white/10 pt-6 sm:pt-8">
            <p className="text-slate-500 text-xs sm:text-sm">
              © {new Date().getFullYear()} Samed Furkan DEMİR. Crafted with passion and innovation.
              <br />
              PS: This website is developed by AI without typing not even single line of code.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}