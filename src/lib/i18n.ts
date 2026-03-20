export const DEFAULT_LOCALE = "en" as const;

export const LOCALES = [
  DEFAULT_LOCALE,
  "zh",
  "fil",
  "th",
  "vi",
  "ja",
  "es",
] as const;

export type Locale = (typeof LOCALES)[number];

export const LOCALE_META: Record<
  Locale,
  {
    label: string;
    nativeLabel: string;
    htmlLang: string;
    ogLocale: string;
    hreflang: string;
  }
> = {
  en: {
    label: "English",
    nativeLabel: "English",
    htmlLang: "en-US",
    ogLocale: "en_US",
    hreflang: "en",
  },
  zh: {
    label: "Chinese",
    nativeLabel: "中文",
    htmlLang: "zh-CN",
    ogLocale: "zh_CN",
    hreflang: "zh-CN",
  },
  fil: {
    label: "Filipino",
    nativeLabel: "Filipino",
    htmlLang: "fil-PH",
    ogLocale: "fil_PH",
    hreflang: "fil-PH",
  },
  th: {
    label: "Thai",
    nativeLabel: "ไทย",
    htmlLang: "th-TH",
    ogLocale: "th_TH",
    hreflang: "th-TH",
  },
  vi: {
    label: "Vietnamese",
    nativeLabel: "Tiếng Việt",
    htmlLang: "vi-VN",
    ogLocale: "vi_VN",
    hreflang: "vi-VN",
  },
  ja: {
    label: "Japanese",
    nativeLabel: "日本語",
    htmlLang: "ja-JP",
    ogLocale: "ja_JP",
    hreflang: "ja-JP",
  },
  es: {
    label: "Spanish",
    nativeLabel: "Español",
    htmlLang: "es-ES",
    ogLocale: "es_ES",
    hreflang: "es-ES",
  },
};

export function isSupportedLocale(value = ""): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function normalizePath(path = "/") {
  if (!path) return "/";

  const [rawPathname, hash = ""] = path.split("#");
  const [rawPathOnly, query = ""] = rawPathname.split("?");
  let pathname = rawPathOnly || "/";

  if (!pathname.startsWith("/")) pathname = `/${pathname}`;
  if (pathname !== "/" && !pathname.endsWith("/")) pathname = `${pathname}/`;

  let normalized = pathname;
  if (query) normalized += `?${query}`;
  if (hash) normalized += `#${hash}`;
  return normalized;
}

