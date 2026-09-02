"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { configForLanguage, px, uiString } from "@/lib/portfolio-config";

// Sits beside the theme toggle and follows the same convention it does: the
// button shows the state a click produces, not the current one — "EN" while
// the page is in Portuguese. Sizes default to the repo config's scale; the
// <Portfolio /> tree passes them explicitly so a live preview with a
// different scale stays correct.
export function LanguageToggle({ buttonSize = px(32), iconSize = px(16) }: { buttonSize?: number; iconSize?: number }) {
  const { language, toggleLanguage } = useLanguage();
  const label = uiString(configForLanguage(language), "switchLanguage");

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={label}
      title={label}
      className="inline-flex cursor-pointer items-center justify-center gap-x-1 rounded-md bg-background transition-colors hover:bg-accent"
      style={{
        height: buttonSize, paddingLeft: buttonSize * 0.25, paddingRight: buttonSize * 0.25, flexShrink: 0,
        border: "1px solid hsl(var(--input))",
        color: "hsl(var(--foreground))",
      }}
    >
      <Languages size={iconSize} />
      <span style={{ fontFamily: "ui-monospace, monospace", fontSize: buttonSize * 0.34, fontWeight: 600, lineHeight: 1 }}>
        {language === "pt" ? "EN" : "PT"}
      </span>
    </button>
  );
}
