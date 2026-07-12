export interface Talk {
  id: string;
  title: string;
  event: string;
  role: "speaker" | "instructor" | "panelist" | "organizer";
  date: string;
  location: string;
  slidesUrl?: string;
  eventUrl?: string;
  videoUrl?: string;
  upcoming: boolean;
}

export const talks: Talk[] = [
  {
    id: "cafe-tecnologico-uai-2026",
    title: "Codeá tu futuro: tu primer empleo en tecnología",
    event: "Café Tecnológico - UAI",
    role: "panelist",
    date: "2026-05-19",
    location: "UAI, Buenos Aires",
    eventUrl:
      "https://www.linkedin.com/posts/alumnos-y-graduados-fti-uai_cafaeztecnolaejgico-ftiuai-alumnosuai-activity-7461061824290107392-jGUG",
    upcoming: false,
  },
  {
    id: "innovacion-abierta-matilda-2025",
    title: "Innovación Abierta con Perspectiva de Género",
    event: "Experiencias de Innovación Abierta Latinoamericana Matilda",
    role: "speaker",
    date: "2025-05-08",
    location: "Virtual (webinar)",
    eventUrl:
      "https://www.linkedin.com/posts/francobalich_innovacion-innovacionabierta-ia-activity-7326216525021900801-BjSA",
    upcoming: false,
  },
  {
    id: "nerdearla-101-2023",
    title: "Robótica: una herramienta para aprender a programar",
    event: "Nerdearla 101",
    role: "speaker",
    date: "2023-11-22",
    location: "Virtual (Nerdearla)",
    eventUrl:
      "https://www.linkedin.com/posts/nerdearla_nerdearla101-activity-7132703202851905536-62tl",
    upcoming: false,
  },
];
