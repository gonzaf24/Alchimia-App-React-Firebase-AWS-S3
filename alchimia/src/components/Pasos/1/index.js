import React, { Fragment, useState } from "react";
import { useInputValue } from "../../../hooks/useInputValue";
import { Error, Form, TextF, Div, DateF } from "./styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { SubmitButton } from "../../SubmitButton";
import { Helmet } from "react-helmet";
import { es } from "date-fns/locale";
import Container from "@material-ui/core/Container";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import countriesList from "../../../assets/countries/countries.json";
import profesionesList from "../../../assets/countries/profesiones.json";
import sexoList from "../../../assets/countries/sexo.json";
import FormControl from "@material-ui/core/FormControl";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
let ciudadesList = [];

export const Paso1 = ({ error, disabled, onSubmit, userID }) => {
  const [sexo, setSexo] = useState("");
  const nombre = useInputValue("");
  const apellido = useInputValue("");
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const telefono = useInputValue("");
  const [pais, setPais] = useState("");
  const [estadoCiudad, setEstadoCiudad] = useState("");
  const [profesiones, setProfesiones] = useState([]);
  const [intereses, setIntereses] = useState([]);
  const [inputValueSexo, setInputValueSexo] = useState("");
  const [inputValuePais, setInputValuePais] = useState("");
  const [inputValueEstadoCiudad, setInputValueEstadoCiudad] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    var profesionesList = profesiones.map(function (prof) {
      return prof.id;
    });
    var interesesList = intereses.map(function (inter) {
      return inter.id;
    });
    var seguidoresSeguidos = [];
    seguidoresSeguidos.push(userID);
    onSubmit({
      sexo: inputValueSexo,
      nombre: nombre.value,
      apellido: apellido.value,
      fechaNacimiento: fechaNacimiento.value,
      telefono: telefono.value,
      pais: inputValuePais,
      estadoCiudad: inputValueEstadoCiudad,
      profesiones: profesionesList,
      intereses: interesesList,
      seguidores: seguidoresSeguidos,
      seguidos: seguidoresSeguidos,
    });
  };

  const handleChangeSexo = (event) => {
    setSexo(event.target.value);
  };

  const handleDateChange = (date) => {
    setFechaNacimiento(date);
  };

  const handleChangePais = (e) => {
    setPais(e.CountryName);
    ciudadesList = e.States;
  };

  return (
    <Fragment>
      <Helmet>
        <title>Completa Datos Perfil | Alchimia </title>
        <meta name="description" content={"completar datos de registro 1/3"} />
      </Helmet>
      <Container>
        <Div>
          <Form disabled={disabled} onSubmit={handleSubmit}>
            <FormControl>
              <h2>Completa los siguientes datos</h2>
              <Autocomplete
                id="sexoID"
                value={sexo}
                disabled={disabled}
                inputValue={inputValueSexo}
                options={sexoList}
                getOptionLabel={(option) => option.text}
                renderOption={(option) => (
                  <React.Fragment>{option.text}</React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label="Sexo"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
                onInputChange={(event, newInputValue) => {
                  setInputValueSexo(newInputValue);
                }}
                onChange={(_, selectedOptions) => setSexo(selectedOptions)}
              />

              <TextF
                required
                id="standard-required"
                label="Nombre"
                disabled={disabled}
                placeholder="nombre"
                {...nombre}
              />
              <TextF
                required
                id="standard-required"
                label="Apellido"
                disabled={disabled}
                placeholder="apellido"
                {...apellido}
              />

              <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                <DateF
                  disabled={disabled}
                  required
                  margin="normal"
                  id="date-picker-dialog-required"
                  label="Fecha Nacimiento"
                  format="dd/MM/yyyy"
                  value={fechaNacimiento}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>

              <Autocomplete
                id="paisID"
                inputValue={inputValuePais}
                disabled={disabled}
                options={countriesList.Countries}
                autoHighlight
                getOptionLabel={(option) => option.CountryName}
                renderOption={(option) => (
                  <React.Fragment>{option.CountryName}</React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label="Pais (donde vives)"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
                onInputChange={(event, newInputValue) => {
                  setInputValuePais(newInputValue);
                }}
                onChange={(event, value) => handleChangePais(value)}
              />

              <Autocomplete
                id="ciudadID"
                options={ciudadesList}
                autoHighlight
                inputValue={inputValueEstadoCiudad}
                disabled={disabled}
                getOptionLabel={(option) => option.StateName}
                renderOption={(option) => (
                  <React.Fragment>{option.StateName}</React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label="Ciudad (donde vives)"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
                onInputChange={(event, newInputValue) => {
                  setInputValueEstadoCiudad(newInputValue);
                }}
                onChange={(event, value) => setEstadoCiudad(value.StateName)}
              />

              <TextF
                required
                id="standard-required"
                label="Telefono"
                disabled={disabled}
                placeholder="Ej: +34653058319"
                {...telefono}
              />

              <Autocomplete
                id="profesionesID"
                multiple
                disableCloseOnSelect
                value={profesiones}
                disabled={disabled}
                options={profesionesList}
                getOptionLabel={(option) => option.id}
                renderInput={(params) => (
                  <TextField {...params} label="Profesiones" />
                )}
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.id}
                  </React.Fragment>
                )}
                onChange={(_, selectedOptions) =>
                  setProfesiones(selectedOptions)
                }
              />

              <Autocomplete
                id="interesesID"
                multiple
                disableCloseOnSelect
                value={intereses}
                disabled={disabled}
                options={profesionesList}
                getOptionLabel={(option) => option.id}
                renderInput={(params) => (
                  <TextField {...params} label="Intereses" />
                )}
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.id}
                  </React.Fragment>
                )}
                onChange={(_, selectedOptions) => setIntereses(selectedOptions)}
              />
              <br />
              {error && (
                <Error>
                  <br />
                  {error}
                  <br />
                </Error>
              )}
              <br />
              <SubmitButton disabled={disabled}>siguiente</SubmitButton>
            </FormControl>
          </Form>
        </Div>
      </Container>
    </Fragment>
  );
};
