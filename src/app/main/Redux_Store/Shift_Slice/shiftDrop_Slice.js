import {createSlice ,createAsyncThunk ,createEntityAdapter }  from '@reduxjs/toolkit';
import axios from 'axios';

export const getShiftDrop = createAsyncThunk('common/getShiftDrop' ,  async () =>{
	const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getShift`);
	const data = await response.data;
	return data
});

const ShiftDropAdapter = createEntityAdapter({
    selectId: data => data.id,
  });

  export const { selectAll: selectShiftDrop ,  selectById: selectShiftDropId } = ShiftDropAdapter.getSelectors(
	state => state.ERP.ShiftDrop
);

const ShiftDropSlice = createSlice({
	name: 'ERP/ShiftDrop',
	initialState:ShiftDropAdapter.getInitialState([]),
	reducers:{},
	extraReducers: {
		[getShiftDrop.fulfilled]:ShiftDropAdapter.setAll,	
	}
});

export default ShiftDropSlice.reducer;