import React, { useState, useEffect, memo } from "react";
import "./Login.css";
import logo from "../../Assets/LOGO.png";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const MemoizedField = memo(Field);

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [isStaticUser, setIsStaticUser] = useState(false); // Estado para controlar se o login é de um usuário estático

  useEffect(() => {
    if (auth.id) {
      navigate("/dashboard");
    }
  }, [auth.id, navigate]);

  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email("Insira um email válido")
      .required("Este campo é obrigatório"),
    password: yup
      .string()
      .min(5, "Sua senha deve ter pelo menos 5 caracteres")
      .required("Este campo é obrigatório"),
  });

  const handleClickLogin = (values) => {
    // Se for um usuário estático, definimos as credenciais diretamente
    if (isStaticUser) {
      values.email = "admin@admin";
      values.password = "admin";
    }

    dispatch(loginUser(values)); // Envia as credenciais para o Redux
  };

  const escolheuRegister = () => {
    navigate("/register");
  };

  const handleStaticUserChange = () => {
    setIsStaticUser(!isStaticUser); // Alterna entre usuário estático e não estático
  };

  return (
    <div className="container-login">
      <div className="container-login-center">
        <div className="image">
          <img src={logo} alt="Logo" />
        </div>
        <h1>Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleClickLogin}
          validationSchema={validationLogin}
        >
          <Form className="Form-container">
            <div className="form-container-email">
              <MemoizedField
                name="email"
                autoComplete="off"
                placeholder="Email do Usuário"
                className="form-field"
                type="email"
                disabled={isStaticUser} // Desabilita o campo de email se for um usuário estático
              />
              <ErrorMessage
                component="span"
                name="email"
                className="form-error"
              />
            </div>

            <div className="form-container-password">
              <MemoizedField
                name="password"
                className="form-field"
                placeholder="Senha Do Usuário"
                autoComplete="off"
                type="password"
                disabled={isStaticUser} // Desabilita o campo de senha se for um usuário estático
              />
              <ErrorMessage
                component="span"
                name="password"
                className="form-error"
              />
            </div>

            <div className="checkbox-container">
              <label>
                <input
                  type="checkbox"
                  checked={isStaticUser}
                  onChange={handleStaticUserChange}
                />
                Teste de Usuário Estático
              </label>
            </div>

            <button className="form-container-submit" type="submit">
              Entrar
            </button>

            <h2 className="form-container-account">
              Você ainda não tem uma conta?{" "}
              <p onClick={escolheuRegister}>Registrar-se</p>
            </h2>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
