import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter, Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/dm-sans/latin-600.css';
import '@fontsource/dm-sans/latin-700.css';
import { artist, projects, assetUrl } from './data';
import { LanguageProvider, useLanguage } from './i18n';
import './styles.css';

function workCategory(search) {
  const category = new URLSearchParams(search).get('category');
  return ['artistic', 'commercial'].includes(category) ? category : 'all';
}

function Header() {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const category = workCategory(location.search);
  return (
    <header className="site-header">
      <div className="branding">
        <Link to="/" className="wordmark" aria-label={artist.name}>
          <img className="signature-image" src={artist.signature} alt={artist.name} width="2388" height="1668" fetchPriority="high" />
        </Link>
      </div>
      <div className="header-controls">
        <nav className="navigation" aria-label={t.mainNavigation}>
          {['all', 'artistic', 'commercial'].map(item => (
            <Link
              key={item}
              to={item === 'all' ? '/' : `/?category=${item}`}
              className="nav-link"
              aria-current={location.pathname === '/' && category === item && location.hash !== '#contact' ? 'page' : undefined}
            >
              {t.categories[item]}
            </Link>
          ))}
          <NavLink to="/about" className="nav-link">{t.about.toLowerCase()}</NavLink>
          <Link to="/#contact" className="nav-link">{t.contact.toLowerCase()}</Link>
        </nav>
        <select className="language-select" aria-label={t.languageSelect} value={language} onChange={event => setLanguage(event.target.value)}>
          <option value="en">English</option>
          <option value="zh">中文</option>
        </select>
      </div>
    </header>
  );
}

function Reveal({ children, className = '', ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        node.classList.add('is-visible');
        observer.unobserve(node);
      }
    }, { threshold: 0.07 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} {...props}>{children}</div>;
}

