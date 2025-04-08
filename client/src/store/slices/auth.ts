import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  id: string;
}

interface InitialState {
  userData: User | null;
  isAuthenticated: boolean;
}

const initialState: InitialState = {
  userData: null,
  isAuthenticated: false,
};

const slice = createSlice({
  name: "auth-slice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
    },
  },
});

export default slice.reducer;
export const { setUser, clearUser } = slice.actions;
