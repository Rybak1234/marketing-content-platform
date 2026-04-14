/* In-memory data store — replaces MongoDB for demo deployment */
let counter = 200;
function newId() { return (++counter).toString(36) + Date.now().toString(36); }

export interface IPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  status: string;
  publishAt: string | null;
  createdAt: string;
  updatedAt: string;
}

const posts: IPost[] = [
  {
    _id: "p1", title: "Estrategias de Marketing Digital para 2025", slug: "estrategias-marketing-digital-2025",
    content: "El marketing digital evoluciona a un ritmo imparable. En este artículo exploramos las tendencias más prometedoras para el próximo año, desde la personalización impulsada por IA hasta las nuevas plataformas de contenido efímero. Las marcas que adopten estas estrategias tempranamente tendrán una ventaja competitiva significativa.\n\n## 1. IA Generativa en Contenido\nLas herramientas de IA permiten crear contenido personalizado a escala...\n\n## 2. Video Corto como Rey\nTikTok, Reels y Shorts dominan la atención del consumidor...\n\n## 3. Marketing Conversacional\nLos chatbots y asistentes virtuales mejoran la experiencia del cliente...",
    excerpt: "Descubre las tendencias más prometedoras en marketing digital para posicionar tu marca en 2025.",
    coverImage: "", category: "Marketing", tags: ["tendencias", "digital", "IA", "estrategia"], status: "published", publishAt: null,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    _id: "p2", title: "Guía Completa de SEO Técnico", slug: "guia-completa-seo-tecnico",
    content: "El SEO técnico es la base sobre la que se construye cualquier estrategia de posicionamiento exitosa. Sin una web optimizada técnicamente, incluso el mejor contenido puede pasar desapercibido.\n\n## Core Web Vitals\nGoogle prioriza la experiencia del usuario medida con LCP, FID y CLS...\n\n## Estructura de URLs\nURLs limpias y descriptivas mejoran el crawling y la comprensión del contenido...\n\n## Schema Markup\nLos datos estructurados ayudan a los motores de búsqueda a entender tu contenido...",
    excerpt: "Todo lo que necesitas saber sobre SEO técnico: Core Web Vitals, indexación y optimización de rendimiento.",
    coverImage: "", category: "SEO", tags: ["seo", "técnico", "core-web-vitals", "rendimiento"], status: "published", publishAt: null,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    _id: "p3", title: "Email Marketing: Automatización que Convierte", slug: "email-marketing-automatizacion",
    content: "El email marketing sigue siendo uno de los canales con mayor ROI. La clave está en la automatización inteligente que entrega el mensaje correcto en el momento preciso.\n\n## Flujos de Bienvenida\nUna secuencia de 3-5 emails puede aumentar la conversión un 300%...\n\n## Segmentación Avanzada\nNo todos los suscriptores son iguales. Segmenta por comportamiento, no solo por demografía...\n\n## A/B Testing\nPrueba asuntos, horarios y CTAs para optimizar cada envío...",
    excerpt: "Aprende a crear flujos de email automatizados que nutren leads y aumentan las conversiones.",
    coverImage: "", category: "Email", tags: ["email", "automatización", "conversión", "leads"], status: "published", publishAt: null,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    _id: "p4", title: "Redes Sociales: Calendario Editorial Efectivo", slug: "redes-sociales-calendario-editorial",
    content: "Un calendario editorial bien planificado es la diferencia entre publicar por publicar y tener una estrategia coherente que genere resultados.\n\n## Frecuencia Óptima\nCada plataforma tiene su ritmo ideal...\n\n## Pilares de Contenido\nDefine 3-5 categorías temáticas que representen tu marca...\n\n## Herramientas de Planificación\nBuffer, Hootsuite o Notion pueden transformar tu workflow...",
    excerpt: "Cómo planificar un calendario de contenido para redes sociales que impulse el engagement.",
    coverImage: "", category: "Social Media", tags: ["redes-sociales", "contenido", "planificación", "engagement"], status: "draft", publishAt: null,
    createdAt: new Date(Date.now() - 86400000).toISOString(), updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: "p5", title: "Analytics: Métricas que Realmente Importan", slug: "analytics-metricas-que-importan",
    content: "En un mundo saturado de datos, saber qué métricas rastrear es más importante que nunca. No te pierdas en vanity metrics.\n\n## CAC y LTV\nEl coste de adquisición y el valor de vida del cliente son tus métricas estrella...\n\n## Tasa de Conversión por Canal\nMide el rendimiento real de cada fuente de tráfico...\n\n## NPS y Satisfacción\nLos indicadores cualitativos completan la foto...",
    excerpt: "Identifica las métricas clave para tomar decisiones de marketing basadas en datos reales.",
    coverImage: "", category: "Analytics", tags: ["analytics", "métricas", "datos", "KPIs"], status: "scheduled", publishAt: new Date(Date.now() + 86400000 * 3).toISOString(),
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
];

function slugify(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const postStore = {
  findAll: (filter?: Record<string, string>) => {
    let result = [...posts];
    if (filter?.status) result = result.filter(p => p.status === filter.status);
    if (filter?.category) result = result.filter(p => p.category === filter.category);
    return result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  findById: (id: string) => posts.find(p => p._id === id) || null,
  create: (data: Partial<IPost>) => {
    const p: IPost = {
      _id: newId(), title: data.title || "", slug: slugify(data.title || "") + "-" + Date.now().toString(36),
      content: data.content || "", excerpt: data.excerpt || "", coverImage: data.coverImage || "",
      category: data.category || "", tags: data.tags || [], status: data.status || "draft",
      publishAt: data.publishAt || null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
    posts.push(p);
    return p;
  },
  update: (id: string, data: Partial<IPost>) => {
    const i = posts.findIndex(p => p._id === id);
    if (i === -1) return null;
    Object.assign(posts[i], data, { updatedAt: new Date().toISOString() });
    return posts[i];
  },
  delete: (id: string) => {
    const i = posts.findIndex(p => p._id === id);
    if (i === -1) return null;
    return posts.splice(i, 1)[0];
  },
};