export function getLocaleFromPath(path = "/"): Locale {
  const pathname = normalizePath(path).split(/[?#]/)[0];
  const [firstSegment] = pathname.replace(/^\/+|\/+$/g, "").split("/");
  return isSupportedLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE;
}

export function stripLocalePrefix(path = "/") {
  const normalized = normalizePath(path);
  const [pathname, suffix = ""] = normalized.split(/(?=[?#])/);
  const trimmed = pathname.replace(/^\/+|\/+$/g, "");

  if (!trimmed) return normalized;

  const segments = trimmed.split("/");
  if (!isSupportedLocale(segments[0])) return normalized;

  const nextPath =
    segments.length > 1 ? `/${segments.slice(1).join("/")}/` : "/";
  return `${nextPath}${suffix}`;
}

export function localizePath(path = "/", locale: Locale = DEFAULT_LOCALE) {
  const normalized = normalizePath(path);
  const [pathname, suffix = ""] = normalized.split(/(?=[?#])/);
  const basePath = stripLocalePrefix(pathname);

  if (locale === DEFAULT_LOCALE) {
    return `${basePath}${suffix}`;
  }

  return basePath === "/"
    ? `/${locale}/${suffix}`
    : `/${locale}${basePath}${suffix}`;
}

export function getLocaleMeta(locale: Locale = DEFAULT_LOCALE) {
  return LOCALE_META[locale] || LOCALE_META[DEFAULT_LOCALE];
}

export function buildLocaleAlternates(path = "/") {
  const basePath = stripLocalePrefix(path);
  return [
    ...LOCALES.map((locale) => ({
      locale,
      hrefLang: LOCALE_META[locale].hreflang,
      href: localizePath(basePath, locale),
    })),
    {
      locale: DEFAULT_LOCALE,
      hrefLang: "x-default",
      href: localizePath(basePath, DEFAULT_LOCALE),
    },
  ];
}

export function getLanguageOptions(currentPath = "/") {
  return LOCALES.map((locale) => ({
    locale,
    label: LOCALE_META[locale].label,
    nativeLabel: LOCALE_META[locale].nativeLabel,
    href: localizePath(currentPath, locale),
  }));
}

export function localizeInternalLinksHtml(
  html = "",
  locale: Locale = DEFAULT_LOCALE,
) {
  if (!html || locale === DEFAULT_LOCALE) return html;

  return html.replace(
    /(href|action)=["'](\/[^"']*)["']/gi,
    (match, attribute, value) => `${attribute}="${localizePath(value, locale)}"`,
  );
}

export const UI_STRINGS: Record<
  Locale,
  {
    languageLabel: string;
    nav: {
      home: string;
      about: string;
      datingSafety: string;
      faqs: string;
      locations: string;
      blog: string;
      login: string;
      register: string;
    };
    footer: {
      blurb: string;
      explore: string;
      about: string;
      legal: string;
      joinBlossoms: string;
      contactUs: string;
      terms: string;
      privacy: string;
    };
    home: {
      eyebrow: string;
      title: string;
      lede: string;
      badge: string;
      manTitle: string;
      manBody: string;
      womanTitle: string;
      womanBody: string;
      trustOne: string;
      trustTwo: string;
      alreadyMember: string;
      platformEyebrow: string;
    };
    blog: {
      journal: string;
      onThisPage: string;
      moreFromJournal: string;
      keepReading: string;
      minRead: string;
      indexTitle: string;
      indexDescription: string;
    };
    seo: {
      homeTitle: string;
      homeDescription: string;
      homeKeywords: string;
      blogIndexTitle: string;
      blogIndexDescription: string;
      blogIndexKeywords: string;
      aboutTitle: string;
      aboutDescription: string;
      aboutKeywords: string;
      faqTitle: string;
      faqDescription: string;
      safetyTitle: string;
      safetyDescription: string;
      locationTitle: (locationName: string) => string;
      locationDescription: (locationName: string) => string;
    };
  }
> = {
  en: {
    languageLabel: "Language",
    nav: {
      home: "Home",
      about: "About Us",
      datingSafety: "Dating Safety",
      faqs: "FAQs",
      locations: "Locations",
      blog: "Blog",
      login: "Login",
      register: "Register",
    },
    footer: {
      blurb:
        "Long-term relationship focused dating since 1974. Built around trust, culture, and genuine connection.",
      explore: "Explore",
      about: "About",
      legal: "Legal",
      joinBlossoms: "Join Blossoms",
      contactUs: "Contact Us",
      terms: "Terms of Use",
      privacy: "Privacy Policy",
    },
    home: {
      eyebrow: "Asian Dating Since 1974",
      title: "Start your journey to something meaningful.",
      lede:
        "Cherry Blossoms is an Asian dating brand for serious connections, cultural openness, and a more intentional path to international relationships.",
      badge: "Start Your Journey",
      manTitle: "I Am a Man...",
      manBody: "Seeking a Meaningful Relationship",
      womanTitle: "I Am a Woman...",
      womanBody: "Seeking a Meaningful Relationship",
      trustOne: "Established Since 1974",
      trustTwo: "Real Members Worldwide",
      alreadyMember: "Already a member?",
      platformEyebrow: "Platform overview",
    },
    blog: {
      journal: "Blossoms Journal",
      onThisPage: "On this page",
      moreFromJournal: "More from the journal",
      keepReading: "Keep reading",
      minRead: "min read",
      indexTitle: "Dating advice, safety guidance, and real relationship stories.",
      indexDescription:
        "Explore Asian dating advice, Filipina dating insights, long-distance relationship tips, and online dating safety guidance from Cherry Blossoms.",
    },
    seo: {
      homeTitle:
        "Cherry Blossoms Asian Dating | International Asian Dating Since 1974",
      homeDescription:
        "Cherry Blossoms is an Asian dating site for people seeking meaningful international relationships. Discover Asian dating, real members, and long-term connections since 1974.",
      homeKeywords:
        "Asian dating, Asian dating site, Filipina dating, Filipino dating site, Philippines dating site, Asian singles, Filipina singles, international dating, serious relationships, Cherry Blossoms Dating",
      blogIndexTitle: "Asian Dating Advice Blog | Cherry Blossoms Journal",
      blogIndexDescription:
        "Explore Asian dating advice, Filipina dating insights, long-distance relationship tips, and online dating safety guidance from Cherry Blossoms.",
      blogIndexKeywords:
        "Asian dating blog, Filipina dating advice, online dating safety, relationship advice, Cherry Blossoms journal",
      aboutTitle: "About Cherry Blossoms Dating | Asian Dating Since 1974",
      aboutDescription:
        "Learn about Cherry Blossoms Dating, an international Asian dating site and Filipina dating brand serving serious relationships since 1974 with a focus on trust, safety, and long-term connection.",
      aboutKeywords:
        "about Cherry Blossoms, Cherry Blossoms Dating, Asian dating site, international dating, Filipina dating, serious relationships, dating brand since 1974",
      faqTitle: "Asian Dating FAQs | Cherry Blossoms Help Center",
      faqDescription:
        "Find answers about Cherry Blossoms, Asian dating memberships, profiles, messaging, billing, safety, and technical support in one organized FAQ guide.",
      safetyTitle: "Asian Dating Safety Tips | Cherry Blossoms",
      safetyDescription:
        "Read Cherry Blossoms dating safety tips for Asian dating, including scam prevention, privacy protection, reporting suspicious behavior, and support resources.",
      locationTitle: (locationName) =>
        `${locationName} Filipina Dating Site for Serious Relationships | Cherry Blossoms`,
      locationDescription: (locationName) =>
        `Meet Filipina singles in ${locationName} on Cherry Blossoms, a long-running Asian dating platform built for serious relationships, verified profiles, and safer international dating.`,
    },
  },
  zh: {
    languageLabel: "语言",
    nav: {
      home: "首页",
      about: "关于我们",
      datingSafety: "交友安全",
      faqs: "常见问题",
      locations: "地区",
      blog: "博客",
      login: "登录",
      register: "注册",
    },
    footer: {
      blurb: "自 1974 年起专注长期关系，建立在信任、文化理解与真实连接之上。",
      explore: "浏览",
      about: "关于",
      legal: "法律",
      joinBlossoms: "加入 Blossoms",
      contactUs: "联系我们",
      terms: "使用条款",
      privacy: "隐私政策",
    },
    home: {
      eyebrow: "始于 1974 的亚洲交友品牌",
      title: "开启一段更有意义的关系旅程。",
      lede:
        "Cherry Blossoms 是一个面向认真关系的亚洲交友品牌，强调文化开放、真实意图与更长期的国际关系。",
      badge: "开始你的旅程",
      manTitle: "我是男士...",
      manBody: "寻找一段有意义的关系",
      womanTitle: "我是女士...",
      womanBody: "寻找一段有意义的关系",
      trustOne: "创立于 1974 年",
      trustTwo: "全球真实会员",
      alreadyMember: "已经是会员？",
      platformEyebrow: "平台概览",
    },
    blog: {
      journal: "Blossoms 专栏",
      onThisPage: "本页目录",
      moreFromJournal: "更多专栏内容",
      keepReading: "继续阅读",
      minRead: "分钟阅读",
      indexTitle: "约会建议、安全指南与真实关系故事。",
      indexDescription:
        "查看 Cherry Blossoms 提供的亚洲交友建议、菲律宾交友洞察、异地关系技巧与在线交友安全指南。",
    },
    seo: {
      homeTitle: "Cherry Blossoms 亚洲交友 | 自 1974 年起的国际亚洲交友品牌",
      homeDescription:
        "Cherry Blossoms 是面向认真国际关系的亚洲交友网站。探索亚洲交友、真实会员与自 1974 年延续至今的长期关系平台。",
      homeKeywords:
        "亚洲交友, 亚洲交友网站, 菲律宾交友, 国际交友, 认真关系, Cherry Blossoms Dating",
      blogIndexTitle: "亚洲交友博客 | Cherry Blossoms 专栏",
      blogIndexDescription:
        "获取亚洲交友建议、菲律宾交友洞察、异地关系技巧与在线交友安全内容。",
      blogIndexKeywords:
        "亚洲交友博客, 菲律宾交友建议, 在线交友安全, 关系建议, Cherry Blossoms",
      aboutTitle: "关于 Cherry Blossoms Dating | 自 1974 年起的亚洲交友品牌",
      aboutDescription:
        "了解 Cherry Blossoms Dating，这是一家自 1974 年起专注信任、安全与长期关系的国际亚洲交友与菲律宾交友品牌。",
      aboutKeywords:
        "关于 Cherry Blossoms, Cherry Blossoms Dating, 亚洲交友网站, 菲律宾交友, 国际交友, 长期关系",
      faqTitle: "亚洲交友常见问题 | Cherry Blossoms 帮助中心",
      faqDescription:
        "查看关于 Cherry Blossoms、会员、资料、消息、计费、安全与技术支持的常见问题解答。",
      safetyTitle: "亚洲交友安全指南 | Cherry Blossoms",
      safetyDescription:
        "阅读 Cherry Blossoms 的亚洲交友安全建议，包括防诈骗、隐私保护、举报可疑行为与支持资源。",
      locationTitle: (locationName) =>
        `${locationName} 菲律宾交友网站 | Cherry Blossoms`,
      locationDescription: (locationName) =>
        `在 Cherry Blossoms 上认识来自 ${locationName} 的菲律宾单身人士。这是一个以认真关系、已验证资料与更安全国际交友为核心的长期平台。`,
    },
  },
  fil: {
    languageLabel: "Wika",
    nav: {
      home: "Home",
      about: "Tungkol sa Amin",
      datingSafety: "Kaligtasan sa Dating",
      faqs: "Mga FAQ",
      locations: "Mga Lokasyon",
      blog: "Blog",
      login: "Login",
      register: "Mag-sign Up",
    },
    footer: {
      blurb:
        "Nakatuon sa pangmatagalang relasyon mula pa noong 1974, na binuo sa tiwala, kultura, at tunay na koneksyon.",
      explore: "Tuklasin",
      about: "Tungkol",
      legal: "Legal",
      joinBlossoms: "Sumali sa Blossoms",
      contactUs: "Makipag-ugnayan",
      terms: "Mga Tuntunin",
      privacy: "Patakaran sa Privacy",
    },
    home: {
      eyebrow: "Asian dating mula 1974",
      title: "Simulan ang isang mas makabuluhang paglalakbay sa relasyon.",
      lede:
        "Ang Cherry Blossoms ay isang Asian dating brand para sa seryosong koneksyon, cultural openness, at mas intensiyonal na daan tungo sa international relationships.",
      badge: "Simulan ang Iyong Journey",
      manTitle: "Ako ay Lalaki...",
      manBody: "Naghahanap ng Makabuluhang Relasyon",
      womanTitle: "Ako ay Babae...",
      womanBody: "Naghahanap ng Makabuluhang Relasyon",
      trustOne: "Itinatag noong 1974",
      trustTwo: "Mga totoong miyembro sa buong mundo",
      alreadyMember: "May account ka na?",
      platformEyebrow: "Pangkalahatang-ideya ng platform",
    },
    blog: {
      journal: "Blossoms Journal",
      onThisPage: "Sa pahinang ito",
      moreFromJournal: "Higit pa mula sa journal",
      keepReading: "Magpatuloy sa pagbabasa",
      minRead: "min read",
      indexTitle:
        "Dating advice, safety guidance, at totoong relationship stories.",
      indexDescription:
        "Tuklasin ang Asian dating advice, Filipina dating insights, long-distance tips, at online dating safety guidance mula sa Cherry Blossoms.",
    },
    seo: {
      homeTitle:
        "Cherry Blossoms Asian Dating | International Asian Dating mula 1974",
      homeDescription:
        "Ang Cherry Blossoms ay isang Asian dating site para sa mga taong naghahanap ng makabuluhang international relationships, totoong miyembro, at pangmatagalang koneksyon mula pa noong 1974.",
      homeKeywords:
        "Asian dating, Filipina dating, Filipino dating site, international dating, serious relationships, Cherry Blossoms Dating",
      blogIndexTitle: "Asian Dating Advice Blog | Cherry Blossoms Journal",
      blogIndexDescription:
        "Tuklasin ang Asian dating advice, Filipina dating insights, relationship tips, at online dating safety guidance mula sa Cherry Blossoms.",
      blogIndexKeywords:
        "Asian dating blog, Filipina dating advice, online dating safety, relationship advice, Cherry Blossoms",
      aboutTitle: "Tungkol sa Cherry Blossoms Dating | Asian Dating mula 1974",
      aboutDescription:
        "Kilalanin ang Cherry Blossoms Dating, isang international Asian dating site at Filipina dating brand para sa seryosong relasyon mula pa noong 1974.",
      aboutKeywords:
        "Cherry Blossoms Dating, Asian dating site, Filipina dating, international dating, serious relationships",
      faqTitle: "Asian Dating FAQs | Cherry Blossoms Help Center",
      faqDescription:
        "Hanapin ang mga sagot tungkol sa Cherry Blossoms, memberships, profiles, messaging, billing, safety, at technical support.",
      safetyTitle: "Asian Dating Safety Tips | Cherry Blossoms",
      safetyDescription:
        "Basahin ang Cherry Blossoms safety tips para sa Asian dating, kabilang ang scam prevention, privacy protection, at reporting support.",
      locationTitle: (locationName) =>
        `${locationName} Filipina Dating Site | Cherry Blossoms`,
      locationDescription: (locationName) =>
        `Makilala ang Filipina singles sa ${locationName} sa Cherry Blossoms, isang matagal nang Asian dating platform para sa seryosong relasyon at mas ligtas na international dating.`,
    },
  },
  th: {
    languageLabel: "ภาษา",
    nav: {
      home: "หน้าแรก",
      about: "เกี่ยวกับเรา",
      datingSafety: "ความปลอดภัยในการเดต",
      faqs: "คำถามที่พบบ่อย",
      locations: "สถานที่",
      blog: "บล็อก",
      login: "เข้าสู่ระบบ",
      register: "สมัคร",
    },
    footer: {
      blurb:
        "แพลตฟอร์มหาคู่เพื่อความสัมพันธ์ระยะยาวตั้งแต่ปี 1974 สร้างบนความไว้วางใจ วัฒนธรรม และความสัมพันธ์ที่จริงใจ",
      explore: "สำรวจ",
      about: "เกี่ยวกับ",
      legal: "กฎหมาย",
      joinBlossoms: "เข้าร่วม Blossoms",
      contactUs: "ติดต่อเรา",
      terms: "ข้อกำหนดการใช้งาน",
      privacy: "นโยบายความเป็นส่วนตัว",
    },
    home: {
      eyebrow: "เอเชียนเดตติ้งตั้งแต่ปี 1974",
      title: "เริ่มต้นเส้นทางสู่ความสัมพันธ์ที่มีความหมายมากขึ้น",
      lede:
        "Cherry Blossoms คือแบรนด์ Asian dating สำหรับคนที่มองหาความสัมพันธ์จริงจัง เปิดกว้างทางวัฒนธรรม และเส้นทางสู่ความสัมพันธ์ระหว่างประเทศที่มีความตั้งใจมากขึ้น",
      badge: "เริ่มต้นเส้นทางของคุณ",
      manTitle: "ฉันเป็นผู้ชาย...",
      manBody: "กำลังมองหาความสัมพันธ์ที่มีความหมาย",
      womanTitle: "ฉันเป็นผู้หญิง...",
      womanBody: "กำลังมองหาความสัมพันธ์ที่มีความหมาย",
      trustOne: "ก่อตั้งตั้งแต่ปี 1974",
      trustTwo: "สมาชิกจริงจากทั่วโลก",
      alreadyMember: "เป็นสมาชิกอยู่แล้ว?",
      platformEyebrow: "ภาพรวมแพลตฟอร์ม",
    },
    blog: {
      journal: "บันทึก Blossoms",
      onThisPage: "ในหน้านี้",
      moreFromJournal: "เพิ่มเติมจากบันทึก",
      keepReading: "อ่านต่อ",
      minRead: "นาทีในการอ่าน",
      indexTitle: "คำแนะนำเรื่องเดต ความปลอดภัย และเรื่องราวความสัมพันธ์จริง",
      indexDescription:
        "สำรวจคำแนะนำเรื่อง Asian dating, Filipina dating, ความสัมพันธ์ระยะไกล และความปลอดภัยในการเดตออนไลน์จาก Cherry Blossoms",
    },
    seo: {
      homeTitle:
        "Cherry Blossoms Asian Dating | Asian Dating ระหว่างประเทศตั้งแต่ปี 1974",
      homeDescription:
        "Cherry Blossoms คือเว็บไซต์ Asian dating สำหรับผู้ที่มองหาความสัมพันธ์ระหว่างประเทศที่จริงจัง สมาชิกจริง และความสัมพันธ์ระยะยาวตั้งแต่ปี 1974",
      homeKeywords:
        "Asian dating, Filipina dating, international dating, serious relationships, Cherry Blossoms Dating",
      blogIndexTitle: "บล็อกคำแนะนำ Asian Dating | Cherry Blossoms",
      blogIndexDescription:
        "อ่านคำแนะนำเรื่อง Asian dating, Filipina dating, เทคนิคความสัมพันธ์ และความปลอดภัยในการเดตออนไลน์",
      blogIndexKeywords:
        "Asian dating blog, Filipina dating advice, online dating safety, Cherry Blossoms",
      aboutTitle: "เกี่ยวกับ Cherry Blossoms Dating | Asian Dating ตั้งแต่ปี 1974",
      aboutDescription:
        "รู้จัก Cherry Blossoms Dating แพลตฟอร์ม Asian dating และ Filipina dating ระดับนานาชาติสำหรับความสัมพันธ์จริงจังตั้งแต่ปี 1974",
      aboutKeywords:
        "Cherry Blossoms Dating, Asian dating site, Filipina dating, international dating",
      faqTitle: "คำถามที่พบบ่อยเกี่ยวกับ Asian Dating | Cherry Blossoms",
      faqDescription:
        "ค้นหาคำตอบเกี่ยวกับ Cherry Blossoms, สมาชิก, โปรไฟล์, การส่งข้อความ, การชำระเงิน, ความปลอดภัย และการช่วยเหลือทางเทคนิค",
      safetyTitle: "เคล็ดลับความปลอดภัยในการเดต | Cherry Blossoms",
      safetyDescription:
        "อ่านคำแนะนำด้านความปลอดภัยของ Cherry Blossoms สำหรับ Asian dating รวมถึงการป้องกันการหลอกลวงและการปกป้องความเป็นส่วนตัว",
      locationTitle: (locationName) =>
        `${locationName} Filipina Dating Site | Cherry Blossoms`,
      locationDescription: (locationName) =>
        `พบกับสาวโสดฟิลิปปินส์ใน ${locationName} บน Cherry Blossoms แพลตฟอร์ม Asian dating ที่เน้นความสัมพันธ์จริงจังและการเดตระหว่างประเทศที่ปลอดภัยยิ่งขึ้น`,
    },
  },
  vi: {
    languageLabel: "Ngôn ngữ",
    nav: {
      home: "Trang chủ",
      about: "Về chúng tôi",
      datingSafety: "An toàn hẹn hò",
      faqs: "Câu hỏi thường gặp",
      locations: "Địa điểm",
      blog: "Blog",
      login: "Đăng nhập",
      register: "Đăng ký",
    },
    footer: {
      blurb:
        "Nền tảng hẹn hò tập trung vào mối quan hệ lâu dài từ năm 1974, được xây dựng trên sự tin cậy, văn hóa và kết nối chân thành.",
      explore: "Khám phá",
      about: "Giới thiệu",
      legal: "Pháp lý",
      joinBlossoms: "Tham gia Blossoms",
      contactUs: "Liên hệ",
      terms: "Điều khoản sử dụng",
      privacy: "Chính sách quyền riêng tư",
    },
    home: {
      eyebrow: "Asian dating từ năm 1974",
      title: "Bắt đầu hành trình cho một mối quan hệ ý nghĩa hơn.",
      lede:
        "Cherry Blossoms là thương hiệu Asian dating dành cho những kết nối nghiêm túc, cởi mở văn hóa và con đường chủ động hơn đến các mối quan hệ quốc tế.",
      badge: "Bắt đầu hành trình",
      manTitle: "Tôi là nam...",
      manBody: "Tìm kiếm một mối quan hệ ý nghĩa",
      womanTitle: "Tôi là nữ...",
      womanBody: "Tìm kiếm một mối quan hệ ý nghĩa",
      trustOne: "Thành lập từ năm 1974",
      trustTwo: "Thành viên thật trên toàn thế giới",
      alreadyMember: "Đã là thành viên?",
      platformEyebrow: "Tổng quan nền tảng",
    },
    blog: {
      journal: "Blossoms Journal",
      onThisPage: "Trên trang này",
      moreFromJournal: "Thêm từ journal",
      keepReading: "Đọc tiếp",
      minRead: "phút đọc",
      indexTitle: "Lời khuyên hẹn hò, hướng dẫn an toàn và câu chuyện tình yêu thật.",
      indexDescription:
        "Khám phá lời khuyên Asian dating, góc nhìn Filipina dating, mẹo quan hệ đường dài và hướng dẫn an toàn hẹn hò trực tuyến từ Cherry Blossoms.",
    },
    seo: {
      homeTitle:
        "Cherry Blossoms Asian Dating | Asian Dating quốc tế từ năm 1974",
      homeDescription:
        "Cherry Blossoms là trang Asian dating dành cho những người tìm kiếm mối quan hệ quốc tế nghiêm túc, thành viên thật và kết nối lâu dài từ năm 1974.",
      homeKeywords:
        "Asian dating, Filipina dating, international dating, serious relationships, Cherry Blossoms Dating",
      blogIndexTitle: "Blog lời khuyên Asian Dating | Cherry Blossoms",
      blogIndexDescription:
        "Xem lời khuyên Asian dating, góc nhìn Filipina dating, mẹo quan hệ và hướng dẫn an toàn hẹn hò trực tuyến.",
      blogIndexKeywords:
        "Asian dating blog, Filipina dating advice, online dating safety, Cherry Blossoms",
      aboutTitle: "Về Cherry Blossoms Dating | Asian Dating từ năm 1974",
      aboutDescription:
        "Tìm hiểu Cherry Blossoms Dating, một thương hiệu Asian dating và Filipina dating quốc tế dành cho các mối quan hệ nghiêm túc từ năm 1974.",
      aboutKeywords:
        "Cherry Blossoms Dating, Asian dating site, Filipina dating, international dating",
      faqTitle: "Câu hỏi thường gặp về Asian Dating | Cherry Blossoms",
      faqDescription:
        "Tìm câu trả lời về Cherry Blossoms, thành viên, hồ sơ, nhắn tin, thanh toán, an toàn và hỗ trợ kỹ thuật.",
      safetyTitle: "Mẹo an toàn hẹn hò | Cherry Blossoms",
      safetyDescription:
        "Đọc các mẹo an toàn hẹn hò của Cherry Blossoms cho Asian dating, bao gồm chống lừa đảo và bảo vệ quyền riêng tư.",
      locationTitle: (locationName) =>
        `${locationName} Filipina Dating Site | Cherry Blossoms`,
      locationDescription: (locationName) =>
        `Gặp gỡ phụ nữ Philippines độc thân tại ${locationName} trên Cherry Blossoms, nền tảng Asian dating lâu năm dành cho các mối quan hệ nghiêm túc và hẹn hò quốc tế an toàn hơn.`,
    },
  },
  ja: {
    languageLabel: "言語",
    nav: {
      home: "ホーム",
      about: "会社情報",
      datingSafety: "安全ガイド",
      faqs: "よくある質問",
      locations: "地域",
      blog: "ブログ",
      login: "ログイン",
      register: "登録",
    },
    footer: {
      blurb:
        "1974年から長期的な関係に焦点を当て、信頼・文化・本物のつながりを軸に築かれた出会いの場です。",
      explore: "見る",
      about: "案内",
      legal: "法務",
      joinBlossoms: "Blossoms に登録",
      contactUs: "お問い合わせ",
      terms: "利用規約",
      privacy: "プライバシーポリシー",
    },
    home: {
      eyebrow: "1974年から続くアジア系デーティング",
      title: "より意味のある関係への一歩を始めましょう。",
      lede:
        "Cherry Blossoms は、真剣なつながり、文化的な openness、そしてより意図的な国際関係を求める人のための Asian dating ブランドです。",
      badge: "旅を始める",
      manTitle: "私は男性です...",
      manBody: "意味のある関係を探しています",
      womanTitle: "私は女性です...",
      womanBody: "意味のある関係を探しています",
      trustOne: "1974年創業",
      trustTwo: "世界中の実在会員",
      alreadyMember: "すでに会員ですか？",
      platformEyebrow: "プラットフォーム概要",
    },
    blog: {
      journal: "Blossoms Journal",
      onThisPage: "このページの内容",
      moreFromJournal: "ジャーナルの続きを読む",
      keepReading: "続きを読む",
      minRead: "分で読めます",
      indexTitle: "恋愛アドバイス、安全ガイド、そして本物のストーリー。",
      indexDescription:
        "Cherry Blossoms の Asian dating アドバイス、Filipina dating の洞察、遠距離恋愛のヒント、オンラインデーティング安全ガイドをご覧ください。",
    },
    seo: {
      homeTitle:
        "Cherry Blossoms Asian Dating | 1974年から続く国際アジア系デーティング",
      homeDescription:
        "Cherry Blossoms は、真剣な国際関係を求める人のための Asian dating サイトです。1974年から続く本物の会員と長期的なつながりを見つけましょう。",
      homeKeywords:
        "Asian dating, Filipina dating, international dating, serious relationships, Cherry Blossoms Dating",
      blogIndexTitle: "Asian Dating アドバイスブログ | Cherry Blossoms Journal",
      blogIndexDescription:
        "Asian dating アドバイス、Filipina dating の洞察、恋愛のヒント、安全ガイドをご覧ください。",
      blogIndexKeywords:
        "Asian dating blog, Filipina dating advice, online dating safety, Cherry Blossoms",
      aboutTitle: "Cherry Blossoms Dating について | 1974年から続く Asian Dating",
      aboutDescription:
        "Cherry Blossoms Dating は、信頼、安全性、長期的な関係を重視する国際的な Asian dating / Filipina dating ブランドです。",
      aboutKeywords:
        "Cherry Blossoms Dating, Asian dating site, Filipina dating, international dating",
      faqTitle: "Asian Dating FAQ | Cherry Blossoms ヘルプセンター",
      faqDescription:
        "Cherry Blossoms、会員登録、プロフィール、メッセージ、課金、安全性、技術サポートに関する回答をご確認ください。",
      safetyTitle: "Asian Dating 安全ガイド | Cherry Blossoms",
      safetyDescription:
        "Cherry Blossoms の Asian dating 安全ガイド。詐欺防止、プライバシー保護、通報方法などを掲載しています。",
      locationTitle: (locationName) =>
        `${locationName} Filipina Dating Site | Cherry Blossoms`,
      locationDescription: (locationName) =>
        `${locationName} のフィリピン人シングルと出会える Cherry Blossoms。真剣な関係とより安全な国際デーティングのために設計された長年の Asian dating プラットフォームです。`,
    },
  },
  es: {
    languageLabel: "Idioma",
    nav: {
      home: "Inicio",
      about: "Sobre nosotros",
      datingSafety: "Seguridad",
      faqs: "Preguntas frecuentes",
      locations: "Ubicaciones",
      blog: "Blog",
      login: "Iniciar sesión",
      register: "Registrarse",
    },
    footer: {
      blurb:
        "Dating enfocado en relaciones a largo plazo desde 1974, construido sobre confianza, cultura y conexión genuina.",
      explore: "Explorar",
      about: "Acerca de",
      legal: "Legal",
      joinBlossoms: "Únete a Blossoms",
      contactUs: "Contáctanos",
      terms: "Términos de uso",
      privacy: "Política de privacidad",
    },
    home: {
      eyebrow: "Asian dating desde 1974",
      title: "Empieza un camino hacia algo más significativo.",
      lede:
        "Cherry Blossoms es una marca de Asian dating para conexiones serias, apertura cultural y un camino más intencional hacia relaciones internacionales.",
      badge: "Comienza tu viaje",
      manTitle: "Soy un hombre...",
      manBody: "Busco una relación significativa",
      womanTitle: "Soy una mujer...",
      womanBody: "Busco una relación significativa",
      trustOne: "Desde 1974",
      trustTwo: "Miembros reales en todo el mundo",
      alreadyMember: "¿Ya eres miembro?",
      platformEyebrow: "Resumen de la plataforma",
    },
    blog: {
      journal: "Blossoms Journal",
      onThisPage: "En esta página",
      moreFromJournal: "Más del journal",
      keepReading: "Seguir leyendo",
      minRead: "min de lectura",
      indexTitle:
        "Consejos de citas, guía de seguridad e historias reales de relaciones.",
      indexDescription:
        "Explora consejos de Asian dating, ideas sobre Filipina dating, relaciones a distancia y seguridad en citas online con Cherry Blossoms.",
    },
    seo: {
      homeTitle:
        "Cherry Blossoms Asian Dating | Asian dating internacional desde 1974",
      homeDescription:
        "Cherry Blossoms es un sitio de Asian dating para personas que buscan relaciones internacionales serias, miembros reales y conexiones a largo plazo desde 1974.",
      homeKeywords:
        "Asian dating, Filipina dating, international dating, serious relationships, Cherry Blossoms Dating",
      blogIndexTitle: "Blog de consejos de Asian Dating | Cherry Blossoms",
      blogIndexDescription:
        "Explora consejos de Asian dating, ideas sobre Filipina dating, consejos de relaciones y seguridad en citas online.",
      blogIndexKeywords:
        "Asian dating blog, Filipina dating advice, online dating safety, Cherry Blossoms",
      aboutTitle: "Sobre Cherry Blossoms Dating | Asian dating desde 1974",
      aboutDescription:
        "Conoce Cherry Blossoms Dating, una marca internacional de Asian dating y Filipina dating enfocada en relaciones serias desde 1974.",
      aboutKeywords:
        "Cherry Blossoms Dating, Asian dating site, Filipina dating, international dating",
      faqTitle: "Preguntas frecuentes de Asian Dating | Cherry Blossoms",
      faqDescription:
        "Encuentra respuestas sobre Cherry Blossoms, membresías, perfiles, mensajería, pagos, seguridad y soporte técnico.",
      safetyTitle: "Consejos de seguridad en citas | Cherry Blossoms",
      safetyDescription:
        "Lee los consejos de seguridad de Cherry Blossoms para Asian dating, incluidos prevención de estafas y protección de privacidad.",
      locationTitle: (locationName) =>
        `${locationName} Filipina Dating Site | Cherry Blossoms`,
      locationDescription: (locationName) =>
        `Conoce solteras filipinas en ${locationName} en Cherry Blossoms, una plataforma veterana de Asian dating creada para relaciones serias y citas internacionales más seguras.`,
    },
  },
};

export function getUiStrings(locale: Locale = DEFAULT_LOCALE) {
  return UI_STRINGS[locale] || UI_STRINGS[DEFAULT_LOCALE];
}
