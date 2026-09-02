"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from "@/lib/portfolio-config";

const STORAGE_KEY = "portfolio-language";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguage(value: unknown): value is Language {
  return (LANGUAGES as readonly string[]).includes(value as string);
}

// Language is picked at runtime, so — unlike the theme, which next-themes
// resolves in a blocking script — the server and the first client render
// always use the config's own `meta.language`. The stored preference is
// applied in an effect afterwards, which keeps the markup hydration-safe at
// the cost of one frame in the default language.
export function LanguageProvider({
  defaultLanguage = DEFAULT_LANGUAGE,
  children,
}: {
  defaultLanguage?: Language;
  children: React.ReactNode;
}) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLanguage(stored)) setLanguageState(stored);
    } catch {
      // Private mode or blocked site data: keep the config's language.
    }
  }, []);

  // <html lang> is rendered from the config by the layout; keep it in sync
  // with what is actually on screen for screen readers and translation tools.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Preference just doesn't persist; the switch itself still works.
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(language === "pt" ? "en" : "pt"),
    }),
    [language, setLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return context;
}
