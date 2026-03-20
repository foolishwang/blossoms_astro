import { toAbsoluteSiteUrl, toLocalBlossomsAssetUrl } from "./url-utils";

const SITE_NAME = "Cherry Blossoms Dating";
const SITE_ORIGIN = "https://www.blossoms.com";
const DEFAULT_SOCIALS = [
  "https://www.facebook.com/BlossomsDating/",
  "https://www.instagram.com/blossomsdating/",
  "https://twitter.com/CherryBlossomsI",
  "https://www.youtube.com/c/CherryBlossomsAsianDatingFirst",
  "https://www.linkedin.com/company/cherry-blossoms-inc/",
  "https://www.tiktok.com/@blossoms.dating",
];

export function buildSiteSchemas() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_ORIGIN,
      logo: toAbsoluteSiteUrl(
        toLocalBlossomsAssetUrl(
          "https://www.blossoms.com/wp-content/uploads/2025/05/cherry-blossoms-dating-logo.png",
        ),
      ),
      sameAs: DEFAULT_SOCIALS,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_ORIGIN,
      inLanguage: "en-US",
    },
  ];
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteSiteUrl(item.url),
    })),
  };
}

export function buildWebPageSchema({
  title,
  description,
  url,
  type = "WebPage",
}: {
  title: string;
  description: string;
  url: string;
  type?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    description,
    url: toAbsoluteSiteUrl(url),
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_ORIGIN,
    },
  };
}

export function buildCollectionPageSchema({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: toAbsoluteSiteUrl(url),
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_ORIGIN,
    },
  };
}

export function buildBlogPostingSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  image?: string | null;
  datePublished?: string | null;
  dateModified?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    mainEntityOfPage: toAbsoluteSiteUrl(url),
    url: toAbsoluteSiteUrl(url),
    image: image ? [toAbsoluteSiteUrl(image)] : undefined,
    datePublished: datePublished || undefined,
    dateModified: dateModified || datePublished || undefined,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: toAbsoluteSiteUrl(
          toLocalBlossomsAssetUrl(
            "https://www.blossoms.com/wp-content/uploads/2025/05/cherry-blossoms-dating-logo.png",
          ),
        ),
      },
    },
    inLanguage: "en-US",
  };
}

export function buildFaqSchema(
  items: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
