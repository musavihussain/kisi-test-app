import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createGroupLocks = createAsyncThunk(
  "groups/createLocks",
  async (requestData) => {
    const { data } = await axios.post(
      "https://api.kisi.io/group_locks",
      requestData
    );
    return data;
  }
);

export const createGroupLockSlice = createSlice({
  name: "createGroupLocks",
  initialState: {
    list: [],
    status: null,
  },
  extraReducers: {
    [createGroupLocks.pending]: (state, action) => {
      state.status = "loading";
    },
    [createGroupLocks.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [createGroupLocks.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default createGroupLockSlice.reducer;
