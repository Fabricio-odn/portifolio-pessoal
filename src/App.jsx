import React from "react";
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
import { useEffect, useState } from "react"; // Adicionado useState e useEffect

// --- COMPONENTES AUXILIARES ---
const NavLink = ({ to, children }) => (
  <motion.a
    href={`#${to}`}
    whileHover={{ scale: 1.05, color: "#fff" }}
    whileTap={{ scale: 0.95 }}
    className="hover:text-white transition-colors relative group text-sm font-medium cursor-pointer"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full opacity-0 group-hover:opacity-100 duration-300"></span>
  </motion.a>
);

// --- VARIANTES DE ANIMAÇÃO ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

function App() {
  // --- ESTADO PARA O GITHUB ---
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  // SEU USUÁRIO DO GITHUB AQUI
  const GITHUB_USERNAME = "fabricio-odn";

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/fabricio-odn/repos`,
        );
        const data = await response.json();

        // Filtra: Apenas projetos que NÃO são forks e têm descrição
        // Você pode adicionar && repo.topics.includes('portfolio') se quiser filtrar mais
        const filtered = data
          .filter((repo) => !repo.fork && repo.description)
          .slice(0, 4);

        setRepos(filtered);
      } catch (error) {
        console.error("Erro ao buscar repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden relative">
      <style>{`html { scroll-behavior: smooth; }`}</style>

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-blue-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[10%] right-[-5%] w-100 h-100 bg-cyan-500/10 rounded-full blur-[100px]"
        />
      </div>

      {/* --- NAVBAR --- */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div className="pointer-events-auto bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl shadow-black/50">
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.05 }}
            className="font-bold text-lg tracking-tight bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent cursor-pointer bg-transparent border-none"
          >
            F.Oliveira
          </motion.button>
          <div className="hidden md:flex gap-6 items-center text-neutral-400">
            <NavLink to="stack">Stack</NavLink>
            <NavLink to="servicos">Soluções</NavLink>
            <NavLink to="projetos">Projetos</NavLink>
          </div>
          <motion.a
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.15)",
            }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/5511958980732"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 text-white px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
          >
            Contato
          </motion.a>
        </div>
      </motion.nav>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-40 pb-20 px-6 container mx-auto text-center flex flex-col items-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Disponível para Projetos & Consultoria
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl bg-linear-to-b from-white via-white to-neutral-500 bg-clip-text text-transparent"
          >
            Engenharia de Software <br /> & Inteligência em TI
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-10 leading-relaxed"
          >
            Eu construo a ponte entre infraestrutura robusta e desenvolvimento
            moderno. Fundador da{" "}
            <span className="text-cyan-400 font-semibold">
              Oliveira Solutions
            </span>
            .
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
          >
            <motion.a
              href="#projetos"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2 cursor-pointer no-underline"
            >
              Ver Portfólio{" "}
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-800/50 hover:bg-neutral-800 border border-white/5 text-white px-8 py-4 rounded-xl font-semibold transition-colors backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Github size={18} /> GitHub
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* --- STACK --- */}
      <section
        id="stack"
        className="scroll-mt-32 py-20 px-6 container mx-auto relative z-10"
      >
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold mb-10 flex items-center gap-2"
        >
          <Terminal size={24} className="text-cyan-500" /> Minha Stack
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 bg-neutral-900/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-cyan-500/30 transition-colors group"
          >
            <div className="bg-linear-to-br from-blue-500/20 to-transparent p-3 w-fit rounded-lg mb-4 text-blue-400 group-hover:text-white transition-colors">
              <Code2 size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">
              Desenvolvimento Fullstack
            </h3>
            <p className="text-neutral-400 mb-6">
              Foco em performance e interfaces modernas.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "React",
                "Vite",
                "Tailwind",
                "Node.js",
                "TypeScript",
                "Chakra UI",
                "Git",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-neutral-300 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-neutral-900/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-green-500/30 transition-colors group"
          >
            <div className="bg-linear-to-br from-green-500/20 to-transparent p-3 w-fit rounded-lg mb-4 text-green-400 group-hover:text-white transition-colors">
              <Cpu size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Infra & OS</h3>
            <p className="text-neutral-400 mb-4 text-sm">
              Ambientes Linux e Cloud Microsoft.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Fedora", "Linux", "ZSH", "Office 365", "Azure", "AWS"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-neutral-300 font-mono"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SERVIÇOS --- */}
      <section
        id="servicos"
        className="scroll-mt-32 py-20 px-6 container mx-auto relative z-10"
      >
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
        <div className="grid md:grid-cols-3 gap-6">
          <ServiceCard
            delay={0.1}
            icon={<Globe />}
            title="Migração Cloud"
            desc="Especialista em Microsoft 365 e Google Workspace. Leve sua empresa para a nuvem."
            gradient="from-blue-500/20"
          />
          <ServiceCard
            delay={0.2}
            icon={<ShieldCheck />}
            title="Segurança de Redes"
            desc="Proteção de dados, configuração de Firewalls e VPNs para acesso remoto seguro."
            gradient="from-purple-500/20"
          />
          <ServiceCard
            delay={0.3}
            icon={<Zap />}
            title="Automação Web"
            desc="Landing pages de alta conversão e sistemas web personalizados para o seu negócio."
            gradient="from-cyan-500/20"
          />
        </div>
      </section>

      {/* --- PROJETOS (HÍBRIDO: FIXO + API) --- */}
      <section
        id="projetos"
        className="scroll-mt-32 py-20 px-6 container mx-auto relative z-10"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-10"
        >
          Projetos Selecionados
        </motion.h2>

        <div className="space-y-8">
          {/* 1. PROJETO DESTAQUE (FIXO - Oliveira Solutions) */}
          <ProjectRow
            title="Oliveira Solutions Portal"
            category="Institucional & Infra"
            techs={["React", "Tailwind", "Vercel", "SEO"]}
            desc="Plataforma SPA de alta performance. Desenvolvida com arquitetura de componentes React e Tailwind CSS mobile-first. Inclui otimização de SEO técnico e automação de deploy."
            status="Online"
            links={{ demo: "https://oliveirasolutions.com.br" }}
          />

          {/* 2. PROJETOS DA API DO GITHUB */}
          {loading ? (
            // Skeleton Loading (Enquanto carrega)
            <div className="animate-pulse flex flex-col gap-4">
              <div className="h-40 bg-white/5 rounded-2xl w-full"></div>
              <div className="h-40 bg-white/5 rounded-2xl w-full"></div>
            </div>
          ) : (
            // Lista Real do GitHub
            repos.map((repo) => (
              <ProjectRow
                key={repo.id}
                title={repo.name.replace(/-/g, " ")} // Formata nome
                category="Open Source"
                techs={[repo.language || "Code", "GitHub"]} // Pega linguagem principal
                desc={
                  repo.description ||
                  "Projeto desenvolvido com foco em qualidade de código e performance."
                }
                status="GitHub"
                links={{
                  repo: repo.html_url,
                  demo: repo.homepage, // Se tiver link no "About" do repo, aparece aqui
                }}
              />
            ))
          )}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-white/5 relative z-10 bg-neutral-950">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-500 text-sm">© 2026 Oliveira Solutions.</p>
          <div className="flex gap-4">
            <SocialIcon
              icon={<Linkedin size={20} />}
              href="https://linkedin.com/in/seu-perfil"
            />
            <SocialIcon
              icon={<Github size={20} />}
              href={`https://github.com/${GITHUB_USERNAME}`}
            />
            <SocialIcon
              icon={<Mail size={20} />}
              href="mailto:contato@email.com"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- COMPONENTES VISUAIS --- (Mantidos iguais)

function ServiceCard({ icon, title, desc, gradient, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-neutral-900/30 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:bg-white/5 transition-colors group cursor-default"
    >
      <div
        className={`w-12 h-12 rounded-lg bg-linear-to-br ${gradient} to-transparent flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-neutral-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function ProjectRow({ title, techs, desc, status, links }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="group relative bg-neutral-900/20 border border-white/5 rounded-2xl p-6 md:p-8 hover:border-white/10 hover:bg-neutral-900/40 transition-colors flex flex-col md:flex-row gap-6 items-start md:items-center"
    >
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors capitalize">
            {title}
          </h3>
          <span
            className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${status === "Online" ? "border-green-500/30 text-green-400 bg-green-500/10" : "border-blue-500/30 text-blue-400 bg-blue-500/10"}`}
          >
            {status}
          </span>
        </div>
        <p className="text-neutral-400 text-sm mb-4 max-w-2xl">{desc}</p>
        <div className="flex flex-wrap gap-3">
          {techs.map((t) => (
            <span key={t} className="text-xs text-neutral-500 font-mono">
              #{t}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform md:translate-x-4 md:group-hover:translate-x-0">
        {links?.demo && (
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-white/5 cursor-pointer no-underline"
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
            className="bg-neutral-800 border border-white/10 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-neutral-700 cursor-pointer no-underline"
          >
            Ver Código <Github size={14} />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}

function SocialIcon({ icon, href }) {
  return (
    <motion.a
      whileHover={{ y: -3, color: "#fff" }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-neutral-400 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
    >
      {icon}
    </motion.a>
  );
}

export default App;
