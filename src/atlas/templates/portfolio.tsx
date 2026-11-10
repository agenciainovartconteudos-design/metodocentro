import { useState } from "react";
import { Asterisk, Plus, MoveUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { TemplateProps, Entity } from "../types";
import { list, asset } from "../types";
import {
  WebsiteNav,
  Button,
  Photo,
  SectionHead,
  Footer,
  ContactModal,
  Modal,
  CompassCursor,
} from "../shared/ui";
import compassImg from "@/assets/upload-1794346350293-1.jpg";
import aboutPhoto from "@/assets/upload-1794346350293-2.jpg";
import heroBgImg from "@/assets/upload-1794346925765-1.jpg";

function CaseCarousel({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  const go = (dir: number) =>
    setIndex((i) => (i + dir + images.length) % images.length);
  return (
    <div className="case-modal-carousel">
      <div className="image-wrap">
        <img
          src={asset(images[index])}
          alt={`${title} — imagem ${index + 1} de ${images.length}`}
          className="photo"
        />
      </div>
      {images.length > 1 && (
        <>
          <button
            className="case-modal-nav prev"
            aria-label="Imagem anterior"
            onClick={() => go(-1)}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="case-modal-nav next"
            aria-label="Próxima imagem"
            onClick={() => go(1)}
          >
            <ChevronRight size={20} />
          </button>
          <div className="case-modal-dots">
            {images.map((_, i) => (
              <button
                key={i}
                aria-label={`Ir para imagem ${i + 1}`}
                className={i === index ? "active" : ""}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Portfolio({ config }: TemplateProps) {
  const [contact, setContact] = useState(false),
    [selected, setSelected] = useState<Entity | null>(null);
  const projects = list(config, "projects");
  return (
    <>
      <CompassCursor image={compassImg} alt="Bússola dourada flutuante" />
      <WebsiteNav
        config={config}
        links={[
          { label: "Cases", href: "#trabalhos" },
          { label: "Sobre mim", href: "#sobre" },
          { label: "Método", href: "#processo" },
        ]}
        cta="Vamos conversar"
        onAction={() => setContact(true)}
      />
      <main id="main" className="web-main">
        <section className="portfolio-hero">
          <div className="portfolio-hero-bg" aria-hidden="true">
            <img src={heroBgImg} alt="" />
          </div>
          <div className="portfolio-kicker hero-enter">
            <span>CONSULTORIA DE ESTRATÉGIA, MARCA E CRESCIMENTO</span>
            <span>
              <i className="live-dot" />
              {config.content.eyebrow}
            </span>
          </div>
          <h1 className="hero-title hero-enter">{config.content.headline}</h1>
          <div className="portfolio-hero-bottom">
            <div className="portfolio-symbol" aria-hidden="true">
              <Asterisk size={110} strokeWidth={1} />
            </div>
            <p>{config.content.description}</p>
            <a href="#trabalhos" className="portfolio-circle">
              Veja os
              <br />
              resultados
              <MoveUpRight size={21} />
            </a>
          </div>
          <div className="portfolio-strip">
            <Photo
              name={compassImg}
              alt="Bússola dourada sobre veludo vermelho, símbolo da direção estratégica do Método CENTRO"
              loading="eager"
            />
            <span>
              SUA BÚSSOLA
              <br />
              <b>ESTRATÉGICA.</b>
            </span>
            <span className="portfolio-image-label">
              MÉTODO CENTRO — ENCONTRE A ROTA CERTA
            </span>
          </div>
        </section>

        <section className="section" id="trabalhos">
          <SectionHead
            eyebrow="CASES & RESULTADOS"
            title="Resultados reais, de negócios reais."
            description="Um resumo de cada projeto. Clique em 'Veja mais' para abrir a análise completa, com todas as imagens."
          />
          <div className="case-grid">
            {projects.map((p) => (
              <article className="case-card" key={p.id} data-reveal>
                <button
                  className="image-wrap"
                  onClick={() => setSelected(p)}
                  aria-label={`Ver case completo: ${p.title}`}
                >
                  <Photo name={(p.images && p.images[0]) || p.image || "abstract.webp"} alt={p.title} />
                </button>
                <div className="case-card-body">
                  <span className="case-client">{p.client}</span>
                  <h3>{p.title}</h3>
                  <div className="case-result-row">
                    {p.resultValue && (
                      <div>
                        <b>{p.resultValue}</b>
                        <span>{p.resultLabel}</span>
                      </div>
                    )}
                    {p.resultValue2 && (
                      <div>
                        <b>{p.resultValue2}</b>
                        <span>{p.resultLabel2}</span>
                      </div>
                    )}
                  </div>
                  <p>{p.summary}</p>
                  <Button variant="secondary" onClick={() => setSelected(p)}>
                    Veja mais
                    <Plus size={16} />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section portfolio-about" id="sobre">
          <span className="eyebrow">SOBRE MIM</span>
          <h2>
            Eu ajudo negócios a encontrar
            <br />a <em>rota certa para crescer.</em>
          </h2>
          <div className="portfolio-about-photo">
            <div className="image-wrap">
              <Photo name={aboutPhoto} alt="Alessandra Pereira, consultora de estratégia, marca e crescimento, em retrato pessoal" />
            </div>
            <p>
              Sou Alessandra Pereira, consultora de estratégia, marca e
              crescimento. Trabalho ao lado de profissionais e negócios que
              precisam sair do operacional e enxergar com clareza qual é a
              próxima rota: reposicionamento, oferta, narrativa ou aquisição.
              Cada projeto no meu portfólio nasceu de um diagnóstico honesto e
              de decisões estratégicas, não de fórmulas prontas.
            </p>
          </div>
        </section>

        <section className="section" id="processo">
          <SectionHead
            eyebrow="DO DIAGNÓSTICO AO RESULTADO"
            title="Um método claro. Uma direção certa."
          />
          {["Escutar & diagnosticar", "Posicionar & estruturar", "Executar & medir"].map(
            (x, i) => (
              <div className="link-line" key={x} data-reveal>
                <h3>
                  <span className="line-number">0{i + 1}</span>
                  {x}
                </h3>
                <p>
                  {
                    [
                      "Entendo o momento do negócio antes de propor qualquer mudança.",
                      "Defino marca, oferta e narrativa com clareza comercial.",
                      "Acompanho os números e ajusto a rota com você.",
                    ][i]
                  }
                </p>
              </div>
            ),
          )}
        </section>

        <section className="section">
          <div className="portfolio-contact" data-reveal>
            <span className="eyebrow">PRONTO PARA ENCONTRAR SUA ROTA?</span>
            <button onClick={() => setContact(true)}>
              Vamos traçar
              <br />
              <em>sua estratégia.</em>
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
        subject="Estratégia e crescimento"
      />
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title || "Case"}
        wide
      >
        {selected && (
          <article className="article-preview">
            <CaseCarousel
              images={(selected.images && selected.images.length ? selected.images : [selected.image || "abstract.webp"])}
              title={selected.title}
            />
            <span className="eyebrow">{selected.client}</span>
            <h2>{selected.title}</h2>
            <div className="case-modal-stats">
              {selected.resultValue && (
                <div>
                  <b>{selected.resultValue}</b>
                  <span>{selected.resultLabel}</span>
                </div>
              )}
              {selected.resultValue2 && (
                <div>
                  <b>{selected.resultValue2}</b>
                  <span>{selected.resultLabel2}</span>
                </div>
              )}
            </div>
            <div>{selected.details}</div>
            <Button
              onClick={() => {
                setSelected(null);
                setContact(true);
              }}
            >
              Quero um resultado assim
            </Button>
          </article>
        )}
      </Modal>
    </>
  );
}
