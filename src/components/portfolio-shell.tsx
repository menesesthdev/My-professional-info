"use client";

import { useLanguage } from "@/components/language-provider";
import { Portfolio } from "@/components/portfolio";
import { configForLanguage } from "@/lib/portfolio-config";

// Picks the config file matching the language the visitor selected in the
// header controls. Every string on the page — content, section headings and
// chrome alike — is derived from that config, so this one swap translates the
// whole portfolio.
export function PortfolioShell() {
  const { language } = useLanguage();
  return <Portfolio config={configForLanguage(language)} />;
}
