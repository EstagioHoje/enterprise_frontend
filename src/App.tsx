import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import EmpresaReadUpdateDelete from "./pages/EmpresaCrud/EmpresaReadUpdateDelete";
import EmpresaCreate from "./pages/EmpresaCrud/EmpresaCreate";

import VagaCreate from "./pages/VagasCrud/VagaCreate";
import VagaRead from "./pages/VagasCrud/VagaRead";
import VagaReadUpdateDelete from "./pages/VagasCrud/VagaReadUpdateDelete";

import RelatorioRead from "./pages/RelatorioCrud/RelatorioRead";
import RelatorioCreate from "./pages/RelatorioCrud/RelatorioCreate";

import AssinaturaRead from "./pages/AssinaturaCrud/AssinaturaRead";
import AssinaturaCreate from "./pages/AssinaturaCrud/AssinaturaCreate";
import AssinaturaReadComplete from "./pages/AssinaturaCrud/AssinaturaReadComplete";

import EmpresaLogin from "./pages/EmpresaLogin/EmpresaLogin";

import './App.css';

const App = () => {
  const [isAuthorized, setAuthorized] = useState(JSON.parse(localStorage.getItem("isAuthorized")));

  useEffect(() => {
    function handleStorage() {
      console.log(localStorage.getItem("isAuthorized"));
      setAuthorized(JSON.parse(localStorage.getItem("isAuthorized")))
      console.log(typeof isAuthorized);
    }

    window.addEventListener('storage', handleStorage);

    return _ => {
      window.removeEventListener('storage', handleStorage);
    }
  })

  return (
    <BrowserRouter>
      <Routes>


        <Route path="/assinatura/create" element={
          <ProtectedRoute isAuthorized={isAuthorized}
            children={<AssinaturaCreate
              setAuthorized={setAuthorized} className="teste" />} />
        } />
        <Route path="/assinatura/read" element={
          <ProtectedRoute isAuthorized={isAuthorized}
            children={<AssinaturaReadComplete
              setAuthorized={setAuthorized} className="teste" />} />
        } />
        <Route path="/assinatura" element={
          <ProtectedRoute isAuthorized={isAuthorized}
            children={<AssinaturaRead
              setAuthorized={setAuthorized} className="teste" />} />
        } />


        <Route path="/relatorio/read" element={
          <ProtectedRoute isAuthorized={isAuthorized}
            children={<RelatorioCreate
              setAuthorized={setAuthorized} className="teste" />} />
        } />
        <Route path="/relatorio/create" element={
          <ProtectedRoute isAuthorized={isAuthorized}
            children={<RelatorioCreate
              setAuthorized={setAuthorized} className="teste" />} />
        } />
        <Route path="/relatorio" element={
          <ProtectedRoute isAuthorized={isAuthorized}
            children={<RelatorioRead
              setAuthorized={setAuthorized} className="teste" />} />
        } />


        <Route path="/vagas/read" element={
          <ProtectedRoute isAuthorized={isAuthorized} children={<VagaReadUpdateDelete
            setAuthorized={setAuthorized} className="teste" />} />
        } />
        <Route path="/vagas/create" element={
          <ProtectedRoute isAuthorized={isAuthorized} children={<VagaCreate
            setAuthorized={setAuthorized} className="teste" />} />
        } />
        <Route path="/vagas" element={
          <ProtectedRoute isAuthorized={isAuthorized} children={<VagaRead
            setAuthorized={setAuthorized} className="teste" />} />
        } />


        <Route path="/conta" element={
          <ProtectedRoute isAuthorized={isAuthorized}
            children={<EmpresaReadUpdateDelete
              setAuthorized={setAuthorized} className="teste" />} />
        } />


        <Route path="/cadastro" element={<EmpresaCreate setAuthorized={setAuthorized} className="teste" />} />

        <Route path="/login" element={<EmpresaLogin isAuthorized={isAuthorized} setAuthorized={setAuthorized} className="teste" />} />
        <Route path="/" element={<EmpresaLogin isAuthorized={isAuthorized} setAuthorized={setAuthorized} className="teste" />} />

      </Routes>
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("main"));