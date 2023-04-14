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
import { assinatura_post } from '../../actions/Assinatura';
import { empresa_get_search } from '../../actions/Empresa';
import { aluno_get } from '../../actions/Assinatura';

export default function AssinaturaCreate({ setAuthorized }) {
    const navigate = useNavigate()

    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [windowWidth, setWindowWidth] = useState(window.innerHeight);

    const params = new URLSearchParams(window.location.search);
    const [start_date, setStart_date] = useState([]);
    const [end_date, setEnd_date] = useState([]);
    const [weekly_hours, setWeekly_hours] = useState([]);
    const [salary, setSalary] = useState([]);
    const [transport_bonus, setTransport_bonus] = useState([]);
    const [description, setDescription] = useState([]);


    const [student_email, Set_student_email] = useState([]);
    const [student_id, Set_student_id] = useState([]);
    const [student_name, Set_student_name] = useState([])
    const [student_cpf, Set_student_cpf] = useState([]);
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

    const [cnpj, setCnpj] = useState(localStorage.getItem("cnpj"))
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
            var cnpjString = String(cnpj)
            cnpjString.replace(/\D/g, "")
            let info = await empresa_get_search(parseInt(cnpjString))
            console.log(info)
            if (info != null) {
                if (info.data[0] != null) {
                    setCorporate_name(info.data[0].corporate_name)
                    setLine_of_business(info.data[0].line_of_business)
                    setRh_person_name(info.data[0].representative_name)
                    SetRh_position_in_company(info.data[0].representative_job)
                    setRh_email(info.data[0].email)
                    setRh_telephone(info.data[0].telephone)
                    setAddress_cep(info.data[0].cep)
                    setAddress(info.data[0].address)
                    setAddress_number(info.data[0].number)
                    setAddress_city(info.data[0].city)
                    setAddress_state(info.data[0].state)
                    setAddress_complement(info.data[0].complement)
                }
            }

        }
        )()

    }, []);

    const register_assinatura = async () => {
        const student_data = {
            email: student_email,
            name: student_name,
            college: student_college,
            course: student_course,
            telephone: student_telephone,
            entry_year: student_entry_year,
            cep: student_cep,
            address: student_address,
            number: student_number,
            city: student_city,
            state: student_state,
            complement: student_complement
        }
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
        console.log(assinatura_post(start_date, end_date, weekly_hours, salary,
            transport_bonus, description, student_data, student_cpf, student_college,
            company_data, cnpj))
        //navigate("/assinatura")
    }

    const get_aluno = async () => {
        let info = await aluno_get(student_id, student_cpf)
        console.log(info.data)
        if (info != null) {
            if (info.data.data != null) {
                Set_student_email(info.data.data[0].email)
                Set_student_college(info.data.data[0].college)
                Set_student_name(info.data.data[0].name)
                Set_student_course(info.data.data[0].course)

                Set_student_entry_year(String(parseInt(info.data.data[0].entry_year)))
                Set_student_telephone(info.data.data[0].telephone)
                Set_student_address(info.data.data[0].address)
                Set_student_cep(info.data.data[0].cep)
                Set_student_city(info.data.data[0].city)
                Set_student_number(info.data.data[0].number)
                Set_student_state(info.data.data[0].state)
                Set_student_complement(info.data.data[0].complement)
            }
        }
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
                                Informações do estágio
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
                                                    label="Data inicio do estágio(foramto YYYY-MM-DD)"
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
                                                    label="Data do fim do estágio(foramto YYYY-MM-DD)"
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
                                                    label="Valor vale tranporte"
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
                                                maxRows={4}
                                                inputProps={{ maxLength: 1000 }}
                                                size="small"
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ my: 2 }}>
                                Informações do estágiario
                            </Box>



                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs={7}>
                                        <Box sx={{ mr: 1 }}>
                                            <TextField
                                                id="student_cpf"
                                                value={student_cpf}
                                                fullWidth
                                                label="CPF do estágiario"
                                                size="small"
                                                onChange={(e) => Set_student_cpf(e.target.value)}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid xs>
                                        <Box sx={{ ml: 1 }}>
                                            <TextField
                                                value={student_id}
                                                id="student_id"
                                                label="ID do estágiario (caso não saiba contate o mesmo)"
                                                fullWidth
                                                size="small"
                                                onChange={(e) => Set_student_id(e.target.value)}
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
                                            onClick={() => get_aluno()}>
                                            Preencher informações estágiario
                                        </Button>
                                    </Box>
                                </Grid>
                            </Box>

                            <Box sx={{ my: 2 }}>
                                <Box sx={{ m: 0 }}>
                                    <TextField
                                        id="student_name"
                                        value={student_name}
                                        fullWidth
                                        label="Nome do estágiario"
                                        defaultValue=""
                                        size="small"
                                        inputProps={{ readOnly: true, disableUnderline: true }}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs={10}>
                                        <Box sx={{ mr: 1 }}>
                                            <TextField
                                                id="student_college"
                                                value={student_college}
                                                fullWidth
                                                label="Universidade estágiario"
                                                defaultValue=""
                                                size="small"
                                                inputProps={{ readOnly: true, disableUnderline: true }}
                                            />

                                        </Box>
                                    </Grid>
                                    <Grid xs>
                                        <Box sx={{ ml: 1 }}>
                                            <TextField
                                                id="student_course"
                                                value={student_course}
                                                fullWidth
                                                label="Curso do estágiario"
                                                defaultValue=""
                                                size="small"
                                                inputProps={{ readOnly: true, disableUnderline: true }}
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
                                                    label="Telefone do estágiario"
                                                    defaultValue=""
                                                    size="small"
                                                    inputProps={{ readOnly: true, disableUnderline: true }}
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
                                                defaultValue=""
                                                fullWidth
                                                size="small"
                                                inputProps={{ readOnly: true, disableUnderline: true }}
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
                                                    label="CEP do Estágiario"
                                                    defaultValue=""
                                                    size="small"
                                                    inputProps={{ readOnly: true, disableUnderline: true }}
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
                                                defaultValue=""
                                                fullWidth
                                                size="small"
                                                inputProps={{ readOnly: true, disableUnderline: true }}
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
                                                defaultValue=""
                                                size="small"
                                                inputProps={{ readOnly: true, disableUnderline: true }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid xs>
                                        <Box sx={{ mx: 1 }}>
                                            <TextField
                                                id="student_address"
                                                value={student_address}
                                                label="Cidade"
                                                defaultValue=""
                                                fullWidth
                                                size="small"
                                                inputProps={{ readOnly: true, disableUnderline: true }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid xs>
                                        <Box sx={{ ml: 1 }}>
                                            <TextField
                                                id="student_state"
                                                value={student_state}
                                                label="Estado"
                                                defaultValue=""
                                                fullWidth
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
                                        <Box sx={{ m: 0 }}>
                                            <TextField
                                                id="student_complement"
                                                value={student_complement}
                                                label="Complemento"
                                                defaultValue=""
                                                fullWidth
                                                size="small"
                                                inputProps={{ readOnly: true, disableUnderline: true }}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                        </Box>
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
                                                inputProps={{ readOnly: true, disableUnderline: true }}
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
                                                    inputProps={{ readOnly: true, disableUnderline: true }}
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
                                        inputProps={{ readOnly: true, disableUnderline: true }}
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
                                                defaultValue=""
                                                size="small"
                                                inputProps={{ readOnly: true, disableUnderline: true }}
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
                                                inputProps={{ readOnly: true, disableUnderline: true }}
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
                                                    defaultValue=""
                                                    size="small"
                                                    inputProps={{ readOnly: true, disableUnderline: true }}
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
                                                inputProps={{ readOnly: true, disableUnderline: true }}
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
                                                    label="CEP"
                                                    defaultValue=""
                                                    size="small"
                                                    inputProps={{ readOnly: true, disableUnderline: true }}
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
                                                inputProps={{ readOnly: true, disableUnderline: true }}
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
                                                inputProps={{ readOnly: true, disableUnderline: true }}
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
                                                inputProps={{ readOnly: true, disableUnderline: true }}
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
                                                inputProps={{ readOnly: true, disableUnderline: true }}
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
                                                inputProps={{ readOnly: true, disableUnderline: true }}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>


                        </Box>

                        <Box sx={{ my: 2 }}>
                            <Grid xs></Grid>
                            <Grid xs>
                                <Box sx={{ my: 2, ml: 1 }}>
                                    <Button fullWidth sx={{
                                        backgroundColor: "red"

                                    }}
                                        onClick={() => register_assinatura()}>
                                        Assinar estágio
                                    </Button>
                                </Box>
                            </Grid>
                        </Box>


                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}