import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Wrench, Users, Recycle } from 'lucide-react';
import { useAuth } from '../auth/AuthContext.jsx';
import hero from '../assets/landing-hero-photo.png';
import radio from '../assets/landing-radio.jpg';
import volunteer from '../assets/landing-volunteer.jpg';
import workflow from '../assets/landing-workflow.jpg';
import bottom from '../assets/landing-bottom.jpg';

export default function LandingPage() {
  const { session } = useAuth();
  return (
    <div className="landing landing-refreshed">
      <header className="landing-header">
        <Link className="brand" to="/">
          <span className="brand-mark">
            <Coffee />
          </span>
          <b>Repair Café</b>
        </Link>
        <nav>
          <a href="#about">O nás</a>
          <a href="#how">Jak to funguje</a>
          <Link to="/requests">Prohlédnout opravy</Link>
          <Link to="/requests/new">Potřebuji opravu</Link>
          {session?.user?.role === 'admin' && <Link to="/admin/users">Správa uživatelů</Link>}
          <Link className="button button-light" to="/login">
            {session ? session.user?.name || 'Můj účet' : 'Přihlásit se'}
          </Link>
        </nav>
      </header>

      <section
        className="hero refreshed-hero"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(9,34,23,.88),rgba(9,34,23,.22)),url(${hero})`,
        }}
      >
        <div className="hero-copy">
          <span className="eyebrow">OPRAVUJEME SPOLEČNĚ</span>
          <h1>Dejme věcem druhou šanci.</h1>
          <p>
            Repair Café propojuje lidi, kteří potřebují něco opravit, s dobrovolníky, kteří jim rádi
            pomohou.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/requests/new">
              <Wrench size={18} /> Začít s opravou
            </Link>
            <a className="button button-outline" href="#how">
              Jak to funguje? <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <section className="intro refreshed-intro" id="about">
        <span className="eyebrow">OPRAVUJEME • SDÍLÍME • POMÁHÁME</span>
        <h2>Ne všechno rozbité patří do koše.</h2>
        <p>
          Věříme, že opravování má smysl. Pomáhá šetřit materiály, prodlužuje životnost věcí a
          spojuje lidi, kteří si mohou navzájem pomáhat.
        </p>
        <div className="intro-values">
          <span>
            <Wrench /> Praktická pomoc
          </span>
          <span>
            <Users /> Silnější komunita
          </span>
          <span>
            <Recycle /> Méně odpadu
          </span>
        </div>
      </section>

      <section className="home-action-cards" aria-label="Jak se zapojit">
        <article className="home-action-card">
          <div className="home-action-image">
            <img src={radio} alt="Vintage rádio připravené k opravě" />
          </div>
          <div className="home-action-copy">
            <h2>
              <Wrench size={22} /> Potřebuji opravu
            </h2>
            <p>
              Máte doma něco rozbitého? Popište svůj problém a dejte dobrovolníkům možnost vám
              pomoci.
            </p>
            <Link className="button button-home" to="/requests/new">
              Vytvořit požadavek <ArrowRight size={18} />
            </Link>
          </div>
        </article>
        <article className="home-action-card">
          <div className="home-action-image">
            <img src={volunteer} alt="Dobrovolník opravuje elektroniku v dílně" />
          </div>
          <div className="home-action-copy">
            <h2>
              <Users size={22} /> Chci pomáhat
            </h2>
            <p>
              Baví vás opravování? Zapojte se jako dobrovolník a pomozte dát rozbitým věcem druhou
              šanci.
            </p>
            <Link className="button button-home" to="/login">
              Jak se stát dobrovolníkem <ArrowRight size={18} />
            </Link>
          </div>
        </article>
      </section>

      <section className="how refreshed-how" id="how">
        <span className="eyebrow">JEDNODUŠE VE TŘECH KROCÍCH</span>
        <h2>Jak to funguje?</h2>
        <img
          className="workflow-image"
          src={workflow}
          alt="Tři kroky: popište problém, vyberte dobrovolníka a domluvte opravu"
        />
      </section>

      <section
        className="home-bottom-banner"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(12,35,25,.78),rgba(12,35,25,.18)),url(${bottom})`,
        }}
      >
        <div>
          <span className="eyebrow">OPRAVIT MÁ SMYSL</span>
          <h2>Každá opravená věc se počítá.</h2>
          <Link className="button button-primary" to="/requests">
            Prohlédnout požadavky <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <footer>Repair Café · Komunitní opravy</footer>
    </div>
  );
}
