/**
 * Lab content. Empty arrays hide their section on the page, so an entry only
 * appears once there is something real to show. When Sanity is connected,
 * these exports become async queries and the page components stay unchanged.
 *
 * Content is English-only for now and shows as-is on /ko, except fields keyed
 * by locale (phone, address, members, projects). When Korean text is added,
 * the lab name (name, shortName) and PUBLICATIONS stay in English on both
 * sites; they are not translated.
 */

import type { Locale } from "@/lib/locales";

export const LAB = {
  name: "AI System Lab",
  shortName: "AI System Lab",
  // Draft, from the publication record — confirm wording with the PI.
  tagline: {
    en: "Turning everyday biosignals into early warnings of disease.",
    ko: "일상의 생체신호를 질병의 조기 경보로 바꿉니다.",
  },
  department: {
    ko: "건양대학교 인공지능학과",
    en: "Department of Artificial Intelligence, Konyang University",
  },
  email: "jupark@konyang.ac.kr",
  // per locale; links dial the international form, which works from anywhere
  phone: { en: "+82-42-600-8492", ko: "042-600-8492" },
  // per locale; the footer prints addressLines, the Contact page address
  addressLines: {
    en: [
      "(35365) Room 372, Jukheon Jeongbogwan",
      "Konyang University, Daejeon",
      "South Korea",
    ],
    ko: ["(35365)대전 건양대학교", "죽헌정보관 372호"],
  },
  address: {
    en: "(35365) Room 372, Jukheon Jeongbogwan, Konyang University, Daejeon, South Korea",
    ko: "(35365)대전 건양대학교 죽헌정보관 372호",
  },
  // The Contact page map: Google Maps' own place for the building, so the pin
  // carries its name, centred on its OpenStreetMap coordinates
  mapPlace: "건양대학교 죽헌정보관",
  location: { lat: 36.3054687, lng: 127.3438495 },

  // Draft, written from the publication and project record. Confirm with the PI.
  // The text runs on from the highlighted lead: the English starts with a
  // space, the Korean with its particle.
  welcomeLead: { en: "The AI System Lab", ko: "AI System Lab" },
  // Laid out as other lab sites introduce themselves: lab and affiliation,
  // aim, main research, where it is heading.
  welcome: {
    en:
      " in the Department of Artificial Intelligence at Konyang University develops "
      + "artificial intelligence for biosignal-based healthcare. Our research centers on "
      + "detecting sleep disorders and predicting cardiovascular and metabolic disease "
      + "from non-invasive signals such as single-lead ECG and photoplethysmography. We "
      + "also apply these models to wearable and on-device platforms, so that screening "
      + "can take place outside the hospital, in everyday life.",
    ko:
      "은 건양대학교 인공지능학과 소속 연구실로, 생체신호 기반 헬스케어를 위한 인공지능 "
      + "기술을 연구합니다. 단일 유도 심전도, 광용적맥파 등 비침습 생체신호를 활용해 수면 "
      + "장애를 검출하고 심혈관·대사 질환을 예측하는 연구를 중심으로 합니다. 또한 개발한 "
      + "모델을 웨어러블 및 온디바이스 환경에 적용하여, 병원 밖 일상에서도 질환을 선별할 "
      + "수 있도록 연구하고 있습니다.",
  },
};

export type Topic = {
  slug: string;
  title: string;
  summary: string;
  body: string;
  image?: string;
};

// Draft, grouped from the publication record — confirm titles and wording
// with the PI before the site goes public.
export const TOPICS: Topic[] = [
  {
    slug: "sleep-from-a-single-ecg-lead",
    title: "Sleep analysis from a single ECG lead",
    summary:
      "Scoring sleep stages and detecting sleep disorders from one channel of "
      + "electrocardiogram, instead of a full polysomnography montage.",
    body:
      "Polysomnography needs a sleep laboratory, a technician, and a night of "
      + "wired sensors. We ask how much of that signal survives in a single lead "
      + "of ECG. Deep convolutional recurrent models score five-class sleep "
      + "stages from the raw waveform, and a separate model detects periodic limb "
      + "movement disorder from the same recording. The goal is screening that "
      + "works from a wearable at home.",
  },
  {
    slug: "non-invasive-glucose-monitoring",
    title: "Non-invasive glucose monitoring",
    summary:
      "Predicting hypoglycemia and dysglycemia from heart rate variability, "
      + "without a finger prick or a continuous glucose sensor.",
    body:
      "Low blood glucose lengthens the QT interval and shifts autonomic balance, "
      + "and both changes are visible in the ECG. We extract corrected QT and "
      + "heart rate variability features and predict hypoglycemic events up to "
      + "30 minutes ahead. Recent work replaces the hand-built feature set with "
      + "a residual convolutional model and asks how few features the prediction "
      + "actually needs.",
  },
  {
    slug: "long-term-disease-risk",
    title: "Long-term disease risk prediction",
    summary:
      "Using a single night of recording to estimate what happens over the "
      + "following years, not just the following minutes.",
    body:
      "Patients with sleep-disordered breathing carry an elevated cardiovascular "
      + "risk that is not visible in any single measurement. Working from the "
      + "Sleep Heart Health Study cohort, we combine signal-processing features, "
      + "learned ECG representations, and known clinical risk factors to predict "
      + "coronary heart disease, heart failure, and stroke within ten years. The "
      + "same approach separates Parkinson\u2019s disease with and without REM "
      + "sleep behavior disorder.",
  },
];

