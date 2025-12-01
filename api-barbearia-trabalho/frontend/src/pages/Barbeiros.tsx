import { useState, useEffect } from 'react';
import { barbeiroService } from '../services/barbeiroService';
import type { Barbeiro, CreateBarbeiroData, UpdateBarbeiroData } from '../types';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/Table';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { FormInput } from '../components/FormInput';
import './CrudPage.css';

export const Barbeiros = () => {
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedBarbeiro, setSelectedBarbeiro] = useState<Barbeiro | null>(null);
  const [formData, setFormData] = useState<CreateBarbeiroData>({
    nome: '',
    email: '',
    telefone: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    loadBarbeiros();
  }, []);

  const loadBarbeiros = async () => {
    try {
      setLoading(true);
      const data = await barbeiroService.getAll();
      setBarbeiros(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar barbeiros');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setIsEditMode(false);
    setSelectedBarbeiro(null);
    setFormData({ nome: '', email: '', telefone: '' });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (barbeiro: Barbeiro) => {
    setIsEditMode(true);
    setSelectedBarbeiro(barbeiro);
    setFormData({
      nome: barbeiro.nome,
      email: barbeiro.email,
      telefone: barbeiro.telefone || '',
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
      if (isEditMode && selectedBarbeiro) {
        await barbeiroService.update(selectedBarbeiro.id, formData);
      } else {
        await barbeiroService.create(formData);
      }
      closeModal();
      loadBarbeiros();
    } catch (err: any) {
      setFormError(err.message || 'Dados inválidos. Verifique as informações e tente novamente.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este barbeiro?')) return;

    try {
      await barbeiroService.delete(id);
      loadBarbeiros();
    } catch (err: any) {
      setError(err.message || 'Erro ao excluir barbeiro');
    }
  };

  if (loading) {
    return <div className="page-loading">Carregando...</div>;
  }

  return (
    <div className="crud-page">
      <div className="page-header">
        <h1>Barbeiros</h1>
        <Button onClick={handleOpenCreate} variant="primary">
          + Novo Barbeiro
        </Button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell header>ID</TableCell>
            <TableCell header>Nome</TableCell>
            <TableCell header>Email</TableCell>
            <TableCell header>Telefone</TableCell>
            <TableCell header>Média de Notas</TableCell>
            <TableCell header>Ações</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {barbeiros.map((barbeiro) => (
            <TableRow key={barbeiro.id}>
              <TableCell>{barbeiro.id}</TableCell>
              <TableCell>{barbeiro.nome}</TableCell>
              <TableCell>{barbeiro.email}</TableCell>
              <TableCell>{barbeiro.telefone || '-'}</TableCell>
              <TableCell>{barbeiro.mediaNotas.toFixed(1)} ⭐</TableCell>
              <TableCell>
                <div className="action-buttons">
                  <Button onClick={() => handleOpenEdit(barbeiro)} variant="secondary" className="btn-sm">
                    Editar
                  </Button>
                  <Button onClick={() => handleDelete(barbeiro.id)} variant="danger" className="btn-sm">
                    Excluir
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEditMode ? 'Editar Barbeiro' : 'Novo Barbeiro'}
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
              label="Nome"
              name="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
            />
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <FormInput
              label="Telefone"
              name="telefone"
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
            />
          </form>
        </>
      </Modal>
    </div>
  );
};

