import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { servicoService } from '../services/servicoService';
import { barbeiroService } from '../services/barbeiroService';
import { agendamentoService } from '../services/agendamentoService';
import type { Servico, Barbeiro, CreateAgendamentoData, Cliente } from '../types';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';
import './Agendar.css';

export const Agendar = () => {
  const navigate = useNavigate();
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [formData, setFormData] = useState<CreateAgendamentoData>({
    clienteId: 0,
    barbeiroId: 0,
    servicoId: 0,
    data: '',
  });

  useEffect(() => {
    // Verifica se o cliente está autenticado
    const clienteStorage = localStorage.getItem('cliente');
    if (clienteStorage) {
      try {
        const clienteData = JSON.parse(clienteStorage);
        setCliente(clienteData);
        setFormData((prev) => ({ ...prev, clienteId: clienteData.id }));
      } catch (err) {
        console.error('Erro ao ler dados do cliente do localStorage:', err);
      }
    }
    setCheckingAuth(false);
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [servicosData, barbeirosData] = await Promise.all([
        servicoService.getAll(),
        barbeiroService.getAll(),
      ]);
      setServicos(servicosData);
      setBarbeiros(barbeirosData);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (!cliente) {
        setError('Você precisa estar autenticado para fazer um agendamento.');
        setSubmitting(false);
        navigate('/cliente/login');
        return;
      }

      if (!formData.barbeiroId || !formData.servicoId || !formData.data) {
        setError('Por favor, preencha todos os campos obrigatórios');
        setSubmitting(false);
        return;
      }

      // Criar agendamento usando o cliente do localStorage
      const agendamentoData: CreateAgendamentoData = {
        clienteId: cliente.id,
        barbeiroId: Number(formData.barbeiroId),
        servicoId: Number(formData.servicoId),
        data: new Date(formData.data).toISOString(),
      };

      await agendamentoService.create(agendamentoData);
      alert('Agendamento realizado com sucesso!');
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Erro ao realizar agendamento');
    } finally {
      setSubmitting(false);
    }
  };

  // Aguarda verificação de autenticação
  if (checkingAuth) {
    return (
      <div className="agendar-container">
        <div className="agendar-loading">Verificando autenticação...</div>
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para login
  if (!cliente) {
    return <Navigate to="/cliente/login" replace />;
  }

  if (loading) {
    return (
      <div className="agendar-container">
        <div className="agendar-loading">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="agendar-container">
      <div className="agendar-content">
        <h1 className="agendar-title">Agendar Serviço</h1>
        <p className="agendar-subtitle">
          Preencha os dados abaixo para agendar seu horário
        </p>

        {error && <div className="agendar-error">{error}</div>}

        <div className="agendar-info">
          <p className="agendar-info-text">
            Agendando como: <strong>{cliente.nome}</strong> ({cliente.email})
          </p>
        </div>

        <form className="agendar-form" onSubmit={handleSubmit}>
          <div className="agendar-form-section">
            <h2 className="agendar-section-title">Detalhes do Agendamento</h2>
            <FormInput
              label="Serviço"
              name="servicoId"
              select
              value={formData.servicoId}
              onChange={handleChange}
              options={servicos.map((s) => ({ value: s.id, label: `${s.nome} - R$ ${s.preco.toFixed(2)}` }))}
              required
            />
            <FormInput
              label="Barbeiro"
              name="barbeiroId"
              select
              value={formData.barbeiroId}
              onChange={handleChange}
              options={barbeiros.map((b) => ({ value: b.id, label: b.nome }))}
              required
            />
            <FormInput
              label="Data e Hora"
              name="data"
              type="datetime-local"
              value={formData.data}
              onChange={handleChange}
              required
            />
          </div>

          <div className="agendar-form-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/')}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={submitting}
            >
              {submitting ? 'Agendando...' : 'Confirmar Agendamento'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