/** Text written out for each locale. */
export type Localized = Record<Locale, string>;

/** One line of the PI's education or career. Years are plain ("2018",
 *  "2015 – 2019") unless they need words, e.g. an ongoing "2023 – 현재". */
export type CvEntry = { years: string | Localized; text: Localized };

export type Member = {
  name: Localized;
  role: "professor" | "postdoc" | "phd" | "ms" | "undergrad" | "alumni";
  program?: Localized; // under the name when it differs from the group
  research?: Localized; // one line
  github?: string; // profile URL; until set, the profile shows a grey GitHub
  scholar?: string; // Google Scholar profile URL
  photo?: string;
  // professor only
  affiliation?: Localized;
  email?: string;
  education?: CvEntry[];
  career?: CvEntry[];
  // alumni
  degree?: Localized;
  year?: number;
  now?: Localized; // current position
};

const COMBINED: Localized = { ko: "학·석사 연계과정", en: "Combined B.S./M.S." };

// SAMPLE: stands in until each person's own one-line topic is supplied
const SAMPLE_RESEARCH: Localized = {
  ko: "연구 주제 한 줄 (예시)",
  en: "One-line research topic (sample)",
};

// Draft: the English names are romanized here, not each person's own
// spelling, and the SAMPLE lines are placeholders. Confirm before launch.
// Order within a group is the order shown.
export const MEMBERS: Member[] = [
  {
    name: { ko: "박종욱", en: "Jong-Uk Park" },
    role: "professor",
    affiliation: {
      ko: "건양대학교 인공지능학과 학과장",
      en: "Chair, Department of Artificial Intelligence, Konyang University",
    },
    research: SAMPLE_RESEARCH,
    email: "jupark@konyang.ac.kr",
    photo: "/images/members/jong-uk-park.jpg",
    // SAMPLE rows: replace with the real education and career
    education: [
      { years: "YYYY", text: { ko: "공학박사, 학과, 대학교 (예시)", en: "Ph.D., Department, University (sample)" } },
      { years: "YYYY", text: { ko: "공학석사, 학과, 대학교 (예시)", en: "M.S., Department, University (sample)" } },
      { years: "YYYY", text: { ko: "공학사, 학과, 대학교 (예시)", en: "B.S., Department, University (sample)" } },
    ],
    career: [
      {
        years: { ko: "YYYY – 현재", en: "YYYY – present" },
        text: { ko: "직위, 소속 (예시)", en: "Position, Institution (sample)" },
      },
      { years: "YYYY – YYYY", text: { ko: "직위, 소속 (예시)", en: "Position, Institution (sample)" } },
    ],
  },
  {
    name: { ko: "황윤호", en: "Yun-Ho Hwang" },
    role: "postdoc",
    research: SAMPLE_RESEARCH,
    photo: "/images/members/yun-ho-hwang.jpg",
  },
  {
    name: { ko: "이다은", en: "Da-Eun Lee" },
    role: "ms",
    research: SAMPLE_RESEARCH,
    photo: "/images/members/da-eun-lee.jpg",
  },
  {
    name: { ko: "이현민", en: "Hyun-Min Lee" },
    role: "ms",
    program: COMBINED,
    research: SAMPLE_RESEARCH,
    photo: "/images/members/hyun-min-lee.jpg",
  },
  {
    name: { ko: "양다윗", en: "Da-Wit Yang" },
    role: "ms",
    program: COMBINED,
    research: SAMPLE_RESEARCH,
    photo: "/images/members/da-wit-yang.jpg",
  },
  {
    name: { ko: "임도현", en: "Do-Hyun Lim" },
    role: "undergrad",
    research: SAMPLE_RESEARCH,
    photo: "/images/members/do-hyun-lim.jpg",
  },
  {
    name: { ko: "이정민", en: "Jung-Min Lee" },
    role: "undergrad",
    research: SAMPLE_RESEARCH,
    photo: "/images/members/jung-min-lee.jpg",
  },
];

export type Project = {
  title: Localized;
  partner?: Localized; // collaborating hospital department or company
  funder: Localized;
  period: string; // "2025.03 – 2027.02"
  role: Localized; // the lab's part, e.g. 연구책임자 / Principal Investigator
  status: "ongoing" | "completed";
  summary?: Localized; // a sentence or two
  image?: string; // photo or figure under public/, shown 4:3 beside the text
};

