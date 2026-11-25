import { Link, useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowRight, UserRound, Users, Wrench } from 'lucide-react';
import { useAuth } from '../auth/AuthContext.jsx';
import logo from '../assets/repair-cafe-logo.png';
import heroPhoto from '../assets/landing-hero-photo.png';
import workflowPhoto from '../assets/landing-workflow.jpg';
import volunteerPhoto from '../assets/landing-volunteer.jpg';
import landingRadio from '../assets/landing-radio.jpg';
import bottomBanner from '../assets/landing-bottom.jpg';

export default function LandingPage() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const isAdmin = session?.user?.role === 'admin';
  return (
    <div className="figma-landing">
      <header className="landing-header">
        <Link className="landing-brand" to="/" aria-label="Repair Café – úvod">
          <img src={logo} alt="Repair Café" />
        </Link>
        <span className="landing-header-divider" />
        <a className="landing-about" href="#o-nas">O nás</a>
        <Link className="landing-login" to={session ? (isAdmin ? '/admin/users' : '/my-repairs') : '/login'}>
          <UserRound /> {session ? (session.user?.name || 'Můj účet') : 'Přihlásit se'}
        </Link>
      </header>
      <section className="landing-hero">
        <img className="landing-hero-photo" src={heroPhoto} alt="Kavárenský stůl s kávou a nářadím" />
        <div className="landing-hero-overlay" />
        <div className="landing-hero-copy">
          <h1>Dejme věcem druhou šanci.</h1>
          <p>Repair Café propojuje lidi, kteří potřebují něco opravit,<br className="desktop-break" /> s dobrovolníky, kteří jim rádi pomohou.</p>
          <div className="landing-hero-actions">
            <Link className="landing-primary" to="/requests/new"><Wrench /> Začít s opravou</Link>
            <a className="landing-secondary" href="#jak-to-funguje">Jak to funguje? <ArrowDown /></a>
          </div>
        </div>
      </section>
      <section className="figma-how" id="jak-to-funguje">
        <img className="figma-workflow-image" src={workflowPhoto} alt="Tři kroky opravy: popište problém, vyberte dobrovolníka a domluvte opravu" />
      </section>
      <section className="figma-landing-cards">
        <article className="figma-landing-card">
          <img src={landingRadio} alt="Staré rádio připravené k opravě" />
          <div><h3><Wrench /> Potřebuji opravu</h3><p>Máte doma něco rozbitého? Popište svůj problém a dejte dobrovolníkům možnost vám pomoci.</p><Link to="/requests/new">Vytvořit požadavek <ArrowRight /></Link></div>
        </article>
        <article className="figma-landing-card">
          <img src={volunteerPhoto} alt="Dobrovolník opravuje elektroniku" />
          <div><h3><Users /> Chci pomáhat</h3><p>Baví vás opravování? Zapojte se jako dobrovolník a pomozte dát rozbitým věcem druhou šanci.</p><Link to="/login">Jak se stát dobrovolníkem <ArrowRight /></Link></div>
        </article>
      </section>
      <section className="figma-bottom-banner" id="o-nas"><img src={bottomBanner} alt="Ne všechno rozbité patří do koše. Opravování šetří materiály a spojuje lidi." /></section>
      <footer className="landing-footer">Repair Café · Komunitní opravy</footer>
    </div>
  );
}
