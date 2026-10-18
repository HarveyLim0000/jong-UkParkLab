/**
 * Supported locales. Kept free of imports so proxy.ts and client components
 * can use it without pulling in the dictionaries.
 */

// Display order of the nav toggle: KR / EN
export const LOCALES = ["ko", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<Locale, string> = { ko: "KR", en: "EN" };

export const hasLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

/** "/members" → "/en/members", "/" → "/en" */
export const localize = (lang: Locale, path: string) =>
  `/${lang}${path === "/" ? "" : path}`;
