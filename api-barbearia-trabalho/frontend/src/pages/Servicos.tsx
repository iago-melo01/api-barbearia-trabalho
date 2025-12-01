import { useState, useEffect } from 'react';
import { servicoService } from '../services/servicoService';
import type { Servico, CreateServicoData, UpdateServicoData } from '../types';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/Table';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { FormInput } from '../components/FormInput';
import './CrudPage.css';

export const Servicos = () => {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedServico, setSelectedServico] = useState<Servico | null>(null);
  const [formData, setFormData] = useState<CreateServicoData>({
    nome: '',
    descricao: '',
    preco: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    loadServicos();
  }, []);

  const loadServicos = async () => {
    try {
      setLoading(true);
      const data = await servicoService.getAll();
      setServicos(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar serviços');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setIsEditMode(false);
    setSelectedServico(null);
    setFormData({ nome: '', descricao: '', preco: 0 });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (servico: Servico) => {
    setIsEditMode(true);
    setSelectedServico(servico);
    setFormData({
      nome: servico.nome,
      descricao: servico.descricao,
      preco: servico.preco,
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
      if (isEditMode && selectedServico) {
        await servicoService.update(selectedServico.id, formData);
      } else {
        await servicoService.create(formData);
      }
      closeModal();
      loadServicos();
    } catch (err: any) {
      setFormError(err.message || 'Dados inválidos. Verifique as informações e tente novamente.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este serviço?')) return;

    try {
      await servicoService.delete(id);
      loadServicos();
    } catch (err: any) {
      setError(err.message || 'Erro ao excluir serviço');
    }
  };

  if (loading) {
    return <div className="page-loading">Carregando...</div>;
  }

  return (
    <div className="crud-page">
      <div className="page-header">
        <h1>Serviços</h1>
        <Button onClick={handleOpenCreate} variant="primary">
          + Novo Serviço
        </Button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell header>ID</TableCell>
            <TableCell header>Nome</TableCell>
            <TableCell header>Descrição</TableCell>
            <TableCell header>Preço</TableCell>
            <TableCell header>Ações</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {servicos.map((servico) => (
            <TableRow key={servico.id}>
              <TableCell>{servico.id}</TableCell>
              <TableCell>{servico.nome}</TableCell>
              <TableCell>{servico.descricao}</TableCell>
              <TableCell>R$ {servico.preco.toFixed(2)}</TableCell>
              <TableCell>
                <div className="action-buttons">
                  <Button onClick={() => handleOpenEdit(servico)} variant="secondary" className="btn-sm">
                    Editar
                  </Button>
                  <Button onClick={() => handleDelete(servico.id)} variant="danger" className="btn-sm">
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
        title={isEditMode ? 'Editar Serviço' : 'Novo Serviço'}
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
              label="Descrição"
              name="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              textarea
              required
            />
            <FormInput
              label="Preço"
              name="preco"
              type="number"
              value={formData.preco}
              onChange={(e) => setFormData({ ...formData, preco: parseFloat(e.target.value) || 0 })}
              min={0}
              step={0.01}
              required
            />
          </form>
        </>
      </Modal>
    </div>
  );
};

