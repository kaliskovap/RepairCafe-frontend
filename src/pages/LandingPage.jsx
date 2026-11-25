import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, UserRound, Wrench, Users } from 'lucide-react';
import logo from '../assets/repair-cafe-logo.png';
import heroPhoto from '../assets/landing-hero-photo.png';
import workflowPhoto from '../assets/landing-workflow.jpg';
import volunteerPhoto from '../assets/landing-volunteer.jpg';
import landingRadio from '../assets/landing-radio.jpg';
import bottomBanner from '../assets/landing-bottom.jpg';

export default function LandingPage() {
  return (
    <div className="demo-landing">
      <header className="demo-landing-header">
        <Link className="demo-landing-brand" to="/" aria-label="Repair Café – úvod">
          <img src={logo} alt="Repair Café" />
        </Link>
        <span className="demo-landing-divider" />
        <a className="demo-landing-about" href="#o-nas">O nás</a>
        <Link className="demo-landing-login" to="/login"><UserRound size={17} /> Přihlásit se</Link>
      </header>
      <section className="demo-landing-hero">
        <img className="demo-landing-hero-photo" src={heroPhoto} alt="Kavárenský stůl s kávou a nářadím" />
        <div className="demo-landing-hero-overlay" />
        <div className="demo-landing-hero-copy">
          <h1>Dejme věcem druhou šanci.</h1>
          <p>Repair Café propojuje lidi, kteří potřebují něco opravit,<br className="desktop-break" /> s dobrovolníky, kteří jim rádi pomohou.</p>
          <div className="demo-landing-actions">
            <Link className="demo-landing-primary" to="/requests/new"><Wrench size={18} /> Začít s opravou</Link>
            <a className="demo-landing-secondary" href="#jak-to-funguje">Jak to funguje? <ArrowDown size={17} /></a>
          </div>
        </div>
      </section>
      <section className="demo-landing-how" id="jak-to-funguje">
        <img src={workflowPhoto} alt="Tři kroky opravy: popište problém, vyberte dobrovolníka a domluvte opravu" />
      </section>
      <section className="demo-landing-cards">
        <article className="demo-landing-card">
          <img src={landingRadio} alt="Staré rádio připravené k opravě" />
          <div><h2><Wrench size={21} /> Potřebuji opravu</h2><p>Máte doma něco rozbitého? Popište svůj problém a dejte dobrovolníkům možnost vám pomoci.</p><Link to="/requests/new">Vytvořit požadavek <ArrowRight size={17} /></Link></div>
        </article>
        <article className="demo-landing-card">
          <img src={volunteerPhoto} alt="Dobrovolník opravuje elektroniku" />
          <div><h2><Users size={21} /> Chci pomáhat</h2><p>Baví vás opravování? Zapojte se jako dobrovolník a pomozte dát rozbitým věcem druhou šanci.</p><Link to="/login">Jak se stát dobrovolníkem <ArrowRight size={17} /></Link></div>
        </article>
      </section>
      <section className="demo-landing-bottom" id="o-nas"><img src={bottomBanner} alt="Ne všechno rozbité patří do koše. Opravování šetří materiály a spojuje lidi." /></section>
    </div>
  );
}
