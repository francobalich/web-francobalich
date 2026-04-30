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
  // Completar con charlas y eventos reales
];
