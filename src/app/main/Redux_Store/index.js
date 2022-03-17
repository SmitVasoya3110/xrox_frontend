import { combineReducers } from "@reduxjs/toolkit";



import ShiftList from '../Redux_Store/Shift_Slice/shiftList_Slice'
import Shift from '../Redux_Store/Shift_Slice/shiftAdd_Slice'
import ShiftDrop from '../Redux_Store/Shift_Slice/shiftDrop_Slice'




const reducer = combineReducers({
    // Item Master,
 
    //Shift Master
    ShiftList,
    Shift,
    ShiftDrop,


 
});
export default reducer;