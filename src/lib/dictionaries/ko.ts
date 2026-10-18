import type en from "./en";

const ko: typeof en = {
  nav: {
    home: "홈",
    members: "구성원",
    projects: "연구과제",
    publications: "논문",
    gallery: "갤러리",
    contact: "연락처",
    menu: "메뉴",
    language: "언어",
  },
  footer: {
    address: "주소",
  },
  home: {
    research: "연구 분야",
    news: "최신 소식",
    newsPrev: "이전 소식",
    newsNext: "다음 소식",
    contact: "연락처",
    recruitBeforeName: "",
    recruitAfterName: "에서 함께 연구할 학부연구생과 대학원생을 상시 모집합니다.",
    recruitWelcome: "생체신호와 인공지능 연구에 열정이 있는 분이라면 누구나 지원할 수 있습니다.",
    contactBeforeEmail: "이메일 ",
    contactBeforePhone: " · 전화 ",
    contactBeforeLink: "지원 방법은 ",
    contactLink: "연락처",
    contactAfterLink: " 페이지에서 확인하실 수 있으며, 공동 연구 문의도 언제든 환영합니다.",
  },
  members: {
    professor: "지도교수",
    postdoc: "박사후연구원",
    phd: "박사과정",
    ms: "석사과정",
    undergrad: "학부연구생",
    alumni: "졸업생",
    education: "학력",
    career: "경력",
  },
  projects: {
    empty: "연구과제가 이곳에 게시될 예정입니다.",
    ongoing: "진행 중",
    completed: "완료",
    partner: "협력기관",
    funder: "지원기관",
    period: "연구기간",
    role: "역할",
  },
  publications: {
    selected: "대표 논문",
  },
  gallery: {
    photoCount: (n: number) => `사진 ${n}장`,
    sampleTitle: "행사명 (예시)",
    sampleMeta: "YYYY.MM.DD · 사진 N장",
  },
  contact: {
    lab: "연구실",
    address: "주소",
    email: "이메일",
    phone: "전화",
    inquiries: "공동 연구와 그 밖의 문의도 이메일로 언제든 환영합니다.",
    map: "지도",
    mapTitle: "연구실 위치 지도",
    openMap: "Google 지도에서 보기",
    positions: "모집 안내",
    graduate: "대학원생",
    graduateSend: "이력서(CV), 관심 연구 주제, 지원 동기를 이메일로 보내 주세요.",
    undergrad: "학부연구생",
    undergradSend: "간단한 자기소개와 관심 연구 분야를 이메일로 보내 주세요.",
    howToApply: "지원 절차",
    steps: [
      {
        title: "이메일 지원",
        text: "위 내용을 이메일로 보내 주세요. 메일 제목은 ‘[지원] 이름_과정’처럼 적어 주시면 됩니다.",
      },
      {
        title: "면담",
        text: "교수님과 면담하며 관심 연구와 참여 방식을 함께 정합니다.",
      },
      {
        title: "합류",
        text: "학부연구생은 바로 연구에 참여하고, 대학원생은 건양대학교 대학원 입학 전형에 지원합니다.",
      },
    ],
  },
  privacy: {
    title: "개인정보처리방침",
    noCollection:
      "이 사이트는 개인정보를 수집하지 않습니다. 문의 양식과 로그인 기능이 없으며, "
      + "방문 분석이나 광고용 쿠키도 사용하지 않습니다.",
    hosting:
      "이 사이트는 Vercel Inc.에서 호스팅합니다. 호스팅 업체는 보안 및 운영 목적으로 "
      + "접속 기록(IP 주소, 브라우저 정보, 요청한 페이지)을 생성하며, 이 기록은 "
      + "Vercel의 자체 정책에 따라 보관됩니다.",
    questions: "이 방침에 관한 문의: ",
    updated: "최종 수정일: 2026년 9월 1일",
  },
};

export default ko;
