import * as React from 'react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './login.css'

import { login_post } from '../../actions/Login';

export default function EmpresaLogin({ isAuthorized, setAuthorized }) {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate()

    useEffect(() => {
        function handleResize() {
            setWindowHeight(window.innerHeight)
            setWindowWidth(window.innerWidth)
            console.log(window.location.href)
        }

        window.addEventListener('resize', handleResize);

        return _ => {
            window.removeEventListener('resize', handleResize);
        }
    })

    function login(){
        const cnpj = document.getElementById("full-name").value;
        localStorage.setItem("cnpj",cnpj);
        const returnPathname = sessionStorage.getItem("lastPage") ?? "/";
        sessionStorage.removeItem("lastPage");
        localStorage.setItem("isAuthorized","true")
        setAuthorized(true)
        console.log(returnPathname);
        return(
            <Navigate to={returnPathname} replace></Navigate>
        );
    }

    if (isAuthorized == true) {
        const returnPathname = sessionStorage.getItem("lastPage") ?? "/vagas";
        sessionStorage.removeItem("lastPage");
        console.log(returnPathname);
        return(
            <Navigate to={returnPathname} replace></Navigate>
        );
    }

    return (
        <div className='container'>
          <div className="popupForm">
            <p>Usuário ou e-mail</p>
            <input id="full-name" name="full-name" type="text"></input>
            <p>Senha</p>
            <input id="password" name="password" type="text"></input>
            <button className='highButton' onClick={() => login()}>Login</button>
          </div>
          <div className='extraButtons'>
            <button onClick={() => navigate("/cadastro")}>Não possui cadastro?</button>
          </div>
        </div>
      )
}