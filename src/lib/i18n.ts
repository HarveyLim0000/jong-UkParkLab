import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/locales";
import en from "@/lib/dictionaries/en";
import ko from "@/lib/dictionaries/ko";

/**
 * UI strings only (nav, headings, fixed sentences). Lab content in
 * content.ts is still English-only and shows as-is on /ko until translated.
 */
const DICTIONARIES = { en, ko };

export type Dictionary = typeof en;

/** Every locale's nav labels; the nav reserves room for the longest one. */
export const NAV_LABELS = { en: en.nav, ko: ko.nav };

/** Resolves the [lang] segment; anything other than a supported locale is a 404. */
export async function getDictionary(params: Promise<{ lang: string }>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return { lang, t: DICTIONARIES[lang] };
}
