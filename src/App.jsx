import React, { useEffect, useMemo, useRef, useState } from 'react';
import { coursesData, pathsData } from './script.js';

const logos = [
  { name: 'Google', initial: 'G', color: '#1a73e8' },
  { name: 'Microsoft', initial: 'M', color: '#0078d4' },
  { name: 'Amazon', initial: 'A', color: '#ff9900' },
  { name: 'IBM', initial: 'I', color: '#054ada' },
  { name: 'LinkedIn', initial: 'L', color: '#0a66c2' },
  { name: 'Adobe', initial: 'A', color: '#e44c34' },
  { name: 'Spotify', initial: 'S', color: '#1db954' },
  { name: 'Apple', initial: 'A', color: '#000000' }
];

const features = [
  { icon: '🎯', color: 'rgba(26,86,219,0.1)', title: 'Real Internship Projects', text: 'Work on actual industry problems and build a professional portfolio.' },
  { icon: '👶', color: 'rgba(245,158,11,0.1)', title: 'Beginner Friendly', text: 'No prior experience required. We guide you from the basics to advanced.' },
  { icon: '📜', color: 'rgba(16,185,129,0.1)', title: 'Internship Certificate', text: 'Get a verified certificate that adds significant value to your resume.' },
  { icon: '🧑‍💼', color: 'rgba(139,92,246,0.1)', title: 'Mentor Support', text: "Get guidance from industry experts whenever you're stuck." },
  { icon: '📅', color: 'rgba(6,182,212,0.1)', title: 'Flexible Schedule', text: '100% online and self-paced. Complete the work at your own convenience.' },
  { icon: '💪', color: 'rgba(234,179,8,0.1)', title: 'Career-Ready Skills', text: 'Gain the exact skills that top companies are looking for in 2026.' }
];

const internshipSteps = [
  { title: 'Explore Internships', text: 'Browse the available programs and find an internship that fits your interests and goals.' },
  { title: 'Choose a Program', text: 'Select the role and learning path you want to pursue.' },
  { title: 'Complete Registration', text: 'Provide your details to finish signing up for your chosen program.' },
  { title: 'Secure Your Place', text: 'Complete enrollment using the available payment options.' },
  { title: 'Get Program Access', text: 'Review your enrollment details and get ready to begin your online internship.' },
  { title: 'Join and Get Started', text: 'Follow your program roadmap and start learning at your own pace.' },
  { title: 'Learn and Complete Projects', text: 'Build practical skills by completing your internship activities and projects.' },
  { title: 'Get Certified', text: 'Complete the program and receive your internship completion certificate.' }
];

const categoryLabels = {
  dev: 'Development',
  marketing: 'Marketing & Finance',
  creative: 'Creative',
  intelligence: 'Intelligence'
};

const testimonials = [
  {
    name: 'Karthik R',
    role: 'Python Intern → Junior Developer',
    salary: '↑ ₹2.4L → ₹4.8L per year',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format',
    quote: 'Internroll la Python internship join pannadhu en career ku romba useful ah irundhuchu. Concepts ellam simple ah explain pannanga. Projects panna confidence increase aayiduchu.'
  },
  {
    name: 'Priya Menon',
    role: 'Data Intern → Data Analyst',
    salary: '↑ ₹3.0L → ₹5.5L per year',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b7c5?w=80&h=80&fit=crop&auto=format',
    quote: 'The hands-on tasks and mentor reviews were super helpful! I gained confidence writing production code and preparing for tech interviews.'
  },
  {
    name: 'Arjun Kapoor',
    role: 'UI/UX Intern → Product Designer',
    salary: '↑ ₹2.8L → ₹6.0L per year',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&auto=format',
    quote: 'I created 4 real-world projects for my portfolio during the internship. Got my first remote internship offer right after completion!'
  }
];

const faqs = [
  { question: 'Do I need prior experience?', answer: 'No prior experience is required! We have beginner-friendly tracks with step-by-step guidance from industry mentors.' },
  { question: 'Will I get a certificate?', answer: 'Yes! You will get a verified internship completion certificate that adds significant value to your resume.' },
  { question: 'What is the duration?', answer: 'Most of our online internship programs are designed to be completed in 3 to 4 weeks (30 days).' },
  { question: 'Is it flexible?', answer: 'Yes, 100% online and self-paced so you can easily balance it with college or job applications.' }
];

