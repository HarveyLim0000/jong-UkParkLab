/**
 * Placeholder content. Every string here is a stand-in — replace with real
 * lab content. When Sanity is connected, these exports become async queries
 * and the page components stay unchanged.
 */

export const LAB = {
  name: "Jong-Uk Park Lab",
  affiliation: "TODO: Department, University",
  tagline: "TODO: one sentence describing what the lab studies.",
  email: "todo@example.ac.kr",
  phone: "TODO",
  address: "TODO: Building, Room, Address",
  mapEmbed: "", // Google Maps embed URL — Contact page hides the map while empty
};

export type Topic = {
  slug: string;
  title: string;
  summary: string;
  body: string;
  image?: string;
};

export const TOPICS: Topic[] = [
  {
    slug: "topic-one",
    title: "TODO: Research Topic One",
    summary: "TODO: two lines describing this topic for a non-specialist.",
    body: "TODO: a paragraph on the motivation, the approach, and what the lab has shown so far.",
  },
  {
    slug: "topic-two",
    title: "TODO: Research Topic Two",
    summary: "TODO: two lines describing this topic for a non-specialist.",
    body: "TODO: a paragraph on the motivation, the approach, and what the lab has shown so far.",
  },
  {
    slug: "topic-three",
    title: "TODO: Research Topic Three",
    summary: "TODO: two lines describing this topic for a non-specialist.",
    body: "TODO: a paragraph on the motivation, the approach, and what the lab has shown so far.",
  },
];

export type Member = {
  name: string;
  role: "professor" | "postdoc" | "phd" | "ms" | "alumni";
  title: string;
  interests?: string;
  email?: string;
  photo?: string;
  degree?: string; // alumni
  year?: number; // alumni
  now?: string; // alumni current position
};

export const MEMBERS: Member[] = [
  {
    name: "Jong-Uk Park",
    role: "professor",
    title: "Principal Investigator",
    interests: "TODO: research interests",
    email: "todo@example.ac.kr",
  },
  { name: "TODO", role: "postdoc", title: "Postdoctoral Researcher", interests: "TODO" },
  { name: "TODO", role: "phd", title: "Ph.D. Student", interests: "TODO" },
  { name: "TODO", role: "ms", title: "M.S. Student", interests: "TODO" },
  { name: "TODO", role: "alumni", title: "Alumni", degree: "Ph.D.", year: 2024, now: "TODO" },
];

export type Project = {
  title: string;
  funder: string;
  period: string;
  role: "Principal" | "Participating";
  status: "ongoing" | "completed";
  summary: string;
};

export const PROJECTS: Project[] = [
  {
    title: "TODO: Project title",
    funder: "TODO: funding agency",
    period: "2024.03 – 2027.02",
    role: "Principal",
    status: "ongoing",
    summary: "TODO: one line on the goal of this project.",
  },
  {
    title: "TODO: Completed project title",
    funder: "TODO: funding agency",
    period: "2021.03 – 2024.02",
    role: "Participating",
    status: "completed",
    summary: "TODO: one line on what this project delivered.",
  },
];

export type Publication = {
  authors: string[]; // lab members are bolded by matching LAB_AUTHORS
  title: string;
  venue: string;
  year: number;
  type: "journal" | "conference";
  doi?: string;
  highlight?: boolean;
};

/** Names rendered in bold in author lists. */
export const LAB_AUTHORS = ["J.-U. Park"];

export const PUBLICATIONS: Publication[] = [
  {
    authors: ["TODO A. Author", "J.-U. Park"],
    title: "TODO: Paper title",
    venue: "TODO: Journal Name",
    year: 2025,
    type: "journal",
    doi: "",
    highlight: true,
  },
  {
    authors: ["TODO B. Author", "J.-U. Park"],
    title: "TODO: Conference paper title",
    venue: "TODO: Conference Name",
    year: 2024,
    type: "conference",
  },
];

export type Album = {
  slug: string;
  title: string;
  date: string;
  photos: { src: string; alt: string }[];
};

export const ALBUMS: Album[] = [];
