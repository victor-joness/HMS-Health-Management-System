import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";
import { jwtDecode } from "jwt-decode"; "jwt-decode";
import { toast } from "react-toastify";
import { Auth, DecodedUser } from "../types/TypesExport";

const initialState: Auth = {
  Id: 0,
  Token: localStorage.getItem("token"),
  Name: "",
  Email: "",
  Role: null,
  Img: "",
  Age: "",
  PhoneNumber: "",
  PhoneEmergency: "",
  RegisterStatus: "",
  RegisterError: "",
  LoginStatus: "",
  LoginError: "",
  UserLoaded: false,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    user: {
      Name: string;
      Email: string;
      Password: string;
      Img: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${url}/auth/register`, user);
      console.log(response);

      localStorage.setItem("token", response.data.data.token);
      return response.data.data.token;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user: { Email: string; Password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/auth/login`, {
        Email: user.Email,
        Password: user.Password,
      });

      const Token = response.data.data.token;
      localStorage.setItem("token", Token);

      const userDecoded = jwtDecode<DecodedUser>(Token);
      return {
        Token,
        Id: userDecoded.Id,
        Name: userDecoded.Name,
        Email: userDecoded.Email,
        Role: userDecoded.Role,
        Img: userDecoded.Img,
        Age: userDecoded.Age,
        PhoneNumber: userDecoded.PhoneNumber,
        PhoneEmergency: userDecoded.PhoneEmergency,
        LoginStatus: "success",
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
      const Token = state.Token;
      if (Token) {
        const user = jwtDecode<DecodedUser>(Token);
        return {
          ...state,
          Token,
          Id: user.Id,
          Name: user.Name,
          Email: user.Email,
          Role: user.Role,
          Img: user.Img,
          Age: user.Age,
          PhoneNumber: user.PhoneNumber,
          PhoneEmergency: user.PhoneEmergency,
          UserLoaded: true,
        };
      }
    },
    logoutUser(state) {
      localStorage.removeItem("token");
      toast.warning("Logout com sucesso");
      return {
        ...state,
        Token: null,
        Name: "",
        Email: "",
        Id: 0,
        Role: null,
        Img: "",
        Age: "",
        PhoneNumber: "",
        PhoneEmergency: "",
        RegisterStatus: "",
        RegisterError: "",
        LoginStatus: "",
        LoginError: "",
        UserLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      return { ...state, RegisterStatus: "pending" };
    });

    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<string | null>) => {
        if (action.payload) {
          const user = jwtDecode<DecodedUser>(action.payload);
          toast.success("Registro realizado com sucesso");
          return {
            ...state,
            Token: action.payload,
            Id: user.Id,
            Name: user.Name,
            Email: user.Email,
            Role: user.Role,
            Img: user.Img,
            Age: user.Age,
            PhoneNumber: user.PhoneNumber,
            RegisterStatus: "success",
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
          RegisterStatus: "rejected",
          RegisterError: action.payload,
        };
      }
    );

    builder.addCase(loginUser.pending, (state) => {
      return { ...state, LoginStatus: "pending" };
    });

    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload) {
          return {
            ...state,
            Token: action.payload.Token,
            Id: action.payload.Id,
            Name: action.payload.Name,
            Email: action.payload.Email,
            Role: action.payload.Role,
            Img: action.payload.Img,
            Age: action.payload.Age,
            PhoneNumber: action.payload.PhoneNumber,
            PhoneEmergency: action.payload.PhoneEmergency,
            LoginStatus: "success",
          };
        } else {
          console.log(action.payload);
          toast.error("Senha ou email incorretos");
          return state;
        }
      }
    );

    builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
      console.log("teste")
      toast.error("Senha ou email incorretos");
      return {
        ...state,
        LoginStatus: "rejected",
        LoginError: action.payload,
      };
    });
  },
});

export const { loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
