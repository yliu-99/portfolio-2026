# Website Design Rules
I created this document for myself to ensure that while coding this website I am following the designs rules as closely as possible to simplify the coding process while also ensuring design/brand consistency. Including this file inside the code folder will also help AI reference the rules whenever necessary. My goal is to spend a lot more time in the initial planning stages hoping to eventually save me time, extra lines of code, and potential promps and troubleshooting with AI while trying to build my porfolio. 

---

## Part 1: Global Design System

---

### 1.1 Colour Palette

#### Primary Colours
White - #FFFFFF
Beige - #E5E5DE
Black - #25242F

#### Secondary / Accent Colours
Red - #E91A14
Blue - #3639FB

#### Neutral Colours (backgrounds, borders, text)

#### Semantic Colours (success, warning, error, info)

#### Dark Mode Colours (if applicable)
N/A for now

---

### 1.2 Typography

#### Font Families (headings, body, monospace/code)
Headings - Anton Regular
Body - Source Sans 3

#### Font Weights Used

#### Type Scale (sizes for h1–h6, body, small, caption)
h1, .h1 { font-size: 4.209rem }
h2, .h2 { font-size: 3.157rem }
h3, .h3 { font-size: 2.369rem }
h4, .h4 { font-size: 1.777rem }
h5, .h5 { font-size: 1.333rem }
h6, .h6 { font-size: 1rem }


#### Line Heights

#### Letter Spacing
Primary Heading - 0.2em
Secondary Heading - 0.1em
Major Heading - 0
---

### 1.3 Text Styling Rules

#### Headings (alignment, casing, colour per context)

#### Body Text (max-width for readability, paragraph spacing)

#### Links (default, hover, visited, active states)
Nav Links Visited - No Change
Body Links Visited - Color Change

#### Lists (bullet style, spacing, indentation)
Body Lists (ol,ul) - 2rem indentation

#### Blockquotes / Callouts

#### Code / Preformatted Text

---

### 1.4 Layout & Grid

#### Container Max-Width
Container Max-Width: Span 12


#### Column System (number of columns, gutter width)
Column - 12
Gutter - 16px


#### Page Margins (desktop, tablet, mobile)
Desktop - 24px
Tablet - 20px
Mobile - 16px
#### Section Padding / Vertical Rhythm
Desktop - 56px
Tablet - 40px
Mobile - 32px
---

### 1.5 Breakpoints & Responsive Rules

#### Breakpoint Values (mobile, tablet, desktop, wide)
Large: min-width 1080px
Medium: min-width 834px
Small: min-width 568px
#### Layout Shifts per Breakpoint (columns, stacking order, visibility)

#### Font Size Adjustments per Breakpoint

---

### 1.6 Spacing System

#### Base Unit

#### Spacing Scale (e.g., 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px)

#### When to Use Each Value (element padding, section gaps, etc.)

---

### 1.7 Borders & Dividers

#### Border Radius Values (small, medium, large, pill, circle)

#### Border Widths and Colours

#### Divider Styles (horizontal rules, section separators)

---

### 1.8 Shadows & Elevation

#### Shadow Levels (subtle, default, raised, overlay)

#### Usage Rules (which components get which shadow level)

---

### 1.9 Imagery & Media

#### Image Aspect Ratios Used

#### Image Treatment (rounded corners, overlays, filters)

#### Placeholder / Fallback Behaviour

#### Icon Style (library, size, stroke weight)

---

### 1.10 Animation & Interaction

#### Transition Durations (fast, default, slow)

#### Easing Curves

#### Hover Effects (buttons, cards, links, images)

#### Scroll Animations (if any)

#### Loading States

---

## Part 2: Components

---

### 2.1 Navigation

#### Header / Navbar (layout, logo placement, link style, mobile behaviour)
Desktop/
#### Footer (layout, columns, link groups)

#### Mobile Menu (type, animation, overlay)

---

### 2.2 Buttons

#### Variants (primary, secondary, ghost, outline, destructive)

