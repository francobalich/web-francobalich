export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
  socialUrl?: string;
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
    imageUrl: "/images/projects/innovativallab.png",
    socialUrl: "https://www.instagram.com/innovativalab/",
    featured: true,
    status: "published",
  },
  {
    id: "2",
    name: "Control Robots",
    slug: "control-robots",
    description: "Plataforma de control remoto de robots IoT vía interfaz web.",
    tags: ["Python", "IoT", "Hardware"],
    imageUrl: "/images/projects/control-robots.png",
    demoUrl: "https://control.labs-uai.com/",
    featured: true,
    status: "published",
  },
  {
    id: "5",
    name: "Alice",
    slug: "alice",
    description:
      "Asistente virtual que controla robots, luces y el chat de Twitch por voz.",
    tags: ["Python", "IA", "IoT"],
    imageUrl: "/images/projects/alice.png",
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
    imageUrl: "/images/projects/dashboard-mqtt.png",
    demoUrl: "http://lrfia.uai.edu.ar:4100",
    featured: false,
    status: "published",
  },
  {
    id: "7",
    name: "Lab IoT",
    slug: "lab-iot",
    description:
      "Laboratorio remoto de IoT en convenio con YPF: programá robots reales con Python desde el navegador.",
    tags: ["Python", "IoT", "ESP32"],
    imageUrl: "/images/projects/lab-iot.png",
    demoUrl: "https://labremoto.labs-uai.com",
    featured: false,
    status: "published",
  },
  {
    id: "8",
    name: "ImageGallery",
    slug: "image-gallery",
    description:
      "Galería de imágenes desarrollada durante un curso de React que dicté en el MUG (Microsoft User Group).",
    tags: ["React", "JavaScript", "Web"],
    repoUrl: "https://github.com/francobalich/ImageGallery",
    featured: false,
    status: "published",
  },
];
