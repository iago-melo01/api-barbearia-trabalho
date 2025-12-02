import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';
import './Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await authService.loginBarbeiro(formData);
      // Salvar dados do barbeiro no localStorage
      localStorage.setItem('barbeiro', JSON.stringify(result.barbeiro));
      // Redirecionar para o dashboard do admin
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <div className="login-icon">✂️</div>
          <h1 className="login-title">Área do Barbeiro</h1>
          <p className="login-subtitle">Acesso Restrito</p>
          <div className="login-badge">BARBEIRO</div>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <FormInput
            label="E-mail Profissional"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu.email@barbearia.com"
            required
            error={error && formData.email === '' ? 'Campo obrigatório' : undefined}
          />

          <FormInput
            label="Senha"
            name="senha"
            type="password"
            value={formData.senha}
            onChange={handleChange}
            placeholder="Digite sua senha"
            required
            error={error && formData.senha === '' ? 'Campo obrigatório' : undefined}
          />

          {error && <div className="login-error">{error}</div>}

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="login-button"
          >
            {loading ? 'ENTRANDO...' : 'ENTRAR NO PAINEL'}
          </Button>
        </form>

        <div className="login-divider">
          <span>ou</span>
        </div>

        <div className="login-tip">
          <div className="login-tip-icon">💡</div>
          <p className="login-tip-text">
            Dica: Use seu e-mail cadastrado no sistema para acessar o painel administrativo.
          </p>
        </div>

        <button 
          type="button"
          onClick={() => window.location.href = '/'}
          className="login-back-link"
        >
          ← Voltar para página inicial
        </button>
      </div>
    </div>
  );
};

