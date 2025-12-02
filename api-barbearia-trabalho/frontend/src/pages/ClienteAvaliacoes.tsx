import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { avaliacaoService } from '../services/avaliacaoService';
import { agendamentoService } from '../services/agendamentoService';
import { barbeiroService } from '../services/barbeiroService';
import type { Avaliacao, CreateAvaliacaoData, Agendamento, Cliente, Barbeiro } from '../types';
import { Status } from '../types';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { FormInput } from '../components/FormInput';
import './ClienteAvaliacoes.css';

type ViewMode = 'minhas' | 'todas' | 'barbeiros';

export const ClienteAvaliacoes = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [todasAvaliacoes, setTodasAvaliacoes] = useState<Avaliacao[]>([]);
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('minhas');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState<Agendamento | null>(null);
  const [formData, setFormData] = useState<CreateAvaliacaoData>({
    clienteId: 0,
    barbeiroId: 0,
    servicoId: 0,
    nota: 5,
    comentario: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const clienteStorage = localStorage.getItem('cliente');
    if (clienteStorage) {
      try {
        const clienteData = JSON.parse(clienteStorage);
        setCliente(clienteData);
        setFormData((prev) => ({ ...prev, clienteId: clienteData.id }));
        loadData(clienteData.id);
      } catch (err) {
        console.error('Erro ao ler dados do cliente do localStorage:', err);
      }
    }
    setCheckingAuth(false);
  }, []);

  const loadData = async (clienteId: number) => {
    try {
      setLoading(true);
      const [agendamentosData, avaliacoesData, barbeirosData] = await Promise.all([
        agendamentoService.getByClienteId(clienteId),
        avaliacaoService.getAll(),
        barbeiroService.getAll(),
      ]);
      
      // Filtrar apenas agendamentos concluídos
      const agendamentosConcluidos = agendamentosData.filter(
        (a) => a.status === Status.CONCLUIDO
      );
      
      setAgendamentos(agendamentosConcluidos);
      
      // Filtrar avaliações do cliente
      const avaliacoesCliente = avaliacoesData.filter((a) => a.clienteId === clienteId);
      setAvaliacoes(avaliacoesCliente);
      
      // Armazenar todas as avaliações
      setTodasAvaliacoes(avaliacoesData);
      
      // Armazenar barbeiros
      setBarbeiros(barbeirosData);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = (agendamento: Agendamento) => {
    if (!cliente) {
      setFormError('Você precisa estar autenticado para avaliar.');
      return;
    }

    // Verificar se já existe avaliação para este agendamento
    const jaAvaliado = avaliacoes.some(
      (a) =>
        a.barbeiroId === agendamento.barbeiroId &&
        a.servicoId === agendamento.servicoId &&
        a.clienteId === cliente.id
    );

    if (jaAvaliado) {
      setFormError('Você já avaliou este serviço.');
      return;
    }

    setSelectedAgendamento(agendamento);
    setFormData({
      clienteId: cliente.id,
      barbeiroId: agendamento.barbeiroId,
      servicoId: agendamento.servicoId,
      nota: 5,
      comentario: '',
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormError(null);
    setSelectedAgendamento(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!cliente) {
      setFormError('Você precisa estar autenticado para avaliar.');
      return;
    }

    if (!formData.barbeiroId || !formData.servicoId) {
      setFormError('Por favor, preencha todos os campos.');
      return;
    }

    // Verificar se já existe avaliação
    const jaAvaliado = avaliacoes.some(
      (a) =>
        a.barbeiroId === formData.barbeiroId &&
        a.servicoId === formData.servicoId &&
        a.clienteId === cliente.id
    );

    if (jaAvaliado) {
      setFormError('Você já avaliou este serviço.');
      return;
    }

    try {
      await avaliacaoService.create({
        ...formData,
        clienteId: cliente.id,
      });
      closeModal();
      if (cliente) {
        loadData(cliente.id);
      }
    } catch (err: any) {
      setFormError(err.message || 'Erro ao criar avaliação. Tente novamente.');
    }
  };

  const renderStars = (nota: number) => {
    return '⭐'.repeat(nota) + '☆'.repeat(5 - nota);
  };

  // Verificar se um agendamento já foi avaliado
  const isAvaliado = (agendamento: Agendamento) => {
    if (!cliente) return false;
    return avaliacoes.some(
      (a) =>
        a.barbeiroId === agendamento.barbeiroId &&
        a.servicoId === agendamento.servicoId &&
        a.clienteId === cliente.id
    );
  };

  // Obter avaliação de um agendamento
  const getAvaliacao = (agendamento: Agendamento) => {
    if (!cliente) return null;
    return avaliacoes.find(
      (a) =>
        a.barbeiroId === agendamento.barbeiroId &&
        a.servicoId === agendamento.servicoId &&
        a.clienteId === cliente.id
    );
  };

  // Aguarda verificação de autenticação
  if (checkingAuth) {
    return (
      <div className="cliente-avaliacoes-container">
        <div className="cliente-avaliacoes-loading">Verificando autenticação...</div>
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para login
  if (!cliente) {
    return <Navigate to="/cliente/login" replace />;
  }

  if (loading) {
    return (
      <div className="cliente-avaliacoes-container">
        <div className="cliente-avaliacoes-loading">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="cliente-avaliacoes-container">
      <div className="cliente-avaliacoes-header">
        <div className="cliente-avaliacoes-header-left">
          <Link to="/" className="cliente-avaliacoes-back-btn">
            ← Voltar para Home
          </Link>
          <h1 className="cliente-avaliacoes-title">Avaliações</h1>
        </div>
        <div className="cliente-avaliacoes-view-toggle">
          <button
            className={`cliente-avaliacoes-toggle-btn ${viewMode === 'minhas' ? 'active' : ''}`}
            onClick={() => setViewMode('minhas')}
          >
            Minhas Avaliações
          </button>
          <button
            className={`cliente-avaliacoes-toggle-btn ${viewMode === 'todas' ? 'active' : ''}`}
            onClick={() => setViewMode('todas')}
          >
            Todas as Avaliações
          </button>
          <button
            className={`cliente-avaliacoes-toggle-btn ${viewMode === 'barbeiros' ? 'active' : ''}`}
            onClick={() => setViewMode('barbeiros')}
          >
            Avaliação dos Barbeiros
          </button>
        </div>
      </div>

      {error && <div className="cliente-avaliacoes-error">{error}</div>}

      {viewMode === 'barbeiros' ? (
        <>
          {barbeiros.length === 0 ? (
            <div className="cliente-avaliacoes-empty-state">
              <p>Nenhum barbeiro encontrado.</p>
            </div>
          ) : (
            <div className="cliente-avaliacoes-list">
              {[...barbeiros]
                .sort((a, b) => (b.mediaNotas || 0) - (a.mediaNotas || 0))
                .map((barbeiro) => {
                  const avaliacoesBarbeiro = todasAvaliacoes.filter(
                    (a) => a.barbeiroId === barbeiro.id
                  );
                  const quantidadeAvaliacoes = avaliacoesBarbeiro.length;
                  const mediaNotas = barbeiro.mediaNotas || 0;

                  return (
                  <div key={barbeiro.id} className="cliente-avaliacoes-card cliente-avaliacoes-barbeiro-card">
                    <div className="cliente-avaliacoes-card-header">
                      <div>
                        <h3 className="cliente-avaliacoes-card-title">{barbeiro.nome}</h3>
                        {barbeiro.telefone && (
                          <p className="cliente-avaliacoes-card-subtitle">
                            Telefone: {barbeiro.telefone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="cliente-avaliacoes-barbeiro-rating-section">
                      <div className="cliente-avaliacoes-barbeiro-rating-main">
                        <div className="cliente-avaliacoes-barbeiro-rating-value">
                          {mediaNotas > 0 ? mediaNotas.toFixed(1) : 'N/A'}
                        </div>
                        <div className="cliente-avaliacoes-card-stars">
                          {mediaNotas > 0 ? renderStars(Math.round(mediaNotas)) : 'Sem avaliações'}
                        </div>
                      </div>
                      <p className="cliente-avaliacoes-barbeiro-rating-count">
                        {quantidadeAvaliacoes === 0
                          ? 'Nenhuma avaliação ainda'
                          : quantidadeAvaliacoes === 1
                          ? '1 avaliação'
                          : `${quantidadeAvaliacoes} avaliações`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : viewMode === 'minhas' ? (
        <>
          {agendamentos.length === 0 ? (
            <div className="cliente-avaliacoes-empty-state">
              <p>Você ainda não possui serviços concluídos para avaliar.</p>
            </div>
          ) : (
            <div className="cliente-avaliacoes-list">
              {agendamentos.map((agendamento) => {
                const avaliado = isAvaliado(agendamento);
                const avaliacao = avaliado ? getAvaliacao(agendamento) : null;
                const servico = agendamento.servico;
                const barbeiro = agendamento.barbeiro;

                return (
                  <div key={agendamento.id} className="cliente-avaliacoes-card">
                    <div className="cliente-avaliacoes-card-header">
                      <div>
                        <h3 className="cliente-avaliacoes-card-title">
                          {typeof servico === 'object' && servico ? servico.nome : 'Serviço'}
                        </h3>
                        <p className="cliente-avaliacoes-card-subtitle">
                          Barbeiro: {typeof barbeiro === 'object' && barbeiro ? barbeiro.nome : 'N/A'}
                        </p>
                        <p className="cliente-avaliacoes-card-date">
                          Realizado em: {new Date(agendamento.data).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>

                    {avaliado && avaliacao ? (
                      <div className="cliente-avaliacoes-avaliacao-existente">
                        <div className="cliente-avaliacoes-avaliacao-header">
                          <span className="cliente-avaliacoes-avaliacao-label">Sua Avaliação:</span>
                          <div className="cliente-avaliacoes-card-stars">
                            {renderStars(avaliacao.nota)}
                          </div>
                        </div>
                        <p className="cliente-avaliacoes-card-comment">{avaliacao.comentario}</p>
                        <p className="cliente-avaliacoes-avaliacao-date">
                          Avaliado em: {new Date(avaliacao.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    ) : (
                      <div className="cliente-avaliacoes-card-actions">
                        <Button
                          onClick={() => handleOpenCreate(agendamento)}
                          variant="primary"
                        >
                          Avaliar Serviço
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <>
          {todasAvaliacoes.length === 0 ? (
            <div className="cliente-avaliacoes-empty-state">
              <p>Nenhuma avaliação encontrada.</p>
            </div>
          ) : (
            <div className="cliente-avaliacoes-list">
              {todasAvaliacoes.map((avaliacao) => {
                const clienteAvaliacao = avaliacao.cliente;
                const barbeiroAvaliacao = avaliacao.barbeiro;
                const servicoAvaliacao = avaliacao.servico;

                return (
                  <div key={avaliacao.id} className="cliente-avaliacoes-card">
                    <div className="cliente-avaliacoes-card-header">
                      <div>
                        <h3 className="cliente-avaliacoes-card-title">
                          {typeof servicoAvaliacao === 'object' && servicoAvaliacao
                            ? servicoAvaliacao.nome
                            : 'Serviço'}
                        </h3>
                        <p className="cliente-avaliacoes-card-subtitle">
                          Barbeiro: {typeof barbeiroAvaliacao === 'object' && barbeiroAvaliacao
                            ? barbeiroAvaliacao.nome
                            : 'N/A'}
                        </p>
                        <p className="cliente-avaliacoes-card-subtitle">
                          Cliente: {typeof clienteAvaliacao === 'object' && clienteAvaliacao
                            ? clienteAvaliacao.nome
                            : 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className="cliente-avaliacoes-avaliacao-existente">
                      <div className="cliente-avaliacoes-avaliacao-header">
                        <span className="cliente-avaliacoes-avaliacao-label">Avaliação:</span>
                        <div className="cliente-avaliacoes-card-stars">
                          {renderStars(avaliacao.nota)}
                        </div>
                      </div>
                      <p className="cliente-avaliacoes-card-comment">{avaliacao.comentario}</p>
                      <p className="cliente-avaliacoes-avaliacao-date">
                        Avaliado em: {new Date(avaliacao.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Avaliar Serviço"
        footer={
          <>
            <Button onClick={closeModal} variant="secondary">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} variant="primary" type="submit">
              Avaliar
            </Button>
          </>
        }
      >
        <>
          {formError && <div className="form-error-banner">{formError}</div>}
          {selectedAgendamento && (
            <div className="cliente-avaliacoes-modal-info">
              <p>
                <strong>Serviço:</strong>{' '}
                {typeof selectedAgendamento.servico === 'object' && selectedAgendamento.servico
                  ? selectedAgendamento.servico.nome
                  : 'N/A'}
              </p>
              <p>
                <strong>Barbeiro:</strong>{' '}
                {typeof selectedAgendamento.barbeiro === 'object' && selectedAgendamento.barbeiro
                  ? selectedAgendamento.barbeiro.nome
                  : 'N/A'}
              </p>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Nota (1-5)"
              name="nota"
              type="number"
              value={formData.nota}
              onChange={(e) => setFormData({ ...formData, nota: parseInt(e.target.value) })}
              min={1}
              max={5}
              required
            />
            <FormInput
              label="Comentário"
              name="comentario"
              value={formData.comentario}
              onChange={(e) => setFormData({ ...formData, comentario: e.target.value })}
              textarea
              required
              placeholder="Compartilhe sua experiência com este serviço..."
            />
          </form>
        </>
      </Modal>
    </div>
  );
};
