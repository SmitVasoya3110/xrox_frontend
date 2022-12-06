import { combineReducers } from "@reduxjs/toolkit";

import ShiftList from "./Shift_Slice/shiftList_Slice";
import Shift from "./Shift_Slice/shiftAdd_Slice";
import ShiftDrop from "./Shift_Slice/shiftDrop_Slice";

const reducer = combineReducers({
  ShiftList,
  Shift,
  ShiftDrop,
});
export default reducer;
