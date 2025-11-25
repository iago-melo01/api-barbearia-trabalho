import { useEffect, useState } from 'react';
import { clienteService } from '../services/clienteService';
import { barbeiroService } from '../services/barbeiroService';
import { servicoService } from '../services/servicoService';
import { agendamentoService } from '../services/agendamentoService';
import { avaliacaoService } from '../services/avaliacaoService';
import './Dashboard.css';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    clientes: 0,
    barbeiros: 0,
    servicos: 0,
    agendamentos: 0,
    avaliacoes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Dashboard: Carregando estatísticas...');
    const loadStats = async () => {
      try {
        const [clientes, barbeiros, servicos, agendamentos, avaliacoes] = await Promise.all([
          clienteService.getAll().catch((err) => {
            console.error('Erro ao carregar clientes:', err);
            return [];
          }),
          barbeiroService.getAll().catch((err) => {
            console.error('Erro ao carregar barbeiros:', err);
            return [];
          }),
          servicoService.getAll().catch((err) => {
            console.error('Erro ao carregar serviços:', err);
            return [];
          }),
          agendamentoService.getAll().catch((err) => {
            console.error('Erro ao carregar agendamentos:', err);
            return [];
          }),
          avaliacaoService.getAll().catch((err) => {
            console.error('Erro ao carregar avaliações:', err);
            return [];
          }),
        ]);

        setStats({
          clientes: Array.isArray(clientes) ? clientes.length : 0,
          barbeiros: Array.isArray(barbeiros) ? barbeiros.length : 0,
          servicos: Array.isArray(servicos) ? servicos.length : 0,
          agendamentos: Array.isArray(agendamentos) ? agendamentos.length : 0,
          avaliacoes: Array.isArray(avaliacoes) ? avaliacoes.length : 0,
        });
        console.log('Dashboard: Estatísticas carregadas com sucesso');
      } catch (error: any) {
        console.error('Erro ao carregar estatísticas:', error);
        setError(error?.message || 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Carregando...</div>;
  }

  if (error) {
    return (
      <div className="dashboard">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="error-message">
          <p>Erro ao carregar dados: {error}</p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Certifique-se de que a API está rodando em http://localhost:3000
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.clientes}</h3>
            <p>Clientes</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✂️</div>
          <div className="stat-info">
            <h3>{stats.barbeiros}</h3>
            <p>Barbeiros</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💇</div>
          <div className="stat-info">
            <h3>{stats.servicos}</h3>
            <p>Serviços</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>{stats.agendamentos}</h3>
            <p>Agendamentos</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h3>{stats.avaliacoes}</h3>
            <p>Avaliações</p>
          </div>
        </div>
      </div>
    </div>
  );
};

