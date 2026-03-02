import { useEffect } from 'react';

// ── SEO Configuration ──────────────────────────────────────────────────────────

export const defaultSEO = {
  siteName:           "Yuhan Liu Portfolio",
  siteUrl:            "https://yuhanliu.ca",
  twitterHandle:      "@yuhan_liu_",
  defaultTitle:       "Yuhan Liu Portfolio | Vancouver Multidisciplinary Designer",
  defaultDescription: "Vancouver-based multidisciplinary designer Yuhan Liu showcases creative projects in branding, web design, and visual storytelling. BCIT New Media graduate specializing in innovative design solutions.",
  defaultKeywords:    "graphic design vancouver, yuhan liu, bcit new media, portfolio, video artist, vancouver designer, branding design, web design, visual storytelling, creative portfolio, new media design, digital design vancouver",
};


// ── DOM helpers ────────────────────────────────────────────────────────────────

function setMeta(attrKey, attrVal, content) {
  let el = document.querySelector(`meta[${attrKey}="${attrVal}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrKey, attrVal);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(data) {
  let script = document.getElementById('json-ld-seo');
  if (!script) {
    script = document.createElement('script');
    script.type  = 'application/ld+json';
    script.id    = 'json-ld-seo';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}


// ── SEO component ──────────────────────────────────────────────────────────────
// Returns null — all work happens in useEffect against document.head.
// Place <SEO /> near the top of any page component to set per-page metadata.
//
// Props:
//   description   – page-specific description (falls back to default)
//   keywords      – extra keywords appended to the default set
//   canonicalUrl  – path string e.g. "/projects/thrash-hair-color"
//   ogImage       – absolute URL to the OG image (falls back to /og-image.png)
//   ogType        – "website" | "article" | "profile" etc.
//   jsonLd        – structured data object (schema.org)
//   noIndex       – set true to block crawlers

function SEO({
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType   = 'website',
  jsonLd,
  noIndex  = false,
}) {
  const metaDescription = description || defaultSEO.defaultDescription;
  const allKeywords     = keywords
    ? `${defaultSEO.defaultKeywords}, ${keywords}`
    : defaultSEO.defaultKeywords;
  const canonical   = canonicalUrl
    ? `${defaultSEO.siteUrl}${canonicalUrl}`
    : defaultSEO.siteUrl;
  const ogImageUrl  = ogImage || `${defaultSEO.siteUrl}/og-image.png`;

  useEffect(() => {
    // ── Title ────────────────────────────────────────────────────────────────
    document.title = defaultSEO.defaultTitle;

    // ── Primary ──────────────────────────────────────────────────────────────
    setMeta('name', 'description', metaDescription);
    setMeta('name', 'keywords',    allKeywords);
    setMeta('name', 'author',      'Yuhan Liu');
    setMeta('name', 'theme-color', '#3639FB');
    setMeta('name', 'language',    'EN');
    setLink('canonical', canonical);
    if (noIndex) setMeta('name', 'robots', 'noindex,nofollow');

    // ── Geo ──────────────────────────────────────────────────────────────────
    setMeta('name', 'geo.region',    'CA-BC');
    setMeta('name', 'geo.placename', 'Vancouver');
    setMeta('name', 'geo.position',  '49.2827;-123.1207');
    setMeta('name', 'ICBM',          '49.2827, -123.1207');

    // ── Open Graph ───────────────────────────────────────────────────────────
    setMeta('property', 'og:type',        ogType);
    setMeta('property', 'og:title',       defaultSEO.defaultTitle);
    setMeta('property', 'og:description', metaDescription);
    setMeta('property', 'og:image',       ogImageUrl);
    setMeta('property', 'og:url',         canonical);
    setMeta('property', 'og:site_name',   defaultSEO.siteName);

    // ── Twitter Card ─────────────────────────────────────────────────────────
    setMeta('name', 'twitter:card',        'summary_large_image');
    setMeta('name', 'twitter:title',       defaultSEO.defaultTitle);
    setMeta('name', 'twitter:description', metaDescription);
    setMeta('name', 'twitter:image',       ogImageUrl);
    setMeta('name', 'twitter:creator',     defaultSEO.twitterHandle);

    // ── JSON-LD ───────────────────────────────────────────────────────────────
    if (jsonLd) setJsonLd(jsonLd);

  }, [metaDescription, allKeywords, canonical, ogImageUrl, ogType, noIndex, jsonLd]);

  return null;
}

export default SEO;
