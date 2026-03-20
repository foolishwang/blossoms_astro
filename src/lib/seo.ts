import {
  SITE_ORIGIN,
  toAbsoluteSiteUrl,
  toLocalBlossomsAssetUrl,
} from "./url-utils";

export const SITE_NAME = "Cherry Blossoms Dating";
export const DEFAULT_SOCIALS = [
  "https://www.facebook.com/BlossomsDating/",
  "https://www.instagram.com/blossomsdating/",
  "https://twitter.com/CherryBlossomsI",
  "https://www.youtube.com/c/CherryBlossomsAsianDatingFirst",
  "https://www.linkedin.com/company/cherry-blossoms-inc/",
  "https://www.tiktok.com/@blossoms.dating",
];
export const DEFAULT_OG_IMAGE = toAbsoluteSiteUrl(
  toLocalBlossomsAssetUrl(
    "https://www.blossoms.com/wp-content/uploads/2025/05/cherry-blossoms-dating-logo.png",
  ),
);

function buildOrganizationReference() {
  return {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_ORIGIN,
  };
}

function buildWebSiteReference() {
  return {
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_ORIGIN,
  };
}

export function buildSiteSchemas() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_ORIGIN,
      alternateName: "Cherry Blossoms",
      description:
        "International Asian dating platform focused on meaningful relationships, trust, and long-term matchmaking since 1974.",
      foundingDate: "1974-02-22",
      logo: DEFAULT_OG_IMAGE,
      image: DEFAULT_OG_IMAGE,
      areaServed: "Worldwide",
      knowsAbout: [
        "Asian dating",
        "Filipina dating",
        "international dating",
        "long-term relationships",
        "online dating safety",
      ],
      sameAs: DEFAULT_SOCIALS,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_ORIGIN,
      inLanguage: "en-US",
      publisher: buildOrganizationReference(),
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
  image,
}: {
  title: string;
  description: string;
  url: string;
  type?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    description,
    url: toAbsoluteSiteUrl(url),
    mainEntityOfPage: toAbsoluteSiteUrl(url),
    inLanguage: "en-US",
    isPartOf: buildWebSiteReference(),
    about: buildOrganizationReference(),
    publisher: buildOrganizationReference(),
    primaryImageOfPage: image
      ? {
          "@type": "ImageObject",
          url: toAbsoluteSiteUrl(image),
        }
      : undefined,
  };
}

export function buildCollectionPageSchema({
  title,
  description,
  url,
  image,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: toAbsoluteSiteUrl(url),
    mainEntityOfPage: toAbsoluteSiteUrl(url),
    inLanguage: "en-US",
    isPartOf: buildWebSiteReference(),
    about: buildOrganizationReference(),
    publisher: buildOrganizationReference(),
    primaryImageOfPage: image
      ? {
          "@type": "ImageObject",
          url: toAbsoluteSiteUrl(image),
        }
      : undefined,
  };
}

export function buildItemListSchema({
  name,
  url,
  items,
}: {
  name: string;
  url: string;
  items: Array<{ name: string; url: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: toAbsoluteSiteUrl(url),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: toAbsoluteSiteUrl(item.url),
    })),
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
    articleSection: "Asian Dating Advice",
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
    isPartOf: {
      "@type": "Blog",
      name: "Cherry Blossoms Journal",
      url: `${SITE_ORIGIN}/blog/`,
    },
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
