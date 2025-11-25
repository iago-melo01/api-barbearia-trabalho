import { useState, useEffect } from 'react';
import { clienteService } from '../services/clienteService';
import type { Cliente, CreateClienteData, UpdateClienteData } from '../types';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/Table';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { FormInput } from '../components/FormInput';
import './CrudPage.css';

export const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [formData, setFormData] = useState<CreateClienteData>({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    try {
      setLoading(true);
      const data = await clienteService.getAll();
      setClientes(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar clientes');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setIsEditMode(false);
    setSelectedCliente(null);
    setFormData({ nome: '', email: '', senha: '', telefone: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cliente: Cliente) => {
    setIsEditMode(true);
    setSelectedCliente(cliente);
    setFormData({
      nome: cliente.nome,
      email: cliente.email,
      senha: '',
      telefone: cliente.telefone || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isEditMode && selectedCliente) {
        const updateData: UpdateClienteData = {
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone || undefined,
        };
        if (formData.senha) {
          updateData.senha = formData.senha;
        }
        await clienteService.update(selectedCliente.id, updateData);
      } else {
        await clienteService.create(formData);
      }
      setIsModalOpen(false);
      loadClientes();
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar cliente');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;

    try {
      await clienteService.delete(id);
      loadClientes();
    } catch (err: any) {
      setError(err.message || 'Erro ao excluir cliente');
    }
  };

  if (loading) {
    return <div className="page-loading">Carregando...</div>;
  }

  return (
    <div className="crud-page">
      <div className="page-header">
        <h1>Clientes</h1>
        <Button onClick={handleOpenCreate} variant="primary">
          + Novo Cliente
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
            <TableCell header>Ações</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientes.map((cliente) => (
            <TableRow key={cliente.id}>
              <TableCell>{cliente.id}</TableCell>
              <TableCell>{cliente.nome}</TableCell>
              <TableCell>{cliente.email}</TableCell>
              <TableCell>{cliente.telefone || '-'}</TableCell>
              <TableCell>
                <div className="action-buttons">
                  <Button onClick={() => handleOpenEdit(cliente)} variant="secondary" className="btn-sm">
                    Editar
                  </Button>
                  <Button onClick={() => handleDelete(cliente.id)} variant="danger" className="btn-sm">
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
        onClose={() => setIsModalOpen(false)}
        title={isEditMode ? 'Editar Cliente' : 'Novo Cliente'}
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
            label={isEditMode ? 'Nova Senha (deixe em branco para manter)' : 'Senha'}
            name="senha"
            type="password"
            value={formData.senha}
            onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
            required={!isEditMode}
          />
          <FormInput
            label="Telefone"
            name="telefone"
            value={formData.telefone}
            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
          />
        </form>
      </Modal>
    </div>
  );
};

