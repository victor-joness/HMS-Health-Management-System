import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

/* TODO: COLOCAR AS JANELAS DE ERROS TODAS DE ACORDO COM A REQUISIÇÃO E NAO COM BASE NO FRONT-END, auht e api ja foi */

const initialState = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  id: "",
  isAdmin: "",
  isDoutor: "",
  isEnfermeira: "",
  isPaciente: "",
  Img: "",
  Idade: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

//esse registerUser recebe esse createAsyncThunk, esse asynThunk é usado em funcoes assyncronas, e eu posso definir tipos para isso de acordo com o que ele me retorna
//podendo ser pending,fulfilled,rejected e fazer alguma coisa de acorodo com esses retornos.
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { rejectWithValue }) => {
    try {
      const data = await axios.post(`${url}/register`, {
        name: user.username,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
        isDoutor: user.isDoutor,
        isEnfermeira: user.isEnfermeira,
        isPaciente: user.isPaciente,
        Img: user.Img,
      });

      localStorage.setItem("token", data.data.token);
      return data.data.token;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const data = await axios.post(`${url}/login`, {
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("token", data.data.user.token);
      return data.data.user.token;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

//aqui temos um "slice" do redux, aqui a gente pode definir um objeto e esse objeto pode ter varios estados(states), atraves do inicialState a genter define esse estados
//temos tbm os reducers -> que pode ser traduzido como a onde fica os metodos que vão mexer nesses estados, aqui no caso não tem mais a gente pode ver isso claramento no cartSlice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;
      if (token) {
        const user = jwtDecode(token);
        return {
          ...state,
          token,
          name: user.name,
          email: user.email,
          id: user.id,
          isAdmin: user.isAdmin,
          isDoutor: user.isDoutor,
          isEnfermeira: user.isEnfermeira,
          isPaciente: user.isPaciente,
          Img: user.Img,
          Idade: user.Idade,
          userLoaded: true,
        };
      }
    },
    logoutUser(state, action) {
      localStorage.removeItem("token");

      return {
        ...state,
        token: "",
        name: "",
        email: "",
        id: "",
        isAdmin: "",
        isDoutor: "",
        isEnfermeira: "",
        isPaciente: "",
        Img: "",
        Idade: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        toast.success("Registro realizado com sucesso");
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          id: user.id,
          isAdmin: user.isAdmin,
          isDoutor: user.isDoutor,
          isEnfermeira: user.isEnfermeira,
          isPaciente: user.isPaciente,
          Img: user.Img,
          Idade: user.Idade,
          registerStatus: "success",
        };
      } else {
        toast.error("Erro ao registrar");
        return state;
      }
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      toast.error("Erro ao registrar");
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });

    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        toast.success("Login realizado com sucesso");
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          id: user.id,
          isAdmin: user.isAdmin,
          isDoutor: user.isDoutor,
          isEnfermeira: user.isEnfermeira,
          isPaciente: user.isPaciente,
          Img: user.Img,
          Idade: user.Idade,
          loginStatus: "success",
        };
      } else {
        toast.error("Senha ou email incorretos");
        return state;
      }
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      toast.error("Senha ou email incorretos");
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
  },
});

export const { loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
