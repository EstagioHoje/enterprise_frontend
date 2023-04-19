import * as React from 'react';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputMask from "react-input-mask";
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid';

import { Sidebar } from '../../components/sidebar/sidebar';

import { vaga_put } from '../../actions/Vaga';
import { vaga_get_search } from '../../actions/Vaga';
import { vaga_delete } from '../../actions/Vaga';
import { vaga_candidates } from '../../actions/Vaga';
import { empresa_get_search } from '../../actions/Empresa';

export default function VagaReadUpdateDelete({ setAuthorized }) {
  const navigate = useNavigate()
  const [cnpj, setCnpj] = useState(sessionStorage.getItem("cnpj"))

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerHeight);

  const [role, setRole] = useState('');
  const [weekly_hours, setWeekly_hours] = useState('');
  const [physicality, setPhysicality] = useState('');
  const [vacancies, setVacancies] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [id, setId] = useState('');
  const [rows, setRows] = useState('')

  const columns: GridColDef[] = [{
    field: 'name',
    headerName: 'Nome',
    width: 200
  },{
    field: 'course',
    headerName: 'Curso',
    width: 200
  },{
    field: 'college',
    headerName: 'Universidade',
    width: 200
  },{
    field: 'resumee',
    headerName: 'Curriculo',
    width: 200
  },{
    field: 'id',
    headerName: 'CPF do aluno',
    width: 150
  }];

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
      let vaga = await vaga_get_search(params.get("id"))
      if (vaga != null) {
        if (vaga.data[0] != null) {
          setRole(vaga.data[0].role)
          setWeekly_hours(vaga.data[0].weekly_hours)
          setPhysicality(vaga.data[0].physicality)
          setVacancies(vaga.data[0].vacancies)
          setSalary(vaga.data[0].salary)
          setDescription(vaga.data[0].description)
          setRequirements(vaga.data[0].requirements)
        }
      }
      let candidatos = await vaga_candidates(params.get("id"))
      if (candidatos.data[0] != undefined) {
        const listOfCandidatos = candidatos.data.reduce(function (result, element) {
          const arrayCandidatos = {};
          arrayCandidatos.name = element.name;
          arrayCandidatos.course = element.course;
          arrayCandidatos.college = element.college;
          arrayCandidatos.resumee = element.resumee;
          arrayCandidatos.id = element.cpf;
          result.push(arrayCandidatos)
          return result;
        }, []);
        setRows(listOfCandidatos);
      }
    }
    )()
  }, []);

  const update_vaga = async () => {
    let weekly_hoursInt = parseInt(String(weekly_hours).replace(/\D/g, ""))
    vaga_put(
      role,
      weekly_hoursInt,
      physicality,
      vacancies,
      salary,
      description,
      requirements,
      cnpj
    )
    navigate("/vagas")
  }

  const delete_vaga = async () => {
    vaga_delete(id)
    navigate("/vagas")
  }

  return (
    <Container disableGutters maxWidth={windowWidth} sx={{ padding: 0 }}>
      <Box sx={{ minWidth: 600, minHeight: 300, height: windowHeight, padding: 0, mb: 0 }}>
        <Grid container spacing={0}>
          <Grid sx={{ maxWidth: 240, minWidth: 240 }}>
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
            <Box sx={{ mx: 2 }}>
              <Box sx={{ my: 2 }}>
                <h2>Informações da Vaga</h2>
              </Box>
              <Box sx={{ my: 2 }}>
                <Grid container spacing={0} columns="16">
                  <Grid xs={10}>
                    <Box sx={{ mr: 1 }}>
                      <TextField
                        id="role"
                        value={role}
                        fullWidth
                        label="Nome da vaga"
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
                        <MenuItem value="online">Online</MenuItem>
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
                          label="Número de vagas"
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
                <Grid container spacing={0} columns="16">
                  <Grid xs>
                    <Box sx={{ my: 2, mr: 1 }}>
                      <Button fullWidth sx={{
                        backgroundColor: '#072d69',
                        color: '#feea37'
                      }}
                        onClick={() => update_vaga()}>
                        Salvar informações
                      </Button>
                    </Box>
                  </Grid>
                  <Grid xs>
                    <Box sx={{ my: 2, ml: 1 }}>
                      <Button fullWidth sx={{
                        backgroundColor: '#cb1d1d',
                        color: '#feea37'
                      }}
                        onClick={() => delete_vaga()}>
                        Excluir vaga
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ my: 2 }}>
                  <h2>Candidatos que aplicaram para a vaga:</h2>
                </Box>
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