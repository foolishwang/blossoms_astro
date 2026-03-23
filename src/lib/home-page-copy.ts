import type { Locale } from "./i18n";

export type HomePageCopy = {
  featuredKicker: string;
  featuredTitle: string;
  videoTitle: string;
  videoSound: string;
  videoMute: string;
  videoFullscreen: string;
  videoExitFullscreen: string;
  aboutKicker: string;
  aboutTitle: string;
  aboutBody: string;
  aboutBullets: Array<{ label: string; detail: string }>;
  aboutPrimaryCta: string;
  aboutSecondaryCta: string;
  aboutSince: string;
  aboutBuiltFor: string;
  aboutBuiltForBody: string;
  aboutStats: Array<{ value: string; detail: string }>;
  overviewKicker: string;
  overviewTitle: string;
  overviewBody: string[];
  overviewCaptionKicker: string;
  overviewCaptionTitle: string;
  statCards: Array<{ value: string; label: string; description: string }>;
  pillarsKicker: string;
  pillarsTitle: string;
  pillarsAriaLabel: string;
  pillars: Array<{ id: string; tab: string; title: string; body: string }>;
  pillarsPrimaryCta: string;
  storiesKicker: string;
  storiesTitle: string;
  storiesBody: string;
  storiesPrimaryCta: string;
  storiesSecondaryCta: string;
  storiesHeading: string;
  testimonials: Array<{ quote: string; name: string }>;
  faqKicker: string;
  faqTitle: string;
  faqBody: string;
  faqItems: Array<{ question: string; answer: string }>;
  locationsKicker: string;
  locationsTitle: string;
  locationsSummary: string;
  locationsDisclosure: string;
};

