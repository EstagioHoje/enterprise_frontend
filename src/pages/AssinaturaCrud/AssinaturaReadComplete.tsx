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
import { Collapse } from '@mui/material';

import { Sidebar } from '../../components/sidebar/sidebar';

import { relatorio_post } from '../../actions/Relatorio';
import { assinatura_get_search, assinatura_empresa, assinatura_reject_company } from '../../actions/Assinatura';
import { empresa_get_search } from '../../actions/Empresa';

export default function AssinaturaReadComplete({ setAuthorized }) {
  const navigate = useNavigate()

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerHeight);

  const params = new URLSearchParams(window.location.search);
  const [id, setId] = useState(params.get("id"))
  const [start_date, setStart_date] = useState([]);
  const [end_date, setEnd_date] = useState([]);
  const [weekly_hours, setWeekly_hours] = useState([]);
  const [salary, setSalary] = useState([]);
  const [transport_bonus, setTransport_bonus] = useState([]);
  const [description, setDescription] = useState([]);

  const [student_email, Set_student_email] = useState([]);
  const [student_id, Set_student_id] = useState([]);
  const [student_name, Set_student_name] = useState([])
  const [student_cpf, Set_student_cpf] = useState(sessionStorage.getItem("cpf"));
  const [student_college, Set_student_college] = useState([]);
  const [student_course, Set_student_course] = useState([]);
  const [student_entry_year, Set_student_entry_year] = useState([]);
  const [student_telephone, Set_student_telephone] = useState([]);
  const [student_address, Set_student_address] = useState([]);
  const [student_cep, Set_student_cep] = useState([]);
  const [student_city, Set_student_city] = useState([]);
  const [student_number, Set_student_number] = useState([]);
  const [student_state, Set_student_state] = useState([]);
  const [student_complement, Set_student_complement] = useState([]);

  const [cnpj, setCnpj] = useState(sessionStorage.getItem("cnpj"))
  const [corporate_name, setCorporate_name] = useState([])
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
  const [reject_reason, setReject_reason] = useState([])
  const [status, setStatus] = useState([])
  const dictStatus = {
    "a": false,
    "b": true,
    "c": true,
    "f": true,
    "g": true,
  }

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
      let info = await assinatura_get_search(params.get("id"))
      // console.log(info.data)
      if (info != null) {
        if (info.data != null) {
          const infoCorporate = info.data.company_data
          setCorporate_name(infoCorporate.corporate_name)
          setLine_of_business(infoCorporate.line_of_business)
          setRh_person_name(infoCorporate.representative_name)
          SetRh_position_in_company(infoCorporate.representative_job)
          setRh_email(infoCorporate.email)
          setRh_telephone(infoCorporate.telephone)
          setAddress_cep(infoCorporate.cep)
          setAddress(infoCorporate.address)
          setAddress_number(infoCorporate.number)
          setAddress_city(infoCorporate.city)
          setAddress_state(infoCorporate.state)
          setAddress_complement(infoCorporate.complement)

          const infoStudent = info.data.student_data
          Set_student_email(infoStudent.email)
          Set_student_college(infoStudent.college)
          Set_student_name(infoStudent.name)
          Set_student_course(infoStudent.course)

          Set_student_entry_year(String(parseInt(infoStudent.entry_year)))
          Set_student_telephone(infoStudent.telephone)
          Set_student_address(infoStudent.address)
          Set_student_cep(infoStudent.cep)
          Set_student_city(infoStudent.city)
          Set_student_number(infoStudent.number)
          Set_student_state(infoStudent.state)
          Set_student_complement(infoStudent.complement)

          setStart_date(info.data.start_date)
          setEnd_date(info.data.end_date)
          setWeekly_hours(info.data.weekly_hours)
          setSalary(info.data.salary)
          setTransport_bonus(info.data.transport_bonus)
          setDescription(info.data.description)
          setStatus(dictStatus[info.data.status])
        }
      }
    }
    )()
  }, []);

  const apply = async () => {
    console.log(assinatura_empresa(id))
    navigate("/assinatura")
  }

  const reject = async () => {
    console.log(assinatura_reject_company(id, reject_reason))
    navigate("/assinatura")
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
                <h1>Proposta de contrato</h1>
                <h2>Informações da Vaga</h2>
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
                      >
                        {() => <TextField
                          id="start_date"
                          label="Data de inicio do estágio (YYYY-MM-DD)"
                          fullWidth
                          size="small"
                          inputProps={{ readOnly: true }}
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
                      >
                        {() => <TextField
                          id="start_date"
                          label="Data de fim do estágio (YYYY-MM-DD)"
                          fullWidth
                          size="small"
                          inputProps={{ readOnly: true }}
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
                      >
                        {() => <TextField
                          id="weekly_hours"
                          label="Horas semanais"
                          fullWidth
                          size="small"
                          inputProps={{ readOnly: true }}
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
                      >
                        {() => <TextField
                          id="salary"
                          label="Salário"
                          fullWidth
                          size="small"
                          inputProps={{ readOnly: true }}
                        />}
                      </InputMask>
                    </Box>
                  </Grid>
                  <Grid xs>
                    <Box sx={{ ml: 1 }}>
                      <InputMask
                        mask="99"
                        disabled={false}
                        maskChar=" "
                        value={transport_bonus}
                      >
                        {() => <TextField
                          id="transport_bonus"
                          label="Vale tranporte"
                          fullWidth
                          size="small"
                          inputProps={{ readOnly: true }}
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
                        label="Descreva as funções do aluno (Máximo 1000 caracteres)"
                        multiline
                        maxRows={4}
                        inputProps={{ readOnly: true }}
                        size="small"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ my: 2 }}>
                <h2>Informações do aluno</h2>
              </Box>
              <Box sx={{ my: 2 }}>
                <Grid container spacing={0} columns="16">
                  <Grid xs>
                    <Box sx={{ mr: 1 }}>
                      <TextField
                        id="student_name"
                        value={student_name}
                        fullWidth
                        label="Nome do aluno"
                        size="small"
                        inputProps={{ readOnly: true }}
                      />
                    </Box>
                  </Grid>
                  <Grid xs={7}>
                    <Box sx={{ mr: 1 }}>
                      <TextField
                        id="student_email"
                        value={student_email}
                        fullWidth
                        label="Email do aluno"
                        size="small"
                        inputProps={{ readOnly: true }}
                      />
                    </Box>
                  </Grid>

                </Grid>
              </Box>
              <Box sx={{ my: 2 }}>
                <Grid container spacing={0} columns="16">
                  <Grid xs={10}>
                    <Box sx={{ mr: 1 }}>
                      <TextField
                        id="student_college"
                        value={student_college}
                        fullWidth
                        label="Universidade do aluno"
                        size="small"
                        inputProps={{ readOnly: true }}
                      />
                    </Box>
                  </Grid>
                  <Grid xs>
                    <Box sx={{ ml: 1 }}>
                      <TextField
                        id="student_course"
                        value={student_course}
                        fullWidth
                        label="Curso do aluno"
                        size="small"
                        inputProps={{ readOnly: true }}
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
                        value={student_telephone}
                        disabled={false}
                        maskChar=" "
                      >
                        {() => <TextField
                          id="student_telephone"
                          fullWidth
                          label="Telefone do aluno"
                          size="small"
                          inputProps={{ readOnly: true }}
                        />}
                      </InputMask>
                    </Box>
                  </Grid>
                  <Grid xs>
                    <Box sx={{ ml: 1 }}>
                      <TextField
                        id="student_entry_year"
                        value={student_entry_year}
                        label="Ano de ingresso"
                        fullWidth
                        size="small"
                        inputProps={{ readOnly: true }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>


              <Box sx={{ my: 2 }}>
                <Grid container spacing={0} columns="16">
                  <Grid xs={5}>
                    <Box sx={{ mr: 1 }}>
                      <InputMask
                        mask="99999-999"
                        value={student_cep}
                        disabled={false}
                        maskChar=" "
                      >
                        {() => <TextField
                          id="student_cep"
                          fullWidth
                          label="CEP do aluno"
                          size="small"
                          inputProps={{ readOnly: true }}
                        />}
                      </InputMask>
                    </Box>
                  </Grid>
                  <Grid xs>
                    <Box sx={{ ml: 1 }}>
                      <TextField
                        id="address"
                        value={student_address}
                        label="Endereço"
                        fullWidth
                        size="small"
                        inputProps={{ readOnly: true }}
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
                        id="student_number"
                        value={student_number}
                        fullWidth
                        label="Número"
                        size="small"
                        inputProps={{ readOnly: true }}
                      />
                    </Box>
                  </Grid>
                  <Grid xs>
                    <Box sx={{ mx: 1 }}>
                      <TextField
                        id="student_address"
                        value={student_address}
                        label="Cidade"
                        fullWidth
                        size="small"
                        inputProps={{ readOnly: true }}
                      />
                    </Box>
                  </Grid>
                  <Grid xs>
                    <Box sx={{ ml: 1 }}>
                      <TextField
                        id="student_state"
                        value={student_state}
                        label="Estado"
                        fullWidth
                        size="small"
                        inputProps={{ readOnly: true }}
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
                        id="student_complement"
                        value={student_complement}
                        label="Complemento"
                        fullWidth
                        size="small"
                        inputProps={{ readOnly: true }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box sx={{ mx: 2 }}>
              <Box sx={{ my: 2 }}>
                <h2>Informações da Empresa</h2>
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
                        inputProps={{ readOnly: true }}
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
                      >
                        {() => <TextField
                          id="cnpj"
                          label="CNPJ"
                          fullWidth
                          size="small"
                          inputProps={{ readOnly: true }}
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
                    size="small"
                    inputProps={{ readOnly: true }}
                  />
                </Box>
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
                        size="small"
                        inputProps={{ readOnly: true }}
                      />
                    </Box>
                  </Grid>
                  <Grid xs>
                    <Box sx={{ ml: 1 }}>
                      <TextField
                        id="rh_position_in_company"
                        value={rh_position_in_company}
                        label="Cargo"
                        fullWidth
                        size="small"
                        inputProps={{ readOnly: true }}
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
                      >
                        {() => <TextField
                          id="rh_telephone"
                          fullWidth
                          label="Telefone do RH"
                          size="small"
                          inputProps={{ readOnly: true }}
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
                        fullWidth
                        size="small"
                        inputProps={{ readOnly: true }}
                      />
                    </Box>
                  </Grid>
                </Grid>
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
                      >
                        {() => <TextField
                          id="address_cep"
                          fullWidth
                          label="CEP da empresa"
                          size="small"
                          inputProps={{ readOnly: true }}
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
                        fullWidth
                        size="small"
                        inputProps={{ readOnly: true }}
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
                        size="small"
                        inputProps={{ readOnly: true }}
                      />
                    </Box>
                  </Grid>
                  <Grid xs>
                    <Box sx={{ mx: 1 }}>
                      <TextField
                        id="address_city"
                        value={address_city}
                        label="Cidade"
                        fullWidth
                        size="small"
                        inputProps={{ readOnly: true }}
                      />
                    </Box>
                  </Grid>
                  <Grid xs>
                    <Box sx={{ ml: 1 }}>
                      <TextField
                        id="address_state"
                        value={address_state}
                        label="Estado"
                        fullWidth
                        size="small"
                        inputProps={{ readOnly: true }}
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
                        fullWidth
                        size="small"
                        inputProps={{ readOnly: true }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Collapse in={!status}>
                <Box sx={{ my: 2 }}>
                  <Grid container spacing={0} columns="16">
                    <Grid xs>
                      <Box sx={{ my: 2, mr: 1 }}>
                        <Button fullWidth sx={{
                          backgroundColor: '#072d69',
                          color: '#feea37'
                        }}
                          onClick={() => apply()}>
                          Aprovar contrato
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ my: 2 }}>
                  <Grid container spacing={0} columns="16">
                    <Grid xs>
                      <TextField
                        id="reject_reason"
                        value={reject_reason}
                        label="Caso queira rejeitar o contrato explique o motivo"
                        fullWidth
                        size="small"
                        multiline
                        rows={4}
                        inputProps={{ maxLength: 1000 }}
                        onChange={(e) => setReject_reason(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={0} columns="16">
                    <Grid xs>
                      <Box sx={{ my: 2, mr: 1 }}>
                        <Button fullWidth sx={{
                          backgroundColor: '#cb1d1d',
                          color: '#feea37'
                        }}
                          onClick={() => reject()}>
                          Rejeitar contrato
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Collapse>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
