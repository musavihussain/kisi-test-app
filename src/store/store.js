import { configureStore } from "@reduxjs/toolkit";
import createGroupLockSlice from "./slices/createGroupLockSlice";
import getGroupLockSlice from "./slices/getGroupLockSlice";
import groupSlice from "./slices/groupSlice";
import lockSlice from "./slices/lockSlice";
import removeGroupLockSlice from "./slices/removeGroupLockSlice";

export const store = configureStore({
  reducer: {
      groups: groupSlice,
      grouplocks: getGroupLockSlice,
      addGroupLocks: createGroupLockSlice,
      locks: lockSlice,
      removeGroupLocks: removeGroupLockSlice,
  },
});
