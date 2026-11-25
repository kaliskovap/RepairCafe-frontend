import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  Plus,
  Plug,
  Armchair,
  Bike,
  Shirt,
  Lightbulb,
  Wrench,
  ArrowRight,
} from 'lucide-react';
import { sampleRequests } from '../data/requests.js';
import radioPhoto from '../assets/radio.jpg';
import bikePhoto from '../assets/bike.jpg';
import chairPhoto from '../assets/chair.jpg';
import lampPhoto from '../assets/lamp.jpg';
import bagPhoto from '../assets/toaster.jpg';

const requestPhotos = {
  1: radioPhoto,
  2: chairPhoto,
  3: bikePhoto,
  4: bagPhoto,
  5: lampPhoto,
};
const icons = { plug: Plug, armchair: Armchair, bike: Bike, shirt: Shirt, lightbulb: Lightbulb };
const categories = ['Všechny kategorie', ...new Set(sampleRequests.map((item) => item.category))];
export default function RequestsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [sort, setSort] = useState('newest');
  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('cs');
    return sampleRequests
      .filter(
        (x) =>
          (category === categories[0] || x.category === category) &&
          (!q || `${x.title} ${x.description} ${x.category}`.toLocaleLowerCase('cs').includes(q)),
      )
      .sort((a, b) =>
        sort === 'newest' ? Number(b.id) - Number(a.id) : a.title.localeCompare(b.title, 'cs'),
      );
  }, [query, category, sort]);
  return (
    <div className="browse-page">
      <header className="browse-header">
        <Link className="brand" to="/">
          <span className="brand-mark" aria-hidden="true" />
          <b>Repair Café</b>
        </Link>
        <nav>
          <Link to="/">O nás</Link>
          <Link to="/requests/new">Vytvořit požadavek</Link>
          <Link className="button button-light" to="/login">Přihlásit se</Link>
        </nav>
      </header>
      <main className="page-area">
        <div className="browse-layout">
          <aside className="filters">
            <b>Vyhledávání</b>
            <label className="searchbox"><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Hledat požadavky…" /></label>
            <hr />
            <b>Kategorie</b>
            <div className="filter-options">
              {categories.map((item, index) => {
                const Icon = icons[sampleRequests.find((x) => x.category === item)?.icon] || Wrench;
                return <button key={item} className={category === item ? 'chosen' : ''} onClick={() => setCategory(item)}><span>{index === 0 ? <SlidersHorizontal /> : <Icon />}</span>{item}</button>;
              })}
            </div>
            <hr />
            <b>Řazení</b>
            <label className="sort">Zobrazit <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="newest">Nejnovější</option><option value="title">Podle názvu</option></select></label>
          </aside>
          <section className="results">
            <div className="results-head">
              <div><span className="eyebrow">POMOC, KTERÁ MÁ SMYSL</span><h1>Dostupné opravy</h1><p>Najděte něco, s čím můžete pomoci.</p></div>
              <Link className="btn-primary" to="/requests/new"><Plus /> Vytvořit požadavek</Link>
            </div>
            <div className="request-grid">
              {filtered.length ? filtered.map((item) => {
                const Icon = icons[item.icon] || Wrench;
                return <article className="request-card" key={item.id}>
                  <div className="photo-wrap"><img src={requestPhotos[item.id]} alt={item.title} loading="lazy" /><span className="open-badge">{item.status}</span></div>
                  <div className="card-content"><span className="category-chip"><Icon />{item.category}</span><h3>{item.title}</h3><p>{item.description}</p><div className="card-meta"><span>{item.date}</span><span>{item.requester}</span></div><Link className="btn-primary card-button" to={`/requests/${item.id}`}>Zobrazit detail <ArrowRight /></Link></div>
                </article>;
              }) : <div className="empty-state"><Search /><h3>Žádné požadavky nenalezeny</h3><p>Zkuste změnit kategorii nebo hledaný výraz.</p></div>}
            </div>
            <p className="prototype-note">Ukázková data: požadavky jsou v této fázi načteny z lokálního souboru. Napojení na databázi doplníme po rozšíření backendového API.</p>
          </section>
        </div>
      </main>
      <footer className="request-footer">Repair Café · Komunitní opravy</footer>
    </div>
  );
}
