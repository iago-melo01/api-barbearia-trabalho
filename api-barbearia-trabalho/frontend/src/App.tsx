import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Clientes } from './pages/Clientes';
import { Barbeiros } from './pages/Barbeiros';
import { Servicos } from './pages/Servicos';
import { Agendamentos } from './pages/Agendamentos';
import { Avaliacoes } from './pages/Avaliacoes';
import './App.css';

function App() {
  console.log('App component rendering');
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/barbeiros" element={<Barbeiros />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          <Route path="/avaliacoes" element={<Avaliacoes />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