export const HOME_PAGE_COPY: Record<Locale, HomePageCopy> = {
  en: {
    featuredKicker: "Featured In",
    featuredTitle:
      "Cherry Blossoms and Asian dating coverage from major publications",
    videoTitle: "Cherry Blossoms introduction video",
    videoSound: "Sound",
    videoMute: "Mute",
    videoFullscreen: "Full",
    videoExitFullscreen: "Exit",
    aboutKicker: "About Us",
    aboutTitle: "Decades of Trust in Asian Dating",
    aboutBody:
      "Cherry Blossoms has been helping people navigate Asian dating since 1974. The brand has lasted because it leans on trust, safer member interactions, and a more serious relationship posture than the average swipe-first dating product.",
    aboutBullets: [
      { label: "Global Reach", detail: "Connecting members from across the globe." },
      { label: "Verified Profiles", detail: "Stringent checks to ensure authenticity." },
      { label: "Matchmaking Heritage", detail: "Thousands of successful marriages." },
    ],
    aboutPrimaryCta: "Learn Our Story",
    aboutSecondaryCta: "Review Safety Tips",
    aboutSince: "Since",
    aboutBuiltFor: "Built For",
    aboutBuiltForBody:
      "People who want commitment, cultural openness, and a platform with real history behind it.",
    aboutStats: [
      { value: "50+", detail: "Years of matchmaking heritage" },
      { value: "Global", detail: "Member network spanning borders" },
      { value: "Verified", detail: "Profiles designed to build trust" },
    ],
    overviewKicker: "Platform Overview",
    overviewTitle:
      "Asian Dating Site Online in the Philippines Where You Can Meet Singles with Ease",
    overviewBody: [
      "We see ourselves as more than just an “Asian dating site” but as a place for lasting love to find its first light. Blossoms is more that just another place to meet Asian single woman that turn out to not exist.",
      "We’re unlike any other Philippines online dating site – our profiles are where genuine heartwarming love stories begin. We have a love for connecting people and beginning the spark of real relationships. With our intelligent technology matching system you’ll meet Asian singles who share your relationship goals, cultural interests and a genuine desire to build a future together.",
    ],
    overviewCaptionKicker: "Editorial Selection",
    overviewCaptionTitle:
      "Real members. Relationship-first profiles. A platform built to feel human.",
    statCards: [
      {
        value: "86%",
        label: "User Engagement",
        description: "Of actively engaged chats within 24 hours of joining.",
      },
      {
        value: "5M",
        label: "Perfect Match",
        description: "Successful matches made since the platform's launch.",
      },
      {
        value: "34K+",
        label: "Love Online",
        description: "Messages exchanged daily on the platform on average.",
      },
    ],
    pillarsKicker: "Core Reasons",
    pillarsTitle: "Why people choose Blossoms for serious dating",
    pillarsAriaLabel: "Homepage value panels",
    pillars: [
      {
        id: "different",
        tab: "Why We're Different",
        title:
          "Why Blossoms feels different from faster, lower-trust dating platforms",
        body: "Blossoms is built around trust signals that matter in Asian dating: profile verification, safer messaging, a longer operating history, and a member base oriented toward real relationships instead of disposable attention loops.",
      },
      {
        id: "using",
        tab: "Using Blossoms.com",
        title: "A long-running Asian dating brand with clearer expectations",
        body: "Finding the right Asian dating site can be difficult when most platforms optimize for noise. Blossoms takes a more deliberate route, pairing decades of matchmaking experience with a product shaped around sincerity, safety, and long-term intent.",
      },
      {
        id: "love",
        tab: "Long-Term Love",
        title: "Meet Asian singles in a setting built for long-term relationships",
        body: "Cherry Blossoms supports international dating for people looking for something serious. Whether your focus is Asian dating broadly or Filipina dating in specific city pages, the platform is structured around meaningful connection rather than casual swiping.",
      },
    ],
    pillarsPrimaryCta: "Join Us",
    storiesKicker: "Real People, Real Love",
    storiesTitle: "Relationship stories from a long-running Asian dating community",
    storiesBody:
      "Your journey to love should feel exciting and worry-free. Blossoms prioritizes safety with verified profiles and privacy protection, while helping you meet the right person with far more confidence than generic dating platforms.",
    storiesPrimaryCta: "Read the Journal",
    storiesSecondaryCta: "Browse FAQs",
    storiesHeading: "Success Stories",
    testimonials: [
      {
        quote:
          "Two years of online chatting and now we're married and living happily here in Connecticut. Blossoms Dating made it possible.",
        name: "David & Phoebe",
      },
      {
        quote:
          "Blossoms Dating brought us together, and now we're living our happily-ever-after ten years of marriage later.",
        name: "John & Shienna",
      },
      {
        quote:
          "I found the last love of my life. I found a love that is pure, authentic, and enduring.",
        name: "Doug & Jheng",
      },
    ],
    faqKicker: "Questions & Answers",
    faqTitle: "Asian dating FAQ for memberships, trust, and how Blossoms works",
    faqBody:
      "Trust is part of the product, which is why the site keeps a strong help and reference layer. These common questions cover membership, messaging, billing, profile setup, and safety expectations.",
    faqItems: [
      {
        question: "Is Blossoms Dating a secure and trustworthy Asian online dating site?",
        answer:
          "Yes. Blossoms Dating uses profile verification, fraud prevention systems, and human support to reduce risk and create a safer experience for members.",
      },
      {
        question: "Why is Blossoms Dating free for Filipina and Asian women?",
        answer:
          "The model is designed to encourage genuine participation from more Asian women and support a healthier, more balanced dating community.",
      },
      {
        question: "Can I find a serious relationship or marriage through a Filipino dating site?",
        answer:
          "Yes. Blossoms is built for people seeking meaningful, long-term relationships rather than casual swiping or short-term attention.",
      },
      {
        question: "How do I start chatting with Asian singles on Blossoms?",
        answer:
          "Create a complete profile, upload strong photos, and use the site's messaging and chat tools to start conversations with verified members.",
      },
      {
        question: "What makes Blossoms different from other Filipina dating sites?",
        answer:
          "Blossoms focuses on verified profiles, stronger trust signals, and a relationship-first member experience rather than generic volume-based dating.",
      },
      {
        question: "How can I improve my success on Blossoms?",
        answer:
          "Use clear photos, write an honest profile, reply consistently, and focus on respectful conversations with people who share your goals.",
      },
      {
        question: "What makes a good Asian dating platform?",
        answer:
          "The strongest platforms prioritize authenticity, safety, and meaningful connections. Those fundamentals matter more than hype.",
      },
      {
        question: "Can Blossoms help me meet someone in the Philippines?",
        answer:
          "Yes. Blossoms connects members with verified Filipina singles and gives them tools to chat, match, and build more meaningful connections.",
      },
    ],
    locationsKicker: "Coverage",
    locationsTitle:
      "Explore Philippines city pages for people specifically looking for Filipina dating by location",
    locationsSummary:
      "Browse major Philippines city pages to find local-intent dating pages across the network.",
    locationsDisclosure: "Browse supported cities and provinces",
  },
  zh: {
    featuredKicker: "媒体报道",
    featuredTitle: "Cherry Blossoms 与亚洲交友平台相关报道来自多家主流媒体",
    videoTitle: "Cherry Blossoms 介绍视频",
    videoSound: "声音",
    videoMute: "静音",
    videoFullscreen: "全屏",
    videoExitFullscreen: "退出",
    aboutKicker: "关于我们",
    aboutTitle: "数十年的亚洲交友信任积累",
    aboutBody: "自 1974 年以来，Cherry Blossoms 一直在帮助人们探索亚洲交友。这个品牌能够持续至今，靠的是信任、更安全的会员互动，以及比普通滑动式交友产品更认真严肃的关系导向。",
    aboutBullets: [
      { label: "全球覆盖", detail: "连接来自世界各地的会员。" },
      { label: "已验证资料", detail: "通过严格检查提升真实性。" },
      { label: "牵线传统", detail: "已经促成大量成功婚姻。" },
    ],
    aboutPrimaryCta: "了解我们的故事",
    aboutSecondaryCta: "查看安全建议",
    aboutSince: "始于",
    aboutBuiltFor: "为谁而建",
    aboutBuiltForBody: "适合希望获得承诺、文化开放和真正有历史积淀平台的人。",
    aboutStats: [
      { value: "50+", detail: "年的牵线经验" },
      { value: "全球", detail: "跨国会员网络" },
      { value: "已验证", detail: "资料设计围绕信任建立" },
    ],
    overviewKicker: "平台概览",
    overviewTitle: "一个更重视关系、结构更清晰、噪音更少的亚洲交友平台",
    overviewBody: [
      "Blossoms 适合想在更可信、更耐心、也不那么一次性的环境中认识亚洲单身人士的人。",
      "资料、消息和匹配工具都旨在支持真实交流和长期契合。如果你想看按城市或国家划分的菲律宾交友页面，可以在站内更深层找到，而首页则聚焦更广义的 Cherry Blossoms 亚洲交友品牌。",
    ],
    overviewCaptionKicker: "编辑推荐",
    overviewCaptionTitle: "真实会员。以关系为先的资料。一个更有人味的平台。",
    statCards: [
      { value: "86%", label: "用户互动率", description: "新加入后 24 小时内进入活跃交流的比例。" },
      { value: "5M", label: "成功匹配", description: "平台上线以来达成的成功匹配数量。" },
      { value: "34K+", label: "每日交流", description: "平台平均每天发送的消息量。" },
    ],
    pillarsKicker: "核心原因",
    pillarsTitle: "为什么认真交友的人会选择 Blossoms",
    pillarsAriaLabel: "首页价值面板",
    pillars: [
      { id: "different", tab: "我们的不同", title: "为什么 Blossoms 与更快、更低信任的平台不一样", body: "Blossoms 围绕亚洲交友中真正重要的信任信号而构建：资料验证、更安全的沟通方式、更长久的运营历史，以及更偏向真实关系而非即时消耗注意力的会员基础。" },
      { id: "using", tab: "使用 Blossoms", title: "一个历史更久、预期更清晰的亚洲交友品牌", body: "当很多平台都在放大噪音时，找到合适的亚洲交友网站并不容易。Blossoms 选择更克制的路线，把数十年的牵线经验与真诚、安全和长期意图导向的产品结合在一起。" },
      { id: "love", tab: "长期爱情", title: "在一个为长期关系而设的环境中认识亚洲单身人士", body: "Cherry Blossoms 面向真正想认真交往的人。无论你关注广义亚洲交友，还是按城市寻找菲律宾交友，这个平台都围绕有意义的连接，而不是随意滑动。" },
    ],
    pillarsPrimaryCta: "立即加入",
    storiesKicker: "真实的人，真实的爱",
    storiesTitle: "来自长期亚洲交友社区的关系故事",
    storiesBody: "寻找爱情的过程应该既令人期待又更安心。Blossoms 通过已验证资料和隐私保护把安全放在前面，同时让你比在泛化交友平台上更有信心地遇到合适的人。",
    storiesPrimaryCta: "阅读专栏",
    storiesSecondaryCta: "查看 FAQ",
    storiesHeading: "成功故事",
    testimonials: [
      { quote: "我们在线聊天了两年，现在已经结婚并在康涅狄格幸福生活。Blossoms Dating 让这一切成为可能。", name: "David & Phoebe" },
      { quote: "Blossoms Dating 让我们相遇，而如今十年婚姻之后，我们依然过着幸福生活。", name: "John & Shienna" },
      { quote: "我找到了此生最后的爱，一份纯粹、真实而持久的爱。", name: "Doug & Jheng" },
    ],
    faqKicker: "常见问答",
    faqTitle: "关于会员、信任以及 Blossoms 使用方式的亚洲交友 FAQ",
    faqBody: "信任是产品的一部分，因此网站也保留了清晰的帮助与参考层。这些常见问题涵盖会员、消息、账单、资料设置和安全预期。",
    faqItems: [
      { question: "Blossoms Dating 是安全且值得信赖的亚洲交友网站吗？", answer: "是的。Blossoms Dating 使用资料验证、防欺诈系统和人工支持来降低风险，并为会员提供更安全的体验。" },
      { question: "为什么 Blossoms 对菲律宾和亚洲女性免费？", answer: "这种模式旨在吸引更多亚洲女性真实参与，并帮助形成更健康、更平衡的交友社区。" },
      { question: "我能通过菲律宾交友网站找到认真关系或婚姻吗？", answer: "可以。Blossoms 面向的是寻找有意义长期关系的人，而不是短期随意互动。" },
      { question: "我如何开始在 Blossoms 上与亚洲单身人士聊天？", answer: "先完善个人资料，上传优质照片，再使用站内消息和聊天工具与已验证会员展开交流。" },
      { question: "Blossoms 与其他菲律宾交友网站有何不同？", answer: "Blossoms 更强调已验证资料、更强的信任信号，以及以关系为先的会员体验，而不是泛化的大量流量模式。" },
      { question: "怎样提高我在 Blossoms 上的成功率？", answer: "使用清晰照片、撰写真实资料、保持及时回复，并专注于与目标一致的人进行尊重的交流。" },
      { question: "什么样的平台才算好的亚洲交友平台？", answer: "最好的平台会优先考虑真实性、安全性和有意义的关系，这些基础比营销噱头更重要。" },
      { question: "Blossoms 能帮助我认识菲律宾当地对象吗？", answer: "可以。Blossoms 将会员与已验证的菲律宾单身人士连接起来，并提供聊天、匹配和建立真实关系的工具。" },
    ],
    locationsKicker: "覆盖范围",
    locationsTitle: "按地区探索菲律宾城市页面，帮助寻找特定地区的菲律宾交友",
    locationsSummary: "浏览菲律宾主要城市页面，查看网络中更具本地意图的交友页面。",
    locationsDisclosure: "浏览支持的城市和省份",
  },
  fil: {
    featuredKicker: "Itinampok Sa",
    featuredTitle: "Cherry Blossoms at Asian dating coverage mula sa mga pangunahing publikasyon",
    videoTitle: "Panimulang video ng Cherry Blossoms",
    videoSound: "Tunog",
    videoMute: "Mute",
    videoFullscreen: "Buong Screen",
    videoExitFullscreen: "Lumabas",
    aboutKicker: "Tungkol sa Amin",
    aboutTitle: "Dekadang tiwala sa Asian dating",
    aboutBody: "Mula pa noong 1974, tumutulong na ang Cherry Blossoms sa mga taong gustong pumasok sa Asian dating. Tumagal ang brand dahil nakasandal ito sa tiwala, mas ligtas na interaksyon ng mga miyembro, at mas seryosong pananaw sa relasyon.",
    aboutBullets: [
      { label: "Global Reach", detail: "Nag-uugnay ng mga miyembro mula sa iba’t ibang bahagi ng mundo." },
      { label: "Verified Profiles", detail: "Mahigpit na pagsusuri para sa pagiging totoo." },
      { label: "Matchmaking Heritage", detail: "Libo-libong matagumpay na relasyon at kasal." },
    ],
    aboutPrimaryCta: "Alamin ang Aming Kuwento",
    aboutSecondaryCta: "Basahin ang Safety Tips",
    aboutSince: "Mula",
    aboutBuiltFor: "Binuo Para Sa",
    aboutBuiltForBody: "Mga taong naghahanap ng commitment, cultural openness, at platform na may totoong kasaysayan.",
    aboutStats: [
      { value: "50+", detail: "Taon ng matchmaking heritage" },
      { value: "Global", detail: "Member network na lampas-bansa" },
      { value: "Verified", detail: "Mga profile na idinisenyo para sa tiwala" },
    ],
    overviewKicker: "Pangkalahatang-ideya ng Platform",
    overviewTitle: "Isang Asian dating platform na relasyon muna, mas organisado, at mas kaunti ang ingay",
    overviewBody: [
      "Ang Blossoms ay ginawa para sa mga gustong makakilala ng Asian singles sa mas kapani-paniwala, mas matiyaga, at hindi disposable na setting kaysa sa mainstream dating apps.",
      "Ang profiles, messaging, at matching tools ay ginawa para suportahan ang totoong usapan at pangmatagalang compatibility. Kung gusto mo ng city- o country-specific na Filipina dating pages, mas malalim iyon sa site habang ang homepage ay nakatuon sa mas malawak na Cherry Blossoms Asian dating brand.",
    ],
    overviewCaptionKicker: "Editorial Selection",
    overviewCaptionTitle: "Totoong miyembro. Relationship-first profiles. Platform na mas makatao ang pakiramdam.",
    statCards: [
      { value: "86%", label: "User Engagement", description: "Bahagi ng mga bagong miyembrong nagiging aktibo sa loob ng 24 oras." },
      { value: "5M", label: "Perfect Match", description: "Mga matagumpay na match mula nang ilunsad ang platform." },
      { value: "34K+", label: "Love Online", description: "Karaniwang dami ng mensaheng ipinapadala bawat araw." },
    ],
    pillarsKicker: "Mahahalagang Dahilan",
    pillarsTitle: "Bakit pinipili ng mga tao ang Blossoms para sa seryosong dating",
    pillarsAriaLabel: "Mga panel ng halaga sa homepage",
    pillars: [
      { id: "different", tab: "Bakit Iba Kami", title: "Bakit naiiba ang Blossoms sa mas mabilis at mas mababang-trust na platforms", body: "Nakatayo ang Blossoms sa mahahalagang trust signals sa Asian dating: profile verification, mas ligtas na messaging, mas mahabang kasaysayan, at komunidad na nakatuon sa totoong relasyon." },
      { id: "using", tab: "Paggamit ng Blossoms.com", title: "Isang matagal nang Asian dating brand na may mas malinaw na expectations", body: "Mahirap makahanap ng tamang Asian dating site kapag maraming platforms ang puro ingay. Mas maingat ang ruta ng Blossoms, pinagsasama ang dekadang karanasan at produktong nakaayon sa sincerity, safety, at long-term intent." },
      { id: "love", tab: "Pangmatagalang Pag-ibig", title: "Kilalanin ang Asian singles sa setting na ginawa para sa long-term relationships", body: "Ang Cherry Blossoms ay para sa mga taong seryoso sa international dating. Nakaayos ang platform sa meaningful connection kaysa casual swiping." },
    ],
    pillarsPrimaryCta: "Sumali",
    storiesKicker: "Totoong Tao, Totoong Pag-ibig",
    storiesTitle: "Mga kuwento ng relasyon mula sa matagal nang Asian dating community",
    storiesBody: "Dapat exciting at mas panatag ang iyong paglalakbay sa pag-ibig. Inuuna ng Blossoms ang safety sa pamamagitan ng verified profiles at privacy protection, habang tinutulungan kang makilala ang tamang tao nang may mas malaking kumpiyansa.",
    storiesPrimaryCta: "Basahin ang Journal",
    storiesSecondaryCta: "Tingnan ang FAQs",
    storiesHeading: "Success Stories",
    testimonials: [
      { quote: "Dalawang taon kaming nag-chat online at ngayon ay kasal na at masayang namumuhay sa Connecticut. Ginawang posible ito ng Blossoms Dating.", name: "David & Phoebe" },
      { quote: "Pinagtagpo kami ng Blossoms Dating, at makalipas ang sampung taon ng kasal ay masaya pa rin ang aming buhay.", name: "John & Shienna" },
      { quote: "Natagpuan ko ang huling pag-ibig ng buhay ko. Isang pag-ibig na dalisay, tunay, at matibay.", name: "Doug & Jheng" },
    ],
    faqKicker: "Mga Tanong at Sagot",
    faqTitle: "Asian dating FAQ tungkol sa membership, tiwala, at kung paano gumagana ang Blossoms",
    faqBody: "Bahagi ng produkto ang tiwala, kaya may malinaw na help at reference layer ang site. Sakop ng mga tanong na ito ang membership, messaging, billing, profile setup, at safety expectations.",
    faqItems: [
      { question: "Secure at mapagkakatiwalaan ba ang Blossoms Dating?", answer: "Oo. Gumagamit ang Blossoms Dating ng profile verification, fraud prevention systems, at human support para gawing mas ligtas ang experience." },
      { question: "Bakit libre ang Blossoms para sa Filipina at Asian women?", answer: "Dinisenyo ang modelong ito para hikayatin ang mas maraming totoong Asian women na sumali at para suportahan ang mas balanseng komunidad." },
      { question: "Makakahanap ba ako ng seryosong relasyon o kasal sa Filipino dating site?", answer: "Oo. Ang Blossoms ay ginawa para sa meaningful at long-term relationships, hindi para sa casual lamang." },
      { question: "Paano ako magsisimulang makipag-chat sa Asian singles sa Blossoms?", answer: "Gumawa ng kumpletong profile, mag-upload ng malinaw na photos, at gamitin ang messaging tools para makapagsimula ng usapan." },
      { question: "Ano ang pinagkaiba ng Blossoms sa ibang Filipina dating sites?", answer: "Mas naka-focus ang Blossoms sa verified profiles, trust signals, at relationship-first member experience." },
      { question: "Paano ko mapapabuti ang success ko sa Blossoms?", answer: "Gumamit ng malinaw na photos, magsulat ng tapat na profile, at maging consistent at magalang sa pakikipag-usap." },
      { question: "Ano ang magandang Asian dating platform?", answer: "Ang pinakamagandang platform ay inuuna ang authenticity, safety, at meaningful connections kaysa hype." },
      { question: "Matutulungan ba ako ng Blossoms na may makilala sa Pilipinas?", answer: "Oo. Ikinokonekta ka ng Blossoms sa verified Filipina singles at binibigyan ka ng tools para sa chat at matching." },
    ],
    locationsKicker: "Saklaw",
    locationsTitle: "Galugarin ang mga city page sa Pilipinas para sa mga partikular na naghahanap ng Filipina dating ayon sa lokasyon",
    locationsSummary: "Tingnan ang mga pangunahing city page sa Pilipinas para sa mas lokal na dating intent pages.",
    locationsDisclosure: "Tingnan ang mga suportadong lungsod at probinsya",
  },
  th: {
    featuredKicker: "สื่อที่กล่าวถึง",
    featuredTitle: "Cherry Blossoms และบทความเกี่ยวกับ Asian dating จากสื่อชั้นนำ",
    videoTitle: "วิดีโอแนะนำ Cherry Blossoms",
    videoSound: "เสียง",
    videoMute: "ปิดเสียง",
    videoFullscreen: "เต็มจอ",
    videoExitFullscreen: "ออก",
    aboutKicker: "เกี่ยวกับเรา",
    aboutTitle: "ความไว้วางใจใน Asian dating ที่สั่งสมมาหลายทศวรรษ",
    aboutBody: "Cherry Blossoms ช่วยให้ผู้คนก้าวเข้าสู่ Asian dating มาตั้งแต่ปี 1974 แบรนด์นี้อยู่มาได้เพราะเน้นความไว้วางใจ ความปลอดภัยในการสื่อสาร และจุดยืนเรื่องความสัมพันธ์ที่จริงจังมากกว่าแอปปัดทั่วไป",
    aboutBullets: [
      { label: "เครือข่ายทั่วโลก", detail: "เชื่อมต่อสมาชิกจากหลายประเทศทั่วโลก" },
      { label: "โปรไฟล์ยืนยันตัวตน", detail: "ตรวจสอบอย่างเข้มงวดเพื่อเพิ่มความน่าเชื่อถือ" },
      { label: "ประสบการณ์จับคู่", detail: "มีเรื่องราวความสำเร็จและการแต่งงานจำนวนมาก" },
    ],
    aboutPrimaryCta: "เรียนรู้เรื่องราวของเรา",
    aboutSecondaryCta: "ดูคำแนะนำด้านความปลอดภัย",
    aboutSince: "ตั้งแต่",
    aboutBuiltFor: "สร้างมาเพื่อ",
    aboutBuiltForBody: "ผู้ที่ต้องการความผูกพันจริง ความเปิดกว้างทางวัฒนธรรม และแพลตฟอร์มที่มีประวัติจริง",
    aboutStats: [
      { value: "50+", detail: "ปีแห่งประสบการณ์การจับคู่" },
      { value: "ทั่วโลก", detail: "เครือข่ายสมาชิกข้ามพรมแดน" },
      { value: "ยืนยันแล้ว", detail: "โปรไฟล์ที่ออกแบบมาเพื่อสร้างความเชื่อใจ" },
    ],
    overviewKicker: "ภาพรวมแพลตฟอร์ม",
    overviewTitle: "แพลตฟอร์ม Asian dating ที่เน้นความสัมพันธ์จริง มีโครงสร้างมากขึ้น และเสียงรบกวนน้อยลง",
    overviewBody: [
      "Blossoms เหมาะสำหรับคนที่อยากพบ Asian singles ในสภาพแวดล้อมที่น่าเชื่อถือ อดทน และไม่นำเสนอความสัมพันธ์แบบใช้แล้วทิ้งเหมือนแอปทั่วไป",
      "โปรไฟล์ ระบบข้อความ และเครื่องมือจับคู่ถูกออกแบบมาเพื่อสนับสนุนบทสนทนาที่จริงและความเข้ากันได้ระยะยาว หากคุณต้องการหน้า Filipina dating ตามเมืองหรือประเทศ คุณสามารถดูได้ลึกลงไปในเว็บไซต์ ส่วนหน้าแรกจะเน้นภาพรวมของแบรนด์ Cherry Blossoms",
    ],
    overviewCaptionKicker: "แนะนำโดยบรรณาธิการ",
    overviewCaptionTitle: "สมาชิกจริง โปรไฟล์ที่ให้ความสำคัญกับความสัมพันธ์ และแพลตฟอร์มที่ให้ความรู้สึกเป็นมนุษย์",
    statCards: [
      { value: "86%", label: "การมีส่วนร่วม", description: "สัดส่วนการสนทนาที่เริ่มมีความเคลื่อนไหวภายใน 24 ชั่วโมง" },
      { value: "5M", label: "การจับคู่สำเร็จ", description: "จำนวนการจับคู่สำเร็จตั้งแต่แพลตฟอร์มเปิดตัว" },
      { value: "34K+", label: "การสื่อสารต่อวัน", description: "ปริมาณข้อความเฉลี่ยที่ส่งต่อวันบนแพลตฟอร์ม" },
    ],
    pillarsKicker: "เหตุผลหลัก",
    pillarsTitle: "ทำไมคนที่จริงจังจึงเลือก Blossoms",
    pillarsAriaLabel: "แผงคุณค่าบนหน้าแรก",
    pillars: [
      { id: "different", tab: "ความแตกต่าง", title: "ทำไม Blossoms ต่างจากแพลตฟอร์มที่เร็วกว่าแต่มีความไว้วางใจต่ำกว่า", body: "Blossoms สร้างบนสัญญาณความไว้วางใจที่สำคัญต่อ Asian dating เช่น การยืนยันโปรไฟล์ การส่งข้อความที่ปลอดภัยกว่า ประวัติการดำเนินงานที่ยาวนาน และสมาชิกที่มองหาความสัมพันธ์จริง" },
      { id: "using", tab: "การใช้ Blossoms.com", title: "แบรนด์ Asian dating ที่อยู่มายาวนานและให้ความคาดหวังที่ชัดเจนกว่า", body: "การหา Asian dating site ที่เหมาะไม่ง่ายเมื่อหลายแพลตฟอร์มถูกออกแบบเพื่อสร้างเสียงรบกวน Blossoms ใช้แนวทางที่รอบคอบกว่า โดยผสานประสบการณ์หลายทศวรรษเข้ากับผลิตภัณฑ์ที่เน้นความจริงใจ ความปลอดภัย และความตั้งใจระยะยาว" },
      { id: "love", tab: "รักระยะยาว", title: "พบ Asian singles ในพื้นที่ที่สร้างมาเพื่อความสัมพันธ์ระยะยาว", body: "Cherry Blossoms รองรับผู้ที่มองหา international dating อย่างจริงจัง แพลตฟอร์มถูกจัดวางเพื่อ meaningful connection มากกว่าการปัดแบบผิวเผิน" },
    ],
    pillarsPrimaryCta: "เข้าร่วม",
    storiesKicker: "คนจริง รักจริง",
    storiesTitle: "เรื่องราวความสัมพันธ์จากชุมชน Asian dating ที่อยู่มายาวนาน",
    storiesBody: "เส้นทางสู่ความรักควรให้ความรู้สึกตื่นเต้นและอุ่นใจ Blossoms ให้ความสำคัญกับความปลอดภัยผ่านโปรไฟล์ที่ยืนยันแล้วและการปกป้องความเป็นส่วนตัว พร้อมช่วยให้คุณพบคนที่เหมาะสมได้อย่างมั่นใจมากขึ้น",
    storiesPrimaryCta: "อ่านบทความ",
    storiesSecondaryCta: "ดู FAQ",
    storiesHeading: "เรื่องราวความสำเร็จ",
    testimonials: [
      { quote: "เราคุยกันออนไลน์สองปี และตอนนี้แต่งงานกันแล้วพร้อมใช้ชีวิตอย่างมีความสุขที่คอนเนตทิคัต Blossoms Dating ทำให้สิ่งนี้เกิดขึ้นได้", name: "David & Phoebe" },
      { quote: "Blossoms Dating ทำให้เราได้พบกัน และตอนนี้หลังจากแต่งงานกันมา 10 ปี เราก็ยังมีความสุขเหมือนเดิม", name: "John & Shienna" },
      { quote: "ฉันได้พบรักสุดท้ายของชีวิต รักที่บริสุทธิ์ จริงแท้ และยืนยาว", name: "Doug & Jheng" },
    ],
    faqKicker: "คำถามและคำตอบ",
    faqTitle: "FAQ เรื่อง Asian dating เกี่ยวกับสมาชิก ความไว้วางใจ และการใช้งาน Blossoms",
    faqBody: "ความไว้วางใจคือส่วนหนึ่งของผลิตภัณฑ์ จึงมีชั้นข้อมูลช่วยเหลือและอ้างอิงที่ชัดเจน คำถามเหล่านี้ครอบคลุมสมาชิก การส่งข้อความ การชำระเงิน การตั้งค่าโปรไฟล์ และความคาดหวังด้านความปลอดภัย",
    faqItems: [
      { question: "Blossoms Dating ปลอดภัยและน่าเชื่อถือหรือไม่", answer: "ใช่ แพลตฟอร์มใช้การยืนยันโปรไฟล์ ระบบป้องกันการฉ้อโกง และทีมสนับสนุนเพื่อทำให้ประสบการณ์ปลอดภัยขึ้น" },
      { question: "ทำไม Blossoms จึงฟรีสำหรับผู้หญิงฟิลิปปินส์และเอเชีย", answer: "รูปแบบนี้ช่วยให้ผู้หญิงเอเชียเข้าร่วมได้มากขึ้น และทำให้ชุมชนสมดุลและจริงจังมากขึ้น" },
      { question: "ฉันสามารถหาความสัมพันธ์จริงจังหรือการแต่งงานผ่านเว็บนี้ได้หรือไม่", answer: "ได้ Blossoms สร้างมาเพื่อคนที่มองหาความสัมพันธ์ระยะยาวที่มีความหมาย ไม่ใช่เพียงการคุยเล่น" },
      { question: "ฉันจะเริ่มคุยกับ Asian singles บน Blossoms ได้อย่างไร", answer: "สร้างโปรไฟล์ให้ครบ อัปโหลดรูปที่ดี และใช้เครื่องมือส่งข้อความเพื่อเริ่มบทสนทนากับสมาชิกที่ยืนยันแล้ว" },
      { question: "อะไรทำให้ Blossoms ต่างจากเว็บ Filipina dating อื่น", answer: "Blossoms เน้นโปรไฟล์ที่ยืนยันแล้ว สัญญาณความไว้วางใจ และประสบการณ์ที่ให้ความสำคัญกับความสัมพันธ์ก่อนอย่างแท้จริง" },
      { question: "ฉันจะเพิ่มโอกาสสำเร็จบน Blossoms ได้อย่างไร", answer: "ใช้รูปที่ชัดเจน เขียนโปรไฟล์อย่างซื่อสัตย์ ตอบกลับสม่ำเสมอ และคุยอย่างให้เกียรติกับคนที่มีเป้าหมายใกล้กัน" },
      { question: "แพลตฟอร์ม Asian dating ที่ดีควรมีอะไรบ้าง", answer: "แพลตฟอร์มที่ดีควรให้ความสำคัญกับความจริง ความปลอดภัย และความสัมพันธ์ที่มีความหมายมากกว่าการตลาดเกินจริง" },
      { question: "Blossoms ช่วยให้ฉันพบใครบางคนในฟิลิปปินส์ได้หรือไม่", answer: "ได้ Blossoms เชื่อมต่อคุณกับ Filipina singles ที่ยืนยันแล้ว และมีเครื่องมือสำหรับแชตและจับคู่" },
    ],
    locationsKicker: "พื้นที่ให้บริการ",
    locationsTitle: "สำรวจหน้าเมืองต่าง ๆ ในฟิลิปปินส์สำหรับผู้ที่มองหา Filipina dating ตามพื้นที่",
    locationsSummary: "ดูหน้าเมืองสำคัญในฟิลิปปินส์เพื่อเข้าถึงหน้าที่มีเจตนาเชิงพื้นที่มากขึ้น",
    locationsDisclosure: "ดูเมืองและจังหวัดที่รองรับ",
  },
  vi: {
    featuredKicker: "Được Nhắc Đến Trên",
    featuredTitle: "Cherry Blossoms và các bài viết về hẹn hò châu Á từ những ấn phẩm lớn",
    videoTitle: "Video giới thiệu Cherry Blossoms",
    videoSound: "Âm thanh",
    videoMute: "Tắt tiếng",
    videoFullscreen: "Toàn màn hình",
    videoExitFullscreen: "Thoát",
    aboutKicker: "Về Chúng Tôi",
    aboutTitle: "Nhiều thập kỷ niềm tin trong hẹn hò châu Á",
    aboutBody: "Từ năm 1974, Cherry Blossoms đã giúp mọi người bước vào thế giới hẹn hò châu Á. Thương hiệu tồn tại lâu dài vì đặt trọng tâm vào niềm tin, tương tác an toàn hơn và định hướng nghiêm túc hơn trong mối quan hệ.",
    aboutBullets: [
      { label: "Phạm vi toàn cầu", detail: "Kết nối thành viên từ nhiều nơi trên thế giới." },
      { label: "Hồ sơ xác minh", detail: "Kiểm tra nghiêm ngặt để tăng tính xác thực." },
      { label: "Di sản mai mối", detail: "Nhiều câu chuyện thành công và hôn nhân lâu dài." },
    ],
    aboutPrimaryCta: "Tìm hiểu câu chuyện của chúng tôi",
    aboutSecondaryCta: "Xem mẹo an toàn",
    aboutSince: "Từ",
    aboutBuiltFor: "Dành Cho",
    aboutBuiltForBody: "Những người muốn có cam kết, sự cởi mở văn hóa và một nền tảng có lịch sử thật.",
    aboutStats: [
      { value: "50+", detail: "Năm kinh nghiệm mai mối" },
      { value: "Toàn cầu", detail: "Mạng lưới thành viên xuyên biên giới" },
      { value: "Đã xác minh", detail: "Hồ sơ được thiết kế để xây dựng niềm tin" },
    ],
    overviewKicker: "Tổng Quan Nền Tảng",
    overviewTitle: "Một nền tảng hẹn hò châu Á ưu tiên mối quan hệ, có cấu trúc hơn và ít nhiễu hơn",
    overviewBody: [
      "Blossoms dành cho những người muốn gặp gỡ Asian singles trong một môi trường đáng tin cậy hơn, kiên nhẫn hơn và ít cảm giác dùng rồi bỏ hơn các ứng dụng phổ thông.",
      "Hồ sơ, tin nhắn và công cụ ghép đôi được thiết kế để hỗ trợ các cuộc trò chuyện thật và khả năng phù hợp dài hạn. Nếu bạn muốn các trang Filipina dating theo thành phố hoặc quốc gia, chúng nằm sâu hơn trong website, còn trang chủ tập trung vào thương hiệu tổng thể Cherry Blossoms.",
    ],
    overviewCaptionKicker: "Lựa Chọn Biên Tập",
    overviewCaptionTitle: "Thành viên thật. Hồ sơ ưu tiên mối quan hệ. Một nền tảng mang cảm giác con người hơn.",
    statCards: [
      { value: "86%", label: "Tương tác", description: "Tỷ lệ cuộc trò chuyện trở nên tích cực trong 24 giờ đầu." },
      { value: "5M", label: "Kết nối thành công", description: "Số lượng kết nối thành công kể từ khi nền tảng ra mắt." },
      { value: "34K+", label: "Tin nhắn mỗi ngày", description: "Lượng tin nhắn trung bình được gửi mỗi ngày." },
    ],
    pillarsKicker: "Lý Do Cốt Lõi",
    pillarsTitle: "Vì sao mọi người chọn Blossoms cho hẹn hò nghiêm túc",
    pillarsAriaLabel: "Các bảng giá trị trên trang chủ",
    pillars: [
      { id: "different", tab: "Điểm Khác Biệt", title: "Vì sao Blossoms khác với các nền tảng nhanh hơn nhưng ít đáng tin hơn", body: "Blossoms được xây dựng trên các tín hiệu niềm tin quan trọng trong Asian dating: xác minh hồ sơ, nhắn tin an toàn hơn, lịch sử hoạt động lâu dài và cộng đồng hướng đến mối quan hệ thật." },
      { id: "using", tab: "Sử Dụng Blossoms.com", title: "Một thương hiệu hẹn hò châu Á lâu năm với kỳ vọng rõ ràng hơn", body: "Không dễ để tìm đúng Asian dating site khi nhiều nền tảng chỉ tối ưu cho sự ồn ào. Blossoms chọn con đường có chủ đích hơn, kết hợp kinh nghiệm nhiều thập kỷ với sản phẩm tập trung vào sự chân thành, an toàn và ý định dài hạn." },
      { id: "love", tab: "Tình Yêu Lâu Dài", title: "Gặp gỡ Asian singles trong môi trường được xây dựng cho mối quan hệ dài lâu", body: "Cherry Blossoms hỗ trợ những người tìm kiếm international dating một cách nghiêm túc. Nền tảng được sắp xếp để tạo meaningful connection thay vì vuốt qua loa." },
    ],
    pillarsPrimaryCta: "Tham Gia",
    storiesKicker: "Người Thật, Tình Yêu Thật",
    storiesTitle: "Những câu chuyện tình từ một cộng đồng hẹn hò châu Á lâu năm",
    storiesBody: "Hành trình tìm tình yêu nên vừa hào hứng vừa yên tâm. Blossoms ưu tiên an toàn bằng hồ sơ xác minh và bảo vệ quyền riêng tư, đồng thời giúp bạn gặp đúng người với sự tự tin cao hơn.",
    storiesPrimaryCta: "Đọc Journal",
    storiesSecondaryCta: "Xem FAQs",
    storiesHeading: "Câu Chuyện Thành Công",
    testimonials: [
      { quote: "Chúng tôi trò chuyện online suốt hai năm và giờ đã kết hôn, sống hạnh phúc tại Connecticut. Blossoms Dating đã biến điều đó thành hiện thực.", name: "David & Phoebe" },
      { quote: "Blossoms Dating đã đưa chúng tôi đến với nhau, và mười năm sau ngày cưới chúng tôi vẫn đang sống hạnh phúc.", name: "John & Shienna" },
      { quote: "Tôi đã tìm thấy tình yêu cuối cùng của đời mình, một tình yêu thuần khiết, chân thật và bền lâu.", name: "Doug & Jheng" },
    ],
    faqKicker: "Hỏi & Đáp",
    faqTitle: "FAQ về hẹn hò châu Á, thành viên, niềm tin và cách Blossoms hoạt động",
    faqBody: "Niềm tin là một phần của sản phẩm, vì vậy website có một lớp hỗ trợ và tham khảo rõ ràng. Những câu hỏi này bao gồm thành viên, nhắn tin, thanh toán, thiết lập hồ sơ và kỳ vọng an toàn.",
    faqItems: [
      { question: "Blossoms Dating có an toàn và đáng tin cậy không?", answer: "Có. Blossoms Dating sử dụng xác minh hồ sơ, hệ thống chống gian lận và hỗ trợ con người để giảm rủi ro và tăng mức độ an toàn." },
      { question: "Vì sao Blossoms miễn phí cho phụ nữ Filipina và phụ nữ châu Á?", answer: "Mô hình này giúp nhiều phụ nữ châu Á tham gia thật hơn và tạo nên một cộng đồng cân bằng hơn." },
      { question: "Tôi có thể tìm mối quan hệ nghiêm túc hay hôn nhân qua website này không?", answer: "Có. Blossoms được xây dựng cho những người muốn mối quan hệ có ý nghĩa và lâu dài." },
      { question: "Làm thế nào để bắt đầu trò chuyện với Asian singles trên Blossoms?", answer: "Hãy hoàn thiện hồ sơ, tải ảnh tốt và sử dụng công cụ nhắn tin để bắt đầu nói chuyện với thành viên đã xác minh." },
      { question: "Điều gì khiến Blossoms khác với các website Filipina dating khác?", answer: "Blossoms tập trung hơn vào hồ sơ xác minh, tín hiệu niềm tin mạnh hơn và trải nghiệm ưu tiên mối quan hệ thật." },
      { question: "Làm sao để tăng cơ hội thành công trên Blossoms?", answer: "Dùng ảnh rõ ràng, viết hồ sơ trung thực, phản hồi đều đặn và tập trung vào cuộc trò chuyện tôn trọng." },
      { question: "Một nền tảng hẹn hò châu Á tốt cần gì?", answer: "Nền tảng tốt nên ưu tiên tính chân thực, an toàn và các mối quan hệ có ý nghĩa hơn là quảng bá hào nhoáng." },
      { question: "Blossoms có thể giúp tôi gặp người ở Philippines không?", answer: "Có. Blossoms kết nối bạn với các Filipina singles đã xác minh và cung cấp công cụ để chat và match." },
    ],
    locationsKicker: "Phạm Vi",
    locationsTitle: "Khám phá các trang thành phố tại Philippines dành cho người tìm Filipina dating theo khu vực",
    locationsSummary: "Xem các trang thành phố lớn tại Philippines để tìm các trang hẹn hò theo ý định địa phương.",
    locationsDisclosure: "Xem các thành phố và tỉnh được hỗ trợ",
  },
  ja: {
    featuredKicker: "掲載メディア",
    featuredTitle: "Cherry Blossoms とアジア系デーティングに関する主要メディア掲載",
    videoTitle: "Cherry Blossoms 紹介動画",
    videoSound: "音声",
    videoMute: "ミュート",
    videoFullscreen: "全画面",
    videoExitFullscreen: "終了",
    aboutKicker: "私たちについて",
    aboutTitle: "アジア系デーティングにおける長年の信頼",
    aboutBody: "Cherry Blossoms は 1974 年以来、アジア系デーティングを始めたい人を支えてきました。信頼、より安全な会員間のやり取り、そして軽いスワイプ文化ではなく真剣な関係志向を大切にしてきたからこそ、長く続いています。",
    aboutBullets: [
      { label: "グローバルな広がり", detail: "世界各地の会員をつなぎます。" },
      { label: "認証プロフィール", detail: "信頼性を高める厳格な確認。" },
      { label: "マッチメイキングの実績", detail: "多くの成功した関係と結婚。" },
    ],
    aboutPrimaryCta: "ブランドの歩みを見る",
    aboutSecondaryCta: "安全ガイドを見る",
    aboutSince: "創業",
    aboutBuiltFor: "こんな人のために",
    aboutBuiltForBody: "コミットメント、文化的な openness、そして実績あるプラットフォームを求める人のために作られています。",
    aboutStats: [
      { value: "50+", detail: "年のマッチメイキング経験" },
      { value: "Global", detail: "国境を越える会員ネットワーク" },
      { value: "Verified", detail: "信頼を築くためのプロフィール設計" },
    ],
    overviewKicker: "プラットフォーム概要",
    overviewTitle: "より関係重視で、構造があり、ノイズの少ないアジア系デーティングプラットフォーム",
    overviewBody: [
      "Blossoms は、一般的なデーティングアプリよりも信頼でき、落ち着いていて、使い捨て感の少ない場で Asian singles と出会いたい人のために設計されています。",
      "プロフィール、メッセージ、マッチング機能は、実際の会話と長期的な相性を支えるためのものです。都市別・国別の Filipina dating ページはサイトの中で展開されており、ホームページは Cherry Blossoms 全体のブランドを中心に見せています。",
    ],
    overviewCaptionKicker: "エディターズセレクション",
    overviewCaptionTitle: "実在する会員。関係重視のプロフィール。人間らしさを感じるプラットフォーム。",
    statCards: [
      { value: "86%", label: "ユーザー反応率", description: "登録後 24 時間以内に活発な会話へ進む割合。" },
      { value: "5M", label: "成立したつながり", description: "サービス開始以来の成功したマッチ数。" },
      { value: "34K+", label: "1日あたりの会話", description: "プラットフォーム上で平均的に送られるメッセージ数。" },
    ],
    pillarsKicker: "選ばれる理由",
    pillarsTitle: "真剣な交際のために Blossoms が選ばれる理由",
    pillarsAriaLabel: "ホームページの価値パネル",
    pillars: [
      { id: "different", tab: "違い", title: "なぜ Blossoms は、より速くても信頼が低いサービスと違うのか", body: "Blossoms は、アジア系デーティングで本当に重要な信頼シグナルを軸に作られています。プロフィール確認、より安全なメッセージ、長い運営実績、そして本気の関係を求める会員基盤です。" },
      { id: "using", tab: "Blossoms.com の使い方", title: "より明確な期待値を持てる、長年続くアジア系デーティングブランド", body: "多くのサービスがノイズを増幅する中で、自分に合うアジア系デーティングサイトを見つけるのは簡単ではありません。Blossoms は、長年の経験を、誠実さ・安全性・長期志向に合わせたプロダクトに結びつけています。" },
      { id: "love", tab: "長期的な愛", title: "長期的な関係を前提とした環境で Asian singles と出会う", body: "Cherry Blossoms は、本気で international dating をしたい人のための場です。プラットフォームは、軽いスワイプではなく meaningful connection を中心に構成されています。" },
    ],
    pillarsPrimaryCta: "参加する",
    storiesKicker: "本物の人、本物の愛",
    storiesTitle: "長く続くアジア系デーティングコミュニティから生まれた関係ストーリー",
    storiesBody: "愛を見つける旅は、ワクワクしながらも安心できるものであるべきです。Blossoms は認証プロフィールとプライバシー保護を重視し、より高い安心感を持って相手に出会えるようにしています。",
    storiesPrimaryCta: "ジャーナルを読む",
    storiesSecondaryCta: "FAQ を見る",
    storiesHeading: "成功ストーリー",
    testimonials: [
      { quote: "2 年間オンラインで話し続け、今では結婚してコネチカットで幸せに暮らしています。Blossoms Dating がそのきっかけでした。", name: "David & Phoebe" },
      { quote: "Blossoms Dating が私たちを引き合わせてくれました。結婚して 10 年経った今も、幸せな毎日を送っています。", name: "John & Shienna" },
      { quote: "人生最後の愛を見つけました。純粋で、本物で、長く続く愛です。", name: "Doug & Jheng" },
    ],
    faqKicker: "よくある質問",
    faqTitle: "会員制度・信頼性・Blossoms の仕組みに関する Asian dating FAQ",
    faqBody: "信頼はプロダクトの一部です。そのため、サイトにはしっかりしたヘルプと参照情報があります。ここでは会員、メッセージ、支払い、プロフィール設定、安全面についてよくある質問をまとめています。",
    faqItems: [
      { question: "Blossoms Dating は安全で信頼できるサイトですか？", answer: "はい。プロフィール確認、不正対策システム、人によるサポートを通じて、より安全な体験を提供しています。" },
      { question: "なぜ Filipina と Asian women は無料なのですか？", answer: "より多くのアジア女性が自然に参加できるようにし、バランスの取れたコミュニティを作るためです。" },
      { question: "このサイトで真剣な交際や結婚につながりますか？", answer: "はい。Blossoms は意味のある長期的な関係を求める人向けに作られています。" },
      { question: "Blossoms で Asian singles と話し始めるには？", answer: "プロフィールを整え、良い写真を載せ、メッセージ機能で認証済み会員との会話を始めてください。" },
      { question: "Blossoms は他の Filipina dating サイトと何が違いますか？", answer: "認証プロフィール、より強い信頼シグナル、そして関係重視の会員体験に重点を置いている点です。" },
      { question: "Blossoms で成功率を高めるには？", answer: "はっきりした写真、誠実なプロフィール、一貫した返信、そして敬意ある会話が重要です。" },
      { question: "良い Asian dating プラットフォームとは？", answer: "誠実さ、安全性、そして意味のあるつながりを優先することが大切です。" },
      { question: "Blossoms でフィリピンの相手と出会えますか？", answer: "はい。認証済みの Filipina singles とつながり、チャットやマッチングの機能を使えます。" },
    ],
    locationsKicker: "対応エリア",
    locationsTitle: "地域別に Filipina dating を探したい人のために、フィリピン各都市ページを閲覧できます",
    locationsSummary: "フィリピン主要都市のページを見て、地域意図の強い出会いページを探せます。",
    locationsDisclosure: "対応都市と州を見る",
  },
  es: {
    featuredKicker: "Aparece En",
    featuredTitle: "Cherry Blossoms y cobertura sobre citas asiáticas en publicaciones importantes",
    videoTitle: "Video de introducción de Cherry Blossoms",
    videoSound: "Sonido",
    videoMute: "Silencio",
    videoFullscreen: "Pantalla completa",
    videoExitFullscreen: "Salir",
    aboutKicker: "Sobre Nosotros",
    aboutTitle: "Décadas de confianza en las citas asiáticas",
    aboutBody: "Desde 1974, Cherry Blossoms ha ayudado a las personas a entrar en el mundo de las citas asiáticas. La marca ha durado porque se apoya en la confianza, interacciones más seguras y una postura más seria hacia las relaciones.",
    aboutBullets: [
      { label: "Alcance global", detail: "Conectando miembros de todo el mundo." },
      { label: "Perfiles verificados", detail: "Controles estrictos para reforzar la autenticidad." },
      { label: "Experiencia en matchmaking", detail: "Muchas relaciones y matrimonios exitosos." },
    ],
    aboutPrimaryCta: "Conoce Nuestra Historia",
    aboutSecondaryCta: "Ver Consejos de Seguridad",
    aboutSince: "Desde",
    aboutBuiltFor: "Creado Para",
    aboutBuiltForBody: "Personas que buscan compromiso, apertura cultural y una plataforma con historia real.",
    aboutStats: [
      { value: "50+", detail: "Años de experiencia en matchmaking" },
      { value: "Global", detail: "Red de miembros más allá de fronteras" },
      { value: "Verificado", detail: "Perfiles pensados para generar confianza" },
    ],
    overviewKicker: "Resumen de la Plataforma",
    overviewTitle: "Una plataforma de citas asiáticas centrada en relaciones, con más estructura y menos ruido",
    overviewBody: [
      "Blossoms está diseñada para personas que quieren conocer Asian singles en un entorno más creíble, más paciente y menos desechable que las apps convencionales.",
      "Los perfiles, la mensajería y las herramientas de matching están pensados para apoyar conversaciones reales y compatibilidad a largo plazo. Si quieres páginas de Filipina dating por ciudad o país, están dentro del sitio; la homepage se enfoca en la marca general Cherry Blossoms.",
    ],
    overviewCaptionKicker: "Selección Editorial",
    overviewCaptionTitle: "Miembros reales. Perfiles orientados a relaciones. Una plataforma más humana.",
    statCards: [
      { value: "86%", label: "Participación", description: "Porcentaje de conversaciones activas dentro de las primeras 24 horas." },
      { value: "5M", label: "Coincidencias", description: "Conexiones exitosas logradas desde el lanzamiento." },
      { value: "34K+", label: "Mensajes diarios", description: "Promedio de mensajes enviados cada día en la plataforma." },
    ],
    pillarsKicker: "Razones Clave",
    pillarsTitle: "Por qué las personas eligen Blossoms para citas serias",
    pillarsAriaLabel: "Paneles de valor de la homepage",
    pillars: [
      { id: "different", tab: "Nuestra Diferencia", title: "Por qué Blossoms se siente distinta a plataformas más rápidas y con menos confianza", body: "Blossoms se basa en señales de confianza que sí importan en Asian dating: verificación de perfiles, mensajería más segura, una trayectoria larga y una comunidad orientada a relaciones reales." },
      { id: "using", tab: "Usar Blossoms.com", title: "Una marca de citas asiáticas de larga trayectoria con expectativas más claras", body: "Encontrar el sitio correcto no es fácil cuando muchas plataformas optimizan el ruido. Blossoms toma una ruta más deliberada, uniendo décadas de experiencia con un producto enfocado en sinceridad, seguridad e intención a largo plazo." },
      { id: "love", tab: "Amor a Largo Plazo", title: "Conoce Asian singles en un entorno pensado para relaciones duraderas", body: "Cherry Blossoms apoya a personas que buscan international dating de forma seria. La plataforma está diseñada alrededor de conexiones significativas, no de deslizamientos casuales." },
    ],
    pillarsPrimaryCta: "Únete",
    storiesKicker: "Personas Reales, Amor Real",
    storiesTitle: "Historias de relación de una comunidad de citas asiáticas de larga trayectoria",
    storiesBody: "Tu camino hacia el amor debería sentirse emocionante y seguro. Blossoms prioriza la seguridad con perfiles verificados y protección de privacidad, mientras te ayuda a conocer a la persona adecuada con mucha más confianza.",
    storiesPrimaryCta: "Leer el Journal",
    storiesSecondaryCta: "Ver FAQs",
    storiesHeading: "Historias de Éxito",
    testimonials: [
      { quote: "Hablamos en línea durante dos años y ahora estamos casados y viviendo felices en Connecticut. Blossoms Dating lo hizo posible.", name: "David & Phoebe" },
      { quote: "Blossoms Dating nos unió, y ahora seguimos viviendo nuestro final feliz diez años después del matrimonio.", name: "John & Shienna" },
      { quote: "He encontrado el último amor de mi vida, un amor puro, auténtico y duradero.", name: "Doug & Jheng" },
    ],
    faqKicker: "Preguntas y Respuestas",
    faqTitle: "FAQ sobre citas asiáticas, membresía, confianza y cómo funciona Blossoms",
    faqBody: "La confianza es parte del producto, por eso el sitio mantiene una capa sólida de ayuda y referencia. Estas preguntas cubren membresía, mensajería, pagos, perfil y expectativas de seguridad.",
    faqItems: [
      { question: "¿Blossoms Dating es seguro y confiable?", answer: "Sí. Usa verificación de perfiles, sistemas antifraude y soporte humano para ofrecer una experiencia más segura." },
      { question: "¿Por qué Blossoms es gratis para mujeres Filipina y asiáticas?", answer: "El modelo busca fomentar una participación genuina de más mujeres asiáticas y una comunidad más equilibrada." },
      { question: "¿Puedo encontrar una relación seria o matrimonio aquí?", answer: "Sí. Blossoms está diseñada para personas que buscan relaciones significativas y duraderas." },
      { question: "¿Cómo empiezo a hablar con Asian singles en Blossoms?", answer: "Completa tu perfil, sube buenas fotos y usa las herramientas de mensajería para iniciar conversaciones con miembros verificados." },
      { question: "¿Qué hace diferente a Blossoms frente a otros sitios de Filipina dating?", answer: "Blossoms da más prioridad a perfiles verificados, señales de confianza y una experiencia orientada a relaciones reales." },
      { question: "¿Cómo puedo mejorar mis resultados en Blossoms?", answer: "Usa fotos claras, escribe un perfil honesto, responde con constancia y mantén conversaciones respetuosas." },
      { question: "¿Qué debe tener una buena plataforma de citas asiáticas?", answer: "Debe priorizar autenticidad, seguridad y conexiones significativas por encima del ruido comercial." },
      { question: "¿Blossoms puede ayudarme a conocer a alguien en Filipinas?", answer: "Sí. Blossoms te conecta con Filipina singles verificadas y ofrece herramientas para chatear y hacer match." },
    ],
    locationsKicker: "Cobertura",
    locationsTitle: "Explora páginas de ciudades de Filipinas para quienes buscan Filipina dating por ubicación",
    locationsSummary: "Consulta páginas de ciudades principales de Filipinas para descubrir páginas con intención local.",
    locationsDisclosure: "Ver ciudades y provincias disponibles",
  },
};
