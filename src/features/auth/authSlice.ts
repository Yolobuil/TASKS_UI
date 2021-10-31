import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';
import { LOGIN_USER, FILE , PROFILE ,POST_PROFILE ,CRED ,JWT , AUTH_STATE,USER,} from '../types'


// 初期のstateを定義する。　ログインモード（isLoginView）
const initialState: AUTH_STATE = {
isLoginView: true,
loginUser:{
  id:0,
  username:"",
},
  profiles:[{id:0, user_profile: 0, img: null}],

};

export const fetchAsyncLogin = createAsyncThunk(
  // ここは名前は自由だが、他のアクションと被ってはいけない。
  'auth/login',
  async (auth: CRED) => {
    const response = await axios.post<JWT>(
      `${process.env.REACT_APP_API_URL}/authen/jwt/create`,
      auth,
      {
          headers:{
            "Content-Type" :"application/json",
          },

      }
    );
    return response.data;
  }
);

export const fetchAsyncRegister = createAsyncThunk(
  // ここは名前は自由だが、他のアクションと被ってはいけない。
  'auth/register',
  async (auth: CRED) => {
    const response = await axios.post<USER>(
      `${process.env.REACT_APP_API_URL}/api/create/`,
      auth,
      {
          headers:{
            "Content-Type" :"application/json",
          },

      }
    );
    return response.data;
  }
);

export const fetchAsyncGetMyProf = createAsyncThunk(
  // ここは名前は自由だが、他のアクションと被ってはいけない。
  'auth/loginuser',
  async (auth: CRED) => {
    const response = await axios.post<LOGIN_USER>(
      `${process.env.REACT_APP_API_URL}/api/loginuser/`,
      auth,
      {
        // ログインしてる情報を取得するために、JWTのトークンを通す必要がある。
          headers:{
            Authorization:`JWT ${localStorage.localJWT}`,
          },

      }
    );
    return response.data;
  }
);

export const fetchAsyncCreateProf = createAsyncThunk(
  // ここは名前は自由だが、他のアクションと被ってはいけない。
  'auth/createProfile',
  async (auth: CRED) => {
    const response = await axios.post<PROFILE>(
      `${process.env.REACT_APP_API_URL}/api/profile/`,
{img:null},
      {
        // ログインしてる情報を取得するために、JWTのトークンを通す必要がある。
          headers:{
              "Content-Type" :"application/json",
            Authorization:`JWT ${localStorage.localJWT}`,
          },

      }
    );
    return response.data;
  }
);

export const fetchAsyncGetProfs = createAsyncThunk(
  // ここは名前は自由だが、他のアクションと被ってはいけない。
  'auth/getProfiles',
  async (auth: CRED) => {
    const response = await axios.post<PROFILE[]>(
      `${process.env.REACT_APP_API_URL}/api/profile/`,

      {
        // ログインしてる情報を取得するために、JWTのトークンを通す必要がある。
          headers:{

            Authorization:`JWT ${localStorage.localJWT}`,
          },

      }
    );
    return response.data;
  }
);

export const fetchAsyncUpdateProf = createAsyncThunk(
  // ここは名前は自由だが、他のアクションと被ってはいけない。
  'auth/updateProfiles',
  async (profile: POST_PROFILE) => {
    const uploadData = new FormData();
    profile.img && uploadData.append('img', profile.img, profile.img.name);
    const response = await axios.put<PROFILE>(
      `${process.env.REACT_APP_API_URL}/api/profile/${profile.id}`,
      uploadData,

      {
        // ログインしてる情報を取得するために、JWTのトークンを通す必要がある。
          headers:{
         "Content-Type" :"application/json",
            Authorization:`JWT ${localStorage.localJWT}`,
          },

      }
    );
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {

  },

  // 後処理をかく
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const {  } = authSlice.actions;

export const selectCount = (state: RootState) => state.auth.value;


export default authSlice.reducer;
