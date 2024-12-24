import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { Auth, DecodedUser } from "../Types/TypesExport";

const initialState: Auth = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  id: "",
  role: null,
  Img: "",
  Age: "",
  PhoneNumber: "",
  PhoneEmergency: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    user: {
      username: string;
      email: string;
      img: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${url}/register`, {
        name: user.username,
        email: user.email,
        img: user.img,
        password: user.password,
      });

      localStorage.setItem("token", response.data.data.token);
      return response.data.data.token;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Verifica se as credenciais são para o login estático
      if (user.email === "admin@admin" && user.password === "admin") {
        // Adiciona os valores fictícios diretamente no state
        return {
          name: "Admin User",
          email: "admin@admin",
          id: "1",
          role: 0,
          Img: "default-img.png",
          Age: "30",
          PhoneNumber: "123456789",
          PhoneEmergency: "987654321",
          loginStatus: "success",
        };
      }

      // Caso contrário, realiza a requisição normal para a API
      const response = await axios.post(`${url}/login`, {
        email: user.email,
        password: user.password,
      });

      // Armazena o token recebido da API no localStorage
      const token = response.data.data.token;
      localStorage.setItem("token", token);

      const userDecoded = jwtDecode<DecodedUser>(token);
      return {
        token,
        name: userDecoded.name,
        email: userDecoded.email,
        id: userDecoded.id,
        role: userDecoded.role,
        Img: userDecoded.img,
        Age: userDecoded.age,
        PhoneNumber: userDecoded.PhoneNumber,
        PhoneEmergency: userDecoded.PhoneEmergency,
        loginStatus: "success",
      };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state) {
      const token = state.token;
      if (token) {
        const user = jwtDecode<DecodedUser>(token);
        return {
          ...state,
          token,
          name: user.name,
          email: user.email,
          id: user.id,
          role: user.role,
          Img: user.img,
          Age: user.age,
          PhoneNumber: user.PhoneNumber,
          PhoneEmergency: user.PhoneEmergency,
          userLoaded: true,
        };
      }
    },
    logoutUser(state) {
      localStorage.removeItem("token");
      toast.warning("Logout com sucesso");
      return {
        ...state,
        token: null,
        name: "",
        email: "",
        id: "",
        role: null,
        Img: "",
        Age: "",
        PhoneNumber: "",
        PhoneEmergency: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      return { ...state, registerStatus: "pending" };
    });

    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<string | null>) => {
        if (action.payload) {
          const user = jwtDecode<DecodedUser>(action.payload);
          toast.success("Registro realizado com sucesso");
          return {
            ...state,
            token: action.payload,
            name: user.name,
            email: user.email,
            id: user.id,
            role: user.role,
            Img: user.img,
            Age: user.age,
            registerStatus: "success",
          };
        } else {
          toast.error("Erro ao registrar");
          return state;
        }
      }
    );

    builder.addCase(
      registerUser.rejected,
      (state, action: PayloadAction<any>) => {
        toast.error("Erro ao registrar");
        return {
          ...state,
          registerStatus: "rejected",
          registerError: action.payload,
        };
      }
    );

    builder.addCase(loginUser.pending, (state) => {
      return { ...state, loginStatus: "pending" };
    });

    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload) {
          // Para login estático ou normal, preenche o estado com os dados
          return {
            ...state,
            token: action.payload.token,
            name: action.payload.name,
            email: action.payload.email,
            id: action.payload.id,
            role: action.payload.role,
            Img: action.payload.Img,
            Age: action.payload.Age,
            PhoneNumber: action.payload.PhoneNumber,
            PhoneEmergency: action.payload.PhoneEmergency,
            loginStatus: "success",
          };
        } else {
          toast.error("Senha ou email incorretos");
          return state;
        }
      }
    );

    builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
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
