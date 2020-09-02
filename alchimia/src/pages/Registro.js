import React, { useContext } from "react";
import { Context } from "../Context";
import { Registro as RegistroComponent } from "../components/Registro";
import { RegisterMutation } from "../container/RegisterMutation";
import { navigate } from "@reach/router";
import Container from "@material-ui/core/Container";

export const Registro = () => {
  const { activateAuth } = useContext(Context);

  return (
    <>
      <RegisterMutation>
        {(signup, { data, loading, error }) => {
          const onSubmit = ({ email, password }) => {
            const input = { email, password };
            const variables = { input };
            signup({ variables }).then(({ data }) => {
              const { signup } = data;
              navigate("/login");
            });
          };
          const okMessage = data && "Usuario creado con éxito!. Haz login.";

          const errorMsg = error && "Usuario no existe o Password incorrecta.";
          return (
            <Container>
              <RegistroComponent
                disabled={loading}
                error={errorMsg}
                okMessage={okMessage}
                onSubmit={onSubmit}
              ></RegistroComponent>
            </Container>
          );
        }}
      </RegisterMutation>
    </>
  );
};
