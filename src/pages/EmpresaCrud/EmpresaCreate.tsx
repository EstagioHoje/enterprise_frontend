import * as React from 'react';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import logo from "../../data/logo.png";
import InputMask from "react-input-mask";
import { useNavigate } from 'react-router-dom';

import { empresa_get_search, empresa_post, empresa_put } from '../../actions/Empresa';

export default function EmpresaCreate({setAuthorized}) {
    const navigate = useNavigate()
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [corporate_name, setCorporate_name] = useState([])
    const [cnpj, setCnpj] = useState([])
    const [line_of_business, setLine_of_business] = useState([])
    const [rh_person_name, setRh_person_name] = useState([])
    const [rh_position_in_company, SetRh_position_in_company] = useState([])
    const [rh_email, setRh_email] = useState([])
    const [rh_telephone, setRh_telephone] = useState([])
    const [address_cep, setAddress_cep] = useState([])
    const [address, setAddress] = useState([])
    const [address_number, setAddress_number] = useState([])
    const [address_city, setAddress_city] = useState([])
    const [address_state, setAddress_state] = useState([])
    const [address_complement, setAddress_complement] = useState([])


    useEffect(() => {
        function handleResize() {
            setWindowHeight(window.innerHeight)
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize);

        return _ => {
            window.removeEventListener('resize', handleResize);
        }
    })

    const register_empresa = async () => {
        console.log(cnpj)
        let cnpjString = String(cnpj)
        const cnpjStringMod = cnpjString.replace(/\D/g, "")
        let rh_telephoneString = String(rh_telephone)
        const rh_telephoneStringMod = rh_telephoneString.replace(/\D/g, "")
        let address_numberString = String(address_number)
        const address_numberStringMod = address_numberString.replace(/\D/g, "")
        const info = empresa_post(cnpjStringMod, corporate_name, line_of_business, rh_person_name,
            rh_position_in_company, rh_email, rh_telephoneStringMod, address_cep, address,
            address_numberStringMod, address_city, address_state, address_complement)
        console.log(info)
        //navigate("/login")
    }


    return (
        <Container disableGutters maxWidth={windowWidth} sx={{ padding: 0 }}>
            <Box sx={{ minWidth: 600, minHeight: 300, height: windowHeight, padding: 0, mb: 0 }}>
                <Grid container spacing={0} sx={{
                    height: windowHeight,
                    minHeight: 400,
                    maxHeight: windowHeight,
                    mb: 0
                }}>
                    <Grid xs={4} sx={{
                        height: windowHeight,
                        minHeight: 400,
                        maxHeight: windowHeight,
                        mb: 0
                    }}>
                        <Box sx={{
                            height: windowHeight,
                            minHeight: 400,
                            maxHeight: windowHeight,
                            backgroundColor: 'blue',
                            mb: 0
                        }}>
                            <Box sx={{
                                height: windowHeight / 8,
                                minHeight: 400 / 8,
                                maxHeight: windowHeight / 8,
                                backgroundColor: 'blue',
                                mb: 0
                            }}>

                            </Box>
                            <Grid container justifyContent="center"
                                sx={{
                                    height: windowHeight / 4,
                                    minHeight: 400 / 4,
                                    maxHeight: windowHeight / 4,
                                    backgroundColor: 'blue',
                                    mb: 0
                                }}
                            >
                                <img src={logo} style={{ height: "100%", width: "auto", maxWidth: "100%" }}></img>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid xs sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: windowHeight,
                        minHeight: 400,
                        overflow: "hidden",
                        overflowY: "scroll",
                    }}>
                        <Box sx={{
                            mx: 2
                        }}>
                            <Box sx={{ my: 2 }}>
                                Informações da Empresa
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs={10}>
                                        <Box sx={{ mr: 1 }}>
                                            <TextField
                                                id="corporate_name"
                                                value={corporate_name}
                                                fullWidth
                                                label="Razão Social"
                                                size="small"
                                                onChange={(e) => setCorporate_name(e.target.value)}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid xs>
                                        <Box sx={{ ml: 1 }}>
                                            <InputMask
                                                mask="99.999.999/99999-99"
                                                disabled={false}
                                                maskChar=" "
                                                value={cnpj}
                                                onChange={(e) => setCnpj(e.target.value)}
                                            >
                                                {() => <TextField
                                                    id="cnpj"
                                                    label="CNPJ"
                                                    fullWidth
                                                    size="small"
                                                />}
                                            </InputMask>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <Box sx={{ m: 0 }}>
                                    <TextField
                                        id="line_of_business"
                                        value={line_of_business}
                                        fullWidth
                                        label="Ramo de atuação"
                                        defaultValue=""
                                        size="small"
                                        onChange={(e) => setLine_of_business(e.target.value)}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ my: 2 }}>
                                Informações do Representante e RH
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs={10}>
                                        <Box sx={{ mr: 1 }}>
                                            <TextField
                                                id="rh_person_name"
                                                value={rh_person_name}
                                                fullWidth
                                                label="Nome do representante"
                                                defaultValue=""
                                                size="small"
                                                onChange={(e) => setRh_person_name(e.target.value)}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid xs>
                                        <Box sx={{ ml: 1 }}>
                                            <TextField
                                                id="rh_position_in_company"
                                                value={rh_position_in_company}
                                                label="Cargo"
                                                defaultValue=""
                                                fullWidth
                                                size="small"
                                                onChange={(e) => SetRh_position_in_company(e.target.value)}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs={8}>
                                        <Box sx={{ mr: 1 }}>
                                            <InputMask
                                                mask="(99)999999999"
                                                value={rh_telephone}
                                                disabled={false}
                                                maskChar=" "
                                                onChange={(e) => setRh_telephone(e.target.value)}
                                            >
                                                {() => <TextField
                                                    id="rh_telephone"
                                                    fullWidth
                                                    label="Telefone do RH"
                                                    defaultValue=""
                                                    size="small"
                                                />}
                                            </InputMask>
                                        </Box>
                                    </Grid>
                                    <Grid xs>
                                        <Box sx={{ ml: 1 }}>
                                            <TextField
                                                id="rh_email"
                                                value={rh_email}
                                                label="Email do RH"
                                                defaultValue=""
                                                fullWidth
                                                size="small"
                                                onChange={(e) => setRh_email(e.target.value)}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>


                            <Box sx={{ my: 2 }}>
                                Informações de endereço
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs={5}>
                                        <Box sx={{ mr: 1 }}>
                                            <InputMask
                                                mask="99999-999"
                                                value={address_cep}
                                                disabled={false}
                                                maskChar=" "
                                                onChange={(e) => setAddress_cep(e.target.value)}
                                            >
                                                {() => <TextField
                                                    id="address_cep"
                                                    fullWidth
                                                    label="CEP"
                                                    defaultValue=""
                                                    size="small"
                                                />}
                                            </InputMask>
                                        </Box>
                                    </Grid>
                                    <Grid xs>
                                        <Box sx={{ ml: 1 }}>
                                            <TextField
                                                id="address"
                                                value={address}
                                                label="Endereço"
                                                defaultValue=""
                                                fullWidth
                                                size="small"
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs={4}>
                                        <Box sx={{ mr: 1 }}>
                                            <TextField
                                                id="address_number"
                                                value={address_number}
                                                fullWidth
                                                label="Número"
                                                defaultValue=""
                                                size="small"
                                                onChange={(e) => setAddress_number(e.target.value)}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid xs>
                                        <Box sx={{ mx: 1 }}>
                                            <TextField
                                                id="address_city"
                                                value={address_city}
                                                label="Cidade"
                                                defaultValue=""
                                                fullWidth
                                                size="small"
                                                onChange={(e) => setAddress_city(e.target.value)}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid xs>
                                        <Box sx={{ ml: 1 }}>
                                            <TextField
                                                id="address_state"
                                                value={address_state}
                                                label="Estado"
                                                defaultValue=""
                                                fullWidth
                                                size="small"
                                                onChange={(e) => setAddress_state(e.target.value)}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs>
                                        <Box sx={{ m: 0 }}>
                                            <TextField
                                                id="address_complement"
                                                value={address_complement}
                                                label="Complemento"
                                                defaultValue=""
                                                fullWidth
                                                size="small"
                                                onChange={(e) => setAddress_complement(e.target.value)}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs>
                                        <Box sx={{ my: 2, mr: 1 }}>
                                            <Button fullWidth sx={{
                                                backgroundColor: "yellow"
                                            }}
                                                onClick={() => register_empresa()}>
                                                Salvar informações
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}