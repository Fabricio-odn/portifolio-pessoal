import React from "react";
/**
 * =============================================================================
 * PORTFOLIO - F. OLIVEIRA
 * =============================================================================
 * Arquivo principal do portfólio pessoal.
 *
 * ESTRUTURA:
 * - Configurações e constantes
 * - Funções utilitárias
 * - Variantes de animação (Framer Motion)
 * - Componentes auxiliares (NavLink, ServiceCard, ProjectRow, etc.)
 * - Seções da página (Hero, Stack, Services, Projects, Footer)
 * - Componente principal App
 *
 * @author Fabricio Oliveira
 * @version 2.0.0
 * =============================================================================
 */

import { motion } from "framer-motion";
import {
  ChevronRight,
  Code2,
  Cpu,
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  Mail,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

/* =============================================================================
   CONFIGURAÇÕES E CONSTANTES
   ============================================================================= */

/** Usuário do GitHub para buscar repositórios */
const GITHUB_USERNAME = "fabricio-odn";

/** Número máximo de repositórios a exibir */
const MAX_REPOS = 4;

/** Link do WhatsApp para contato */
const WHATSAPP_LINK = "https://wa.me/5511958980732";

/** Dados das tecnologias da stack */
const STACK_DATA = {
  development: {
    title: "Desenvolvimento Fullstack",
    description: "Foco em performance e interfaces modernas.",
    icon: Code2,
    color: "blue",
    tags: [
      "React",
      "Vite",
      "Tailwind",
      "Node.js",
      "TypeScript",
      "Chakra UI",
      "Git",
    ],
  },
  infrastructure: {
    title: "Infra & OS",
    description: "Ambientes Linux e Cloud Microsoft.",
    icon: Cpu,
    color: "green",
    tags: ["Fedora", "Linux", "ZSH", "Office 365", "Azure", "AWS"],
  },
};

/** Dados dos serviços oferecidos */
const SERVICES_DATA = [
  {
    icon: Globe,
    title: "Migração Cloud",
    description:
      "Especialista em Microsoft 365 e Google Workspace. Leve sua empresa para a nuvem.",
    gradient: "from-blue-500/20",
    delay: 0.1,
  },
  {
    icon: ShieldCheck,
    title: "Segurança de Redes",
    description:
      "Proteção de dados, configuração de Firewalls e VPNs para acesso remoto seguro.",
    gradient: "from-purple-500/20",
    delay: 0.2,
  },
  {
    icon: Zap,
    title: "Automação Web",
    description:
      "Landing pages de alta conversão e sistemas web personalizados para o seu negócio.",
    gradient: "from-cyan-500/20",
    delay: 0.3,
  },
];

/** Projeto fixo em destaque */
const FEATURED_PROJECT = {
  title: "Oliveira Solutions Portal",
  category: "Institucional & Infra",
  techs: ["React", "Tailwind", "Vercel", "SEO"],
  description:
    "Plataforma SPA de alta performance. Desenvolvida com arquitetura de componentes React e Tailwind CSS mobile-first. Inclui otimização de SEO técnico e automação de deploy.",
  status: "Online",
  links: { demo: "https://oliveirasolutions.com.br" },
};

/** Links das redes sociais */
const SOCIAL_LINKS = [
  { icon: Linkedin, href: "https://linkedin.com/in/seu-perfil" },
  { icon: Github, href: `https://github.com/${GITHUB_USERNAME}` },
  { icon: Mail, href: "mailto:contato@email.com" },
];

/* =============================================================================
   FUNÇÕES UTILITÁRIAS
   ============================================================================= */

/**
 * Realiza scroll suave até um elemento da página
 * @param {string} elementId - ID do elemento de destino
 */
const smoothScrollTo = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

/**
 * Formata o nome do repositório removendo hífens
 * @param {string} name - Nome do repositório
 * @returns {string} Nome formatado
 */
const formatRepoName = (name) => name.replace(/-/g, " ");

/**
 * Extrai as tecnologias do repositório (topics ou language)
 * @param {Object} repo - Objeto do repositório
 * @returns {string[]} Array de tecnologias
 */
const getRepoTechs = (repo) => {
  if (repo.topics?.length > 0) {
    return repo.topics.slice(0, 3);
  }
  return [repo.language || "Code"];
};

/* =============================================================================
   VARIANTES DE ANIMAÇÃO (FRAMER MOTION)
   ============================================================================= */

/** Animação de fade in com movimento para cima */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/** Container com animação stagger para filhos */
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

/* =============================================================================
   COMPONENTES AUXILIARES
   ============================================================================= */

/**
 * Link de navegação com animação e underline
 * @param {Object} props - { to: string, children: ReactNode }
 */
const NavLink = ({ to, children }) => (
  <motion.a
    href={`#${to}`}
    onClick={(e) => {
      e.preventDefault();
      smoothScrollTo(to);
    }}
    whileHover={{ scale: 1.05, color: "#fff" }}
    whileTap={{ scale: 0.95 }}
    className="
      hover:text-white transition-colors relative group 
      text-sm font-medium cursor-pointer
    "
  >
    {children}
    {/* Underline animado */}
    <span
      className="
        absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 
        transition-all group-hover:w-full 
        opacity-0 group-hover:opacity-100 duration-300
      "
    />
  </motion.a>
);

/**
 * Tag de tecnologia/skill
 * @param {Object} props - { children: string }
 */
const TechTag = ({ children }) => (
  <span
    className="
      px-3 py-1 rounded-md bg-white/5 border border-white/5 
      text-xs text-neutral-300 font-mono
    "
  >
    {children}
  </span>
);

/**
 * Card de serviço com ícone e animação
 * @param {Object} props - { icon, title, description, gradient, delay }
 */
const ServiceCard = ({ icon: Icon, title, description, gradient, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5 }}
    className="
      bg-neutral-900/30 backdrop-blur-sm border border-white/5 
      p-6 rounded-2xl hover:bg-white/5 transition-colors 
      group cursor-default
    "
  >
    {/* Ícone com gradiente */}
    <div
      className={`
        w-12 h-12 rounded-lg bg-linear-to-br ${gradient} to-transparent 
        flex items-center justify-center text-white mb-4 
        group-hover:scale-110 transition-transform
      `}
    >
      {Icon && <Icon size={24} />}
    </div>

    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-neutral-400 leading-relaxed">{description}</p>
  </motion.div>
);

