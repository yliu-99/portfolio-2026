import { defaultSEO } from './SEO';

const BASE_URL = defaultSEO.siteUrl;

// ── Person ────────────────────────────────────────────────────────────────────

export const personSchema = {
    '@context': 'https://schema.org',
    '@type':    'Person',
    name:       'Yuhan Liu',
    jobTitle:   'Multidisciplinary Designer',
    url:        BASE_URL,
    image:      defaultSEO.defaultImage,
    email:      'yuhancreates@gmail.com',
    address: {
        '@type':         'PostalAddress',
        addressLocality: 'Vancouver',
        addressRegion:   'BC',
        addressCountry:  'CA',
    },
    alumniOf: {
        '@type':      'CollegeOrUniversity',
        name:         'British Columbia Institute of Technology',
        department:   'New Media Design & Web Development',
    },
    knowsAbout: [
        'Graphic Design', 'Branding', 'Visual Identity',
        'Motion Graphics', 'Video Production', 'User Interface Design',
        'Digital Media', 'Web Design',
    ],
    sameAs: [
        'https://www.linkedin.com/in/yuhan-liu-1a571524b/',
        'https://www.instagram.com/_yuhan.liu_/',
        'https://www.youtube.com/@Yuhan_Liu',
    ],
};

// ── WebSite ───────────────────────────────────────────────────────────────────

export const websiteSchema = {
    '@context': 'https://schema.org',
    '@type':    'WebSite',
    name:       'Yuhan Liu',
    url:        BASE_URL,
    description: defaultSEO.defaultDescription,
    author:     { '@type': 'Person', name: 'Yuhan Liu' },
    inLanguage: 'en-CA',
};

// ── Home page — WebSite + Person graph ───────────────────────────────────────

export const homeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
        websiteSchema,
        personSchema,
    ],
};

// ── About page ────────────────────────────────────────────────────────────────

export const aboutSchema = {
    '@context': 'https://schema.org',
    '@graph': [
        personSchema,
        {
            '@type':            'ProfilePage',
            '@id':              `${BASE_URL}/about`,
            url:                `${BASE_URL}/about`,
            name:               'About | Yuhan Liu',
            description:        'Learn about Yuhan Liu, a Vancouver-based multidisciplinary designer and BCIT New Media student.',
            mainEntity:         personSchema,
            inLanguage:         'en-CA',
        },
    ],
};

// ── Projects page ─────────────────────────────────────────────────────────────

export const projectsPageSchema = {
    '@context': 'https://schema.org',
    '@type':    'CollectionPage',
    '@id':      `${BASE_URL}/projects`,
    url:        `${BASE_URL}/projects`,
    name:       'Projects | Yuhan Liu',
    description: 'Browse Yuhan Liu\'s creative projects spanning graphic design, branding, motion graphics, and video production.',
    author:     personSchema,
    inLanguage: 'en-CA',
};

// ── Playground page ───────────────────────────────────────────────────────────

export const playgroundSchema = {
    '@context': 'https://schema.org',
    '@type':    'WebPage',
    '@id':      `${BASE_URL}/playground`,
    url:        `${BASE_URL}/playground`,
    name:       'Playground | Yuhan Liu',
    description: 'Yuhan Liu\'s creative playground — obsessions, passion projects, photography, and personal work.',
    author:     personSchema,
    inLanguage: 'en-CA',
};

// ── Per-project CreativeWork ──────────────────────────────────────────────────

export const createProjectSchema = (project) => ({
    '@context': 'https://schema.org',
    '@type':    'CreativeWork',
    name:       project.title,
    description: project.description || `${project.title} — a creative project by Yuhan Liu.`,
    url:        `${BASE_URL}/projects/${project.slug}`,
    creator:    personSchema,
    dateCreated: project.year || '2026',
    genre:      project.category || 'Graphic Design',
    keywords:   project.chips?.join(', ') ?? '',
    inLanguage: 'en-CA',
    mainEntityOfPage: {
        '@type': 'WebPage',
        '@id':   `${BASE_URL}/projects/${project.slug}`,
    },
});

// ── Breadcrumb helper ─────────────────────────────────────────────────────────

export const createBreadcrumbSchema = (breadcrumbs) => ({
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, i) => ({
        '@type':    'ListItem',
        position:   i + 1,
        name:       crumb.name,
        item:       `${BASE_URL}${crumb.url}`,
    })),
});
