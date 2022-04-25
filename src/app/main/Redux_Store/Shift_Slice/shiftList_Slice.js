import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
// import { NotificationManager } from 'react-notifications';
// import { useDispatch, useSelector } from 'react-redux';

export const getShiftLists = createAsyncThunk('ERP/ShiftList/getShiftList', async ({ timestamp, user_id }) => {
	// const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Get_Diliverd_Order?page=${page}&size=${size}`);
	// const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/shift?row_per_column=${row_per_column}&page_number=${page_number}`, {
	// 	params: frmFilter
	// });



	const obj = {
		"user_id": user_id,
		"timestamp": timestamp
	}
	console.log("timestamp 11 ::", obj)
	const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/fetch-user-files`,
		obj
	);
	const data = await response.data.files;
	const temData = [];
	const localData = JSON.parse(window.localStorage.getItem('temData')) || [];
	console.log("localData", localData);
	data.forEach((element, index) => {
		console.log("index for", index);

		const found = localData.find(element1 => element1.server_file_name === element.server_file_name);

		console.log("found", found);
		if (found === undefined) {
			let dic = {
				...element,
				qty: "1"
			}
			temData.push(dic)
		}
		else{
			temData.push(found)
		}


	});
	
	console.log("final data", temData)
	// if (window.localStorage.getItem('temData')) {
	// 	let abc = 0;
	// } else {
	localStorage.setItem("temData", JSON.stringify(temData))
	// }
	return data;


});

export const removeShift = createAsyncThunk(
	'ERP/ShiftList/removeShift',
	async (supplierIds, { dispatch, getState }) => {

		console.log("delete slice data :", supplierIds)


		let timestamp = supplierIds.timestamp
		let user_id = supplierIds.user_id
		// console.log("user id and timestamp :",timestamp ,user_id)
		// const ids = { id: supplierIds };
		const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/delete-files`,
			supplierIds
		);

		const data = await response.data;
		console.log("delete API ", data)
		if (response.data) {
			// NotificationManager.success(response.data[0]["Messgae"], 'Successful!', 2000);
			alert("Files remove successfully")

		}
		dispatch(getShiftLists({ timestamp, user_id }));
		return data;
	}
);
export const uploadShift = createAsyncThunk(
	'ERP/ShiftList/uploadShift',
	async ({ timestamp, user_id }, { dispatch, getState }) => {

		console.log("delete slice data :", timestamp, user_id)
		const uploadDAta = getShiftLists({ timestamp, user_id });
		console.log("delete slice data11111111111111111111 :", uploadDAta)


		// let timestamp=supplierIds.timestamp
		// let user_id=supplierIds.user_id
		// // console.log("user id and timestamp :",timestamp ,user_id)
		// // const ids = { id: supplierIds };
		// const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/delete-files`, 
		// 	supplierIds
		// );

		// const data = await response.data;
		// console.log("delete API ",data)
		// if (response.data) {
		// 	// NotificationManager.success(response.data[0]["Messgae"], 'Successful!', 2000);
		// 	alert("Shift Deleted Successfully")

		// }
		// dispatch(getShiftLists({timestamp,user_id}));
		// return data;
	}
);

const ShiftListAdapter = createEntityAdapter({
	selectId: ({ server_file_name }) => server_file_name
});

export const { selectAll: selectShiftList, selectById: selectShiftListById } = ShiftListAdapter.getSelectors(
	state => state.ERP.ShiftList
);

const ShiftListAdapterSlice = createSlice({
	name: 'ERP/ShiftList',
	initialState: ShiftListAdapter.getInitialState({
		searchStatus: 'false',
		frmFilterData: [],
		data: [],
	}),
	reducers: {
		// SetSearchStatus: {
		// 	reducer: (state, action) => {
		// 		state.searchStatus = action.payload;
		// 	},
		// 	prepare: payload => ({ payload: payload || '' })
		// },
		SetFrmFilterData: {
			reducer: (state, action) => {
				state.frmFilterData = []
				state.frmFilterData = action.payload;
			},
			prepare: payload => ({ payload: payload || '' })
		},
	},
	extraReducers: {
		[getShiftLists.fulfilled]: ShiftListAdapter.setAll,
		// [SearchShiftList.fulfilled.type]: (state, action) => {
		// 	state.searchStatus = 'true'
		// 	state.data = action.payload
		// },
	}
});
export const { SetFrmFilterData } = ShiftListAdapterSlice.actions;
export default ShiftListAdapterSlice.reducer;























