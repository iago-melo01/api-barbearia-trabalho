import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute, ClientProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ClienteAuth } from './pages/ClienteAuth';
import { Home } from './pages/Home';
import { Agendar } from './pages/Agendar';
import { Dashboard } from './pages/Dashboard';
import { Clientes } from './pages/Clientes';
import { Barbeiros } from './pages/Barbeiros';
import { Servicos } from './pages/Servicos';
import { Agendamentos } from './pages/Agendamentos';
import { Avaliacoes } from './pages/Avaliacoes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route
          path="/"
          element={
            <ClientProtectedRoute>
              <Home />
            </ClientProtectedRoute>
          }
        />
        <Route path="/agendar" element={<Agendar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/cliente/login" element={<ClienteAuth />} />
        
        {/* Rotas protegidas (painel admin) */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/clientes" element={<Clientes />} />
                  <Route path="/barbeiros" element={<Barbeiros />} />
                  <Route path="/servicos" element={<Servicos />} />
                  <Route path="/agendamentos" element={<Agendamentos />} />
                  <Route path="/avaliacoes" element={<Avaliacoes />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
