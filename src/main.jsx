import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import { artist, projects, assetUrl } from './data';
import './styles.css';

function Arrow({ diagonal = false, className = '' }) {
  return <svg className={`arrow ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M3 12h17m-7-7 7 7-7 7'} stroke="currentColor" strokeWidth="1.2" /></svg>;
}

function Flower({ className = '' }) {
  return <svg className={`flower ${className}`} viewBox="0 0 100 100" fill="none" aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx="50" cy="27" rx="9" ry="24" transform={`rotate(${i * 45} 50 50)`} fill="currentColor" />)}<circle cx="50" cy="50" r="12" fill="var(--paper)" /></svg>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => setOpen(false), [location]);
  const contact = event => {
    setOpen(false);
    if (location.pathname === '/') {
      event.preventDefault();
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      navigate('/#contact');
    }
  };
  return <header className="site-header">
    <Link to="/" className="wordmark" aria-label={`${artist.name} home`}>{artist.name.toLowerCase()}<span className="wordmark-dot">✳</span></Link>
    <span className="header-description">Independent illustrator<br />& visual storyteller</span>
    <button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? 'Close −' : 'Menu +'}</button>
    <nav id="main-navigation" className={open ? 'navigation open' : 'navigation'} aria-label="Main navigation">
      <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Work<span className="nav-dot" /></NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About<span className="nav-dot" /></NavLink>
      <Link className="nav-link contact-nav" to="/#contact" onClick={contact}>Let’s talk <Arrow diagonal /></Link>
    </nav>
  </header>;
}

function Reveal({ children, className = '', ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { node.classList.add('is-visible'); observer.unobserve(node); }
      });
    }, { threshold: 0.07 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} {...props}>{children}</div>;
}

function WorkCard({ project, index, filtered = false }) {
  return <Reveal className={`work-item work-item-${index + 1} ${filtered ? 'filtered-work' : ''}`}>
    <Link className="work-link" to={`/work/${project.slug}`} aria-label={`View ${project.title}`}>
      <div className="work-image">
        <img src={project.image} alt={project.alt} width={project.width} height={project.height} loading={index < 2 ? 'eager' : 'lazy'} />
        <div className="work-overlay"><span>Explore the story</span><Arrow diagonal /></div>
      </div>
      <div className="work-caption"><h3>{project.title}</h3><span>{project.category} · {project.year}</span><Arrow diagonal /></div>
    </Link>
  </Reveal>;
}

function Home() {
  const [category, setCategory] = useState('All work');
  const filtered = projects.filter(p => category === 'All work' || p.category === category);
  return <>
    <section className="hero" aria-labelledby="hero-title">
      <div className="eyebrow hero-eyebrow"><span className="tiny-spark">✳</span> A LITTLE CURIOSITY. A LOT OF COLOUR.</div>
      <h1 id="hero-title">Stories in colour.<br /><span>Moments of <em>wonder.</em></span></h1>
      <div className="hero-bottom"><p>{artist.introduction}</p><Link className="discover-link" to="/#selected-work">Wander through my work <span>↓</span></Link></div>
      <div className="hero-flower"><Flower /><span>Made with feeling.</span></div>
    </section>
    <section className="selected-work" id="selected-work" aria-labelledby="work-heading">
      <div className="gallery-heading"><h2 id="work-heading">SELECTED WORK <span>(2023—2025)</span></h2><div className="filters" aria-label="Filter work">{['All work', 'Personal', 'Editorial', 'Collaborations'].map(item => <button key={item} onClick={() => setCategory(item)} className={category === item ? 'filter active' : 'filter'} aria-pressed={category === item}>{item}{category === item && <span className="filter-dot" />}</button>)}</div></div>
      <div className={`gallery ${category !== 'All work' ? 'gallery-filtered' : ''}`} key={category} aria-live="polite">
        {filtered.map((project, index) => <WorkCard project={project} index={index} filtered={category !== 'All work'} key={project.slug} />)}
        {category === 'All work' && <div className="gallery-note"><Flower /><p>For the ordinary things<br />that feel <em>extraordinary.</em></p><span>A FEW PAGES FROM MY WORLD</span></div>}
      </div>
      <Reveal className="work-end"><span>Always looking. Always making.</span><span className="tiny-spark">✳</span><Link to="/about">A little more about me <Arrow diagonal /></Link></Reveal>
    </section>
  </>;
}

function About() {
  return <section className="about-page" aria-labelledby="about-title">
    <div className="about-intro"><span className="eyebrow">THE PERSON BEHIND THE PICTURES</span><h1 id="about-title">A curious heart.<br />A colourful <em>mind.</em></h1></div>
    <div className="about-layout"><Reveal className="about-portrait"><img src={projects[1].image} alt="An illustrated self-portrait: a quiet moment in a colourful garden." /><div className="portrait-note">A self-portrait, of sorts. <span>↗</span></div></Reveal>
      <div className="about-copy"><Flower /><h2>Hello, I’m {artist.name.split(' ')[0]}.</h2><p>I’m an independent illustrator with a soft spot for bold colours, imperfect shapes, and the stories hiding in everyday life.</p><p>My work lives somewhere between the real and the imagined. It’s a world of familiar faces, unruly gardens, slow afternoons, and small moments that deserve a second look.</p><p>I bring these stories to life through personal projects, editorial illustration, and thoughtful collaborations with people who care about what they make.</p><span className="about-location">{artist.location}</span><a href={`mailto:${artist.email}`} className="text-link">Have a story in mind? <Arrow diagonal /></a></div>
    </div>
    <Reveal className="about-details"><h2>A few things<br />I can help <em>with.</em></h2><div><span>01</span><h3>Editorial illustration</h3><p>Images that find the feeling behind the words.</p><span>02</span><h3>Brand collaborations</h3><p>A little personality for things with a purpose.</p><span>03</span><h3>Personal commissions</h3><p>One-of-a-kind stories, made just for you.</p></div></Reveal>
  </section>;
}

function Sketch() {
  return <svg className="sketch" viewBox="0 0 500 400" fill="none" aria-label="Botanical line study" role="img"><g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"><path d="M253 351C249 273 250 190 266 73M252 251c-74-9-135-43-135-99 58 3 121 32 135 99Zm7-51c66-8 109-53 105-97-60 7-99 48-105 97ZM252 302c65 2 126-21 143-77-66-9-119 23-143 77ZM257 155c-41-18-73-51-65-94 44 11 65 43 65 94Z" /><path d="m254 247-112-76m118 26 84-78m-86 179 115-58m-115-88-55-75" opacity=".55" /><path d="M91 348q40 6 77 0m162-277 36-19m-25 29 36-11M80 114q12-24 34-16m-7 27q12-24 34-16M276 355q19 8 42-2" /><ellipse cx="268" cy="61" rx="11" ry="20" transform="rotate(13 268 61)" /></g></svg>;
}

function Project() {
  const { slug } = useParams();
  const index = projects.findIndex(project => project.slug === slug);
  const project = projects[index];
  if (!project) return <NotFound />;
  const next = projects[(index + 1) % projects.length];
  return <article className="project-page">
    <Link to="/#selected-work" className="back-link"><span aria-hidden="true">←</span> All work</Link>
    <header className="project-heading"><span className="eyebrow">{project.category} / {project.year}</span><h1>{project.title}<span className="title-period">.</span></h1><p>{project.subtitle}</p></header>
    <Reveal className="project-cover"><img src={project.image} alt={project.alt} fetchPriority="high" /></Reveal>
    <Reveal className="project-story"><div className="project-meta"><span>THE PROJECT</span><p>{project.category}<br />{project.year}</p><span>MEDIUM</span><p>{project.medium}</p></div><div><h2>{project.subtitle}</h2><p>{project.description}</p></div></Reveal>
    <Reveal className="process-section"><div className="sketch-wrap"><Sketch /><span>01 — Studies in line</span></div><div className="colour-notes"><span className="eyebrow">A LOOK A LITTLE CLOSER</span><h2>It starts with<br />a <em>feeling.</em></h2><p>{project.note}</p><div className="swatches" aria-label="Project colour palette">{project.colors.map(color => <span key={color} style={{ backgroundColor: color }} aria-label={color} />)}</div><span className="small-label">02 — A conversation in colour</span></div></Reveal>
    {project.gallery?.map((item, itemIndex) => <Reveal className={`series-image series-${item.size || 'wide'} align-${item.align || 'center'}`} key={`${item.src}-${itemIndex}`}><figure><img src={assetUrl(item.src)} alt={item.alt} loading="lazy" />{item.caption && <figcaption className="small-label">{item.caption}</figcaption>}</figure></Reveal>)}
    <Reveal className="project-closeup"><div className="detail-crop"><img src={project.image} alt={`Close-up of the painted shapes and textures in ${project.title}`} loading="lazy" /></div><span className="small-label">03 — The little details</span></Reveal>
    <Reveal className="project-closing"><Flower /><p>A small story.<br />A whole world <em>inside.</em></p></Reveal>
    <Link to={`/work/${next.slug}`} className="next-project"><div><span className="eyebrow">NEXT STORY</span><h2>{next.title}</h2></div><Arrow /><img src={next.image} alt="" loading="lazy" /></Link>
  </article>;
}

function Contact() {
  return <footer className="site-footer" id="contact"><div className="contact-top"><div><span className="eyebrow">GOOD THINGS START WITH A CONVERSATION</span><h2>Let’s make<br /><em>something lovely.</em><a className="contact-big-arrow" href={`mailto:${artist.email}`} aria-label={`Email ${artist.name}`}><Arrow diagonal /></a></h2></div><div className="contact-side"><span className="availability"><i /> Open for thoughtful collaborations</span><a className="email-link" href={`mailto:${artist.email}`}>{artist.email} <Arrow diagonal /></a><a className="instagram-link" href={artist.instagram} target="_blank" rel="noreferrer">Instagram <Arrow diagonal /></a></div></div><div className="footer-bottom"><Link className="footer-name" to="/">{artist.name.toLowerCase()}<Flower /></Link><span>A little colour goes a long way.</span><span>© {new Date().getFullYear()} {artist.name}</span><a href="#top" onClick={event => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Back to top ↑</a></div></footer>;
}

function NotFound() {
  return <section className="not-found"><span className="eyebrow">A LITTLE DETOUR / 404</span><h1>Nothing growing<br /><em>here. Yet.</em></h1><Link className="text-link" to="/">Back to the gallery <Arrow /></Link></section>;
}

function App() {
  const location = useLocation();
  useEffect(() => {
    const project = projects.find(p => location.pathname === `/work/${p.slug}`);
    document.title = project ? `${project.title} — ${artist.name}` : location.pathname === '/about' ? `About — ${artist.name}` : `${artist.name} — Illustration & little wonders`;
    if (location.hash) {
      const timer = setTimeout(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' }), 90);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location]);
  return <><a className="skip-link" href="#main" onClick={event => { event.preventDefault(); document.getElementById('main')?.focus(); }}>Skip to content</a><div id="top" /><Header /><main id="main" tabIndex={-1} className="page-enter" key={location.pathname}><Routes><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/work/:slug" element={<Project />} /><Route path="*" element={<NotFound />} /></Routes></main><Contact /></>;
}

const PortfolioRouter = import.meta.env.VITE_ROUTER_MODE === 'hash' ? HashRouter : BrowserRouter;
createRoot(document.getElementById('root')).render(<React.StrictMode><PortfolioRouter><App /></PortfolioRouter></React.StrictMode>);
