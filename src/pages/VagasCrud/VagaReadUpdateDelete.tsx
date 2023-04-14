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
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid';

import teacherButtons from '../../data/teacherButtons.json'
import { Sidebar } from '../../components/sidebar/sidebar';

import { vaga_put } from '../../actions/Vaga';
import { vaga_get_search } from '../../actions/Vaga';
import { vaga_delete } from '../../actions/Vaga';
import { vaga_candidates } from '../../actions/Vaga';
import { empresa_get_search } from '../../actions/Empresa';

export default function VagaReadUpdateDelete({ setAuthorized }) {
    const navigate = useNavigate()
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [windowWidth, setWindowWidth] = useState(window.innerHeight);

    const [role, setRole] = useState([]);
    const [weekly_hours, setWeekly_hours] = useState([]);
    const [physicality, setPhysicality] = useState([]);
    const [vacancies, setVacancies] = useState([]);
    const [salary, setSalary] = useState([]);
    const [description, setDescription] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [id, setId] = useState([]);
    const [cnpj, setCnpj] = useState(localStorage.getItem("cnpj"))
    const [corporate_name, setCorporate_name] = useState([]);
    const [address, setAddress] = useState([]);
    const [rows, setRows] = useState([])

    const columns: GridColDef[] = [
        {
            field: 'name', headerName: 'Nome', width: 200
        },
        {
            field: 'course', headerName: 'Curso', width: 200
        },
        {
            field: 'college', headerName: 'Universidade', width: 200
        },
        {
            field: 'resumee', headerName: 'Curriculo', width: 500,
        },
        {
            field: 'entry_year', headerName: 'Ano de entrada', width: 100
        },
        {
            field: 'id', headerName: 'email de contato', width: 180,
        },
        {
            field: 'telephone', headerName: 'telefone de contato', width: 180,
        },
    ];



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

    useEffect(() => {

        (async () => {
            const params = new URLSearchParams(window.location.search);
            setId(params.get("id"))
            let info = await vaga_get_search(params.get("id"))
            console.log(info)
            if (info != null) {
                if (info.data[0] != null) {
                    setRole(info.data[0].role)
                    setWeekly_hours(info.data[0].weekly_hours)
                    setPhysicality(info.data[0].physicality)
                    setVacancies(info.data[0].vacancies)
                    setSalary(info.data[0].salary)
                    setDescription(info.data[0].description)
                    setRequirements(info.data[0].requirements)
                }
            }

            let info2 = await empresa_get_search(cnpj)
            console.log(info2)
            if (info2 != null) {
                if (info2.data[0] != null) {
                    setCorporate_name(info2.data[0].corporate_name)
                    setAddress(info2.data[0].address)
                }
            }

            let info3 = await vaga_candidates(params.get("id"))
            console.log(info3)
            if (info3 != null) {
                if (info3.status == 200) {
                    const teste = info3.data.reduce(function (result, element) {
                        const arrayVaga = {};
                        arrayVaga.id = element.email;
                        arrayVaga.name = element.name;
                        arrayVaga.course = element.course;
                        arrayVaga.college = element.college;
                        arrayVaga.telephone = element.telephone;
                        arrayVaga.entry_year = element.entry_year;
                        arrayVaga.resumee = element.resumee;
                        result.push(arrayVaga)
                        return result;
                    }, []);
                    console.log(teste)
                    setRows(teste);
                }
            }
        }
        )()

    }, []);

    const update_vaga = async () => {
        var weekly_hoursString = String(weekly_hours)
        const weekly_hoursInt = parseInt(weekly_hoursString.replace(/\D/g, ""))
        console.log(vaga_put(id, cnpj, role, weekly_hoursInt, physicality,
            vacancies, salary, description, requirements, corporate_name, address))
        //navigate("/vagas")
    }

    const delete_vaga = async () => {
        vaga_delete(id)
        navigate("/vagas")
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
                                Informações da Vaga
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs={10}>
                                        <Box sx={{ mr: 1 }}>
                                            <TextField
                                                id="role"
                                                value={role}
                                                fullWidth
                                                label="Nome do cargo"
                                                size="small"
                                                onChange={(e) => setRole(e.target.value)}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid xs>
                                        <Box sx={{ ml: 1 }}>
                                            <InputMask
                                                mask="99"
                                                disabled={false}
                                                maskChar=" "
                                                value={weekly_hours}
                                                onChange={(e) => setWeekly_hours(e.target.value)}
                                            >
                                                {() => <TextField
                                                    id="weekly_houes"
                                                    label="Horas semanais"
                                                    fullWidth
                                                    size="small"
                                                />}
                                            </InputMask>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="12">
                                    <Grid xs={4}>
                                        <Box sx={{ mr: 1 }}>
                                            <TextField
                                                id="physicality"
                                                value={physicality}
                                                fullWidth
                                                label="Fisicalidade"
                                                size="small"
                                                onChange={(e) => setPhysicality(e.target.value)}
                                                select
                                            >
                                                <MenuItem value="presencial">Presencial</MenuItem>
                                                <MenuItem value="hibrido">Hibrido</MenuItem>
                                                <MenuItem value="hibrido">Online</MenuItem>
                                            </TextField>
                                        </Box>
                                    </Grid>
                                    <Grid xs>
                                        <Box sx={{ mx: 1 }}>
                                            <InputMask
                                                mask="99999"
                                                value={salary}
                                                disabled={false}
                                                maskChar=" "
                                                onChange={(e) => setSalary(e.target.value)}
                                            >
                                                {() => <TextField
                                                    id="salary"
                                                    fullWidth
                                                    label="Salário"
                                                    size="small"
                                                />}
                                            </InputMask>
                                        </Box>
                                    </Grid>
                                    <Grid xs>
                                        <Box sx={{ ml: 1 }}>
                                            <InputMask
                                                mask="99"
                                                value={vacancies}
                                                disabled={false}
                                                maskChar=" "
                                                onChange={(e) => setVacancies(e.target.value)}
                                            >
                                                {() => <TextField
                                                    id="vacancies"
                                                    fullWidth
                                                    label="Número de vags ofertadas"
                                                    size="small"
                                                />}
                                            </InputMask>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>


                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs={16}>
                                        <Box sx={{}}>
                                            <TextField
                                                id="description"
                                                value={description}
                                                fullWidth
                                                label="Descrição da função e serviços (máximo 500 caracteres)"
                                                size="small"
                                                onChange={(e) => setDescription(e.target.value)}
                                                multiline
                                                maxRows={4}
                                                inputProps={{ maxLength: 500 }}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs={16}>
                                        <Box sx={{}}>
                                            <TextField
                                                id="requirements"
                                                value={requirements}
                                                fullWidth
                                                label="Requisitos e habilidades esperadas do estágiario (máximo 500 caracteres)"
                                                size="small"
                                                onChange={(e) => setRequirements(e.target.value)}
                                                multiline
                                                maxRows={4}
                                                inputProps={{ maxLength: 500 }}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box sx={{ my: 2 }}>
                                Informações da Empresa (vísivies aos estagiarios)
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs={10}>
                                        <Box sx={{ mr: 1 }}>
                                            <TextField
                                                id="company_name"
                                                value={corporate_name}
                                                fullWidth
                                                label="Nome da empresa"
                                                size="small"
                                                inputProps={{ readOnly: true, disableUnderline: true }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid xs>
                                        <Box sx={{ ml: 1 }}>
                                            <TextField
                                                id="address"
                                                value={address}
                                                fullWidth
                                                label="Endereço"
                                                size="small"
                                                inputProps={{ readOnly: true, disableUnderline: true }}
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
                                                onClick={() => update_vaga()}>
                                                Salvar informações
                                            </Button>
                                        </Box>
                                    </Grid>
                                    <Grid xs>
                                        <Box sx={{ my: 2, ml: 1 }}>
                                            <Button fullWidth sx={{
                                                backgroundColor: "red"

                                            }}
                                                onClick={() => delete_vaga()}>
                                                Excluir vaga
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Box sx={{ width: '100%', height: '400px' }}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        initialState={{
                                            pagination: {
                                                paginationModel: {
                                                    pageSize: 20,
                                                },
                                            },
                                        }}
                                        slots={{
                                            toolbar: GridToolbar,
                                        }}
                                        disableRowSelectionOnClick
                                        getRowHeight={() => 'auto'} getEstimatedRowHeight={() => 200}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container >
    );
}