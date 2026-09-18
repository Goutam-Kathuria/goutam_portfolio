import {
  ChevronRight,
  Database,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  Server,
  Sun,
  Wrench,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import CustomCursor from "./components/CustomCursor";
import LoadingScreen from "./components/LoadingScreen";

const PROFILE_IMAGE = "/assets/uploads/me.png";
const RESUME_PATH = "/resume.pdf";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = [
  "home",
  "projects",
  "experience",
  "skills",
  "about",
  "education",
  "contact",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const stored = localStorage.getItem("theme");
    return (stored as "dark" | "light") ?? "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggleTheme };
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function SectionSeparator() {
  return (
    <div className="max-w-[1200px] mx-auto px-6">
      <hr className="border-[#1F2937] dark:border-[#1F2937] border-t" />
    </div>
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <div className="mb-12">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="text-3xl font-bold text-foreground"
      >
        {children}
      </motion.h2>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-3 h-1 w-12 rounded-full bg-accent"
        style={{ backgroundColor: "var(--primary-color)" }}
      />
    </div>
  );
}

function Navbar({
  active,
  theme,
  toggleTheme,
}: {
  active: string;
  theme: "dark" | "light";
  toggleTheme: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navBg =
    theme === "dark"
      ? "bg-[#0B0F1480] backdrop-blur-md border-b border-[#1F2937]"
      : "bg-white/80 backdrop-blur-md border-b border-[#E5E7EB]";

  return (
    <header
      data-ocid="nav.section"
      className={`fixed top-0 left-0 right-0 z-50 ${navBg}`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollTo("home")}
          className="text-xl font-bold tracking-tight"
          data-ocid="nav.link"
          data-cursor-hover
        >
          <span className="text-cyan">GK</span>
          <span className="text-foreground">.DEV</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link.label}
              onClick={() => scrollTo(link.href.replace("#", ""))}
              data-ocid="nav.link"
              data-cursor-hover
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
                active === link.href.replace("#", "")
                  ? "text-cyan"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {active === link.href.replace("#", "") && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
                  style={{ backgroundColor: "var(--primary-color)" }}
                />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            data-ocid="nav.toggle"
            data-cursor-hover
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            data-ocid="nav.toggle"
            data-cursor-hover
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden border-t ${
              theme === "dark"
                ? "border-[#1F2937] bg-[#0B0F14]/98"
                : "border-[#E5E7EB] bg-white/98"
            } backdrop-blur-md px-6 py-4 flex flex-col gap-1`}
          >
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={() => {
                  setMenuOpen(false);
                  scrollTo(link.href.replace("#", ""));
                }}
                data-ocid="nav.link"
                data-cursor-hover
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-left ${
                  active === link.href.replace("#", "")
                    ? "text-cyan"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  return (
    <section id="home" className="pt-24 pb-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="rounded-2xl border border-border bg-card p-8 md:p-12 shadow-card"
          style={{
            background:
              "linear-gradient(135deg, var(--tw-hero-start, #111827) 0%, var(--tw-hero-end, #0B0F14) 100%)",
          }}
        >
          {/* Desktop: text left, image right | Mobile: image top, text bottom */}
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
            {/* Image (on mobile appears first via order, on desktop right) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
              className="flex-shrink-0 order-first md:order-last"
            >
              <div className="relative w-56 h-56 md:w-64 md:h-64">
                <div
                  className="absolute inset-0 rounded-full opacity-50 blur-md"
                  style={{
                    background:
                      "radial-gradient(circle, var(--primary-color) 0%, transparent 70%)",
                  }}
                />
                <img
                  src={PROFILE_IMAGE}
                  alt="Goutam Kathuria"
                  className="w-full h-full rounded-full object-cover object-[center_14%] border-2 border-cyan relative z-10"
                  style={{
                    boxShadow:
                      "0 0 30px color-mix(in oklch, var(--primary-color) 30%, transparent)",
                  }}
                />
              </div>
            </motion.div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left order-last md:order-first">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3"
              >
                Full Stack Developer
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-tight tracking-tight mb-5"
              >
                Goutam Kathuria
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-xl font-medium text-white/80 mb-4 max-w-lg"
              >
                Full Stack Developer — React.js, Next.js, Vue.js, Node.js & APIs
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-white/65 text-base mb-8 max-w-md leading-relaxed"
              >
                I build production web applications, backend systems, admin panels, AI integrations, and workflow automation.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-wrap gap-3 justify-center md:justify-start mb-8"
              >
                <button
                  type="button"
                  onClick={() => scrollTo("projects")}
                  data-ocid="hero.primary_button"
                  data-cursor-hover
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan text-[#0B0F14] font-semibold text-sm hover:brightness-110 hover:scale-[1.03] transition-all glow-accent"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    color: "#fff",
                  }}
                >
                  View Projects <ChevronRight className="w-4 h-4" />
                </button>
                <a
                  href={RESUME_PATH}
                  download="Goutam-Kathuria-Resume.pdf"
                  data-ocid="hero.resume_button"
                  data-cursor-hover
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 bg-white/[0.04] text-white font-semibold text-sm hover:border-cyan hover:text-cyan hover:scale-[1.03] transition-all"
                >
                  Download Resume <Download className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => scrollTo("contact")}
                  data-ocid="hero.secondary_button"
                  data-cursor-hover
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-cyan text-cyan font-semibold text-sm hover:brightness-110 hover:scale-[1.03] transition-all"
                >
                  Contact Me
                </button>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex gap-4 justify-center md:justify-start"
              >
                <a
                  href="https://github.com/Goutam-Kathuria"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="hero.link"
                  data-cursor-hover
                  className="w-10 h-10 rounded-lg border border-white/15 bg-white/[0.03] flex items-center justify-center text-white/65 hover:text-cyan hover:border-cyan hover:bg-white/[0.06] transition-all"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/goutam-kathuria-18915335b"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="hero.link"
                  data-cursor-hover
                  className="w-10 h-10 rounded-lg border border-white/15 bg-white/[0.03] flex items-center justify-center text-white/65 hover:text-cyan hover:border-cyan hover:bg-white/[0.06] transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const ABOUT_HIGHLIGHTS = [
  {
    label: "Full Stack Development",
    text: "Build production applications across React.js, Next.js, Vue.js, Node.js, Express.js, and MongoDB.",
  },
  {
    label: "Production Systems",
    text: "Worked on healthcare, commerce, business management, admin dashboards, and automation products with real operational workflows.",
  },
  {
    label: "Integrations & Automation",
    text: "Worked with Meta and Google integrations, lead platforms, social analytics, n8n workflows, webhooks, and business-specific automation.",
  },
  {
    label: "AI & Product Engineering",
    text: "Built AI-enabled workflows using hosted models and local LLM tooling, alongside backend APIs, dynamic theming, analytics, and custom admin systems.",
  },
];

function AboutSection() {
  return (
    <section id="about" className="py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeading>About Me</SectionHeading>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col md:flex-row items-center md:items-start gap-10 rounded-xl border border-border bg-card p-8 shadow-card"
        >
          {/* Image */}
          <motion.div variants={itemVariants} className="flex-shrink-0">
            <div className="relative w-44 h-44">
              <img
                src={PROFILE_IMAGE}
                alt="Goutam Kathuria"
                className="w-full h-full rounded-full object-cover object-[center_14%] border-2 border-cyan"
                style={{
                  boxShadow:
                    "0 0 20px color-mix(in oklch, var(--primary-color) 25%, transparent)",
                }}
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div variants={itemVariants} className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Full Stack Developer with hands-on production experience across web platforms, admin systems, integrations, and automation
            </h3>
            <ul className="space-y-3">
              {ABOUT_HIGHLIGHTS.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <div
                    className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "var(--primary-color)" }}
                  />
                  <p className="text-sm leading-relaxed">
                    <span className="font-semibold text-foreground">
                      {item.label}:
                    </span>{" "}
                    <span className="text-muted-foreground">{item.text}</span>
                  </p>
                </li>
              ))}
            </ul>

            {/* Quick stats */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "Experience", value: "1+ Year" },
                { label: "Focus", value: "Full Stack + APIs" },
                { label: "Specialization", value: "AI, Integrations & Automation" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="px-4 py-3 rounded-lg bg-muted/50 border border-border"
                >
                  <div className="text-cyan font-bold text-lg">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-xs mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const SKILL_GROUPS = [
  {
    level: "Core",
    icon: Server,
    title: "Full Stack Engineering",
    summary:
      "Building production web applications, backend services, APIs, and data-driven admin systems.",
    skills: [
      "JavaScript (ES6+)",
      "React.js",
      "Next.js",
      "Vue.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "REST APIs",
    ],
  },
  {
    level: "Production",
    icon: Database,
    title: "Product & System Development",
    summary:
      "Hands-on work across business platforms, dashboards, CMS-style controls, and complex application workflows.",
    skills: [
      "Admin Panels",
      "Analytics Dashboards",
      "Dynamic Theming",
      "Role-Based Systems",
      "Multi-Vendor Systems",
      "Payment Integrations",
      "AWS S3",
      "Database Architecture",
    ],
  },
  {
    level: "Integrations",
    icon: Wrench,
    title: "AI, APIs & Automation",
    summary:
      "Connecting external platforms and AI services to custom backend workflows through APIs, webhooks, and automation engines.",
    skills: [
      "Meta APIs",
      "Google APIs",
      "Gemini API",
      "Ollama / Local LLMs",
      "n8n",
      "Facebook Lead Ads",
      "Instagram & Facebook Analytics",
      "WhatsApp Automation",
      "Webhook Integrations",
      "Third-Party APIs",
    ],
  },
];

function SkillsSection() {
  return (
    <section id="skills" className="py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeading>Technical Strengths</SectionHeading>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 xl:grid-cols-3 gap-5"
        >
          {SKILL_GROUPS.map((group) => {
            const Icon = group.icon;
            const isCore = group.level === "Core";

            return (
              <motion.div
                key={group.level}
                variants={itemVariants}
                className={`rounded-xl border bg-card p-6 shadow-card transition-colors group cursor-default ${
                  isCore ? "border-cyan" : "border-border hover:border-cyan"
                }`}
              >
                <div className="flex items-start gap-3 mb-5">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                    style={{
                      background:
                        "color-mix(in oklch, var(--primary-color) 15%, transparent)",
                    }}
                  >
                    <Icon className="w-4 h-4 text-cyan" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan">
                      {group.level}
                    </p>
                    <h3 className="mt-2 font-semibold text-foreground">
                      {group.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {group.summary}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-xs font-medium border border-cyan text-cyan hover:opacity-80 transition-opacity cursor-default"
                      style={{
                        background:
                          "color-mix(in oklch, var(--primary-color) 8%, transparent)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

const PROJECTS = [
  {
    title: "Samarpan Hospital — Healthcare Platform",
    description:
      "Production healthcare website and custom management panel for handling doctors, services, content, leads, analytics, branding, and social integrations.",
    role:
      "Full Stack Developer — website, backend APIs, admin panel, integrations",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Meta APIs"],
    features: [
      "Doctor & service management",
      "Lead management",
      "Content administration",
      "Analytics dashboards",
      "Dynamic branding & colors",
      "Meta account integrations",
      "Facebook Lead Ads",
      "Instagram & Facebook analytics",
    ],
    impact:
      "Centralized healthcare web presence and administrative operations into a single platform.",
  },
  {
    title: "Fivlia — Multi-Vendor Commerce Platform",
    description:
      "Production e-commerce platform with customer, seller, and admin experiences covering catalog, inventory, orders, payments, delivery logic, and operational workflows.",
    role:
      "MERN Stack Developer — backend architecture, APIs, seller/admin systems",
    tech: ["Node.js", "Express.js", "MongoDB", "Mongoose", "React.js"],
    features: [
      "Multi-vendor catalog",
      "Seller & stock management",
      "Order workflows",
      "Admin operations",
      "Payment & delivery logic",
      "Search & product APIs",
    ],
    impact:
      "Real-world commerce infrastructure supporting multiple roles and interconnected operational workflows.",
  },
  {
    title: "Business Review & WhatsApp Automation",
    description:
      "Business automation platform for managing review responses and customer conversations across connected business accounts, with AI-assisted responses and automated workflow execution.",
    role:
      "Full Stack & Automation Developer — backend orchestration, integrations, AI workflows",
    tech: ["Node.js", "Express.js", "n8n", "Gemini API", "Ollama", "Google APIs"],
    features: [
      "Multi-business account management",
      "Automated review responses",
      "AI-assisted reply generation",
      "WhatsApp conversational automation",
      "Webhook-based messaging workflows",
      "Backend-driven workflow orchestration",
    ],
    impact:
      "Reusable automation architecture for business-specific communication and review handling without duplicating the underlying workflow.",
  },
];

const EXP_POINTS = [
  "Built and maintained production REST APIs using Node.js, Express.js, MongoDB, and Mongoose",
  "Developed a healthcare website and custom admin platform covering doctors, services, content, leads, analytics, and operational workflows",
  "Worked with Meta account integrations, Facebook Lead Ads, Instagram/Facebook analytics, and business data workflows",
  "Built automation workflows using n8n, webhooks, AI services, and custom backend orchestration for review and communication use cases",
  "Worked with Google APIs, Gemini-based workflows, and local LLM tooling such as Ollama for AI-enabled application features",
  "Built frontend and admin experiences with React.js and worked across modern JavaScript application architectures including Next.js and Vue.js",
  "Implemented authentication, role-based systems, dynamic website/panel theming, third-party integrations, and production debugging",
];

const EDU_POINTS = [
  "MERN Stack fundamentals — MongoDB, Express.js, React.js, Node.js",
  "Built multiple full-stack projects during intensive training",
  "Explored React Native for mobile development (learning phase)",
  "Strong foundation in REST API design and database architecture",
];

function ProjectsSection() {
  return (
    <section id="projects" className="py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeading>Featured Projects</SectionHeading>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              data-ocid={`projects.item.${i + 1}`}
              className="rounded-2xl border border-border bg-card p-6 shadow-card hover:border-cyan hover:scale-[1.02] hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <h3 className="text-lg font-bold text-foreground mb-2">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              <div className="mb-4">
                <p className="text-xs font-semibold text-cyan uppercase tracking-wider mb-2">
                  Role
                </p>
                <p className="text-foreground/75 text-sm">{project.role}</p>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-cyan uppercase tracking-wider mb-2">
                  Key Features
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.features.map((f) => (
                    <span
                      key={f}
                      className="px-2 py-0.5 rounded-md text-xs bg-muted/70 text-foreground/75 border border-border"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-cyan uppercase tracking-wider mb-2">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md text-xs border border-cyan text-cyan"
                      style={{
                        background:
                          "color-mix(in oklch, var(--primary-color) 8%, transparent)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  <span className="text-cyan">Impact:</span> {project.impact}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeading>Experience</SectionHeading>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-xl border border-border bg-card p-8 shadow-card border-l-4 border-l-cyan"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-foreground">
              Full Stack Developer
            </h3>
            <span className="hidden sm:block text-muted-foreground">·</span>
            <span className="text-cyan font-medium">
              1 Year Professional Experience
            </span>
          </div>
          <p className="text-muted-foreground text-sm mb-6">
            Full-time · Full-stack MERN, backend & automation
          </p>
          <ul className="space-y-3">
            {EXP_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <div
                  className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "var(--primary-color)" }}
                />
                <span className="text-foreground/75 text-sm leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section id="education" className="py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeading>Education</SectionHeading>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-xl border border-border bg-card p-8 shadow-card border-l-4 border-l-cyan"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-foreground">
              Full Stack Development Training
            </h3>
            <span className="hidden sm:block text-muted-foreground">·</span>
            <span className="text-cyan font-medium">1 Year</span>
          </div>
          <p className="text-muted-foreground text-sm mb-6">
            Full-Stack & Mobile Application Development
          </p>
          <ul className="space-y-3">
            {EDU_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <div
                  className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "var(--primary-color)" }}
                />
                <span className="text-foreground/75 text-sm leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl border border-cyan p-12 text-center shadow-card"
          style={{
            background:
              "linear-gradient(135deg, var(--tw-cta-start, #111827) 0%, var(--tw-cta-end, #0B0F14) 100%)",
            boxShadow:
              "0 0 40px color-mix(in oklch, var(--primary-color) 10%, transparent)",
          }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Let's build something impactful
          </h2>
          <p className="text-white/75 text-lg mb-8">
            Open for full-stack, backend, product engineering, and automation-focused opportunities
          </p>
          <button
            type="button"
            onClick={() => scrollTo("contact")}
            data-ocid="cta.primary_button"
            data-cursor-hover
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base hover:brightness-110 hover:scale-[1.03] transition-all glow-accent"
            style={{
              backgroundColor: "var(--primary-color)",
              color: "#fff",
            }}
          >
            Contact Me <ExternalLink className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const contacts = [
    {
      icon: Mail,
      label: "Email",
      value: "goutam.kathuria@gmail.com",
      href: "mailto:goutam.kathuria@gmail.com",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/Goutam-Kathuria",
      href: "https://github.com/Goutam-Kathuria",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/goutam-kathuria",
      href: "https://www.linkedin.com/in/goutam-kathuria-18915335b",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+91 9991374720",
      href: "https://wa.me/919991374720",
    },
  ];

  return (
    <section id="contact" className="py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeading>Get In Touch</SectionHeading>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
        >
          {contacts.map((contact, i) => {
            const Icon = contact.icon;
            return (
              <motion.a
                key={contact.label}
                variants={itemVariants}
                href={contact.href}
                target={
                  contact.href.startsWith("mailto") ? undefined : "_blank"
                }
                rel="noopener noreferrer"
                data-ocid={`contact.item.${i + 1}`}
                data-cursor-hover
                className="rounded-xl border border-border bg-card p-6 shadow-card hover:border-cyan hover:scale-[1.03] transition-all duration-300 group flex flex-col gap-3"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                  style={{
                    background:
                      "color-mix(in oklch, var(--primary-color) 12%, transparent)",
                  }}
                >
                  <Icon className="w-5 h-5 text-cyan" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    {contact.label}
                  </p>
                  <p className="text-sm text-foreground font-medium break-all">
                    {contact.value}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-8">
      <div className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Left */}
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="text-base font-bold tracking-tight"
            data-cursor-hover
          >
            <span className="text-cyan">GK</span>
            <span className="text-foreground">.DEV</span>
          </button>

          {/* Center */}
          <p className="text-xs text-muted-foreground text-center">
            © {year} Goutam Kathuria · Full Stack Developer
          </p>

          {/* Right */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Goutam-Kathuria"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-cyan hover:border-cyan transition-all"
              data-cursor-hover
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/goutam-kathuria-18915335b"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-cyan hover:border-cyan transition-all"
              data-cursor-hover
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href="mailto:goutam.kathuria@gmail.com"
              aria-label="Email"
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-cyan hover:border-cyan transition-all"
              data-cursor-hover
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <LoadingScreen />
      <CustomCursor />
      <Navbar active={activeSection} theme={theme} toggleTheme={toggleTheme} />
      <main>
        <HeroSection />
        <SectionSeparator />
        <ProjectsSection />
        <SectionSeparator />
        <ExperienceSection />
        <SectionSeparator />
        <SkillsSection />
        <SectionSeparator />
        <AboutSection />
        <SectionSeparator />
        <EducationSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
