"use client";

import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function FadeIn({ children, className = "", delay = 0, as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("is-visible"), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const TagAny = Tag as React.ElementType;
  return (
    <TagAny ref={ref} className={`reveal ${className}`}>
      {children}
    </TagAny>
  );
}
