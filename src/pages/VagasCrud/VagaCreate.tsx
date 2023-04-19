import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Grid,
  Button,
  TextField,
  MenuItem
} from '@mui/material'
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';

import { Sidebar } from '../../components/sidebar/sidebar';
import { vaga_post } from '../../actions/Vaga';
import { empresa_get_search } from '../../actions/Empresa';

export default function VagaCreate({ setAuthorized }) {
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
  const [corporate_name, setCorporate_name] = useState('');
  const [address, setAddress] = useState('');

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
      let cnpjString = String(cnpj).replace(/\D/g, '')
      let info = await empresa_get_search(cnpjString)
      if (info.data[0] != undefined) {
        setCorporate_name(info.data[0].corporate_name)
        setAddress(info.data[0].address)
      }
    }
    )()
  }, []);

  const register_vaga = async () => {
    const weekly_hoursInt = parseInt(String(weekly_hours).replace(/\D/g, ''))
    vaga_post(
      role,
      corporate_name,
      weekly_hoursInt,
      address,
      physicality,
      vacancies,
      salary,
      description,
      requirements,
      cnpj
    )
    navigate('/vagas')
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
            display: 'flex',
            flexDirection: 'column',
            height: windowHeight,
            minHeight: 400,
            minWidth: 360,
            overflow: 'hidden',
            overflowY: 'scroll',
          }}>
            <Box sx={{ mx: 2 }}>
              <Box sx={{ my: 2 }}>
                <h2>Informações da Vaga</h2>
              </Box>
              <Box sx={{ my: 2 }}>
                <Grid container spacing={0} columns='16'>
                  <Grid xs={10}>
                    <Box sx={{ mr: 1 }}>
                      <TextField
                        id='role'
                        value={role}
                        fullWidth
                        label='Nome da vaga'
                        size='small'
                        onChange={(e) => setRole(e.target.value)}
                      />
                    </Box>
                  </Grid>
                  <Grid xs>
                    <Box sx={{ ml: 1 }}>
                      <InputMask
                        mask='99'
                        disabled={false}
                        maskChar=' '
                        value={weekly_hours}
                        onChange={(e) => setWeekly_hours(e.target.value)}
                      >
                        {() => <TextField
                          id='weekly_houes'
                          label='Horas semanais'
                          fullWidth
                          size='small'
                        />}
                      </InputMask>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ my: 2 }}>
                <Grid container spacing={0} columns='12'>
                  <Grid xs={4}>
                    <Box sx={{ mr: 1 }}>
                      <TextField
                        id='physicality'
                        value={physicality}
                        fullWidth
                        label='Fisicalidade'
                        size='small'
                        onChange={(e) => setPhysicality(e.target.value)}
                        select
                      >
                        <MenuItem value='presencial'>Presencial</MenuItem>
                        <MenuItem value='hibrido'>Hibrido</MenuItem>
                        <MenuItem value='online'>Online</MenuItem>
                      </TextField>
                    </Box>
                  </Grid>
                  <Grid xs>
                    <Box sx={{ mx: 1 }}>
                      <InputMask
                        mask='99999'
                        value={salary}
                        disabled={false}
                        maskChar=' '
                        onChange={(e) => setSalary(e.target.value)}
                      >
                        {() => <TextField
                          id='salary'
                          fullWidth
                          label='Salário'
                          size='small'
                        />}
                      </InputMask>
                    </Box>
                  </Grid>
                  <Grid xs>
                    <Box sx={{ ml: 1 }}>
                      <InputMask
                        mask='99'
                        value={vacancies}
                        disabled={false}
                        maskChar=' '
                        onChange={(e) => setVacancies(e.target.value)}
                      >
                        {() => <TextField
                          id='vacancies'
                          fullWidth
                          label='Número de vagas'
                          size='small'
                        />}
                      </InputMask>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ my: 2 }}>
                <Grid container spacing={0} columns='16'>
                  <Grid xs={16}>
                    <Box sx={{}}>
                      <TextField
                        id='description'
                        value={description}
                        fullWidth
                        label='Descrição da função e serviços (máximo 500 caracteres)'
                        size='small'
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
                <Grid container spacing={0} columns='16'>
                  <Grid xs={16}>
                    <Box sx={{}}>
                      <TextField
                        id='requirements'
                        value={requirements}
                        fullWidth
                        label='Requisitos e habilidades esperadas do estágiario (máximo 500 caracteres)'
                        size='small'
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
                <Grid xs></Grid>
                <Grid xs>
                  <Box sx={{ my: 2, ml: 1 }}>
                    <Button fullWidth sx={{
                      backgroundColor: '#072d69',
                      color: '#feea37'
                    }}
                      onClick={() => register_vaga()}>
                      Adicionar nova vaga
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