/**
 * Card de projeto com links e tecnologias
 * @param {Object} props - { title, techs, description, status, links }
 */
const ProjectRow = ({ title, techs, description, status, links }) => {
  // Define cor do status badge
  const statusClasses =
    status === "Online"
      ? "border-green-500/30 text-green-400 bg-green-500/10"
      : "border-blue-500/30 text-blue-400 bg-blue-500/10";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="
        group relative bg-neutral-900/20 border border-white/5 
        rounded-2xl p-6 md:p-8 hover:border-white/10 hover:bg-neutral-900/40 
        transition-colors flex flex-col md:flex-row gap-6 
        items-start md:items-center
      "
    >
      {/* Conteúdo principal */}
      <div className="flex-1">
        {/* Título e badge de status */}
        <div className="flex items-center gap-3 mb-2">
          <h3
            className="
              text-xl font-bold text-white 
              group-hover:text-cyan-400 transition-colors capitalize
            "
          >
            {title}
          </h3>
          <span
            className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${statusClasses}`}
          >
            {status}
          </span>
        </div>

        {/* Descrição */}
        <p className="text-neutral-400 text-sm mb-4 max-w-2xl">{description}</p>

        {/* Tags de tecnologia */}
        <div className="flex flex-wrap gap-3">
          {techs.map((tech) => (
            <span key={tech} className="text-xs text-neutral-500 font-mono">
              #{tech}
            </span>
          ))}
        </div>
      </div>

      {/* Botões de ação (aparecem no hover em desktop) */}
      <div
        className="
          flex flex-col sm:flex-row gap-3 w-full md:w-auto 
          mt-4 md:mt-0 md:opacity-0 md:group-hover:opacity-100 
          transition-all duration-300 transform 
          md:translate-x-4 md:group-hover:translate-x-0
        "
      >
        {links?.demo && (
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-white text-black px-4 py-2 rounded-lg font-bold text-sm 
              flex items-center justify-center gap-2 
              shadow-lg shadow-white/5 cursor-pointer no-underline
            "
          >
            Visitar <ExternalLink size={14} />
          </motion.a>
        )}
        {links?.repo && (
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-neutral-800 border border-white/10 text-white 
              px-4 py-2 rounded-lg font-bold text-sm 
              flex items-center justify-center gap-2 
              hover:bg-neutral-700 cursor-pointer no-underline
            "
          >
            Ver Código <Github size={14} />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

/**
 * Ícone de rede social com link
 * @param {Object} props - { icon, href }
 */
const SocialIcon = ({ icon: Icon, href }) => (
  <motion.a
    whileHover={{ y: -3, color: "#fff" }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="
      text-neutral-400 p-2 hover:bg-white/5 
      rounded-lg transition-colors cursor-pointer
    "
  >
    {Icon && <Icon size={20} />}
  </motion.a>
);

/**
 * Skeleton de loading para projetos
 */
const ProjectSkeleton = () => (
  <div className="animate-pulse flex flex-col gap-4">
    <div className="h-40 bg-white/5 rounded-2xl w-full" />
    <div className="h-40 bg-white/5 rounded-2xl w-full" />
  </div>
);

/**
 * Indicador de disponibilidade (pulsante)
 */
const AvailabilityBadge = () => (
  <motion.div
    variants={fadeInUp}
    className="
      inline-flex items-center gap-2 px-3 py-1 rounded-full 
      bg-blue-500/10 border border-blue-500/20 
      text-blue-400 text-xs font-mono mb-8
    "
  >
    {/* Ponto pulsante */}
    <span className="relative flex h-2 w-2">
      <span
        className="
          animate-ping absolute inline-flex h-full w-full 
          rounded-full bg-blue-400 opacity-75
        "
      />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
    </span>
    Disponível para Projetos & Consultoria
  </motion.div>
);

/* =============================================================================
   SEÇÕES DA PÁGINA
   ============================================================================= */

/**
 * Efeitos de background animados (blobs)
 */
const BackgroundEffects = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    {/* Blob azul - superior esquerdo */}
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="
        absolute top-[-10%] left-[-10%] w-125 h-125 
        bg-blue-600/20 rounded-full blur-[120px]
      "
    />
    {/* Blob cyan - inferior direito */}
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      }}
      className="
        absolute bottom-[10%] right-[-5%] w-100 h-100 
        bg-cyan-500/10 rounded-full blur-[100px]
      "
    />
  </div>
);

/**
 * Navbar flutuante com navegação
 */
const Navbar = () => (
  <motion.nav
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
    className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
  >
    <div
      className="
        pointer-events-auto bg-neutral-900/80 backdrop-blur-xl 
        border border-white/10 rounded-full px-6 py-3 
        flex items-center gap-8 shadow-2xl shadow-black/50
      "
    >
      {/* Logo/Nome - volta ao topo */}
      <button
        type="button"
        onClick={() => smoothScrollTo("top")}
        className="
          font-bold text-lg tracking-tight 
          bg-linear-to-r from-blue-400 to-cyan-300 
          bg-clip-text text-transparent cursor-pointer 
          bg-transparent border-none outline-none 
          hover:scale-105 transition-transform
        "
      >
        F.Oliveira
      </button>

      {/* Links de navegação (visíveis apenas em desktop) */}
      <div className="hidden md:flex gap-6 items-center text-neutral-400">
        <NavLink to="stack">Stack</NavLink>
        <NavLink to="servicos">Soluções</NavLink>
        <NavLink to="projetos">Projetos</NavLink>
      </div>

      {/* Botão de contato (WhatsApp) */}
      <motion.a
        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
        whileTap={{ scale: 0.95 }}
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="
          bg-white/10 text-white px-4 py-1.5 rounded-full 
          text-xs font-bold transition-all cursor-pointer 
          flex items-center gap-2
        "
      >
        Contato
      </motion.a>
    </div>
  </motion.nav>
);

/**
 * Seção Hero - Apresentação principal com título e CTAs
 */
const HeroSection = () => (
  <section className="relative z-10 pt-40 pb-20 px-6 container mx-auto text-center flex flex-col items-center">
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center"
    >
      {/* Badge de disponibilidade */}
      <AvailabilityBadge />

      {/* Título principal */}
      <motion.h1
        variants={fadeInUp}
        className="
          text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl 
          bg-linear-to-b from-white via-white to-neutral-500 
          bg-clip-text text-transparent
        "
      >
        Engenharia de Software <br /> & Inteligência em TI
      </motion.h1>

      {/* Subtítulo/Descrição */}
      <motion.p
        variants={fadeInUp}
        className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-10 leading-relaxed"
      >
        Eu construo a ponte entre infraestrutura robusta e desenvolvimento
        moderno. Fundador da{" "}
        <span className="text-cyan-400 font-semibold">Oliveira Solutions</span>.
      </motion.p>

      {/* Botões de ação (CTAs) */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
      >
        {/* CTA Principal - Ver Portfólio */}
        <motion.a
          href="#projetos"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo("projetos");
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            group bg-blue-600 hover:bg-blue-500 text-white 
            px-8 py-4 rounded-xl font-semibold transition-colors 
            shadow-[0_0_20px_rgba(37,99,235,0.3)] 
            hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] 
            flex items-center justify-center gap-2 
            cursor-pointer no-underline
          "
        >
          Ver Portfólio
          <ChevronRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </motion.a>

        {/* CTA Secundário - GitHub */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="
            bg-neutral-800/50 hover:bg-neutral-800 border border-white/5 
            text-white px-8 py-4 rounded-xl font-semibold transition-colors 
            backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer
          "
        >
          <Github size={18} /> GitHub
        </motion.a>
      </motion.div>
    </motion.div>
  </section>
);

/**
 * Seção Stack - Tecnologias e habilidades
 */
const StackSection = () => (
  <section
    id="stack"
    className="scroll-mt-32 py-20 px-6 container mx-auto relative z-10"
  >
    {/* Título da seção */}
    <motion.h2
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-2xl font-bold mb-10 flex items-center gap-2"
    >
      <Terminal size={24} className="text-cyan-500" /> Minha Stack
    </motion.h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card de Desenvolvimento (ocupa 2 colunas em desktop) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="
          md:col-span-2 bg-neutral-900/40 backdrop-blur-md 
          border border-white/10 p-8 rounded-2xl 
          hover:border-cyan-500/30 transition-colors group
        "
      >
        <div
          className="
            bg-linear-to-br from-blue-500/20 to-transparent 
            p-3 w-fit rounded-lg mb-4 text-blue-400 
            group-hover:text-white transition-colors
          "
        >
          <Code2 size={24} />
        </div>
        <h3 className="text-xl font-bold mb-2">
          {STACK_DATA.development.title}
        </h3>
        <p className="text-neutral-400 mb-6">
          {STACK_DATA.development.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {STACK_DATA.development.tags.map((tag) => (
            <TechTag key={tag}>{tag}</TechTag>
          ))}
        </div>
      </motion.div>

      {/* Card de Infraestrutura */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="
          bg-neutral-900/40 backdrop-blur-md border border-white/10 
          p-8 rounded-2xl hover:border-green-500/30 transition-colors group
        "
      >
        <div
          className="
            bg-linear-to-br from-green-500/20 to-transparent 
            p-3 w-fit rounded-lg mb-4 text-green-400 
            group-hover:text-white transition-colors
          "
        >
          <Cpu size={24} />
        </div>
        <h3 className="text-xl font-bold mb-2">
          {STACK_DATA.infrastructure.title}
        </h3>
        <p className="text-neutral-400 mb-4 text-sm">
          {STACK_DATA.infrastructure.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {STACK_DATA.infrastructure.tags.map((tag) => (
            <TechTag key={tag}>{tag}</TechTag>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

/**
 * Seção Serviços - Cards de consultoria
 */
const ServicesSection = () => (
  <section
    id="servicos"
    className="scroll-mt-32 py-20 px-6 container mx-auto relative z-10"
  >
    {/* Header da seção */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-10"
    >
      <h2 className="text-3xl font-bold text-white mb-2">Consultoria</h2>
      <p className="text-neutral-400">
        Soluções empresariais via Oliveira Solutions
      </p>
    </motion.div>

    {/* Grid de cards de serviços */}
    <div className="grid md:grid-cols-3 gap-6">
      {SERVICES_DATA.map((service) => (
        <ServiceCard
          key={service.title}
          icon={service.icon}
          title={service.title}
          description={service.description}
          gradient={service.gradient}
          delay={service.delay}
        />
      ))}
    </div>
  </section>
);

/**
 * Seção Projetos - Projeto fixo + repositórios do GitHub
 * @param {Object} props - { repos: array, loading: boolean }
 */
const ProjectsSection = ({ repos, loading }) => (
  <section
    id="projetos"
    className="scroll-mt-32 py-20 px-6 container mx-auto relative z-10"
  >
    {/* Título da seção */}
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-3xl font-bold mb-10"
    >
      Projetos Selecionados
    </motion.h2>

    <div className="space-y-8">
      {/* Projeto em destaque (fixo) */}
      <ProjectRow
        title={FEATURED_PROJECT.title}
        techs={FEATURED_PROJECT.techs}
        description={FEATURED_PROJECT.description}
        status={FEATURED_PROJECT.status}
        links={FEATURED_PROJECT.links}
      />

      {/* Projetos dinâmicos do GitHub */}
      {loading ? (
        <ProjectSkeleton />
      ) : (
        repos.map((repo) => (
          <ProjectRow
            key={repo.id}
            title={formatRepoName(repo.name)}
            techs={getRepoTechs(repo)}
            description={
              repo.description ||
              "Projeto desenvolvido com foco em qualidade de código e performance."
            }
            status="GitHub"
            links={{
              repo: repo.html_url,
              demo: repo.homepage || null,
            }}
          />
        ))
      )}
    </div>
  </section>
);

/**
 * Rodapé - Copyright e redes sociais
 */
const Footer = () => (
  <footer className="py-12 border-t border-white/5 relative z-10 bg-neutral-950">
    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      {/* Copyright com ano dinâmico */}
      <p className="text-neutral-500 text-sm">
        © {new Date().getFullYear()} Oliveira Solutions.
      </p>

      {/* Ícones de redes sociais */}
      <div className="flex gap-4">
        {SOCIAL_LINKS.map(({ icon, href }) => (
          <SocialIcon key={href} icon={icon} href={href} />
        ))}
      </div>
    </div>
  </footer>
);

/* =============================================================================
   COMPONENTE PRINCIPAL
   ============================================================================= */

/**
 * App - Componente raiz da aplicação
 * Gerencia o estado dos repositórios e renderiza todas as seções
 */
function App() {
  // ─────────────────────────────────────────────────────────────────────────────
  // Estado
  // ─────────────────────────────────────────────────────────────────────────────

  /** Lista de repositórios do GitHub */
  const [repos, setRepos] = useState([]);

  /** Estado de carregamento da API */
  const [loading, setLoading] = useState(true);

  // ─────────────────────────────────────────────────────────────────────────────
  // Efeitos
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Busca repositórios do GitHub ao montar o componente
   * Filtra apenas repos públicos com descrição (não-forks)
   */
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos`,
        );
        const data = await response.json();

        // Filtra e limita os repositórios
        const filtered = data
          .filter((repo) => !repo.fork && repo.description)
          .slice(0, MAX_REPOS);

        setRepos(filtered);
      } catch (error) {
        console.error("Erro ao buscar repositórios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div
      id="top"
      className="
        min-h-screen bg-neutral-950 text-white font-sans 
        selection:bg-cyan-500/30 overflow-x-hidden relative
      "
    >
      {/* Background animado */}
      <BackgroundEffects />

      {/* Navegação fixa */}
      <Navbar />

      {/* Conteúdo principal */}
      <main>
        <HeroSection />
        <StackSection />
        <ServicesSection />
        <ProjectsSection repos={repos} loading={loading} />
      </main>

      {/* Rodapé */}
      <Footer />
    </div>
  );
}

export default App;
