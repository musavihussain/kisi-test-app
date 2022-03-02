import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getLocks = createAsyncThunk(
  "locks/getLocks",
  async ({ limit, offset }) => {
    const { data } = await axios.get("https://api.kisi.io/locks");
    return data;
  }
);

export const lockSlice = createSlice({
  name: "locks",
  initialState: {
    list: [],
    status: null,
  },
  extraReducers: {
    [getLocks.pending]: (state, action) => {
      state.status = "loading";
    },
    [getLocks.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [getLocks.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default lockSlice.reducer;
