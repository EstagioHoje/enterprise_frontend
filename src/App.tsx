import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { 
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';

import EmpresaReadUpdateDelete from './pages/EmpresaCrud/EmpresaReadUpdateDelete';
import EmpresaCreate from './pages/EmpresaCrud/EmpresaCreate';

import VagaCreate from './pages/VagasCrud/VagaCreate';
import VagaRead from './pages/VagasCrud/VagaRead';
import VagaReadUpdateDelete from './pages/VagasCrud/VagaReadUpdateDelete';

import RelatorioRead from './pages/RelatorioCrud/RelatorioRead';
import RelatorioCreate from './pages/RelatorioCrud/RelatorioCreate';

import AssinaturaRead from './pages/AssinaturaCrud/AssinaturaRead';
import AssinaturaCreate from './pages/AssinaturaCrud/AssinaturaCreate';
import AssinaturaReadComplete from './pages/AssinaturaCrud/AssinaturaReadComplete';

import EmpresaLogin from './pages/EmpresaLogin/EmpresaLogin';

import './App.css';

const App = () => {
  const [isAuthorized, setAuthorized] = useState(JSON.parse(sessionStorage.getItem('authorized')));

  useEffect(() => {
    function handleStorage() {
      console.log(sessionStorage.getItem('authorized'));
      setAuthorized(JSON.parse(sessionStorage.getItem('authorized')))
    }
    window.addEventListener('storage', handleStorage);
    return _ => {
      window.removeEventListener('storage', handleStorage);
    }
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <Navigate to={'/login'} replace />
          }
        />
        <Route
          path='/login'
          element={
            <EmpresaLogin isAuthorized={isAuthorized} setAuthorized={setAuthorized} />
          }
        />
        <Route
          path='/cadastro'
          element={
            <EmpresaCreate setAuthorized={setAuthorized} />
          }
        />
        <Route
          path='/vagas'
          element={
            <ProtectedRoute
              isAuthorized={isAuthorized}
              children={<VagaRead setAuthorized={setAuthorized} />}
            />
          }
        />
        <Route
          path='/vagas/create'
          element={
            <ProtectedRoute
              isAuthorized={isAuthorized}
              children={<VagaCreate setAuthorized={setAuthorized} />}
            />
          }
        />
        <Route
          path='/vagas/read'
          element={
            <ProtectedRoute
              isAuthorized={isAuthorized}
              children={<VagaReadUpdateDelete setAuthorized={setAuthorized} />}
            />
          }
        />
        <Route
          path='/relatorio'
          element={
            <ProtectedRoute
              isAuthorized={isAuthorized}
              children={<RelatorioRead setAuthorized={setAuthorized} />}
            />
          }
        />
        <Route
          path='/relatorio/create'
          element={
            <ProtectedRoute
              isAuthorized={isAuthorized}
              children={<RelatorioCreate setAuthorized={setAuthorized} />}
            />
          }
        />
        <Route
          path='/relatorio/read'
          element={
            <ProtectedRoute
              isAuthorized={isAuthorized}
              children={<RelatorioCreate setAuthorized={setAuthorized} />}
            />
          }
        />
        <Route
          path='/assinatura'
          element={
            <ProtectedRoute
              isAuthorized={isAuthorized}
              children={<AssinaturaRead setAuthorized={setAuthorized} />}
            />
          }
        />
        <Route
          path='/assinatura/create'
          element={
            <ProtectedRoute
              isAuthorized={isAuthorized}
              children={<AssinaturaCreate setAuthorized={setAuthorized} />}
            />
          }
        />
        <Route
          path='/assinatura/read'
          element={
            <ProtectedRoute
              isAuthorized={isAuthorized}
              children={<AssinaturaReadComplete setAuthorized={setAuthorized} />}
            />
          }
        />
        <Route
          path='/conta'
          element={
            <ProtectedRoute
              isAuthorized={isAuthorized}
              children={<EmpresaReadUpdateDelete setAuthorized={setAuthorized} />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

render(<App />, document.getElementById('main'));