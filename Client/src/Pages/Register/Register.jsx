import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Features/authSlice";
import logo from "../../Assets/LOGO.png";
import "./Register.css";
import InputField from "../../Components/InputField/InputField";

const validationRegister = yup.object().shape({
  username: yup
    .string()
    .min(3, "Seu nome deve ter pelo menos 3 caracteres")
    .required("Este campo é obrigatório"),
  email: yup
    .string()
    .email("Insira um email válido")
    .required("Este campo é obrigatório"),
  img: yup.string().url("Insira uma URL válida para a imagem"),
  password: yup
    .string()
    .min(5, "Sua senha deve ter pelo menos 5 caracteres")
    .required("Este campo é obrigatório"),
  confirmPassword: yup
    .string()
    .required("Este campo é obrigatório")
    .test("passwords-match", "A senha deve ser igual", function (value) {
      return this.parent.password === value;
    }),
});

const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.id) {
      navigate("/dashboard");
    }
  }, [auth.id, navigate]);

  const escolheuLogin = () => {
    navigate("/login");
  };

  const handleSubmit = (values) => {
    dispatch(registerUser(values));
  };

  return (
    <div className="container-register">
      <div className="container-register-center">
        <div className="image">
          <img src={logo} alt="Logo" />
        </div>
        <h1>Register</h1>
        <Formik
          initialValues={{
            username: "",
            email: "",
            img: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationRegister}
        >
          <Form className="Form-container">
            <InputField name="username" placeholder="Username do Usuário" />
            <InputField name="email" type="email" placeholder="Email do Usuário" />
            <InputField name="img" placeholder="Imagem de perfil do Usuário" />
            <InputField name="password" type="password" placeholder="Senha Do Usuário" />
            <InputField name="confirmPassword" type="password" placeholder="Confirme sua senha" />
            
            <button className="form-container-submit" type="submit">
              Submit
            </button>

            <h2 className="form-container-account">
              Você já tem uma conta? <p onClick={escolheuLogin}>Login</p>
            </h2>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