// SAMPLE: the project outline until the details are supplied; only the
// partners are known. Status is assumed ongoing.
const SAMPLE_PROJECT = {
  title: { ko: "과제명 (예시)", en: "Project title (sample)" },
  funder: { ko: "지원기관 (예시)", en: "Funding agency (sample)" },
  period: "YYYY.MM – YYYY.MM",
  role: { ko: "역할 (예시)", en: "Role (sample)" },
  status: "ongoing",
  summary: {
    ko: "과제 개요 한두 문장 (예시)",
    en: "A sentence or two on the project (sample)",
  },
} satisfies Omit<Project, "partner">;

export const PROJECTS: Project[] = [
  { ...SAMPLE_PROJECT, partner: { ko: "성형외과", en: "Department of Plastic Surgery" } },
  { ...SAMPLE_PROJECT, partner: { ko: "Mezoo", en: "Mezoo" } },
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
    authors: ["H. J. Lee", "J.-U. Park", "J.-H. Han", "K. M. Kim", "W. Lee"],
    title:
      "Classifying Parkinson\u2019s Disease With or Without Rapid Eye Movement Sleep Behavior Disorder Using Machine Learning-Based Analysis of Single-Lead Electrocardiogram",
    venue: "Sleep Medicine Research",
    year: 2025,
    type: "journal",
    doi: "10.17241/smr.2025.02831",
    highlight: true,
  },
  {
    authors: ["H.-J. Song", "J.-H. Han", "S.-P. Cho", "S.-I. Im", "Y.-S. Kim", "J.-U. Park"],
    title: "Predicting Dysglycemia in Patients with Diabetes Using Electrocardiogram",
    venue: "Diagnostics",
    year: 2024,
    type: "journal",
    doi: "10.3390/diagnostics14222489",
    highlight: true,
  },
  {
    authors: ["J.-E. Sin", "J.-U. Park", "N.-Y. Kim"],
    title: "Factors Related to Nurses\u2019 Digital Health Literacy and Digital Health Utilization",
    venue: "Korean Journal of Health Education and Promotion",
    year: 2023,
    type: "journal",
    doi: "10.14367/kjhep.2023.40.3.13",
  },
  {
    authors: ["Y.-M. Jang", "J.-U. Park", "N.-Y. Kim"],
    title:
      "COVID-19 Depression and Infection Prevention Behavior among College Students: A Health Belief Perspective",
    venue: "Healthcare",
    year: 2022,
    type: "journal",
    doi: "10.3390/healthcare10102104",
  },
  {
    authors: ["E. Urtnasan", "J.-U. Park", "J.-H. Lee", "S.-B. Koh", "K.-J. Lee"],
    title:
      "Deep Learning for Automatic Detection of Periodic Limb Movement Disorder Based on Electrocardiogram Signals",
    venue: "Diagnostics",
    year: 2022,
    type: "journal",
    doi: "10.3390/diagnostics12092149",
  },
  {
    authors: ["J.-U. Park", "Y. Kim", "Y. Lee", "E. Urtnasan", "K.-J. Lee"],
    title:
      "A Prediction Algorithm for Hypoglycemia Based on Support Vector Machine Using Glucose Level and Electrocardiogram",
    venue: "Journal of Medical Systems",
    year: 2022,
    type: "journal",
    doi: "10.1007/s10916-022-01859-3",
    highlight: true,
  },
  {
    authors: ["E. Urtnasan", "J.-U. Park", "E. Y. Joo", "K.-J. Lee"],
    title:
      "Deep Convolutional Recurrent Model for Automatic Scoring Sleep Stages Based on Single-Lead ECG Signal",
    venue: "Diagnostics",
    year: 2022,
    type: "journal",
    doi: "10.3390/diagnostics12051235",
  },
  {
    authors: ["J.-U. Park", "E. Urtnasan", "S.-H. Kim", "K.-J. Lee"],
    title:
      "A Prediction Model of Incident Cardiovascular Disease in Patients with Sleep-Disordered Breathing",
    venue: "Diagnostics",
    year: 2021,
    type: "journal",
    doi: "10.3390/diagnostics11122212",
    highlight: true,
  },
];

export type NewsItem = {
  date: string; // YYYY-MM-DD, shown as YYYY.MM.DD
  text: string;
  image: string; // photo under public/, e.g. "/images/news/2026-10-18.jpg", cropped to 4:3
};

// Newest first; the home hero shows the first five, one per slide. Unlike the
// other lists, an empty NEWS still shows: sample slides hold its place.
export const NEWS: NewsItem[] = [];

/** One event in the gallery, with a page of its own at /gallery/<slug>. */
export type Album = {
  slug: string; // lowercase letters, digits and hyphens, e.g. "2026-kosombe"
  title: Localized;
  date: string; // YYYY-MM-DD, shown as YYYY.MM.DD; albums group by its year
  photos: string[]; // under public/, e.g. "/images/gallery/2026-kosombe/1.jpg"; the first is the cover
};

// Any order; the gallery sorts newest first. Unlike the other lists, an empty
// ALBUMS still shows: sample cards hold the gallery's place.
export const ALBUMS: Album[] = [];
