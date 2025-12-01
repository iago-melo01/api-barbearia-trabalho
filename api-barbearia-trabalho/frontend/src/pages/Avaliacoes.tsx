import { useState, useEffect } from 'react';
import { avaliacaoService } from '../services/avaliacaoService';
import { clienteService } from '../services/clienteService';
import { barbeiroService } from '../services/barbeiroService';
import { servicoService } from '../services/servicoService';
import type { Avaliacao, CreateAvaliacaoData, UpdateAvaliacaoData, Cliente, Barbeiro, Servico } from '../types';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/Table';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { FormInput } from '../components/FormInput';
import './CrudPage.css';

export const Avaliacoes = () => {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAvaliacao, setSelectedAvaliacao] = useState<Avaliacao | null>(null);
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
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [avaliacoesData, clientesData, barbeirosData, servicosData] = await Promise.all([
        avaliacaoService.getAll(),
        clienteService.getAll(),
        barbeiroService.getAll(),
        servicoService.getAll(),
      ]);
      setAvaliacoes(avaliacoesData);
      setClientes(clientesData);
      setBarbeiros(barbeirosData);
      setServicos(servicosData);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setIsEditMode(false);
    setSelectedAvaliacao(null);
    setFormData({ clienteId: 0, barbeiroId: 0, servicoId: 0, nota: 5, comentario: '' });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (avaliacao: Avaliacao) => {
    setIsEditMode(true);
    setSelectedAvaliacao(avaliacao);
    setFormData({
      clienteId: avaliacao.clienteId,
      barbeiroId: avaliacao.barbeiroId,
      servicoId: avaliacao.servicoId,
      nota: avaliacao.nota,
      comentario: avaliacao.comentario,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFormError(null);

    try {
      if (isEditMode && selectedAvaliacao) {
        await avaliacaoService.update(selectedAvaliacao.id, formData);
      } else {
        await avaliacaoService.create(formData);
      }
      closeModal();
      loadData();
    } catch (err: any) {
      setFormError(err.message || 'Dados inválidos. Verifique as informações e tente novamente.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta avaliação?')) return;

    try {
      await avaliacaoService.delete(id);
      loadData();
    } catch (err: any) {
      setError(err.message || 'Erro ao excluir avaliação');
    }
  };

  const renderStars = (nota: number) => {
    return '⭐'.repeat(nota) + '☆'.repeat(5 - nota);
  };

  if (loading) {
    return <div className="page-loading">Carregando...</div>;
  }

  return (
    <div className="crud-page">
      <div className="page-header">
        <h1>Avaliações</h1>
        <Button onClick={handleOpenCreate} variant="primary">
          + Nova Avaliação
        </Button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell header>ID</TableCell>
            <TableCell header>Cliente</TableCell>
            <TableCell header>Barbeiro</TableCell>
            <TableCell header>Serviço</TableCell>
            <TableCell header>Nota</TableCell>
            <TableCell header>Comentário</TableCell>
            <TableCell header>Ações</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {avaliacoes.map((avaliacao) => {
            const cliente = clientes.find((c) => c.id === avaliacao.clienteId);
            const barbeiro = barbeiros.find((b) => b.id === avaliacao.barbeiroId);
            const servico = servicos.find((s) => s.id === avaliacao.servicoId);
            return (
              <TableRow key={avaliacao.id}>
                <TableCell>{avaliacao.id}</TableCell>
                <TableCell>{cliente?.nome || `ID: ${avaliacao.clienteId}`}</TableCell>
                <TableCell>{barbeiro?.nome || `ID: ${avaliacao.barbeiroId}`}</TableCell>
                <TableCell>{servico?.nome || `ID: ${avaliacao.servicoId}`}</TableCell>
                <TableCell>{renderStars(avaliacao.nota)}</TableCell>
                <TableCell>{avaliacao.comentario}</TableCell>
                <TableCell>
                  <div className="action-buttons">
                    <Button onClick={() => handleOpenEdit(avaliacao)} variant="secondary" className="btn-sm">
                      Editar
                    </Button>
                    <Button onClick={() => handleDelete(avaliacao.id)} variant="danger" className="btn-sm">
                      Excluir
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEditMode ? 'Editar Avaliação' : 'Nova Avaliação'}
        footer={
          <>
            <Button onClick={closeModal} variant="secondary">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} variant="primary" type="submit">
              {isEditMode ? 'Atualizar' : 'Criar'}
            </Button>
          </>
        }
      >
        <>
          {formError && <div className="form-error-banner">{formError}</div>}
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Cliente"
              name="clienteId"
              value={formData.clienteId}
              onChange={(e) => setFormData({ ...formData, clienteId: parseInt(e.target.value) })}
              select
              options={clientes.map((c) => ({ value: c.id, label: c.nome }))}
              required
            />
            <FormInput
              label="Barbeiro"
              name="barbeiroId"
              value={formData.barbeiroId}
              onChange={(e) => setFormData({ ...formData, barbeiroId: parseInt(e.target.value) })}
              select
              options={barbeiros.map((b) => ({ value: b.id, label: b.nome }))}
              required
            />
            <FormInput
              label="Serviço"
              name="servicoId"
              value={formData.servicoId}
              onChange={(e) => setFormData({ ...formData, servicoId: parseInt(e.target.value) })}
              select
              options={servicos.map((s) => ({ value: s.id, label: s.nome }))}
              required
            />
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
            />
          </form>
        </>
      </Modal>
    </div>
  );
};

