import { defaultSEO } from './SEO';

// Person Schema for About page and general site
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Yuhan Liu",
  "jobTitle": "Multidisciplinary Designer",
  "url": defaultSEO.siteUrl,
  "sameAs": [
    "https://www.linkedin.com/in/yuhan-liu-1a571524b/",
    "https://www.instagram.com/_yuhan.liu_/",
    "https://www.youtube.com/@Yuhan_Liu"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Vancouver",
    "addressRegion": "BC",
    "addressCountry": "CA"
  },
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "British Columbia Institute of Technology",
    "department": "New Media Design & Web Development"
  },
  "knowsAbout": [
    "Graphic Design",
    "Web Design", 
    "Branding",
    "Visual Identity",
    "Digital Media",
    "Motion Graphics",
    "Video Production",
    "User Interface Design"
  ],
  "email": "yuhancreates@gmail.com",
  "image": `${defaultSEO.siteUrl}/og-image.png`
};

// Portfolio Website Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Yuhan Liu Design Portfolio",
  "description": "Professional graphic design and multimedia services in Vancouver. Specializing in graphic, motion, and sound design.",
  "url": defaultSEO.siteUrl,
  "provider": personSchema,
  "areaServed": {
    "@type": "City",
    "name": "Vancouver",
    "addressRegion": "BC",
    "addressCountry": "CA"
  },
  "serviceType": [
    "Graphic Design",
    "Brand Identity Design", 
    "Web Design",
    "Logo Design",
    "Sound Design",
    "Digital Media Production",
    "Visual Storytelling"
  ]
};

// Creative Work Schema for Projects
export const createProjectSchema = (project) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": project.title,
  "description": project.description || `${project.title} - A creative design project by Yuhan Liu showcasing expertise in ${project.chips?.join(', ') || 'graphic design'}.`,
  "creator": personSchema,
  "dateCreated": project.year || "2026",
  "genre": project.category || "Graphic Design",
  "keywords": project.chips?.join(', ') || "graphic design, creative, portfolio",
  "url": `${defaultSEO.siteUrl}/projects/${project.slug}`,
  "image": project.image ? `${defaultSEO.siteUrl}${project.image}` : undefined,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${defaultSEO.siteUrl}/projects/${project.slug}`
  }
});

// Organization Schema for professional credibility
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Yuhan Liu Design",
  "url": defaultSEO.siteUrl,
  "logo": `${defaultSEO.siteUrl}/logo.png`,
  "founder": personSchema,
  "location": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Vancouver",
      "addressRegion": "BC", 
      "addressCountry": "CA"
    }
  },
  "sameAs": [
    "https://www.linkedin.com/in/yuhan-liu-1a571524b/",
    "https://www.instagram.com/_yuhan.liu_/",
    "https://www.youtube.com/@Yuhan_Liu"
  ]
};

// Breadcrumb Schema Generator
export const createBreadcrumbSchema = (breadcrumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": `${defaultSEO.siteUrl}${crumb.url}`
  }))
});
