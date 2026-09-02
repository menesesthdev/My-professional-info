"use client";

import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { px } from "@/lib/portfolio-config";

// The page's chrome controls, pinned to the top-right corner above the
// scrolling content: language first, theme last. Offsets and sizes scale with
// the config so the row stays clear of the page padding at every scale.
export function FloatingControls({
  buttonSize = px(32),
  iconSize = px(16),
  offset = px(16),
  showLanguageToggle = true,
}: {
  buttonSize?: number;
  iconSize?: number;
  offset?: number;
  showLanguageToggle?: boolean;
}) {
  return (
    <div className="fixed z-50 flex items-center print:hidden" style={{ top: offset, right: offset, gap: buttonSize * 0.25 }}>
      {showLanguageToggle && <LanguageToggle buttonSize={buttonSize} iconSize={iconSize} />}
      <ThemeToggle buttonSize={buttonSize} iconSize={iconSize} />
    </div>
  );
}
