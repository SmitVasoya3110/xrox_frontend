import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";

export const getShift = createAsyncThunk("ERP/Shift/getShift", async (params) => {
  // console.log(":::",process.env.REACT_APP_BACKEND_URL);
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/shift?masterShiftId=${params.type_id}`);
  const data = await response.data;
  return data[0];
});

export const saveShift = createAsyncThunk('ERP/Shift/saveShift', async (form, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/shift`, form);

    const data = await response.data;
    let msg = "Shift Added Successfully!"  // This msg show if there is no any message from api
    if (data) {
      if (data.message) {
        msg = data.message;
      }
      alert(msg);
    }

    return data;
  }
  catch (err) {
    // NotificationManager.warning(err.response.data.message, 'warning!', 2000);
    // return rejectWithValue(err.response)
    let tempE = "Unexpected error from API"
    if (err.response.data.message) {
      tempE = err.response.data.message
    }
    alert("Message :-" + tempE + "");
    //   NotificationManager.warning(tempE, 'warning!', 4000);
    return rejectWithValue(err.response.data)
  }
});


export const updateShift = createAsyncThunk("ERP/Shift/updateShift", async (form) => {
  const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/shift`, form);
  const data = await response.data;
  let msg = "Shift Updated Successfully!"  // This msg show if there is no any message from api
  if (data) {
    if (data.message) {
      msg = data.message;
    }
    alert(msg);
  }
  return data;
});

const ShiftSlice = createSlice({
  name: "ERP/Shift",
  initialState: null,
  reducers: {
    resetShift: () => null,
    newShift: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          shiftName: "",
          startTime: "00:00",
          endTime: "00:00"
        },
      }),
    },
  },
  extraReducers: {
    [getShift.fulfilled]: (state, action) => action.payload,
    [saveShift.fulfilled]: (state, action) => action.payload,
  },
});

export const { resetShift, newShift } = ShiftSlice.actions;
export default ShiftSlice.reducer;