function WorkCard({ project, index }) {
  const { t, localizeProject } = useLanguage();
  const content = localizeProject(project);
  return (
    <Reveal className={`work-item work-item-${index + 1}`}>
      <Link className="work-link" to={`/work/${project.slug}`} aria-label={`${t.viewProject} ${content.title}`}>
        <div className="work-image">
          <img src={project.image} alt={content.alt} width={project.width} height={project.height} loading={index < 2 ? 'eager' : 'lazy'} />
          <div className="work-overlay">
            <span className="work-title">{content.title}</span>
            <span className="work-category">{t.categories[project.category]}</span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

function Home() {
  const category = workCategory(useLocation().search);
  const { t } = useLanguage();
  const selected = projects.filter(project => category === 'all' || project.category === category);
  return (
    <section className="selected-work" id="selected-work" aria-labelledby="work-heading">
      <h1 id="work-heading" className="sr-only">{t.categories[category]}</h1>
      <div className={`gallery${category !== 'all' ? ' gallery-filtered' : ''}`} key={category} aria-live="polite">
        {selected.map((project, index) => <WorkCard project={project} index={index} key={project.slug} />)}
      </div>
    </section>
  );
}

function About() {
  const { t } = useLanguage();
  return (
    <section className="about-page" aria-labelledby="about-title">
      <header className="about-intro">
        <p className="eyebrow">{t.aboutEyebrow}</p>
        <h1 id="about-title">{t.aboutTitle[0]}<br />{t.aboutTitle[1]}</h1>
      </header>
      <div className="about-layout">
        <Reveal className="about-portrait">
          <img src={projects[1].image} alt={t.portraitAlt} width="1086" height="1448" />
          <p className="portrait-note">{t.portraitNote}</p>
        </Reveal>
        <div className="about-copy">
          <h2>{t.greeting}</h2>
          {t.biography.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          <a href={`mailto:${artist.email}`} className="text-link">{t.storyQuestion}</a>
        </div>
      </div>
      <Reveal className="about-details">
        <h2>{t.servicesTitle}</h2>
        <dl className="services-list">
          {t.services.map(([title, description]) => <div key={title}><dt>{title}</dt><dd>{description}</dd></div>)}
        </dl>
      </Reveal>
    </section>
  );
}

function Sketch() {
  const { t } = useLanguage();
  return (
    <svg className="sketch" viewBox="0 0 500 400" fill="none" aria-label={t.studyAlt} role="img">
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M253 351C249 273 250 190 266 73M252 251c-74-9-135-43-135-99 58 3 121 32 135 99Zm7-51c66-8 109-53 105-97-60 7-99 48-105 97ZM252 302c65 2 126-21 143-77-66-9-119 23-143 77ZM257 155c-41-18-73-51-65-94 44 11 65 43 65 94Z" />
        <path d="m254 247-112-76m118 26 84-78m-86 179 115-58m-115-88-55-75" opacity=".55" />
        <path d="M91 348q40 6 77 0m162-277 36-19m-25 29 36-11M80 114q12-24 34-16m-7 27q12-24 34-16M276 355q19 8 42-2" />
        <ellipse cx="268" cy="61" rx="11" ry="20" transform="rotate(13 268 61)" />
      </g>
    </svg>
  );
}

function Project() {
  const { slug } = useParams();
  const { language, t, localizeProject } = useLanguage();
  const index = projects.findIndex(project => project.slug === slug);
  if (index < 0) return <NotFound />;
  const project = projects[index];
  const content = localizeProject(project);
  const next = projects[(index + 1) % projects.length];
  return (
    <article className="project-page">
      <Link to="/#selected-work" className="back-link">{t.allWork}</Link>
      <header className="project-heading">
        <p className="eyebrow">{t.categories[project.category]} / {project.year}</p>
        <h1>{content.title}</h1>
        <p className="project-subtitle">{content.subtitle}</p>
      </header>
      <Reveal className="project-cover"><img src={project.image} alt={content.alt} fetchPriority="high" /></Reveal>
      <Reveal className="project-story">
        <dl className="project-meta">
          <div><dt>{t.theProject}</dt><dd>{t.categories[project.category]}<br />{project.year}</dd></div>
          <div><dt>{t.medium}</dt><dd>{content.medium}</dd></div>
        </dl>
        <div><h2>{content.subtitle}</h2><p>{content.description}</p></div>
      </Reveal>
      <Reveal className="process-section">
        <div className="sketch-wrap"><Sketch /><span className="small-label">{t.studyLabel}</span></div>
        <div className="colour-notes">
          <p className="eyebrow">{t.closer}</p>
          <h2>{t.feelingTitle}</h2>
          <p>{content.note}</p>
          <div className="swatches" aria-label={t.paletteLabel}>
            {project.colors.map(color => <span key={color} style={{ backgroundColor: color }} aria-label={color} />)}
          </div>
          <span className="small-label">{t.colourLabel}</span>
        </div>
      </Reveal>
      {project.gallery?.map((item, itemIndex) => (
        <Reveal className={`series-image series-${item.size || 'wide'} align-${item.align || 'center'}`} key={`${item.src}-${itemIndex}`}>
          <figure>
            <img src={assetUrl(item.src)} alt={item.translations?.[language]?.alt || item.alt} loading="lazy" />
            {item.caption && <figcaption className="small-label">{item.translations?.[language]?.caption || item.caption}</figcaption>}
          </figure>
        </Reveal>
      ))}
      <Reveal className="project-closeup">
        <div className="detail-crop"><img src={project.image} alt={`${t.detailAlt} ${content.title}`} loading="lazy" /></div>
        <p className="small-label">{t.detailsLabel}</p>
      </Reveal>
      <Link to={`/work/${next.slug}`} className="next-project">
        <div><p className="eyebrow">{t.nextStory}</p><h2>{localizeProject(next).title}</h2></div>
        <img src={next.image} alt="" loading="lazy" />
      </Link>
    </article>
  );
}

function Contact() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer" id="contact" aria-labelledby="contact-heading">
      <div className="contact-inner">
        <h2 id="contact-heading">{t.contactHeading}</h2>
        <dl className="contact-list">
          <div><dt>{t.wechat}</dt><dd>{artist.wechat}</dd></div>
          <div><dt>{t.email}</dt><dd><a className="email-link" href={`mailto:${artist.email}`}>{artist.email}</a></dd></div>
          <div><dt>{t.instagram}</dt><dd><a className="instagram-link" href={artist.instagram} target="_blank" rel="noreferrer">@{artist.instagramHandle}</a></dd></div>
        </dl>
      </div>
    </footer>
  );
}

function NotFound() {
  const { t } = useLanguage();
  return (
    <section className="not-found">
      <p className="eyebrow">{t.notFoundEyebrow}</p>
      <h1>{t.notFoundTitle}</h1>
      <Link className="text-link" to="/">{t.backToGallery}</Link>
    </section>
  );
}

function App() {
  const location = useLocation();
  const { language, t, localizeProject } = useLanguage();
  useEffect(() => {
    const project = projects.find(item => location.pathname === `/work/${item.slug}`);
    const pageTitle = project ? localizeProject(project).title : location.pathname === '/about' ? t.about : t.title;
    document.title = `${pageTitle} — ${artist.name}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.metaDescription);
  }, [location.pathname, language]);
  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' }), 90);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location]);
  return (
    <>
      <a className="skip-link" href="#main" onClick={event => { event.preventDefault(); document.getElementById('main')?.focus(); }}>{t.skip}</a>
      <Header />
      <main id="main" tabIndex={-1} className="page-enter" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work/:slug" element={<Project />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Contact />
    </>
  );
}

const PortfolioRouter = import.meta.env.VITE_ROUTER_MODE === 'hash' ? HashRouter : BrowserRouter;
createRoot(document.getElementById('root')).render(
  <React.StrictMode><LanguageProvider><PortfolioRouter><App /></PortfolioRouter></LanguageProvider></React.StrictMode>,
);
