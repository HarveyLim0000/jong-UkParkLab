/**
 * Lab content. Empty arrays hide their section on the page, so an entry only
 * appears once there is something real to show. When Sanity is connected,
 * these exports become async queries and the page components stay unchanged.
 */

export const LAB = {
  name: "Jong-Uk Park Lab",
  shortName: "JUP Lab",
  // Draft, from the publication record — confirm wording with the PI.
  tagline: "Turning everyday biosignals into early warnings of disease.",
  email: "jupark@konyang.ac.kr",
  phone: "+82-42-600-8492",
  addressLines: [
    "(35365) Room 372, Jukheon Jeongbogwan",
    "Konyang University, Daejeon",
    "South Korea",
  ],
  address:
    "(35365) Room 372, Jukheon Jeongbogwan, Konyang University, Daejeon, South Korea",
  mapEmbed: "", // Google Maps embed URL — Contact page hides the map while empty

  // Draft, written from the publication and project record. Confirm with the PI.
  welcomeLead: "The Jong-Uk Park Lab (JUP Lab)",
  welcome:
    "develops signal processing and artificial "
    + "intelligence methods that turn everyday physiological signals into early "
    + "warnings of disease. Working from single-lead electrocardiogram, "
    + "photoplethysmography, nasal pressure and other non-invasive measurements, "
    + "we build deep learning models that detect sleep-disordered breathing, score "
    + "sleep stages, and predict cardiovascular and metabolic events. Our recent "
    + "work moves these models onto wearable and on-device platforms, so that "
    + "screening can happen at home rather than in the sleep laboratory. The lab is "
    + "part of the Department of Artificial Intelligence at Konyang University.",
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
    email: "jupark@konyang.ac.kr",
    photo: "/images/members/jong-uk-park.jpg",
  },
];

export type Project = {
  title: string;
  funder: string;
  period: string;
  role: "Principal" | "Participating";
  status: "ongoing" | "completed";
  summary: string;
};

export const PROJECTS: Project[] = [];

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
  date: string;
  text: string;
  image?: string;
};

export const NEWS: NewsItem[] = [];

export type Album = {
  slug: string;
  title: string;
  date: string;
  photos: { src: string; alt: string }[];
};

export const ALBUMS: Album[] = [];
