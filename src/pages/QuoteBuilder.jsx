import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Globe, 
  User, 
  LayoutDashboard, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  Copy, 
  MessageSquare, 
  Mail, 
  CheckCircle2, 
  Info,
  Layers
} from 'lucide-react';
import { PRICING_CONFIG, calculateEstimate } from '../config/pricing';
import { config as siteConfig } from '../config';
import '../styles/StudioShared.css';
import '../styles/QuoteBuilder.css';

export default function QuoteBuilder() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');

  // Wizard state
  const [step, setStep] = useState(1);
  const [categoryId, setCategoryId] = useState(() => {
    if (initialCategory && PRICING_CONFIG.categories[initialCategory]) {
      return initialCategory;
    }
    return 'business';
  });

  const [pageOptionId, setPageOptionId] = useState('standard');
  const [designFidelityId, setDesignFidelityId] = useState('standard');
  const [selectedAddons, setSelectedAddons] = useState(['whatsappLead']);
  const [timelineId, setTimelineId] = useState('standard');

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [refCode, setRefCode] = useState('');

  useEffect(() => {
    document.title = 'Project Quote Builder & Cost Estimator — Vivek Studio';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Update default add-ons when category changes
  const handleCategorySelect = (id) => {
    setCategoryId(id);
    if (id === 'dashboard') {
      setSelectedAddons(['csvExport', 'multiRoleAuth']);
    } else if (id === 'portfolio') {
      setSelectedAddons(['whatsappLead']);
    } else {
      setSelectedAddons(['whatsappLead', 'customInquiryForm']);
    }
  };

  const toggleAddon = (addonId) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  // Dynamic estimate calculation
  const estimate = useMemo(() => {
    return calculateEstimate({
      categoryId,
      pageOptionId,
      designFidelityId,
      selectedAddons,
      timelineId
    });
  }, [categoryId, pageOptionId, designFidelityId, selectedAddons, timelineId]);

  // Validation
  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 4) {
      if (!contact.name.trim()) {
        newErrors.name = 'Please provide your name or organization.';
      }
      if (!contact.email.trim() && !contact.phone.trim()) {
        newErrors.contactMethod = 'Please provide at least an email address or WhatsApp phone number.';
      } else if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
        newErrors.email = 'Please provide a valid email address.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 5));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Generate structured proposal text
  const generateProposalText = useCallback((reference) => {
    const addOnNames = selectedAddons
      .map(id => PRICING_CONFIG.featureAddons.find(a => a.id === id)?.label)
      .filter(Boolean);

    return `*VIVEK STUDIO — PROJECT ESTIMATE REQUEST*
Ref: ${reference}
Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}

*CLIENT DETAILS*
- Name: ${contact.name || 'Not provided'}
- Organization: ${contact.company || 'N/A'}
- Email: ${contact.email || 'N/A'}
- Phone / WhatsApp: ${contact.phone || 'N/A'}

*PROJECT CONFIGURATION*
- Service Category: ${estimate.category.title}
- Scope / Pages: ${PRICING_CONFIG.pageOptions[pageOptionId]?.label || 'Standard'}
- Aesthetic Tier: ${PRICING_CONFIG.designFidelity[designFidelityId]?.label || 'Standard'}
- Timeline: ${estimate.timeline.label}
- Selected Features:
${addOnNames.length > 0 ? addOnNames.map(name => `  • ${name}`).join('\n') : '  • Standard core setup'}

*PROJECT NOTES*
${contact.notes.trim() || 'No additional notes provided.'}

*PRELIMINARY ESTIMATE*
- Indicative Budget Range: ₹${estimate.minEstimated.toLocaleString('en-IN')} – ₹${estimate.maxEstimated.toLocaleString('en-IN')}
- Calculated Baseline: ₹${estimate.finalTotal.toLocaleString('en-IN')}
- Currency: INR (₹)
- Note: Preliminary estimate subject to manual technical review. Domain and third-party hosting fees excluded.`;
  }, [contact, estimate, pageOptionId, designFidelityId, selectedAddons]);

  // Handle final submission initiation
  const handleSubmitRequest = () => {
    if (!validateStep(4)) {
      setStep(4);
      return;
    }

    const generatedRef = `VB-${Date.now().toString().slice(-6)}`;
    setRefCode(generatedRef);
    setSubmissionComplete(true);
    setStep(5);
  };

  const handleCopySummary = () => {
    const text = generateProposalText(refCode || `VB-${Date.now().toString().slice(-6)}`);
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  // Mailto and WhatsApp links
  const targetEmail = siteConfig.contact.email;
  const proposalSummary = generateProposalText(refCode || 'VB-INQUIRY');

  const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(`[Project Quote Request] ${refCode || 'VB-INQUIRY'} - ${estimate.category.title}`)}&body=${encodeURIComponent(proposalSummary)}`;
  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${encodeURIComponent(`[Project Quote Request] ${refCode || 'VB-INQUIRY'} - ${estimate.category.title}`)}&body=${encodeURIComponent(proposalSummary)}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(proposalSummary)}`;

  const currentCategoryObj = PRICING_CONFIG.categories[categoryId];

  return (
    <div className="studio-page">
      <div className="studio-container">
        {/* Header */}
        <header className="studio-header">
          <div className="studio-kicker">Interactive Project Estimator</div>
          <h1 className="studio-title">
            Configure scope & <span>estimate costs.</span>
          </h1>
          <p className="studio-description">
            Select your requirements to calculate an indicative preliminary price range.
          </p>
        </header>

        {/* Stepper Progress Bar */}
        <nav className="quote-stepper" aria-label="Quote Wizard Steps">
          {[
            { num: 1, label: 'Category' },
            { num: 2, label: 'Scope' },
            { num: 3, label: 'Features' },
            { num: 4, label: 'Contact' },
            { num: 5, label: 'Summary' }
          ].map((s, idx, arr) => (
            <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                className={`step-item ${step === s.num ? 'active' : ''} ${step > s.num ? 'completed' : ''}`}
                onClick={() => {
                  if (step > s.num) setStep(s.num);
                }}
                disabled={step < s.num && !submissionComplete}
                aria-current={step === s.num ? 'step' : undefined}
              >
                <span className="step-number">
                  {step > s.num ? <Check size={12} /> : s.num}
                </span>
                <span>{s.label}</span>
              </button>
              {idx < arr.length - 1 && <div className="step-divider" />}
            </div>
          ))}
        </nav>

        {/* Main Grid: Form on Left, Dynamic Estimate on Right */}
        <div className="quote-layout">
          {/* Left Column: Interactive Wizard Steps */}
          <main className="quote-form-container">
            <div className="studio-card">
              {/* STEP 1: Choose Category */}
              {step === 1 && (
                <div className="quote-step-content">
                    <h2 className="step-heading">Step 1: Select Service Category</h2>
                    <p className="step-subtext">
                      Choose the project archetype that best matches your objective.
                    </p>

                    <div className="quote-options-grid" role="radiogroup" aria-label="Service Category">
                      {[
                        { id: 'business', cat: PRICING_CONFIG.categories.business, icon: Globe },
                        { id: 'portfolio', cat: PRICING_CONFIG.categories.portfolio, icon: User },
                        { id: 'dashboard', cat: PRICING_CONFIG.categories.dashboard, icon: LayoutDashboard }
                      ].map((item) => {
                        const CatIcon = item.icon;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            className={`selectable-card ${categoryId === item.id ? 'selected' : ''}`}
                            onClick={() => handleCategorySelect(item.id)}
                            role="radio"
                            aria-checked={categoryId === item.id}
                          >
                            <div className="option-left">
                              <div className="option-radio">
                                <div className="option-radio-dot" />
                              </div>
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                  <CatIcon size={18} style={{ color: 'var(--color-primary)' }} />
                                  <div className="option-title">{item.cat.title}</div>
                                </div>
                                <div className="option-desc">{item.cat.shortDesc}</div>
                              </div>
                            </div>
                            <div className="option-price-tag">
                              From ₹{item.cat.minPrice.toLocaleString('en-IN')}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: Scope & Page Architecture (Category-Adaptive) */}
                {step === 2 && (
                  <div className="quote-step-content">
                    <h2 className="step-heading">Step 2: Project Scope & Structure</h2>
                    <p className="step-subtext">
                      Tailored options for <strong>{currentCategoryObj.title}</strong>.
                    </p>

                    {categoryId !== 'dashboard' ? (
                      <div>
                        <label className="quote-label">Number of Required Pages</label>
                        <div className="quote-options-grid" role="radiogroup">
                          {Object.values(PRICING_CONFIG.pageOptions).map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              className={`selectable-card ${pageOptionId === opt.id ? 'selected' : ''}`}
                              onClick={() => setPageOptionId(opt.id)}
                              role="radio"
                              aria-checked={pageOptionId === opt.id}
                            >
                              <div className="option-left">
                                <div className="option-radio">
                                  <div className="option-radio-dot" />
                                </div>
                                <div>
                                  <div className="option-title">{opt.label}</div>
                                  <div className="option-desc">
                                    {opt.id === 'single' && 'High-impact landing page focusing on one core action.'}
                                    {opt.id === 'standard' && 'Recommended. Home, About, Services/Courses, and Contact.'}
                                    {opt.id === 'extended' && 'Comprehensive information hierarchy with dedicated subpages.'}
                                    {opt.id === 'customPages' && 'Extensive directory, multi-course catalogs, or large archives.'}
                                  </div>
                                </div>
                              </div>
                              <div className="option-price-tag">
                                {opt.extraCost === 0 ? 'Included' : `+₹${opt.extraCost}`}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="quote-label">Dashboard Workflow Architecture</label>
                        <div className="quote-options-grid">
                          <div className="selectable-card selected" style={{ cursor: 'default' }}>
                            <div className="option-left">
                              <Layers size={18} style={{ color: 'var(--color-primary)', marginTop: '2px' }} />
                              <div>
                                <div className="option-title">Core Admin Portal & Lead Pipeline</div>
                                <div className="option-desc">
                                  Includes authenticated user login, responsive table views, filterable lead status pipeline, and secure cloud database connection.
                                </div>
                              </div>
                            </div>
                            <div className="option-price-tag">Base Included</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Aesthetic / Design Fidelity */}
                    <div style={{ marginTop: '32px' }}>
                      <label className="quote-label">Aesthetic & Craft Tier</label>
                      <div className="quote-options-grid" role="radiogroup">
                        {Object.values(PRICING_CONFIG.designFidelity).map((tier) => (
                          <button
                            key={tier.id}
                            type="button"
                            className={`selectable-card ${designFidelityId === tier.id ? 'selected' : ''}`}
                            onClick={() => setDesignFidelityId(tier.id)}
                            role="radio"
                            aria-checked={designFidelityId === tier.id}
                          >
                            <div className="option-left">
                              <div className="option-radio">
                                <div className="option-radio-dot" />
                              </div>
                              <div>
                                <div className="option-title">{tier.label}</div>
                                <div className="option-desc">{tier.desc}</div>
                              </div>
                            </div>
                            <div className="option-price-tag">
                              {tier.extraCost === 0 ? 'Included' : `+₹${tier.extraCost}`}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Features & Add-ons */}
                {step === 3 && (
                  <div className="quote-step-content">
                    <h2 className="step-heading">Step 3: Functional Add-ons & Integrations</h2>
                    <p className="step-subtext">
                      Select optional features you require for this project.
                    </p>

                    <div className="quote-options-grid">
                      {PRICING_CONFIG.featureAddons
                        .filter(a => a.applicableCategories.includes(categoryId))
                        .map((addon) => {
                          const isSelected = selectedAddons.includes(addon.id);
                          return (
                            <button
                              key={addon.id}
                              type="button"
                              className={`selectable-checkbox-card ${isSelected ? 'selected' : ''}`}
                              onClick={() => toggleAddon(addon.id)}
                              aria-pressed={isSelected}
                            >
                              <div className="option-checkbox-box">
                                {isSelected && <Check size={13} />}
                              </div>
                              <div style={{ flexGrow: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                                  <div className="option-title">{addon.label}</div>
                                  <div className="option-price-tag">+₹{addon.cost}</div>
                                </div>
                                <div className="option-desc">{addon.desc}</div>
                              </div>
                            </button>
                          );
                        })}
                    </div>

                    {/* Timeline Selection */}
                    <div style={{ marginTop: '32px' }}>
                      <label className="quote-label">Target Delivery Timeline</label>
                      <div className="quote-options-grid" role="radiogroup">
                        {PRICING_CONFIG.timelines.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            className={`selectable-card ${timelineId === t.id ? 'selected' : ''}`}
                            onClick={() => setTimelineId(t.id)}
                            role="radio"
                            aria-checked={timelineId === t.id}
                          >
                            <div className="option-left">
                              <div className="option-radio">
                                <div className="option-radio-dot" />
                              </div>
                              <div>
                                <div className="option-title">{t.label}</div>
                                <div className="option-desc">{t.note}</div>
                              </div>
                            </div>
                            <div className="option-price-tag">
                              {t.multiplier === 1.0 ? 'Standard Rate' : t.multiplier > 1 ? '+25% Priority' : '5% Flexible Discount'}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Client Contact & Context */}
                {step === 4 && (
                  <div className="quote-step-content">
                    <h2 className="step-heading">Step 4: Project Context & Contact Info</h2>
                    <p className="step-subtext">
                      Provide contact information so we can review the technical requirements and follow up.
                    </p>

                    <div className="quote-form-group">
                      <label className="quote-label" htmlFor="client-name">
                        Your Full Name or Company <span className="req">*</span>
                      </label>
                      <input
                        id="client-name"
                        type="text"
                        className="quote-input"
                        placeholder="e.g. Vivek Barman / Apex Coaching Institute"
                        value={contact.name}
                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                        required
                      />
                      {errors.name && <div className="quote-error-text">{errors.name}</div>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div className="quote-form-group">
                        <label className="quote-label" htmlFor="client-email">
                          Email Address
                        </label>
                        <input
                          id="client-email"
                          type="email"
                          className="quote-input"
                          placeholder="name@domain.com"
                          value={contact.email}
                          onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        />
                        {errors.email && <div className="quote-error-text">{errors.email}</div>}
                      </div>

                      <div className="quote-form-group">
                        <label className="quote-label" htmlFor="client-phone">
                          Phone / WhatsApp Number
                        </label>
                        <input
                          id="client-phone"
                          type="tel"
                          className="quote-input"
                          placeholder="+91 98765 43210"
                          value={contact.phone}
                          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    {errors.contactMethod && (
                      <div className="quote-error-text" style={{ marginBottom: '16px' }}>
                        {errors.contactMethod}
                      </div>
                    )}

                    <div className="quote-form-group">
                      <label className="quote-label" htmlFor="client-notes">
                        Project Brief or Specific Requirements (Optional)
                      </label>
                      <textarea
                        id="client-notes"
                        rows={4}
                        className="quote-textarea"
                        placeholder="Describe your current site, key competitors, or specific functional needs..."
                        value={contact.notes}
                        onChange={(e) => setContact({ ...contact, notes: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {/* STEP 5: Final Submission & Action Channels */}
                {step === 5 && (
                  <div className="quote-step-content">
                    <div className="quote-confirmation-card">
                      <div className="quote-confirmation-icon">
                        <CheckCircle2 size={28} />
                      </div>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                        Estimate Generated Successfully
                      </h2>
                      <p style={{ color: 'var(--color-accent)', fontSize: '0.9rem', marginTop: '6px' }}>
                        Reference Code for this preliminary inquiry:
                      </p>
                      <div className="quote-ref-code">{refCode || 'VB-PROPOSAL'}</div>

                      <p style={{ fontSize: '0.88rem', color: 'var(--color-text)', maxWidth: '54ch', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
                        To ensure prompt response, submit your requirement directly via your preferred channel below. Vivek manually reviews all inquiries within 24 hours.
                      </p>

                      <div className="submission-actions-grid">
                        {/* WhatsApp submission */}
                        <a 
                          href={whatsappUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="submission-btn-whatsapp"
                        >
                          <MessageSquare size={18} />
                          <span>Send Specification via WhatsApp</span>
                        </a>

                        {/* Email submission */}
                        <a 
                          href={mailtoUrl} 
                          className="submission-btn-email"
                        >
                          <Mail size={18} />
                          <span>Send via Default Email Client</span>
                        </a>

                        {/* Web Gmail alternative */}
                        <a 
                          href={gmailWebUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="submission-btn-copy"
                        >
                          <Send size={16} />
                          <span>Open in Gmail (Web)</span>
                        </a>

                        {/* Copy formatted proposal text */}
                        <button
                          type="button"
                          className="submission-btn-copy"
                          onClick={handleCopySummary}
                        >
                          <Copy size={16} />
                          <span>{isCopied ? 'Summary Copied to Clipboard!' : 'Copy Formatted Requirement Summary'}</span>
                        </button>
                      </div>
                    </div>

                    <div style={{ marginTop: '24px', textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="studio-btn-secondary"
                        style={{ fontSize: '0.82rem', padding: '8px 16px' }}
                      >
                        Start New Estimate
                      </button>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                {step < 5 && (
                  <div className="quote-nav-buttons">
                    {step > 1 ? (
                      <button
                        type="button"
                        className="studio-btn-secondary"
                        onClick={handlePrev}
                      >
                        <ArrowLeft size={16} />
                        <span>Previous</span>
                      </button>
                    ) : (
                      <Link to="/services" className="studio-btn-secondary">
                        <ArrowLeft size={16} />
                        <span>Back to Services</span>
                      </Link>
                    )}

                    {step < 4 ? (
                      <button
                        type="button"
                        className="studio-btn-primary"
                        onClick={handleNext}
                      >
                        <span>Continue</span>
                        <ArrowRight size={15} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="studio-btn-primary"
                        onClick={handleSubmitRequest}
                      >
                        <span>Review & Submit</span>
                        <Send size={15} />
                      </button>
                    )}
                  </div>
                )}
            </div>
          </main>

          {/* Right Column: Live Itemized Cost Breakdown Sticky Panel */}
          <aside className="estimate-sticky-panel" aria-label="Preliminary Cost Estimate">
            <div className="estimate-box">
              <div className="estimate-header">
                <div>
                  <span className="estimate-tag">Preliminary Estimate</span>
                  <div className="estimate-price-range">
                    ₹{estimate.minEstimated.toLocaleString('en-IN')} – ₹{estimate.maxEstimated.toLocaleString('en-IN')}
                  </div>
                  <div className="estimate-price-subtext">
                    Calculated baseline: ~₹{estimate.finalTotal.toLocaleString('en-IN')} ({estimate.timeline.label})
                  </div>
                </div>
              </div>

              {/* Itemized Line Items */}
              <div className="estimate-breakdown-list">
                {estimate.breakdown.map((item, idx) => (
                  <div key={idx} className="breakdown-row">
                    <div>
                      <div className="breakdown-item-name">{item.item}</div>
                      <div className="breakdown-item-details">{item.details}</div>
                    </div>
                    <div className="breakdown-item-cost">
                      ₹{item.cost.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Exclusions Notice */}
              <div className="estimate-exclusions-box">
                <div className="estimate-exclusions-title">Excluded from Estimate</div>
                <ul className="estimate-exclusions-list">
                  {estimate.exclusions.map((ex, i) => (
                    <li key={i}>• {ex}</li>
                  ))}
                  <li>• Custom domain fees paid directly to registrar</li>
                </ul>
              </div>

              {/* Disclaimer */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '16px', fontSize: '0.78rem', color: 'var(--color-accent)', lineHeight: 1.5 }}>
                <Info size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  This cost range is an indicative estimate. A finalized, binding quotation is issued following manual review of your submitted brief.
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
