import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { servicoService } from '../services/servicoService';
import type { Servico } from '../types';
import './Home.css';

export const Home = () => {
  const navigate = useNavigate();
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const storedCliente = typeof window !== 'undefined' ? localStorage.getItem('cliente') : null;
  const cliente = storedCliente ? JSON.parse(storedCliente) : null;

  useEffect(() => {
    loadServicos();
  }, []);

  const loadServicos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await servicoService.getAll();
      setServicos(data);
    } catch (err: any) {
      console.error('Erro ao carregar serviços:', err);
      setError('Não foi possível carregar os serviços. Tente novamente mais tarde.');
      // Continua mostrando a página mesmo com erro
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('cliente');
    navigate('/cliente/login');
  };

  return (
    <div className="home">
      {/* Header */}
      <header className="home-header">
        <div className="home-header-container">
          <div className="home-logo">
            <span className="home-logo-icon">✂️</span>
            <span className="home-logo-text">Barbearia</span>
          </div>
          <nav className="home-nav">
            <a 
              href="#inicio" 
              className="home-nav-link"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Início
            </a>
            <a 
              href="#servicos" 
              className="home-nav-link"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Serviços
            </a>
            <a 
              href="#agendar" 
              className="home-nav-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/agendar');
              }}
            >
              Agendar
            </a>
            <a 
              href="#sobre" 
              className="home-nav-link"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Sobre
            </a>
          </nav>
          <div className="home-actions">
            <Link to="/login" className="home-barbeiro-btn">
              Área do Barbeiro
            </Link>
            <div className="home-user">
              {cliente && <span className="home-user-name">Olá, {cliente.nome.split(' ')[0]}</span>}
              <button onClick={handleLogout} className="home-logout-btn">
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="home-hero">
        <div className="home-hero-container">
          <h1 className="home-hero-title">Bem-vindo à Nossa Barbearia</h1>
          <p className="home-hero-subtitle">
            Estilo, tradição e qualidade em cada corte
          </p>
          <button 
            className="home-hero-cta"
            onClick={() => navigate('/agendar')}
          >
            Agendar Agora
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="home-services">
        <div className="home-services-container">
          <h2 className="home-services-title">Nossos Serviços</h2>
          {error && (
            <div className="home-services-error">
              {error}
            </div>
          )}
          {loading && !error ? (
            <div className="home-services-loading">Carregando serviços...</div>
          ) : servicos.length === 0 && !error ? (
            <div className="home-services-empty">
              Nenhum serviço disponível no momento.
            </div>
          ) : servicos.length > 0 ? (
            <div className="home-services-grid">
              {servicos.map((servico) => (
                <div key={servico.id} className="home-service-card">
                  <div className="home-service-image">
                    <div className="home-service-image-placeholder">
                      {servico.nome.charAt(0)}
                    </div>
                  </div>
                  <div className="home-service-content">
                    <h3 className="home-service-name">{servico.nome}</h3>
                    <p className="home-service-description">{servico.descricao}</p>
                    <div className="home-service-footer">
                      <span className="home-service-price">
                        R$ {servico.preco.toFixed(2)}
                      </span>
                      <button 
                        className="home-service-btn"
                        onClick={() => navigate('/agendar')}
                      >
                        Agendar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="home-about">
        <div className="home-about-container">
          <h2 className="home-about-title">Sobre Nós</h2>
          <p className="home-about-text">
            Somos uma barbearia moderna que combina tradição e inovação. 
            Nossa equipe de profissionais qualificados está pronta para 
            oferecer o melhor serviço e garantir sua satisfação.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-footer-container">
          <p>&copy; 2024 Barbearia. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

