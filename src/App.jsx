import { useEffect, useMemo, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import heroImg from './assets/hero.png'
import './App.css'

const currentYear = new Date().getFullYear()

const navigation = [
  ['Home', '#home'],
  ['Technologies', '#technologies'],
  ['Projects', '#projects'],
  ['About', '#about'],
  ['Contact', '#contact'],
]

const footerGroups = [
  { title: 'Product', links: [['Home', '#home'], ['Technologies', '#technologies'], ['Projects', '#projects']] },
  { title: 'Company', links: [['About', '#about'], ['Contact', '#contact'], ['Careers', '#contact']] },
  { title: 'Legal', links: [['Privacy Policy', '#privacy'], ['Terms of Service', '#terms']] },
]

function Brand({ footer = false }) {
  return (
    <a className={`brand${footer ? ' brand-footer' : ''}`} href="#home" aria-label="Dev Stack home">
      <span className="brand-mark" aria-hidden="true"><span /></span>
      <span>Dev <b>Stack</b></span>
    </a>
  )
}

function App() {
  const [technologies, setTechnologies] = useState([])
  const [stack, setStack] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    let active = true
    fetch('/technologies.json')
      .then((response) => {
        if (!response.ok) throw new Error(`Could not load technologies (${response.status})`)
        return response.json()
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('Technology data has an invalid format')
        if (active) setTechnologies(data)
      })
      .catch((error) => {
        if (active) setLoadError(error.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => { active = false }
  }, [])

  const categories = useMemo(
    () => ['All', ...new Set(technologies.map((technology) => technology.category))],
    [technologies],
  )
  const filteredTechnologies = useMemo(() => {
    const term = search.trim().toLowerCase()
    return technologies.filter((technology) => (
      (activeCategory === 'All' || technology.category === activeCategory)
      && (!term || `${technology.name} ${technology.description} ${technology.category}`.toLowerCase().includes(term))
    ))
  }, [activeCategory, search, technologies])
  const stackIds = useMemo(() => new Set(stack.map((technology) => technology.id)), [stack])

  function addToStack(technology) {
    if (stackIds.has(technology.id)) {
      toast.warning(`${technology.name} is already in your stack.`)
      return
    }
    setStack((current) => [...current, technology])
    toast.success(`${technology.name} added to your stack.`)
  }

  function removeFromStack(technology) {
    setStack((current) => current.filter((item) => item.id !== technology.id))
    toast.info(`${technology.name} removed from your stack.`)
  }

  function removeAll() {
    if (!stack.length) return
    setStack([])
    toast.info('Your stack has been cleared.')
  }

  return (
    <>
      <header className="site-header">
        <div className="nav-shell">
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span /><span />
          </button>
          <Brand />
          <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            {navigation.map(([label, href]) => (
              <a href={href} key={label} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
          <div className="nav-actions">
            <a className="sign-in" href="#contact">Sign In</a>
            <a className="button button-gradient button-small" href="#technologies">Sign Up <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section page-width" id="home">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> YOUR DEVELOPER TOOLKIT</span>
            <h1>Build Your Ideal<br /><span className="gradient-text">Development Stack</span></h1>
            <p>Explore frontend, backend, database, and tooling options, compare them side by side, and put together the stack that fits your next project.</p>
            <div className="hero-actions">
              <a className="button button-gradient" href="#technologies">Explore Technologies <span aria-hidden="true">↗</span></a>
              <a className="button button-outline" href="#about">Learn More</a>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack" aria-hidden="true"><span>J</span><span>M</span><span>A</span><span>+</span></div>
              <span>Made for curious builders</span>
              <span className="proof-divider" />
              <span className="star-rating">★★★★★</span>
              <span>4.9/5</span>
            </div>
          </div>
          <div className="hero-art" aria-label="Layered technology stack illustration" role="img">
            <div className="art-glow" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="art-chip chip-one"><span className="chip-symbol">JS</span><span>JavaScript</span></div>
            <div className="art-chip chip-two"><span className="chip-symbol chip-react">✳</span><span>React</span></div>
            <div className="art-platform platform-back"><span>BUILD SOMETHING GREAT</span></div>
            <img className="hero-stack-image" src={heroImg} alt="" />
            <div className="art-platform platform-front"><span className="platform-spark">✦</span><span>YOUR STACK</span><i /></div>
            <div className="art-chip chip-three"><span className="chip-symbol chip-db">◈</span><span>Database</span></div>
            <div className="art-sparkle sparkle-one">✦</div>
            <div className="art-sparkle sparkle-two">✧</div>
          </div>
          <div className="hero-bottom-line"><span>01</span><span>SCROLL TO EXPLORE</span><i /></div>
        </section>

        <section className="technology-section page-width" id="technologies">
          <div className="section-heading">
            <div>
              <span className="eyebrow">THE RIGHT TOOLS, YOUR WAY</span>
              <h2>Explore the <span className="gradient-text">Technologies</span></h2>
              <p>Compare trusted tools side by side and add your favorites to your stack.</p>
            </div>
            <label className="search-box">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>
              <input
                type="search"
                placeholder="Search technologies..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search technologies"
              />
              <kbd>/</kbd>
            </label>
          </div>

          <div className="catalog-layout">
            <div className="catalog-main">
              <div className="category-list" aria-label="Filter by category">
                {categories.map((category) => (
                  <button
                    className={`category-filter${activeCategory === category ? ' active' : ''}`}
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                  >{category}</button>
                ))}
              </div>
              {loading ? (
                <div className="loading-state" role="status"><span className="spinner" /> Loading technologies...</div>
              ) : loadError ? (
                <div className="error-state" role="alert">{loadError}. Please refresh the page to try again.</div>
              ) : filteredTechnologies.length ? (
                <div className="technology-grid">
                  {filteredTechnologies.map((technology) => {
                    const added = stackIds.has(technology.id)
                    return (
                      <article className={`technology-card${added ? ' is-added' : ''}`} key={technology.id}>
                        <div className="card-topline">
                          <span className="technology-icon-wrap">
                            <img src={technology.icon} alt="" className="technology-icon" loading="lazy" />
                          </span>
                          <span className={`badge badge-${technology.badge.toLowerCase().replaceAll(' ', '-')}`}>{technology.badge}</span>
                        </div>
                        <h3>{technology.name}</h3>
                        <p className="technology-description">{technology.description}</p>
                        <div className="technology-meta">
                          <span className="category-tag">{technology.category}</span>
                          <span>{technology.difficulty}</span>
                          <span className="rating"><span aria-hidden="true">★</span> {technology.rating}</span>
                        </div>
                        <button
                          className={`add-button${added ? ' added' : ''}`}
                          type="button"
                          disabled={added}
                          onClick={() => addToStack(technology)}
                        >
                          {added ? <><span aria-hidden="true">✓</span> Added to Stack</> : 'Add to Stack'}
                        </button>
                      </article>
                    )
                  })}
                </div>
              ) : (
                <div className="empty-search">No technologies match “{search}”. Try a different search.</div>
              )}
            </div>
            <aside className="stack-panel" aria-label="Your selected technology stack">
              <div className="stack-heading">
                <span className="stack-icon" aria-hidden="true">▤</span>
                <div>
                  <h3>Your Stack</h3>
                  <p>{stack.length} {stack.length === 1 ? 'Technology' : 'Technologies'} Selected</p>
                </div>
                {stack.length > 0 && <span className="stack-count">{String(stack.length).padStart(2, '0')}</span>}
              </div>
              {stack.length ? (
                <>
                  <ul className="stack-list">
                    {stack.map((technology) => (
                      <li className="stack-item" key={technology.id}>
                        <img src={technology.icon} alt="" loading="lazy" />
                        <span className="stack-item-copy"><strong>{technology.name}</strong><small>{technology.category}</small></span>
                        <button type="button" className="remove-item" aria-label={`Remove ${technology.name}`} onClick={() => removeFromStack(technology)}>×</button>
                      </li>
                    ))}
                  </ul>
                  <button className="remove-all" type="button" onClick={removeAll}>Remove All <span aria-hidden="true">↗</span></button>
                </>
              ) : (
                <div className="stack-empty">
                  <span className="empty-stack-art" aria-hidden="true"><i /><i /><i /></span>
                  <strong>Your stack is empty</strong>
                  <p>Add technologies to start building your stack.</p>
                  <a href="#technologies">Browse technologies <span aria-hidden="true">→</span></a>
                </div>
              )}
              <div className="stack-footnote"><span>✦</span> Your stack, your rules.</div>
            </aside>
          </div>
        </section>

        <section className="about-strip page-width" id="about">
          <div className="about-number">01 <span>—</span> 03</div>
          <div className="about-copy">
            <span className="eyebrow">A BETTER WAY TO BEGIN</span>
            <h2>Less guessing.<br /><span className="gradient-text">More building.</span></h2>
          </div>
          <p>Every great project starts with the right foundation. Compare popular tools, find what works for your workflow, and keep your choices organized in one place.</p>
          <a className="text-link" href="#technologies">Find your foundation <span aria-hidden="true">↗</span></a>
        </section>

        <section className="cta-section page-width" id="projects">
          <div className="cta-decoration cta-decoration-one" />
          <div className="cta-decoration cta-decoration-two" />
          <span className="eyebrow">YOUR NEXT PROJECT STARTS HERE</span>
          <h2>Ready to build your<br /><span>dream stack?</span></h2>
          <p>Explore the tools. Find your flow. Make something brilliant.</p>
          <a className="button button-light" href="#technologies">Build Your Stack <span aria-hidden="true">↗</span></a>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="footer-main page-width">
          <div className="footer-brand-block">
            <Brand footer />
            <p>A thoughtful toolkit for curious minds and the things they create.</p>
            <div className="social-links">
              <a href="https://github.com" aria-label="GitHub">GH</a>
              <a href="https://x.com" aria-label="Twitter">𝕏</a>
              <a href="https://linkedin.com" aria-label="LinkedIn">in</a>
            </div>
          </div>
          <div className="footer-link-groups">
            {footerGroups.map((group) => (
              <div className="footer-link-group" key={group.title}>
                <h3>{group.title}</h3>
                {group.links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom page-width">
          <span>© {currentYear} Dev Stack. All rights reserved.</span>
          <span className="developed-by">Developed by <strong>Jeon</strong> <span aria-hidden="true">✦</span></span>
          <div><a href="#privacy">Privacy</a><a href="#terms">Terms</a></div>
        </div>
      </footer>
      <ToastContainer position="bottom-right" autoClose={2600} newestOnTop closeOnClick pauseOnFocusLoss={false} theme="light" />
    </>
  )
}

export default App
