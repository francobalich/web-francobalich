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
    description: "Plataforma web del laboratorio de innovación tecnológica.",
    tags: ["Python", "Web", "IoT"],
    featured: true,
    status: "published",
  },
  {
    id: "2",
    name: "Control Robots",
    slug: "control-robots",
    description: "Sistema de control remoto de robots vía interfaz web.",
    tags: ["Python", "IoT", "Hardware"],
    featured: true,
    status: "published",
  },
  {
    id: "3",
    name: "Disendum",
    slug: "disendum",
    description: "Aplicación web para gestión y organización de contenido.",
    tags: ["JavaScript", "Node.js", "CSS"],
    featured: true,
    status: "published",
  },
  {
    id: "4",
    name: "BS Dinner",
    slug: "bs-dinner",
    description: "Plataforma digital para restaurante con menú interactivo.",
    tags: ["JavaScript", "CSS", "HTML5"],
    featured: false,
    status: "published",
  },
  {
    id: "5",
    name: "Alice",
    slug: "alice",
    description: "Proyecto de desarrollo de software con arquitectura modular.",
    tags: ["Python", "Data", "API"],
    featured: false,
    status: "published",
  },
  {
    id: "6",
    name: "LabFabId",
    slug: "labfabid",
    description: "Sistema de identificación y gestión para laboratorio de fabricación.",
    tags: ["Python", "IoT", "Arduino"],
    featured: false,
    status: "published",
  },
];
