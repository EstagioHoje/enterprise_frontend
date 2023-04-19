import * as React from 'react';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputMask from "react-input-mask";
import { useNavigate } from 'react-router-dom';

import { Sidebar } from '../../components/sidebar/sidebar';

import { aluno_get_search, assinatura_post } from '../../actions/Assinatura';
import { empresa_get_search } from '../../actions/Empresa';

export default function AssinaturaCreate({ setAuthorized }) {
  const navigate = useNavigate()
  const [cnpj, setCnpj] = useState(sessionStorage.getItem("cnpj"))

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerHeight);

  const [student_cpf, Set_student_cpf] = useState('');
  const [start_date, setStart_date] = useState('');
  const [end_date, setEnd_date] = useState('');
  const [weekly_hours, setWeekly_hours] = useState('');
  const [salary, setSalary] = useState('');
  const [transport_bonus, setTransport_bonus] = useState('');
  const [description, setDescription] = useState('');

  const [corporate_name, setCorporate_name] = useState('')
  const [line_of_business, setLine_of_business] = useState('')
  const [rh_person_name, setRh_person_name] = useState('')
  const [rh_position_in_company, SetRh_position_in_company] = useState('')
  const [rh_email, setRh_email] = useState('')
  const [rh_telephone, setRh_telephone] = useState('')
  const [address_cep, setAddress_cep] = useState('')
  const [address, setAddress] = useState('')
  const [address_number, setAddress_number] = useState('')
  const [address_city, setAddress_city] = useState('')
  const [address_state, setAddress_state] = useState('')
  const [address_complement, setAddress_complement] = useState('')

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
      let cnpjString = String(cnpj).replace(/\D/g, "")
      let empresa = await empresa_get_search(cnpjString)
      if (empresa.data[0] != undefined) {
        setCorporate_name(empresa.data[0].corporate_name)
        setLine_of_business(empresa.data[0].line_of_business)
        setRh_person_name(empresa.data[0].representative_name)
        SetRh_position_in_company(empresa.data[0].representative_job)
        setRh_email(empresa.data[0].email)
        setRh_telephone(empresa.data[0].telephone)
        setAddress_cep(empresa.data[0].cep)
        setAddress(empresa.data[0].address)
        setAddress_number(empresa.data[0].number)
        setAddress_city(empresa.data[0].city)
        setAddress_state(empresa.data[0].state)
        setAddress_complement(empresa.data[0].complement)
      }
    }
    )()
  }, []);

  const send_proposta = async () => {
    let aluno = await aluno_get_search(String(student_cpf).replace(/\D/g, ""))
    let weekly_hoursInt = parseInt(String(weekly_hours).replace(/\D/g, ""))
    let salaryInt = parseInt(String(salary).replace(/\D/g, ""))
    let transport_bonusInt = parseInt(String(transport_bonus).replace(/\D/g, ""))
    if (aluno.data.data[0] !== undefined) {
      const company_data = {
        cnpj: cnpj,
        corporate_name: corporate_name,
        fantasy_name: corporate_name,
        line_of_business: line_of_business,
        representative_name: rh_person_name,
        representative_job: rh_position_in_company,
        email: rh_email,
        telephone: rh_telephone,
        cep: address_cep,
        address: address,
        number: address_number,
        city: address_city,
        state: address_state,
        complement: address_complement
      }
      await assinatura_post(
        student_cpf,
        company_data,
        cnpj,
        start_date,
        end_date,
        weekly_hoursInt,
        salaryInt,
        transport_bonusInt,
        'a',
        description
      )
      navigate("/assinatura")
    }
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
                <h1>Proposta de Contrato</h1>
              </Box>
              <Box sx={{ my: 2 }}>
                <Grid xs>
                  <Box sx={{ mr: 1 }}>
                    <InputMask
                        mask="999.999.999-99"
                        disabled={false}
                        maskChar=" "
                        value={student_cpf}
                        onChange={(e) => Set_student_cpf(e.target.value)}
                      >
                        {() => <TextField
                          id="student_cpf"
                          label="CPF do aluno"
                          fullWidth
                          size="small"
                        />}
                      </InputMask>
                  </Box>
                </Grid>
              </Box>
              <Box sx={{ my: 2 }}>
                <Grid container spacing={0} columns="12">
                  <Grid xs={4}>
                    <Box sx={{ mr: 1 }}>
                      <InputMask
                        mask="9999-99-99"
                        disabled={false}
                        maskChar=" "
                        value={start_date}
                        onChange={(e) => setStart_date(e.target.value)}
                      >
                        {() => <TextField
                          id="start_date"
                          label="Data de inicio do estágio (YYYY-MM-DD)"
                          fullWidth
                          size="small"
                        />}
                      </InputMask>
                    </Box>
                  </Grid>
                  <Grid xs={4}>
                    <Box sx={{ mx: 1 }}>
                      <InputMask
                        mask="9999-99-99"
                        disabled={false}
                        maskChar=" "
                        value={end_date}
                        onChange={(e) => setEnd_date(e.target.value)}
                      >
                        {() => <TextField
                            id="start_date"
                            label="Data de fim do estágio (YYYY-MM-DD)"
                            fullWidth
                            size="small"
                        />}
                      </InputMask>
                    </Box>
                  </Grid>
                  <Grid xs={4}>
                    <Box sx={{ ml: 1 }}>
                      <InputMask
                        mask="99"
                        disabled={false}
                        maskChar=" "
                        value={weekly_hours}
                        onChange={(e) => setWeekly_hours(e.target.value)}
                      >
                        {() => <TextField
                            id="weekly_hours"
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
                <Grid container spacing={0} columns="16">
                  <Grid xs>
                    <Box sx={{ mr: 1 }}>
                      <InputMask
                        mask="99999"
                        disabled={false}
                        maskChar=" "
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                      >
                        {() => <TextField
                          id="salary"
                          label="Salário"
                          fullWidth
                          size="small"
                        />}
                      </InputMask>
                    </Box>
                  </Grid>
                  <Grid xs>
                    <Box sx={{ ml: 1 }}>
                      <InputMask
                        mask="9999"
                        disabled={false}
                        maskChar=" "
                        value={transport_bonus}
                        onChange={(e) => setTransport_bonus(e.target.value)}
                      >
                        {() => <TextField
                          id="transport_bonus"
                          label="Vale tranporte"
                          fullWidth
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
                        id="avaliation"
                        value={description}
                        fullWidth
                        label="Descreva as funções do estágiario (Máximo 1000 caracteres)"
                        onChange={(e) => setDescription(e.target.value)}
                        multiline
                        rows={4}
                        inputProps={{ maxLength: 1000 }}
                        size="small"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ my: 2 }}>
                <Grid xs>
                  <Box sx={{ my: 2, ml: 1 }}>
                    <Button
                      fullWidth
                      onClick={() => send_proposta()}
                      sx={{
                        backgroundColor: '#072d69',
                        color: '#feea37'
                      }}
                    >
                      Enviar proposta ao aluno
                    </Button>
                  </Box>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}