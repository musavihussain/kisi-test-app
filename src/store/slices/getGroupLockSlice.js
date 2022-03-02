import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getGroupLocks = createAsyncThunk(
  "groups/getLocks",
  async ({ limit, offset, group_id }) => {
    const { data } = await axios.get(
      `https://api.kisi.io/group_locks?limit=${limit}&&offset=${offset}&&group_id=${group_id}`
    );
    return data;
  }
);

export const getGroupLockSlice = createSlice({
  name: "getGroupLocks",
  initialState: {
    list: [],
    status: null,
  },
  extraReducers: {
    [getGroupLocks.pending]: (state, action) => {
      state.status = "loading";
    },
    [getGroupLocks.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [getGroupLocks.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getGroupLockSlice.reducer;
