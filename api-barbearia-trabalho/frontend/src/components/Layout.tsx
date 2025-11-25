import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>💈 Barbearia</h1>
        </div>
        <div className="navbar-links">
          <Link to="/" className={isActive('/') ? 'active' : ''}>
            Dashboard
          </Link>
          <Link to="/clientes" className={isActive('/clientes') ? 'active' : ''}>
            Clientes
          </Link>
          <Link to="/barbeiros" className={isActive('/barbeiros') ? 'active' : ''}>
            Barbeiros
          </Link>
          <Link to="/servicos" className={isActive('/servicos') ? 'active' : ''}>
            Serviços
          </Link>
          <Link to="/agendamentos" className={isActive('/agendamentos') ? 'active' : ''}>
            Agendamentos
          </Link>
          <Link to="/avaliacoes" className={isActive('/avaliacoes') ? 'active' : ''}>
            Avaliações
          </Link>
        </div>
      </nav>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

