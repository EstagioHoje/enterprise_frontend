import * as React from 'react';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import logo from '../../data/logo.png';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { Collapse } from '@mui/material';

import teacherButtons from '../../data/teacherButtons.json'
import { Sidebar } from '../../components/sidebar/sidebar';
import { vaga_get_all } from '../../actions/Vaga';
import { vaga_get_all_cnpj } from '../../actions/Vaga';


export default function VagaRead({ setAuthorized }) {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [rows, setRows] = useState([])

  const expanded = true;
  const navigate = useNavigate();
  const cnpj = localStorage.getItem('cnpj')

  const columns: GridColDef[] = [{
    field: 'id',
    headerName: '',
    width: 90,
    type: 'boolean',
    renderCell: (params) => (
      <Link component={RouterLink} to={`/vagas/read?id=${params.value}`}>
        Acessar
      </Link>
    )
  }, {
    field: 'role',
    headerName: 'Nome da vaga',
    width: 240
  }, {
    field: 'salary',
    headerName: 'Salário',
    width: 120,
    type: 'number'
  }, {
    field: 'weekly_hours',
    headerName: 'Horas semanais',
    width: 120
  }];

  useEffect(() => {
    (async () => {
      let vagas = await vaga_get_all_cnpj(cnpj);
      if (vagas.data[0] != undefined) {
        const listOfVagas = vagas.data.reduce(function (result, element) {
          const arrayVaga = {};
          arrayVaga.id = element.id;
          arrayVaga.role = element.role;
          arrayVaga.salary = element.salary;
          arrayVaga.weekly_hours = element.weekly_hours;
          result.push(arrayVaga);
          return result;
        }, []);
        setRows(listOfVagas);
      }
    }
    )()
  }, []);

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
            <Grid container spacing={0} columns='16'>
              <Grid xs>
                <Collapse in={expanded}>
                  <Box sx={{ my: 2, ml: 1 }}>
                    <Button fullWidth sx={{
                      backgroundColor: '#072d69',
                      color: '#feea37'
                    }}
                      onClick={() => navigate('/vagas/create')}>
                      Criar nova vaga
                    </Button>
                  </Box>
                </Collapse>
              </Grid>
            </Grid>
            <Box sx={{ width: '100%', height: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 20,
                    },
                  },
                  filter: {
                    filterModel: {
                      items: [{ field: 'id', operator: 'is', value: 'true' }]
                    },
                  },
                }}
                slots={{
                  toolbar: GridToolbar,
                }}
                disableRowSelectionOnClick
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}