#### Sizes (small, default, large)

#### States (default, hover, active, disabled, loading)

#### Icon Buttons

---

### 2.3 Cards

#### Variants (project card, content card, feature card, etc.)

#### Structure (image, title, description, tags, CTA)

#### Hover Behaviour

---

### 2.4 Forms & Inputs

#### Text Inputs (default, focus, error, disabled states)

#### Textareas

#### Labels & Helper Text

#### Validation Messages

#### Submit Button Behaviour

---

### 2.5 Tags & Badges

#### Colour Coding

#### Sizes

#### Usage (skill tags, status badges, category labels)

---

### 2.6 Modals & Overlays (if applicable)

---

### 2.7 Section Components

#### Hero / Banner Blocks

#### Feature / Highlight Grids

#### Testimonial / Quote Blocks

#### CTA (Call-to-Action) Blocks

---

## Part 3: Page-Specific Rules

---

### 3.1 Home

#### Purpose & Goal

#### Sections (in order)

#### Section-Specific Layout Notes

#### Data / Content Needed

---

### 3.2 About

#### Purpose & Goal

#### Sections (in order)

#### Section-Specific Layout Notes

#### Data / Content Needed

---

### 3.3 Projects

#### Purpose & Goal

#### Sections (in order)

#### Project Card Structure

#### Filtering / Sorting (if applicable)

#### Individual Project Page (if applicable)

#### Data / Content Needed

---

### 3.4 Playground

#### Purpose & Goal
A personal showcase of passion projects that fall outside the core professional focus. The page tells the story of who I am beyond the technical role — interests, perspectives, and the experiences that shape how I think and work. It adds personality and depth to the overall narrative of the site.

#### Sections (in order)

#### Page Intro / Framing Text
How do you introduce this page? What tone sets the right expectation — that these aren't client deliverables but personal work that matters to you?

#### Project Display Format
How are playground projects presented? Same card style as the Projects page or a deliberately different treatment to signal the shift in tone?

#### Project Detail View
Does each playground project have its own detail page, or is the content kept lighter (e.g., expanded card, modal, or external link only)?

#### Categorisation / Grouping
Are projects grouped by type (visual, writing, physical, etc.), by theme, or displayed as a flat collection?

#### Media & Presentation
What formats do these projects come in? (photos, video, writing, embedded links, downloadable files, etc.) What level of polish is expected vs. raw/in-progress work?

#### Narrative / Context per Project
How much storytelling accompanies each project? Just a title and image, or a short paragraph on why it matters to you?

#### Connection to Main Story
Is there an intentional thread connecting Playground back to the rest of the site (e.g., a closing line that ties personal work to professional identity)?

#### Data / Content Needed per Project
- Project title
- Short description / personal note
- Category or tag
- Media (images, video, links)
- Date or time period (if relevant)
- Status (completed, ongoing, archived)
- External link (if applicable)

---

### 3.5 Contact

#### Purpose & Goal

#### Sections (in order)

#### Form Fields & Validation Rules

#### Success / Error States

#### Data / Content Needed

---

## Part 4: Technical Notes

---

### 4.1 Framework & Tooling

#### Framework (React, Next.js, Astro, etc.)
React 

#### Styling Approach (Tailwind, CSS Modules, Styled Components, etc.)
Layout & Basic Style - Tailwind
Component Animations - Framer Motion
Complex Animation - GSAP
#### Component Library (if using one)
Tailwind, Framer Motion, GSAP
---

### 4.2 Naming Conventions

#### CSS Class Naming
lowercase with dash for spaces
#### Component File Naming
CamelCase
#### Colour / Token Variable Naming

---

### 4.3 Accessibility

#### Minimum Contrast Ratios

#### Focus Indicator Style

#### Alt Text Rules

#### Keyboard Navigation Notes

---

### 4.4 Performance

#### Image Formats & Optimization

#### Font Loading Strategy

#### Lazy Loading Rules

---