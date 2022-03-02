import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getGroups = createAsyncThunk(
  "groups/getGroups",
  async ({ limit, offset }) => {
    const {data} = await axios.get(`https://api.kisi.io/groups`);
    console.log('res', data)
    return data;
  }
);

export const groupSlice = createSlice({
  name: "groups",
  initialState: {
    list: [],
    status: null,
  },
  extraReducers: {
    [getGroups.pending]: (state, action) => {
      state.status = "loading";
    },
    [getGroups.fulfilled]: (state, { payload }) => {
      console.log("payload", payload);
      state.list = payload;
      state.status = "success";
    },
    [getGroups.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default groupSlice.reducer;
