import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteGroupLock = createAsyncThunk(
  "groups/removeLocks",
  async (id) => {
    const { data } = await axios.delete(
      `https://api.kisi.io/group_locks/${id}`
    );
    return data;
  }
);

export const removeGroupLockSlice = createSlice({
  name: "deleteGroupLocks",
  initialState: {
    list: [],
    status: null,
  },
  extraReducers: {
    [deleteGroupLock.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteGroupLock.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [deleteGroupLock.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default removeGroupLockSlice.reducer;
