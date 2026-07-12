export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  status: "published" | "wip" | "coming-soon";
}

export const projects: Project[] = [
  {
    id: "1",
    name: "InnovativalLab",
    slug: "innovativallab",
    description: "Plataforma de cursos online de robótica educativa.",
    tags: ["Robótica", "Educación", "Web"],
    demoUrl: "https://www.instagram.com/innovativalab/",
    featured: true,
    status: "published",
  },
  {
    id: "2",
    name: "Control Robots",
    slug: "control-robots",
    description: "Plataforma de control remoto de robots IoT vía interfaz web.",
    tags: ["Python", "IoT", "Hardware"],
    demoUrl: "https://control.labs-uai.com/",
    featured: true,
    status: "published",
  },
  {
    id: "5",
    name: "Alice",
    slug: "alice",
    description:
      "Asistente virtual capaz de controlar un robot, controlar luces, leer recompensas y el chat de Twitch, reconocer audio y reproducir sonidos.",
    tags: ["Python", "IA", "IoT"],
    demoUrl: "https://alice.francobalich.com",
    featured: false,
    status: "published",
  },
  {
    id: "6",
    name: "Dashboard MQTT",
    slug: "dashboard-mqtt",
    description: "Dashboard de monitoreo en tiempo real de dispositivos IoT vía protocolo MQTT.",
    tags: ["MQTT", "IoT", "Dashboard"],
    demoUrl: "http://lrfia.uai.edu.ar:4100",
    featured: false,
    status: "published",
  },
  {
    id: "7",
    name: "Lab IoT",
    slug: "lab-iot",
    description: "Laboratorio remoto para experimentar con dispositivos IoT desde el navegador.",
    tags: ["IoT", "Web", "Hardware"],
    demoUrl: "https://labremoto.labs-uai.com",
    featured: false,
    status: "published",
  },
];
