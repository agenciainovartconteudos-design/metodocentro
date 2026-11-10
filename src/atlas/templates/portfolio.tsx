import { useState } from "react";
import { Asterisk, Plus, MoveUpRight, Mail } from "lucide-react";
import type { TemplateProps, Entity } from "../types";
import { list } from "../types";
import {
  WebsiteNav,
  Button,
  Photo,
  SectionHead,
  Footer,
  ContactModal,
  Modal,
  Tabs,
} from "../shared/ui";
export default function Portfolio({ config }: TemplateProps) {
  const [contact, setContact] = useState(false),
    [category, setCategory] = useState("Todos"),
    [selected, setSelected] = useState<Entity | null>(null);
  const projects = list(config, "projects").filter(
    (p) => category === "Todos" || p.category === category,
  );
  return (
    <>
      <WebsiteNav
        config={config}
        links={[
          { label: "Projetos", href: "#trabalhos" },
          { label: "Sobre", href: "#sobre" },
          { label: "Processo", href: "#processo" },
        ]}
        cta="Vamos criar juntos"
        onAction={() => setContact(true)}
      />
      <main id="main" className="web-main">
        <section className="portfolio-hero">
          <div className="portfolio-kicker hero-enter">
            <span>DESIGNER INDEPENDENTE · BRASIL</span>
            <span>
              <i className="live-dot" />
              UM OLHAR, MUITAS POSSIBILIDADES
            </span>
          </div>
          <h1 className="hero-title hero-enter">{config.content.headline}</h1>
          <div className="portfolio-hero-bottom">
            <div className="portfolio-symbol" aria-hidden="true">
              <Asterisk size={110} strokeWidth={1} />
            </div>
            <p>{config.content.description}</p>
            <a href="#trabalhos" className="portfolio-circle">
              Explore
              <br />o trabalho
              <MoveUpRight size={21} />
            </a>
          </div>
          <div className="portfolio-strip">
            <Photo
              name="abstract.webp"
              alt="Escultura cromada em uma composição azul e lilás"
              loading="eager"
            />
            <span>
              EXPRESSÃO VISUAL
              <br />
              <b>EM MOVIMENTO.</b>
            </span>
            <span className="portfolio-image-label">
              AURORA / IDENTIDADE VISUAL — 2026
            </span>
          </div>
        </section>
        <section className="section" id="trabalhos">
          <SectionHead
            eyebrow="TRABALHOS SELECIONADOS / 2025—2026"
            title="Cada ideia, um novo universo."
          />
          <Tabs
            items={["Todos", "Identidade visual", "E-commerce", "Website"]}
            value={category}
            onChange={setCategory}
          />
          <div className="portfolio-project-grid">
            {projects.map((p, i) => (
              <article className="portfolio-project" key={p.id} data-reveal>
                <button
                  className="image-wrap"
                  onClick={() => setSelected(p)}
                  aria-label={`Ver projeto ${p.title}`}
                >
                  <Photo name={p.image || "abstract.webp"} alt={p.title} />
                  <span>
                    <Plus size={24} />
                  </span>
                </button>
                <div className="between">
                  <div>
                    <span className="eyebrow">
                      {p.category} / {p.date}
                    </span>
                    <h3>{p.title}</h3>
                  </div>
                  <span className="hero-number">0{i + 1}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="section portfolio-about" id="sobre">
          <span className="eyebrow">MUITO PRAZER, LINA.</span>
          <h2>
            Eu transformo boas perguntas
            <br />
            em <em>boas experiências.</em>
          </h2>
          <div>
            <span className="portfolio-about-symbol">
              <Asterisk size={80} strokeWidth={1} />
            </span>
            <p>
              Meu trabalho vive no encontro entre estratégia e expressão. Gosto
              de entender contextos, organizar ideias e desenhar experiências
              que fazem sentido para pessoas e marcas.
            </p>
          </div>
        </section>
        <section className="section" id="processo">
          <SectionHead
            eyebrow="DO PRIMEIRO PAPO À PRÓXIMA IDEIA"
            title="Um processo aberto. Uma direção clara."
          />
          {["Escutar & entender", "Explorar & conectar", "Criar & refinar"].map(
            (x, i) => (
              <div className="link-line" key={x} data-reveal>
                <h3>
                  <span className="line-number">0{i + 1}</span>
                  {x}
                </h3>
                <p>
                  {
                    [
                      "O contexto vem antes da forma.",
                      "Referências que encontram um novo sentido.",
                      "Cuidado em cada decisão, do todo ao detalhe.",
                    ][i]
                  }
                </p>
              </div>
            ),
          )}
        </section>
        <section className="section">
          <div className="portfolio-contact" data-reveal>
            <span className="eyebrow">TEM UMA BOA IDEIA?</span>
            <button onClick={() => setContact(true)}>
              Vamos dar
              <br />
              <em>forma a ela.</em>
              <MoveUpRight size={70} strokeWidth={1} />
            </button>
          </div>
        </section>
      </main>
      <Footer config={config} onContact={() => setContact(true)} />
      <ContactModal
        config={config}
        open={contact}
        onClose={() => setContact(false)}
        subject="Um projeto criativo"
      />
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title || "Projeto"}
        wide
      >
        {selected && (
          <article className="article-preview">
            <Photo
              name={selected.image || "abstract.webp"}
              alt={selected.title}
            />
            <span className="eyebrow">
              {selected.category} / {selected.date}
            </span>
            <h2>{selected.title}</h2>
            <div>
              {selected.description} O estudo explora ritmo, contraste e uma
              identidade visual consistente em diferentes pontos de contato.
              Projeto demonstrativo.
            </div>
            <Button
              onClick={() => {
                setSelected(null);
                setContact(true);
              }}
            >
              Vamos criar o seu projeto
            </Button>
          </article>
        )}
      </Modal>
    </>
  );
}
