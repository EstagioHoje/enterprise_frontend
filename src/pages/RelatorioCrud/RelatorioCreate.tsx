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
import MenuItem from '@mui/material/MenuItem';

import teacherButtons from '../../data/teacherButtons.json'
import { Sidebar } from '../../components/sidebar/sidebar';

import { relatorio_post } from '../../actions/Relatorio';

export default function RelatorioCreate({ setAuthorized }) {
    const navigate = useNavigate()

    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [windowWidth, setWindowWidth] = useState(window.innerHeight);

    const params = new URLSearchParams(window.location.search);
    const [id,setId] = useState(params.get("id"))
    const [activities_description, setActivities_description] = useState([]);
    const [activities_outside, setActivities_outside] = useState([]);
    const [avaliation, setAvaliation] = useState([]);

    const cabecalho = {
        um_um : 'DESCRIÇÃO DAS ATIVIDADES REALIZADAS PELO ESTAGIÁRIO',
        um_dois: '-Elencar todas as atividades realizadas pelo estagiário.',
        um_tres: '-Breve análise do desempenho do estudante nas atividades desempenhadas',
        dois_um: 'REALIZOU ATIVIDADES NÃO PREVISTAS NO PLANO DE ESTÁGIO?',
        dois_dois: 'Descreva possíveis atividades realizadas e que não estavam previstas no Plano de Estágios. Acrescente uma justificativa para a realização destas atividades e como contribuíram para a formação do aluno.',
        tres_um: 'AVALIAÇÃO',
        tres_dois: 'Breve avaliação do desempenho do estagiário, informando pontos fortes, pontos fracos e o que pode ser melhorado. Sugestões para o desenvolvimento do aluno são bem-vindas.',
    }


    const physicalityOptions = [
        {
            value: 'presencial'
        }
    ]

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

    const register_relatorio = async () => {
        const fullReport = cabecalho.um_um + "\n" + activities_description + "\n" +  cabecalho.dois_um + "\n" + activities_outside + "\n" + cabecalho.tres_um + "\n" + avaliation;
        console.log(fullReport)
        relatorio_post(id,fullReport)
        navigate("/relatorio")
    }


    return (
        <Container disableGutters maxWidth={windowWidth} sx={{ padding: 0 }}>
            <Box sx={{ minWidth: 600, minHeight: 300, height: windowHeight, padding: 0, mb: 0 }}>
                <Grid container spacing={0}>
                    <Grid xs sx={{ maxWidth: 240, minWidth: 240 }}>
                        <Sidebar
                            setAuthorized={setAuthorized}>
                        </Sidebar>
                    </Grid>
                    <Grid xs sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: windowHeight,
                        minHeight: 400,
                        minWidth: 360,
                        overflow: "hidden",
                        overflowY: "scroll",
                    }}>
                        <Box sx={{
                            mx: 2
                        }}>

                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs={16}>
                                        <Box sx={{}}>
                                            <h3>{cabecalho.um_um}</h3>
                                            <h4>{cabecalho.um_dois}</h4>
                                            <h4>{cabecalho.um_tres}</h4>
                                            <TextField
                                                id="activities_description"
                                                value={activities_description}
                                                fullWidth
                                                label="(Máximo 1000 caracteres)"
                                                size="small"
                                                onChange={(e) => setActivities_description(e.target.value)}
                                                multiline
                                                maxRows={4}
                                                inputProps={{ maxLength: 1000 }}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs={16}>
                                        <Box sx={{}}>
                                            <h3>{cabecalho.dois_um}</h3>
                                            <h4>{cabecalho.dois_dois}</h4>
                                            <TextField
                                                id="activities_outside"
                                                value={activities_outside}
                                                fullWidth
                                                label="(Máximo 1000 caracteres)"
                                                onChange={(e) => setActivities_outside(e.target.value)}
                                                multiline
                                                maxRows={4}
                                                inputProps={{ maxLength: 1000 }}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs={16}>
                                        <Box sx={{}}>
                                            <h3>{cabecalho.tres_um}</h3>
                                            <h4>{cabecalho.tres_dois}</h4>
                                            <TextField
                                                id="avaliation"
                                                value={avaliation}
                                                fullWidth
                                                label="(Máximo 1000 caracteres)"
                                                onChange={(e) => setAvaliation(e.target.value)}
                                                multiline
                                                maxRows={4}
                                                inputProps={{ maxLength: 1000 }}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <Grid xs></Grid>
                                <Grid xs>
                                    <Box sx={{ my: 2, ml: 1 }}>
                                        <Button fullWidth sx={{
                                            backgroundColor: "red"

                                        }}
                                            onClick={() => register_relatorio()}>
                                            Gerar relatorio
                                        </Button>
                                    </Box>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container >
    );
}