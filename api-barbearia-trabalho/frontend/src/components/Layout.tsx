import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('barbeiro');
    navigate('/login');
  };

  const barbeiro = localStorage.getItem('barbeiro');
  const barbeiroData = barbeiro ? JSON.parse(barbeiro) : null;

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>💈 Barbearia</h1>
        </div>
        <div className="navbar-links">
          <Link to="/admin/dashboard" className={isActive('/admin/dashboard') ? 'active' : ''}>
            Dashboard
          </Link>
          <Link to="/admin/clientes" className={isActive('/admin/clientes') ? 'active' : ''}>
            Clientes
          </Link>
          <Link to="/admin/barbeiros" className={isActive('/admin/barbeiros') ? 'active' : ''}>
            Barbeiros
          </Link>
          <Link to="/admin/servicos" className={isActive('/admin/servicos') ? 'active' : ''}>
            Serviços
          </Link>
          <Link to="/admin/agendamentos" className={isActive('/admin/agendamentos') ? 'active' : ''}>
            Agendamentos
          </Link>
          <Link to="/admin/avaliacoes" className={isActive('/admin/avaliacoes') ? 'active' : ''}>
            Avaliações
          </Link>
        </div>
        {barbeiroData && (
          <div className="navbar-user">
            <span className="navbar-user-name">{barbeiroData.nome}</span>
            <Button onClick={handleLogout} variant="secondary" className="btn-sm">
              Sair
            </Button>
          </div>
        )}
      </nav>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

