import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { clienteService } from '../services/clienteService';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';
import './ClienteAuth.css';

type Mode = 'login' | 'register';

export const ClienteAuth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [loginData, setLoginData] = useState({
    email: '',
    senha: '',
  });

  const [registerData, setRegisterData] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
  });

  const switchMode = (nextMode: Mode) => {
    setMode(nextMode);
    setError(null);
    setSuccess(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const result = await authService.loginCliente(loginData);
      localStorage.setItem('cliente', JSON.stringify(result.cliente));
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!registerData.nome || !registerData.email || !registerData.senha || !registerData.confirmarSenha) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }

    if (registerData.senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (registerData.senha !== registerData.confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      await clienteService.create({
        nome: registerData.nome,
        email: registerData.email,
        telefone: registerData.telefone || undefined,
        senha: registerData.senha,
      });

      const loginResult = await authService.loginCliente({
        email: registerData.email,
        senha: registerData.senha,
      });

      localStorage.setItem('cliente', JSON.stringify(loginResult.cliente));
      setSuccess('Cadastro realizado com sucesso! Redirecionando...');
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Erro ao realizar cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cliente-auth">
      <div className="cliente-auth-card">
        <div className="cliente-auth-icon">👤</div>
        <h1 className="cliente-auth-title">Área do Cliente</h1>
        <p className="cliente-auth-subtitle">
          Acesse sua conta para visualizar conteúdos exclusivos
        </p>

        <div className="cliente-auth-tabs">
          <button
            type="button"
            className={`cliente-auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => switchMode('login')}
          >
            Entrar
          </button>
          <button
            type="button"
            className={`cliente-auth-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => switchMode('register')}
          >
            Cadastrar
          </button>
        </div>

        {error && <div className="cliente-auth-error">{error}</div>}
        {success && <div className="cliente-auth-success">{success}</div>}

        {mode === 'login' ? (
          <form className="cliente-auth-form" onSubmit={handleLogin}>
            <FormInput
              label="E-mail"
              name="email"
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              placeholder="seu.email@exemplo.com"
              required
            />
            <FormInput
              label="Senha"
              name="senha"
              type="password"
              value={loginData.senha}
              onChange={(e) => setLoginData({ ...loginData, senha: e.target.value })}
              placeholder="Digite sua senha"
              required
            />
            <Button type="submit" variant="primary" disabled={loading} className="cliente-auth-button">
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        ) : (
          <form className="cliente-auth-form" onSubmit={handleRegister}>
            <FormInput
              label="Nome Completo"
              name="nome"
              value={registerData.nome}
              onChange={(e) => setRegisterData({ ...registerData, nome: e.target.value })}
              placeholder="Seu nome completo"
              required
            />
            <FormInput
              label="E-mail"
              name="email"
              type="email"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              placeholder="seu.email@exemplo.com"
              required
            />
            <FormInput
              label="Telefone"
              name="telefone"
              value={registerData.telefone}
              onChange={(e) => setRegisterData({ ...registerData, telefone: e.target.value })}
              placeholder="(00) 00000-0000"
            />
            <FormInput
              label="Senha"
              name="senha"
              type="password"
              value={registerData.senha}
              onChange={(e) => setRegisterData({ ...registerData, senha: e.target.value })}
              placeholder="Mínimo 6 caracteres"
              required
            />
            <FormInput
              label="Confirmar Senha"
              name="confirmarSenha"
              type="password"
              value={registerData.confirmarSenha}
              onChange={(e) => setRegisterData({ ...registerData, confirmarSenha: e.target.value })}
              placeholder="Repita a senha"
              required
            />
            <Button type="submit" variant="primary" disabled={loading} className="cliente-auth-button">
              {loading ? 'Cadastrando...' : 'Criar Conta'}
            </Button>
          </form>
        )}

        <div className="cliente-auth-footer">
          <Link to="/login" className="cliente-auth-barbeiro-link">
            Área do Barbeiro
          </Link>
        </div>
      </div>
    </div>
  );
};

