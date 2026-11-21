import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { ArrowLeft, Coffee, ShieldCheck } from 'lucide-react';
import { useAuth } from '../auth/AuthContext.jsx';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

export default function LoginPage() {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { signIn, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleGoogleSuccess(response) {
    if (!response.credential) {
      setError('Google neposkytl přihlašovací token. Zkuste to znovu.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const result = await fetch(`${API_URL}/auth/google`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential }),
      });
      const data = await result.json().catch(() => ({}));
      if (!result.ok || !data.token || !data.user) {
        throw new Error(data.message || 'Přihlášení se nepodařilo.');
      }
      signIn(data);
      navigate(location.state?.from || '/', { replace: true });
    } catch (err) {
      setError(err.message || 'Nepodařilo se spojit se serverem.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="login-page">
      <Link className="back-link" to="/">
        <ArrowLeft size={17} /> Zpět na úvodní stránku
      </Link>
      <section className="login-card">
        <div className="brand-mark">
          <Coffee size={22} />
        </div>
        <span className="eyebrow">REPAIR CAFÉ</span>
        <h1>{session ? 'Jste přihlášeni' : 'Přihlášení'}</h1>
        {session ? (
          <>
            <p>
              Jste přihlášeni jako <strong>{session.user?.name || session.user?.email}</strong>.
            </p>
            <button className="button button-role" onClick={() => navigate('/')}>
              Pokračovat do aplikace
            </button>
          </>
        ) : (
          <>
            <p>
              Přihlaste se pomocí svého Google účtu. Účet v Repair Café se při prvním přihlášení
              vytvoří automaticky.
            </p>
            <div className="google-login-wrap">
              {busy ? (
                <span className="muted">Přihlašování…</span>
              ) : (
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError('Google přihlášení se nezdařilo.')}
                  text="continue_with"
                  shape="rectangular"
                  width="100%"
                />
              )}
            </div>
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <div className="login-security">
              <ShieldCheck size={18} />
              <span>
                Heslo Google účtu aplikaci Repair Café nesdělujete. Ověření probíhá přes Google.
              </span>
            </div>
            <p className="login-note">
              Přihlášení přes Microsoft a Apple bude doplněno v další iteraci.
            </p>
          </>
        )}
      </section>
    </main>
  );
}
