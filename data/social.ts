export interface Social {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "instagram" | "twitch" | "email";
}

export const socials: Social[] = [
  {
    label: "GitHub",
    href: "https://github.com/FrancoBalich",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/francobalich",
    icon: "linkedin",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/francobalich",
    icon: "instagram",
  },
  {
    label: "Twitch",
    href: "https://twitch.tv/francobalich",
    icon: "twitch",
  },
  {
    label: "Email",
    href: "mailto:franco.balich@gmail.com",
    icon: "email",
  },
];
