import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "app/services/axiosInstance";

export const getUserList = createAsyncThunk(
  "user/getUserList",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/project`, formData);
      const data = await response.data;

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initData = {
  loading: false,
  initParams: {
    pageSize: 10,
    pageIndex: 1,
  },
  userList: {
    data: [],
    totalCount: 0
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState: initData,
  //   reducers: {
  //     resetForm(state) {
  //       state.projectForm = initData.projectForm;
  //     },
  //     updateProjectParams(state, action) {
  //       state.initParams = action.payload;
  //     },
  //     resetCredential(state, action) {
  //       state.project_cred = action?.payload;
  //     },
  //   },
  extraReducers: {
    // getUserList
    [getUserList.pending]: (state, action) => {
      state.loading = true;
    },
    [getUserList.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userList = payload;
    },
    [getUserList.rejected]: (state, action) => {
      state.loading = false;
      state.userList = [];
    },
  },
});
// export const { resetForm, updateProjectParams, resetCredential } =
//   userSlice.actions;
export default userSlice.reducer;
