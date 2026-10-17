/**
 * Central Configurable Pricing Engine for Vivek Studio
 * All prices are in INR (₹) and represent indicative, preliminary test ranges.
 * Final quotation is confirmed only after manual review of requirements.
 */

export const PRICING_CONFIG = {
  currency: 'INR',
  currencySymbol: '₹',
  disclaimer: 'All estimates are preliminary and based on initial scope. Final quotations are issued following manual technical review. Domain and third-party hosting costs are excluded and paid directly to service providers.',

  // Service Categories
  categories: {
    business: {
      id: 'business',
      title: 'Business & Institutional Website',
      shortDesc: 'Modern, high-conversion web presence for coaching institutes, tutors, clinics, schools, and local businesses.',
      basePrice: 4999,
      minPrice: 4000,
      maxPrice: 8000,
      idealFor: 'Coaching centers, tutors, private clinics, schools, small business firms, and professional consultancies.',
      problemSolved: 'Replaces outdated or nonexistent web presence with a mobile-fast, search-indexed site that captures leads directly to WhatsApp and email.',
      deliverables: [
        '1–5 structured responsive pages (Home, About, Services/Courses, Gallery/Results, Contact)',
        'Mobile-first responsive architecture tested across devices',
        'Direct WhatsApp chat floating button & lead inquiry form',
        'Google Maps location embed & local SEO optimization meta tags',
        'Performance optimization (<1.5s load time on mobile networks)',
        'Free-tier hosting deployment (Vercel / Netlify / Cloudflare Pages) with custom domain connection'
      ],
      exclusions: [
        'Recurring subscription payment gateways (can be quoted separately)',
        'Domain registration fees (₹800–₹1,200/yr paid directly to registrar)',
        'Enterprise database backends (unless upgraded to Dashboard category)'
      ]
    },

    portfolio: {
      id: 'portfolio',
      title: 'Personal & Professional Portfolio',
      shortDesc: 'Distinctive, craft-driven portfolios for developers, UI/UX designers, creators, and researchers.',
      basePrice: 2999,
      minPrice: 2500,
      maxPrice: 5000,
      idealFor: 'Software developers, UI/UX designers, freelance specialists, graduate students, and creative professionals.',
      problemSolved: 'Avoids cookie-cutter template syndrome. Positions your work with high aesthetic standards, interactive project drawers, and proven case study structure.',
      deliverables: [
        'Curated project showcase with interactive details/drawers',
        'Interactive dark/light theme mode with smooth transitions',
        'Resume download button and verified social link hub',
        'Clean typography system (Plus Jakarta Sans & JetBrains Mono)',
        'Verified live demo & GitHub repository linking',
        'Lightning-fast static deployment with zero recurring server bills'
      ],
      exclusions: [
        'Heavy dynamic database CMS (unless custom Firebase/Supabase add-on selected)',
        'Full ghost-writing of technical project case studies (guidance provided)'
      ]
    },

    dashboard: {
      id: 'dashboard',
      title: 'Lightweight Dashboard & CRM System',
      shortDesc: 'Focused, responsive internal portals, lead trackers, and admin workflows for small teams.',
      basePrice: 9999,
      minPrice: 8000,
      maxPrice: 15000,
      idealFor: 'Small businesses, tutoring institutes managing inquiries, service providers tracking leads, and internal team operations.',
      problemSolved: 'Replaces messy Google Sheets and bloated expensive SaaS subscriptions with a secure, custom-tailored web admin tool.',
      deliverables: [
        'Secure user authentication (Firebase / Supabase Auth)',
        'Protected Admin Dashboard with real-time Firestore / PostgreSQL data',
        'Interactive lead/inquiry management pipeline with status tags',
        'CRUD controls (Add, Edit, Delete, Filter, Search items)',
        'One-click export to CSV / Excel format',
        'Mobile-friendly responsive dashboard layout'
      ],
      exclusions: [
        'Enterprise multi-tenant compliance (HIPAA / SOC2)',
        'Complex automated ERP sync with SAP or Salesforce'
      ]
    }
  },

  // Scope & Page Count options
  pageOptions: {
    single: { id: 'single', label: 'Single Page / Landing Page (Focused)', extraCost: 0 },
    standard: { id: 'standard', label: 'Standard Multi-Page (3 to 5 pages)', extraCost: 1000 },
    extended: { id: 'extended', label: 'Extended Multi-Page (6 to 9 pages)', extraCost: 2200 },
    customPages: { id: 'customPages', label: '10+ Pages / Custom Architecture', extraCost: 3800 }
  },

  // Design & Craft Fidelity
  designFidelity: {
    standard: {
      id: 'standard',
      label: 'Clean Minimalist Architectural',
      desc: 'High typographic contrast, crisp 1px borders, subtle micro-motion, and ultra-clean responsive grid.',
      extraCost: 0
    },
    bespoke: {
      id: 'bespoke',
      label: 'Bespoke Craft & Motion Choreography',
      desc: 'Double-bezel hardware styling, fluid island elements, custom SVG illustrations, and magnetic button physics.',
      extraCost: 1500
    }
  },

  // Feature Add-ons (Checkbox options)
  featureAddons: [
    {
      id: 'whatsappLead',
      label: 'WhatsApp Direct Chat & Instant Lead Route',
      desc: 'Floating quick-contact widget prefilling inquiry details for instant mobile closing.',
      cost: 500,
      applicableCategories: ['business', 'portfolio']
    },
    {
      id: 'customInquiryForm',
      label: 'Interactive Multi-step Inquiry Form',
      desc: 'Guided requirement intake with conditional inputs and structured email notifications.',
      cost: 800,
      applicableCategories: ['business', 'portfolio']
    },
    {
      id: 'cmsAdmin',
      label: 'Lightweight Admin CMS (Firebase / Supabase)',
      desc: 'Secure login portal allowing you to update projects, announcements, or leads without touching code.',
      cost: 3200,
      applicableCategories: ['business', 'portfolio']
    },
    {
      id: 'csvExport',
      label: 'Data Export to CSV / Excel Pipeline',
      desc: 'Export stored customer inquiries and table records with single-click formatted CSV download.',
      cost: 700,
      applicableCategories: ['dashboard']
    },
    {
      id: 'multiRoleAuth',
      label: 'Multi-Role User Permissions (Admin vs Viewer)',
      desc: 'Separates owner/editor capabilities from read-only team members.',
      cost: 1800,
      applicableCategories: ['dashboard']
    },
    {
      id: 'contentAssistance',
      label: 'Editorial Copywriting & Content Structuring',
      desc: 'We draft and refine your headline copy, service explanations, and call-to-action wording.',
      cost: 1200,
      applicableCategories: ['business', 'portfolio', 'dashboard']
    },
    {
      id: 'analyticsSetup',
      label: 'Privacy-Friendly Analytics & Google Search Console',
      desc: 'Search indexing verification, XML sitemap generation, and lightweight visitor counter setup.',
      cost: 600,
      applicableCategories: ['business', 'portfolio', 'dashboard']
    }
  ],

  // Delivery timelines
  timelines: [
    { id: 'standard', label: 'Standard (10–14 days)', multiplier: 1.0, note: 'Careful design, review, and QA' },
    { id: 'express', label: 'Accelerated Priority (5–7 days)', multiplier: 1.25, note: 'Dedicated sprint timeline' },
    { id: 'flexible', label: 'Flexible (2–3 weeks)', multiplier: 0.95, note: 'Relaxed pace' }
  ]
};

