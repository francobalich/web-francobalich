"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const CONSENT_KEY = "cookie-consent";

type Consent = "accepted" | "rejected";

export default function CookieConsent({ gaId }: { gaId: string }) {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "rejected") {
      setConsent(stored);
    }
    setReady(true);
  }, []);

  const choose = (choice: Consent) => {
    localStorage.setItem(CONSENT_KEY, choice);
    setConsent(choice);
  };

  return (
    <>
      {consent === "accepted" && <GoogleAnalytics gaId={gaId} />}

      {ready && consent === null && (
        <div
          role="dialog"
          aria-label="Aviso de cookies"
          className="fixed bottom-0 inset-x-0 z-30 bg-zinc-950/95 backdrop-blur-xl border-t border-white/[0.08] px-6 py-3"
        >
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-zinc-500 leading-relaxed">
              Usamos cookies para entender cómo se usa este sitio. Podés
              aceptarlas o rechazarlas.
            </p>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => choose("rejected")}
                className="px-4 py-1.5 rounded-lg glass glass-hover text-zinc-300 hover:text-zinc-100 text-xs font-medium transition-all duration-200"
              >
                Rechazar
              </button>
              <button
                onClick={() => choose("accepted")}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors duration-200"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
