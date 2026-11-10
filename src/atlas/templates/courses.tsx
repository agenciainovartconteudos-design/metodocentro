import { useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Settings,
  Play,
  CheckCircle2,
  Clock,
  Flame,
  Check,
} from "lucide-react";
import type { TemplateProps, Entity } from "../types";
import { list } from "../types";
import coursesHero from "@/assets/courses-hero.webp";
import courseDesign from "@/assets/course-design.webp";
import courseCreative from "@/assets/course-creative.webp";
const courseImageMap: Record<string, string> = {
  "education.webp": coursesHero,
  "abstract.webp": courseDesign,
  "architecture.webp": courseCreative,
};
import {
  AppFrame,
  PageHead,
  Button,
  Panel,
  Search,
  Tabs,
  Photo,
  Badge,
  Progress,
  Avatar,
  Modal,
  SettingPanel,
  Empty,
  useToast,
} from "../shared/ui";
export default function Courses({ config }: TemplateProps) {
  const [view, setView] = useState("learn"),
    [courses, setCourses] = useState(list(config, "courses")),
    [query, setQuery] = useState(""),
    [category, setCategory] = useState("Todos"),
    [lesson, setLesson] = useState<Entity | null>(null);
  const toast = useToast();
  const filtered = courses.filter(
    (c) =>
      (category === "Todos" || c.category === category) &&
      c.title.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <AppFrame
      config={config}
      active={view}
      onNav={setView}
      nav={[
        { id: "learn", label: "Meu aprendizado", icon: <BookOpen size={18} /> },
        {
          id: "catalog",
          label: "Explorar cursos",
          icon: <GraduationCap size={18} />,
        },
        { id: "settings", label: "Preferências", icon: <Settings size={18} /> },
      ]}
    >
      <PageHead
        eyebrow="SUA JORNADA / APRENDIZADO"
        title={config.content.headline}
        description={config.content.description}
      />
      {view === "settings" ? (
        <SettingPanel />
      ) : (
        <>
          {view === "learn" && (
            <section className="learning-banner">
              <div>
                <Badge tone="accent">CURIOSIDADE EM MOVIMENTO</Badge>
                <h2>
                  Aprender muda
                  <br />a forma de ver o mundo.
                </h2>
                <p>Reserve um momento. Dê o próximo passo.</p>
                <Button onClick={() => setLesson(courses[0])}>
                  <Play size={16} />
                  Continuar aprendendo
                </Button>
              </div>
              <Photo
                name={courseImageMap[config.content.heroImage] || coursesHero}
                alt="Sala criativa com luz natural"
                loading="eager"
              />
              <span className="learning-tag">
                <Flame size={22} />
                Um pouco, todos os dias.
              </span>
            </section>
          )}
          <div className="toolbar">
            <Tabs
              items={["Todos", "Design", "Negócios", "Criatividade"]}
              value={category}
              onChange={setCategory}
            />
            <Search
              value={query}
              onChange={setQuery}
              placeholder="O que você quer aprender?"
            />
          </div>
          <div className="course-grid">
            {filtered.map((c) => (
              <article className="course-card" key={c.id}>
                <div className="course-cover">
                  <Photo name={courseImageMap[c.image || "education.webp"] || coursesHero} alt={c.title} />
                  <Badge>{c.category}</Badge>
                  <button
                    aria-label={`Abrir curso ${c.title}`}
                    onClick={() => setLesson(c)}
                  >
                    <Play size={21} />
                  </button>
                </div>
                <div className="course-content">
                  <div className="between">
                    <span>{c.duration}</span>
                    <span>
                      <Clock size={13} />
                      No seu ritmo
                    </span>
                  </div>
                  <h2>{c.title}</h2>
                  <p>{c.description}</p>
                  <div className="inline">
                    <Avatar name={c.person} size={26} />
                    <small>{c.person}</small>
                  </div>
                  <Progress value={c.progress || 0} label="Seu progresso" />
                  <Button
                    variant="secondary"
                    className="full"
                    onClick={() => setLesson(c)}
                  >
                    {c.progress ? "Continuar curso" : "Conhecer curso"}
                  </Button>
                </div>
              </article>
            ))}
          </div>
          {!filtered.length && <Empty />}
        </>
      )}
      <Modal
        open={!!lesson}
        onClose={() => setLesson(null)}
        title={lesson?.title || "Curso"}
        wide
      >
        {lesson && (
          <div className="lesson-view">
            <div className="lesson-cover">
              <Photo
                name={courseImageMap[lesson.image || "education.webp"] || coursesHero}
                alt={lesson.title}
              />
              <Badge>AULA EM TEXTO · DEMONSTRAÇÃO</Badge>
            </div>
            <span className="eyebrow">MÓDULO 01 / COMEÇANDO</span>
            <h2>O primeiro passo é olhar com atenção.</h2>
            <p>{lesson.description}</p>
            <p>
              Todo projeto começa com uma pergunta. Antes de buscar uma solução,
              observe o contexto, reúna referências e escreva o que você deseja
              transformar. Uma direção clara torna as próximas escolhas mais
              simples.
            </p>
            <div className="lesson-exercise">
              <b>Experimente agora</b>
              <p>
                Liste três referências e descreva o que funciona em cada uma.
                Depois, escolha uma ideia para explorar no seu próximo projeto.
              </p>
            </div>
            <Button
              onClick={() => {
                setCourses((p) =>
                  p.map((c) =>
                    c.id === lesson.id ? { ...c, progress: 100 } : c,
                  ),
                );
                setLesson(null);
                toast("Aula demonstrativa concluída. Progresso atualizado.");
              }}
            >
              <Check size={17} />
              Concluir aula demonstrativa
            </Button>
            <p className="field-hint">
              Cada curso contém uma aula de amostra. Conecte a estrutura de
              módulos e o player do seu produto para conteúdo real.
            </p>
          </div>
        )}
      </Modal>
    </AppFrame>
  );
}
