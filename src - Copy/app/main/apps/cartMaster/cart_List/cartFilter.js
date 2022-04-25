import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
// import {getMachineLists,selectMachineList,SetFrmFilterData} from '../../../Redux_Store/Machine_Slice/machineList_Slice';
import {getShiftLists,selectShiftList,SetFrmFilterData} from '../../../Redux_Store/Shift_Slice/shiftList_Slice'

const useStyles = makeStyles((theme) => ({
	control: { margin: theme.spacing(1), },
	control1: { margin: theme.spacing(1), width: 200 },
}));

function ShiftFilter(props) {
	const dispatch = useDispatch()
	const classes = useStyles();

	const [frmFilter, setFrmFilter] = useState({
		"shiftName": "",
		"startTime":"",
		"endTime":""
	})

	const handleChangeFrmFilter = (e) => {
		console.log("name", e.target.name, "value:-", e.target.value);
		setFrmFilter({
			...frmFilter,
			[e.target.name]: e.target.value
		});
	}

	const handleResetChange = () => {
		// dispatch(SetSearchStatus("false"))
		setFrmFilter({
			"shiftName": "",
			"startTime":"",
			"endTime":""
		});

		dispatch(SetFrmFilterData(null));
		dispatch(getShiftLists({ frmFilter: null, page_number: 0, row_per_column: 10 }));
	}



	const handleGetFilterData = () => {
		for (let i in frmFilter) {
			if (frmFilter[i].length === 0) {
				frmFilter[i] = "none"
			}
		}
		dispatch(SetFrmFilterData(frmFilter))
		dispatch(getShiftLists({ frmFilter, page_number: 0, row_per_column: 10 }))
	}


	return (
		<div className={classes.control}>
			

			<TextField
				id="shiftName" label="Shift Name" className={classes.control1} name="shiftName"
				value={frmFilter.shiftName === "none" ? "" : frmFilter.shiftName} onChange={handleChangeFrmFilter}
			/>
			<TextField
				id="startTime" label="Start Time" className={classes.control1} name="startTime"
				value={frmFilter.startTime === "none" ? "" : frmFilter.startTime} onChange={handleChangeFrmFilter}
			/>
			<TextField
				id="endTime" label="End Time" className={classes.control1} name="endTime"
				value={frmFilter.endTime === "none" ? "" : frmFilter.endTime} onChange={handleChangeFrmFilter}
			/>
			
			

			<Button variant="contained" color="primary" onClick={() => handleGetFilterData()}>Search</Button>
			<Button variant="contained" color="primary" className={classes.control} onClick={handleResetChange}>Reset</Button>
		</div>
	);
}

export default ShiftFilter;