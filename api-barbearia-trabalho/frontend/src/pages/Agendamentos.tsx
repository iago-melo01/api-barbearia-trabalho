import { useState, useEffect } from 'react';
import { agendamentoService } from '../services/agendamentoService';
import { clienteService } from '../services/clienteService';
import { barbeiroService } from '../services/barbeiroService';
import { servicoService } from '../services/servicoService';
import type { Agendamento, CreateAgendamentoData, UpdateAgendamentoData, Cliente, Barbeiro, Servico } from '../types';
import { Status } from '../types';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/Table';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { FormInput } from '../components/FormInput';
import './CrudPage.css';

export const Agendamentos = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState<Agendamento | null>(null);
  const [formData, setFormData] = useState<CreateAgendamentoData>({
    clienteId: 0,
    barbeiroId: 0,
    servicoId: 0,
    data: '',
  });
  const [status, setStatus] = useState<Status>(Status.AGENDADO);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [agendamentosData, clientesData, barbeirosData, servicosData] = await Promise.all([
        agendamentoService.getAll(),
        clienteService.getAll(),
        barbeiroService.getAll(),
        servicoService.getAll(),
      ]);
      setAgendamentos(agendamentosData);
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
    setSelectedAgendamento(null);
    setFormData({ clienteId: 0, barbeiroId: 0, servicoId: 0, data: '' });
    setStatus(Status.AGENDADO);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (agendamento: Agendamento) => {
    setIsEditMode(true);
    setSelectedAgendamento(agendamento);
    setFormData({
      clienteId: agendamento.clienteId,
      barbeiroId: agendamento.barbeiroId,
      servicoId: agendamento.servicoId,
      data: new Date(agendamento.data).toISOString().slice(0, 16),
    });
    setStatus(agendamento.status);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isEditMode && selectedAgendamento) {
        const updateData: UpdateAgendamentoData = {
          ...formData,
          status,
        };
        await agendamentoService.update(selectedAgendamento.id, updateData);
      } else {
        await agendamentoService.create(formData);
      }
      setIsModalOpen(false);
      loadData();
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar agendamento');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este agendamento?')) return;

    try {
      await agendamentoService.delete(id);
      loadData();
    } catch (err: any) {
      setError(err.message || 'Erro ao excluir agendamento');
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case Status.AGENDADO:
        return '#17a2b8';
      case Status.CONCLUIDO:
        return '#28a745';
      case Status.CANCELADO:
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  if (loading) {
    return <div className="page-loading">Carregando...</div>;
  }

  return (
    <div className="crud-page">
      <div className="page-header">
        <h1>Agendamentos</h1>
        <Button onClick={handleOpenCreate} variant="primary">
          + Novo Agendamento
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
            <TableCell header>Data</TableCell>
            <TableCell header>Status</TableCell>
            <TableCell header>Ações</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agendamentos.map((agendamento) => {
            const cliente = clientes.find((c) => c.id === agendamento.clienteId);
            const barbeiro = barbeiros.find((b) => b.id === agendamento.barbeiroId);
            const servico = servicos.find((s) => s.id === agendamento.servicoId);
            return (
              <TableRow key={agendamento.id}>
                <TableCell>{agendamento.id}</TableCell>
                <TableCell>{cliente?.nome || `ID: ${agendamento.clienteId}`}</TableCell>
                <TableCell>{barbeiro?.nome || `ID: ${agendamento.barbeiroId}`}</TableCell>
                <TableCell>{servico?.nome || `ID: ${agendamento.servicoId}`}</TableCell>
                <TableCell>{new Date(agendamento.data).toLocaleString('pt-BR')}</TableCell>
                <TableCell>
                  <span
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      backgroundColor: getStatusColor(agendamento.status),
                      color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    }}
                  >
                    {agendamento.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="action-buttons">
                    <Button onClick={() => handleOpenEdit(agendamento)} variant="secondary" className="btn-sm">
                      Editar
                    </Button>
                    <Button onClick={() => handleDelete(agendamento.id)} variant="danger" className="btn-sm">
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
        onClose={() => setIsModalOpen(false)}
        title={isEditMode ? 'Editar Agendamento' : 'Novo Agendamento'}
        footer={
          <>
            <Button onClick={() => setIsModalOpen(false)} variant="secondary">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} variant="primary" type="submit">
              {isEditMode ? 'Atualizar' : 'Criar'}
            </Button>
          </>
        }
      >
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
            options={servicos.map((s) => ({ value: s.id, label: `${s.nome} - R$ ${s.preco.toFixed(2)}` }))}
            required
          />
          <FormInput
            label="Data e Hora"
            name="data"
            type="datetime-local"
            value={formData.data}
            onChange={(e) => setFormData({ ...formData, data: e.target.value })}
            required
          />
          {isEditMode && (
            <FormInput
              label="Status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              select
              options={[
                { value: Status.AGENDADO, label: 'Agendado' },
                { value: Status.CONCLUIDO, label: 'Concluído' },
                { value: Status.CANCELADO, label: 'Cancelado' },
              ]}
              required
            />
          )}
        </form>
      </Modal>
    </div>
  );
};

