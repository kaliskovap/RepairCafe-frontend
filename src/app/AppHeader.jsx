import { NavLink, Link } from 'react-router-dom';
import { Menu, Wrench, CalendarDays, Users, LogIn, UserRound, ClipboardList } from 'lucide-react';
import { useAuth } from '../auth/AuthContext.jsx';
import logo from '../assets/repair-cafe-logo.png';

export default function AppHeader() {
  const { session } = useAuth();
  const role = String(session?.user?.role || '').toLowerCase();
  const isAdmin = role.includes('admin') || role.includes('administr');
  const isVolunteer = role.includes('volunteer') || role.includes('dobrovol');
  return <header className="topnav">
    <Link className="logo-home" to="/" aria-label="Repair Café – úvod"><img className="logo" src={logo} alt="Repair Café" /></Link>
    <nav className="mainnav" aria-label="Hlavní navigace">
      <NavLink to="/requests" className={({isActive})=>isActive?'active':''}><Wrench/> Dostupné opravy</NavLink>
      {session && <NavLink to="/requests/new" className={({isActive})=>isActive?'active':''}><ClipboardList/> Vytvořit požadavek</NavLink>}
      {session && isVolunteer && <NavLink to="/my-repairs" className={({isActive})=>isActive?'active':''}><CalendarDays/> Moje opravy</NavLink>}
      {session && isAdmin && <NavLink to="/admin/users" className={({isActive})=>isActive?'active':''}><Users/> Uživatelé</NavLink>}
    </nav>
    <div className="top-actions">
      {session ? <div className="user-menu"><span className="user-avatar"><UserRound size={16}/></span><span className="shell-user-name">{session.user?.name || session.user?.email || 'Přihlášený uživatel'}</span></div> : <Link className="shell-login" to="/login"><LogIn size={16}/> Přihlásit se</Link>}
    </div>
  </header>;
}