/**
 * Robust calculator function to compute transparent, itemized estimates
 */
export function calculateEstimate(selection) {
  const {
    categoryId = 'business',
    pageOptionId = 'standard',
    designFidelityId = 'standard',
    selectedAddons = [],
    timelineId = 'standard'
  } = selection;

  const category = PRICING_CONFIG.categories[categoryId] || PRICING_CONFIG.categories.business;
  const pageOption = PRICING_CONFIG.pageOptions[pageOptionId] || PRICING_CONFIG.pageOptions.standard;
  const design = PRICING_CONFIG.designFidelity[designFidelityId] || PRICING_CONFIG.designFidelity.standard;
  const timeline = PRICING_CONFIG.timelines.find(t => t.id === timelineId) || PRICING_CONFIG.timelines[0];

  const breakdown = [];

  // 1. Base package
  breakdown.push({
    item: `${category.title} (Core Package)`,
    details: 'Includes mobile responsive design, base deployment, and core layout architecture',
    cost: category.basePrice
  });

  // 2. Page count scope (if category uses pages, dashboard typically has views)
  if (categoryId !== 'dashboard' && pageOption.extraCost > 0) {
    breakdown.push({
      item: `Scope: ${pageOption.label}`,
      details: 'Page layout scaffolding and asset integration',
      cost: pageOption.extraCost
    });
  }

  // 3. Design fidelity
  if (design.extraCost > 0) {
    breakdown.push({
      item: `Aesthetic Tier: ${design.label}`,
      details: design.desc,
      cost: design.extraCost
    });
  }

  // 4. Add-ons
  let addonsTotal = 0;
  if (Array.isArray(selectedAddons)) {
    selectedAddons.forEach(addonId => {
      const addon = PRICING_CONFIG.featureAddons.find(a => a.id === addonId);
      if (addon && addon.applicableCategories.includes(categoryId)) {
        breakdown.push({
          item: addon.label,
          details: addon.desc,
          cost: addon.cost
        });
        addonsTotal += addon.cost;
      }
    });
  }

  // Subtotal before timeline factor
  const subtotal = category.basePrice + (categoryId !== 'dashboard' ? pageOption.extraCost : 0) + design.extraCost + addonsTotal;

  // Timeline adjustment
  let finalTotal = Math.round(subtotal * timeline.multiplier);

  // Calculate reasonable indicative range (± 10% around computed target, rounded to neat ₹500)
  const rangeMargin = Math.max(500, Math.round((finalTotal * 0.1) / 100) * 100);
  const minEstimated = Math.max(category.minPrice, finalTotal - rangeMargin);
  const maxEstimated = finalTotal + rangeMargin;

  return {
    category,
    breakdown,
    subtotal,
    timeline,
    finalTotal,
    minEstimated,
    maxEstimated,
    currencySymbol: PRICING_CONFIG.currencySymbol,
    disclaimer: PRICING_CONFIG.disclaimer,
    exclusions: category.exclusions
  };
}
