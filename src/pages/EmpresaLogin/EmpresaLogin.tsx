import * as React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './login.css'
import logo from '../../images/logo.svg'

import { login_enterprise } from '../../actions/Login';

export default function EmpresaLogin({ isAuthorized, setAuthorized }) {
  const [cnpj, setCnpj] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  
  const login = async () => {
    let enterprise = await login_enterprise(cnpj, password);
    if(enterprise.data[0] !== undefined) {
      const returnPathname = sessionStorage.getItem('lastPage') ?? '/';
      sessionStorage.removeItem('lastPage');
      sessionStorage.setItem('authorized', 'true')
      sessionStorage.setItem('cnpj', cnpj)
      setAuthorized(true)
      return(
        <Navigate to={returnPathname} replace></Navigate>
        );
    } else {
        setCnpj('')
    }
  }
    
  function onCnpjChange(value) {
    if(value >= 0) {
      setCnpj(value)
    }
  }
    
  if (isAuthorized == true) {
    const returnPathname = sessionStorage.getItem("lastPage") ?? "/vagas";
    sessionStorage.removeItem("lastPage");
    return(
      <Navigate to={returnPathname} replace></Navigate>
    );
  }
      
  return (
    <div className='logInBackground'>
      <div className='popup'>
        <img src={logo} alt='Estágio Hoje' />
        <div className='container'>
          <div className="popupForm">
            <h1>Empresa</h1>
            <p>CNPJ</p>
            <input
              id='cnpj'
              name='cnpj'
              type='text'
              value={cnpj}
              onChange={(e) => onCnpjChange(e.target.value)}
            />
            <p>Senha</p>
            <input
              id='password'
              name='password'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className='highButton' onClick={login}>Login</button>
          </div>
          <div className='extraButtons'>
            <button onClick={() => navigate("/cadastro")}>Não possui cadastro?</button>
          </div>
        </div>
      </div>
    </div>
  )
}