import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { clienteService } from '../services/clienteService';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';
import './Register.css';

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }

    if (formData.senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return false;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, insira um e-mail válido.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      await clienteService.create({
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone || undefined,
        senha: formData.senha,
      });

      alert('Cadastro realizado com sucesso! Você já pode fazer agendamentos.');
      navigate('/agendar');
    } catch (err: any) {
      if (err.message?.includes('já existe') || err.status === 409) {
        setError('Este e-mail já está cadastrado. Tente fazer login ou use outro e-mail.');
      } else {
        setError(err.message || 'Erro ao realizar cadastro. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <div className="register-header">
          <div className="register-icon">👤</div>
          <h1 className="register-title">Cadastro de Cliente</h1>
          <p className="register-subtitle">Crie sua conta</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <FormInput
            label="Nome Completo"
            name="nome"
            type="text"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Seu nome completo"
            required
            error={error && formData.nome === '' ? 'Campo obrigatório' : undefined}
          />

          <FormInput
            label="E-mail"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu.email@exemplo.com"
            required
            error={error && formData.email === '' ? 'Campo obrigatório' : undefined}
          />

          <FormInput
            label="Telefone"
            name="telefone"
            type="tel"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="(00) 00000-0000"
          />

          <FormInput
            label="Senha"
            name="senha"
            type="password"
            value={formData.senha}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
            required
            error={error && formData.senha === '' ? 'Campo obrigatório' : undefined}
          />

          <FormInput
            label="Confirmar Senha"
            name="confirmarSenha"
            type="password"
            value={formData.confirmarSenha}
            onChange={handleChange}
            placeholder="Digite a senha novamente"
            required
            error={error && formData.confirmarSenha === '' ? 'Campo obrigatório' : undefined}
          />

          {error && <div className="register-error">{error}</div>}

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="register-button"
          >
            {loading ? 'CADASTRANDO...' : 'CRIAR CONTA'}
          </Button>
        </form>

        <div className="register-divider">
          <span>ou</span>
        </div>

        <div className="register-tip">
          <div className="register-tip-icon">💡</div>
          <p className="register-tip-text">
            Já possui uma conta? Faça login para acessar seus agendamentos.
          </p>
        </div>

        <div className="register-links">
          <button 
            type="button"
            onClick={() => navigate('/agendar')}
            className="register-back-link"
          >
            ← Voltar para agendamento
          </button>
          <Link to="/" className="register-home-link">
            Ir para página inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