function AnimatedNumber({ target, enabled }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return undefined;

    let startTime;
    let frameId;
    const step = timestamp => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 1800, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [enabled, target]);

  return value;
}

function Reveal({ as: Element = 'div', className = '', children, ...props }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Element ref={ref} className={`${className} reveal${visible ? ' visible' : ''}`} {...props}>
      {children}
    </Element>
  );
}

function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialMax, setTestimonialMax] = useState(0);
  const [testimonialCardOffset, setTestimonialCardOffset] = useState(404);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroStatsStarted, setHeroStatsStarted] = useState(false);
  const [countersStarted, setCountersStarted] = useState(false);
  const testimonialTrack = useRef(null);
  const counters = useRef(null);

  const visibleCourses = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return coursesData.filter(course => {
      const matchesCategory = activeFilter === 'all' || course.cat === activeFilter;
      const matchesSearch = !normalizedSearch
        || `${course.title} ${course.desc} ${course.tags.join(' ')}`.toLowerCase().includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, search]);

  useEffect(() => {
    const timer = window.setTimeout(() => setHeroStatsStarted(true), 400);
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 20);
      setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const element = counters.current;
    if (!element || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setCountersStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateSlider = () => {
      const track = testimonialTrack.current;
      const firstCard = track?.querySelector('.testimonial-card');
      if (!track || !firstCard) return;
      const gap = parseFloat(window.getComputedStyle(track).gap) || 24;
      const offset = firstCard.getBoundingClientRect().width + gap;
      const visibleCount = Math.max(1, Math.floor(track.parentElement.offsetWidth / offset));
      setTestimonialCardOffset(offset);
      setTestimonialMax(Math.max(0, testimonials.length - visibleCount));
    };

    updateSlider();
    window.addEventListener('resize', updateSlider);
    return () => window.removeEventListener('resize', updateSlider);
  }, []);

  useEffect(() => {
    setTestimonialIndex(index => Math.min(index, testimonialMax));
  }, [testimonialMax]);

  const scrollToCourses = () => {
    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateSearch = value => {
    setSearch(value);
    setActiveFilter('all');
  };

  const slideTo = index => {
    setTestimonialIndex(Math.max(0, Math.min(index, testimonialMax)));
  };

  const renderCourse = (course, index) => (
    <Reveal as="article" className={`course-card reveal-delay-${index % 4}`} key={course.id}>
      <div className="course-thumb">
        <img src={course.img} alt="" loading="lazy" />
        <span className={`course-badge ${course.badgeColor}`}>{course.badge}</span>
        <button className="course-bookmark" type="button" aria-label={`Bookmark ${course.title}`}>🔖</button>
      </div>
      <div className="course-body">
        <div className="course-meta">
          <div className="course-uni">{course.uni}</div>
          <span className="course-cat">{categoryLabels[course.cat]}</span>
        </div>
        <h3 className="course-title">{course.title}</h3>
        <p className="course-desc">{course.desc}</p>
        <div className="course-rating">
          <span className="stars" aria-label="5 stars">★★★★★</span>
          <span className="rating-num">{course.rating}</span>
          <span className="rating-count">({(course.reviews / 1000).toFixed(1)}K)</span>
        </div>
        <div className="course-tags">{course.tags.map(tag => <span className="course-tag" key={tag}>{tag}</span>)}</div>
        <div className="course-pricing-row">
          <span className="course-price-now">{course.priceNow}</span>
          <span className="course-price-old">{course.priceOld}</span>
        </div>
        <div className="course-duration-info">{course.duration}</div>
        <div className="course-actions">
          <button className="btn-card-outline" type="button">View Details</button>
          <button className="btn-card-fill" type="button">Apply Now</button>
        </div>
      </div>
    </Reveal>
  );

  return (
    <>
      <div id="progress-bar" style={{ width: `${scrollProgress}%` }} />

      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <a className="nav-logo" href="#hero" aria-label="Intercraft Academy home">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            </div>
            <span className="logo-text">Inter<span>craft</span></span>
          </a>
          <div className="nav-links">
            <a href="#courses" className="nav-link">Explore <span aria-hidden="true">⌄</span></a>
            <a href="#paths" className="nav-link">Degrees</a>
            <a href="#why" className="nav-link">Certifications</a>
            <a href="#testimonials" className="nav-link">Careers</a>
          </div>
          <label className="nav-search">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input value={search} onChange={event => updateSearch(event.target.value)} placeholder="Search internships, skills..." />
          </label>
          <div className="nav-actions">
            <button className="btn-ghost" type="button">Log in</button>
            <button className="btn-primary" type="button">Join for Free</button>
          </div>
          <button className="hamburger" type="button" aria-label="Menu" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(open => !open)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-nav${mobileMenuOpen ? ' open' : ''}`}>
        <a href="#courses" onClick={() => setMobileMenuOpen(false)}>Explore Internships</a>
        <a href="#paths" onClick={() => setMobileMenuOpen(false)}>Learning Paths</a>
        <a href="#why" onClick={() => setMobileMenuOpen(false)}>Why Us</a>
        <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
        <div className="mobile-nav-actions">
          <button className="btn-ghost" type="button">Log in</button>
          <button className="btn-primary" type="button">Join Free</button>
        </div>
      </div>

      <main>
        <section className="hero" id="hero">
          <div className="hero-bg"><div className="hero-blob1" /><div className="hero-blob2" /></div>
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-badge"><span className="pulse" />5,000+ Interns Enrolled</div>
              <h1 className="hero-title">Launch Your Career<br />with <em>Real Internships</em></h1>
              <p className="hero-sub">Work on real-world projects, gain practical experience, and earn verified internship certificates.</p>
              <form className="hero-search-bar" onSubmit={event => { event.preventDefault(); scrollToCourses(); }}>
                <span className="hero-search-icon" aria-hidden="true">⌕</span>
                <input value={search} onChange={event => updateSearch(event.target.value)} placeholder="What domain do you want to intern in?" aria-label="Search internships" />
                <button type="submit">Search Internships</button>
              </form>
              <div className="hero-chips">
                {['Machine Learning', 'Backend Development', 'Python Programming', 'Digital Marketing', 'Data Structures', 'Stock Market & Crypto'].map((topic, index) => (
                  <button className="chip" type="button" key={topic} onClick={() => { updateSearch(topic); scrollToCourses(); }}>
                    {['🤖', '💻', '🐍', '📱', '🏗️', '📈'][index]} {topic}
                  </button>
                ))}
              </div>
              <div className="hero-stats">
                <div className="hero-stat"><div className="num" data-target="1200"><AnimatedNumber target={1200} enabled={heroStatsStarted} /></div><div className="lbl">Active Projects</div></div>
                <div className="hero-stat"><div className="num" data-target="340"><AnimatedNumber target={340} enabled={heroStatsStarted} /></div><div className="lbl">Expert Mentors</div></div>
                <div className="hero-stat"><div className="num" data-target="98"><AnimatedNumber target={98} enabled={heroStatsStarted} /></div><div className="lbl">% Career Support</div></div>
              </div>
            </div>
            <Reveal className="hero-visual reveal-delay-2">
              <div className="hero-img-wrap">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=750&fit=crop&auto=format" alt="Interns collaborating and working on projects" />
              </div>
              <div className="float-card float-card1"><div className="card-icon">🏆</div><div className="card-text"><div className="title">Verified Certificate</div><div className="sub">Full-Stack Development</div></div></div>
              <div className="float-card float-card2"><div className="card-icon">📈</div><div className="card-text"><div className="title">Practical Experience</div><div className="sub">Real Industry Capstone</div></div></div>
            </Reveal>
          </div>
        </section>

        <section className="trust-section" aria-label="Learner companies">
          <div className="trust-inner">
            <p className="trust-label">Trusted by learners from top companies worldwide</p>
            <div className="logo-track-wrap">
              <div className="logo-track">
                {[...logos, ...logos].map((logo, index) => (
                  <div className="logo-item" key={`${logo.name}-${index}`} aria-hidden={index >= logos.length}>
                    <span className="l-icon" style={{ backgroundColor: logo.color }}>{logo.initial}</span>
                    <span className="l-name">{logo.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="counter-section" ref={counters}>
          <div className="counters-grid">
            <Reveal className="counter-item"><div className="counter-num"><span><AnimatedNumber target={5} enabled={countersStarted} /></span>K+</div><div className="counter-lbl">Active Learners</div></Reveal>
            <Reveal className="counter-item reveal-delay-1"><div className="counter-num"><span><AnimatedNumber target={340} enabled={countersStarted} /></span>+</div><div className="counter-lbl">Expert Mentors</div></Reveal>
            <Reveal className="counter-item reveal-delay-2"><div className="counter-num"><span><AnimatedNumber target={1200} enabled={countersStarted} /></span>+</div><div className="counter-lbl">Internships Available</div></Reveal>
            <Reveal className="counter-item reveal-delay-3"><div className="counter-num"><span><AnimatedNumber target={98} enabled={countersStarted} /></span>%</div><div className="counter-lbl">Intern Satisfaction</div></Reveal>
          </div>
        </section>

        <section className="section" id="courses">
          <div className="section-inner">
            <Reveal className="section-header">
              <span className="section-tag">INTERNSHIP PROGRAMS</span>
              <h2 className="section-title">Industry-standard<br /><em>Internship Programs</em></h2>
              <p className="section-sub">Work on real projects, get mentored by experts, and earn a verified certificate to boost your resume.</p>
            </Reveal>
            <Reveal className="filter-tabs" aria-label="Filter internships">
              {[
                ['all', 'All Internships'],
                ['dev', 'Development'],
                ['marketing', 'Marketing & Finance'],
                ['creative', 'Creative'],
                ['intelligence', 'Intelligence']
              ].map(([filter, label]) => (
                <button type="button" className={`filter-tab${activeFilter === filter ? ' active' : ''}`} key={filter} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter}>{label}</button>
              ))}
            </Reveal>
            <div className="courses-grid">
              {visibleCourses.length ? visibleCourses.map(renderCourse) : <p className="empty-results">No internships match that search. Try another skill or category.</p>}
            </div>
            <Reveal className="view-more-wrap"><button className="btn-outline" type="button" onClick={() => { setActiveFilter('all'); setSearch(''); }}>Explore All Internships →</button></Reveal>
          </div>
        </section>

        <section className="paths-section" id="paths">
          <div className="section-inner">
            <Reveal className="section-header center">
              <span className="section-tag path-section-tag">Learning Paths</span>
              <h2 className="section-title path-section-title">Structured paths from<br /><em>beginner to expert</em></h2>
              <p className="section-sub path-section-sub">Follow a guided curriculum with checkpoints, real projects, and a recognized certificate at the end.</p>
            </Reveal>
            <div className="paths-grid">
              {pathsData.map((path, index) => (
                <Reveal as="article" className={`path-card reveal-delay-${index % 3}`} key={path.title}>
                  <div className="path-icon">{path.icon}</div>
                  <h3 className="path-title">{path.title}</h3>
                  <p className="path-sub">{path.sub}</p>
                  <div className="path-steps">{path.steps.map(step => <span className="path-step" key={step}>{step}</span>)}</div>
                  <div className="path-meta"><span className="path-duration">⏱ {path.duration}</span><span className="path-cert">🏆 {path.cert}</span></div>
                  <div className="path-progress"><div className="path-progress-bar" style={{ width: `${path.progress}%` }} /></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="why-section" id="why">
          <div className="section-inner">
            <div className="why-grid">
              <div>
                <Reveal className="section-header">
                  <span className="section-tag">WHY INTERNROLL</span>
                  <h2 className="section-title">Why Choose<br /><em>Internroll?</em></h2>
                  <p className="section-sub">We provide everything you need to transition from a student to a professional with hands-on experience.</p>
                </Reveal>
                <div className="why-features">
                  {features.map((feature, index) => (
                    <Reveal as="article" className={`why-feat reveal-delay-${index % 4}`} key={feature.title}>
                      <div className="feat-icon" style={{ backgroundColor: feature.color }}>{feature.icon}</div>
                      <h3 className="feat-title">{feature.title}</h3>
                      <p className="feat-desc">{feature.text}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
              <Reveal className="why-img reveal-delay-2">
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=700&fit=crop&auto=format" alt="Mentor guiding an intern" loading="lazy" />
              </Reveal>
            </div>
            <Reveal className="why-banner-card">
              <h3>Start Internships, Build Skills, and Grow Your Future</h3>
              <p>Explore exciting internship opportunities and track your career progress.</p>
              <button className="btn-primary" type="button" onClick={scrollToCourses}>Get Started</button>
            </Reveal>
          </div>
        </section>

        <section className="process-section" id="process">
          <div className="section-inner process-inner">
            <Reveal className="section-header center">
              <span className="section-tag">YOUR JOURNEY</span>
              <h2 className="section-title">How Our Internship<br /><em>Process Works</em></h2>
              <p className="section-sub">A simple step-by-step path from choosing your internship to completing it.</p>
            </Reveal>
            <ol className="process-list">
              {internshipSteps.map((step, index) => (
                <Reveal as="li" className={`process-step-card reveal-delay-${index % 4}`} key={step.title}>
                  <span className="process-step-number" aria-hidden="true">{index + 1}</span>
                  <h3 className="process-step-title">{step.title}</h3>
                  <p className="process-step-desc">{step.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="testimonials-section" id="testimonials">
          <div className="section-inner">
            <Reveal className="section-header center">
              <span className="section-tag">Success Stories</span>
              <h2 className="section-title">Intern Success <em>Stories</em></h2>
              <p className="section-sub">"This internship helped me work on real projects and improve my skills."</p>
            </Reveal>
            <Reveal className="testimonials-slider">
              <div className="testimonials-track" ref={testimonialTrack} style={{ transform: `translateX(-${testimonialIndex * testimonialCardOffset}px)` }}>
                {testimonials.map(person => (
                  <article className="testimonial-card" key={person.name}>
                    <div className="t-quote">"</div>
                    <p className="t-text">{person.quote}</p>
                    <div className="t-author">
                      <div className="t-avatar"><img src={person.image} alt="" loading="lazy" /></div>
                      <div><div className="t-name">{person.name}</div><div className="t-role">{person.role}</div><div className="t-salary">{person.salary}</div></div>
                    </div>
                  </article>
                ))}
              </div>
            </Reveal>
            <div className="slider-controls">
              <button className="slider-btn" type="button" aria-label="Previous testimonial" onClick={() => slideTo(testimonialIndex - 1)} disabled={testimonialIndex === 0}>←</button>
              <div className="slider-dots">
                {Array.from({ length: testimonialMax + 1 }, (_, index) => (
                  <button className={`slider-dot${index === testimonialIndex ? ' active' : ''}`} type="button" key={index} aria-label={`Show testimonial ${index + 1}`} onClick={() => slideTo(index)} />
                ))}
              </div>
              <button className="slider-btn" type="button" aria-label="Next testimonial" onClick={() => slideTo(testimonialIndex + 1)} disabled={testimonialIndex === testimonialMax}>→</button>
            </div>
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="section-inner">
            <Reveal className="section-header center">
              <span className="section-tag">FAQS</span>
              <h2 className="section-title">Got questions?<br />We've got <em>answers</em></h2>
            </Reveal>
            <div className="faq-wrap">
              {faqs.map((faq, index) => (
                <Reveal as="article" className={`faq-item reveal-delay-${index}${openFaq === index ? ' open' : ''}`} key={faq.question}>
                  <button className="faq-question" type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                    {faq.question}<span className="faq-icon">+</span>
                  </button>
                  <div className={`faq-answer${openFaq === index ? ' open' : ''}`}><p>{faq.answer}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-inner">
            <span className="section-tag cta-tag">START TODAY</span>
            <h2 className="cta-title">Start Your Internship<br />Journey <em>Today</em></h2>
            <p className="cta-sub">Gain experience. Build projects. Get job-ready. Join 5,000+ interns who've kickstarted their careers.</p>
            <div className="cta-btns">
              <button className="btn-white" type="button" onClick={scrollToCourses}>Explore Internships →</button>
              <a className="btn-ghost-white" href="#testimonials">Watch Success Stories</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-inner">
          <div className="footer-bottom">
            <p>© 2026 Intercraft Academy. All rights reserved.</p>
            <div className="footer-socials" aria-label="Social media">
              {['𝕏', 'in', '▶', 'f'].map(social => <a className="social-btn" href="#hero" key={social} aria-label={social}>{social}</a>)}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
