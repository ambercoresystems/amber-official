import React, { useEffect, useState } from 'react';

const API = '';

const Portfolio = () => {
  const [allItems, setAllItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetch(API + '/api/products').then(r => r.json());
        setAllItems(data);
        setFiltered(data);
        const cats = [...new Set(data.map(d => d.category).filter(Boolean))];
        setCategories(cats);
      } catch {
        setAllItems([]);
        setFiltered([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleFilter = (cat) => {
    setActiveFilter(cat);
    setFiltered(cat === 'all' ? allItems : allItems.filter(p => p.category === cat));
  };

  return (
    <section id="portfolio">
      <div className="section-label">Our Work</div>
      <h2 className="section-title">Portfolio <span className="dim">&amp; Projects</span></h2>

      <div className="portfolio-filter">
        <button
          className={`filter-btn${activeFilter === 'all' ? ' active' : ''}`}
          onClick={() => handleFilter('all')}
        >All</button>
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn${activeFilter === cat ? ' active' : ''}`}
            onClick={() => handleFilter(cat)}
          >{cat}</button>
        ))}
      </div>

      <div className="portfolio-grid">
        {loading ? (
          <div className="loading"><div className="loader"></div>Loading portfolio...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">No portfolio items yet.</div>
        ) : (
          filtered.map((p, i) => (
            <div className="portfolio-card" key={i}>
              {p.image
                ? <img src={p.image} className="portfolio-img" alt={p.title} />
                : <div className="portfolio-placeholder">💼</div>
              }
              <div className="portfolio-body">
                <h3>{p.title}</h3>
                <p>{p.description || ''}</p>
                {p.tags && p.tags.length > 0 && (
                  <div className="portfolio-tags">
                    {p.tags.map((t, j) => <span key={j} className="p-tag">{t}</span>)}
                  </div>
                )}
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer"
                    style={{ display: 'inline-block', marginTop: '.8rem', color: 'var(--dark)', fontSize: '.82rem', textDecoration: 'none' }}>
                    View Project →
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Portfolio;