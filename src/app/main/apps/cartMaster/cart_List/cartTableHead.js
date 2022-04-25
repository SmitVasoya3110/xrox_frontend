import FuseAnimate from '@fuse/core/FuseAnimate';
import history from '@history';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import TextField from '@material-ui/core/TextField';


import MultiSelectMenu from './cartMenu';
import ReactCustomeTable from './cartTable';
import CartHeader from './cartHeader';

import { getShiftLists, selectShiftList ,removeShift} from '../../../Redux_Store/Shift_Slice/shiftList_Slice'
import { updateShift } from '../../../Redux_Store/Shift_Slice/shiftAdd_Slice'
import axios from 'axios';
import Button from '@material-ui/core/Button';

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
// import Button from "@material-ui/core/Button";
// import "../../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"


function ShiftTableHead(props) {
	console.log("--------------");
	const dispatch = useDispatch();
	console.log("000000");
	const Entries = useSelector(selectShiftList);
	console.log("111111111111");
	console.log("ItemCategory s s s ", Entries);
	const frmFilterData = useSelector(({ ERP }) => ERP.ShiftList.frmFilterData);
	console.log("frmFilterData", frmFilterData);

	const [data, setData] = useState(Entries)
	console.log("data", data);
	const [page, setPage] = useState(0)
	const [size, setSize] = useState(10)
	const [loading, setLoading] = useState(true);
	const timestamp = localStorage.getItem("timeStemp");
	const current_user = JSON.parse(localStorage.getItem("current_user"));

	const [num, setNum] = useState(0);

	const handleChange1 = async (e, row) => {
		e.target.value < 0
			? (e.target.value = 0)
			: e.target.value
		console.log("EE value ", e.target.value)
		console.log("row", row);
		// setNum(e.target.value);
		const tData = JSON.parse(window.localStorage.getItem('temData'));
		console.log("tData  ", tData);
		let t = [];
		await tData.forEach(el => {
			if (el.server_file_name === row.server_file_name) {
				let temp = el
				temp.qty = e.target.value;
				t.push(temp)
			} else {
				t.push(el)
			}
		})
		setData(t);
		window.localStorage.setItem('temData', JSON.stringify(t))
	}

	const IncNum = async (row) => {
		console.log("IncNum ", row)
		// setCount(count + 1);
		const tData = JSON.parse(window.localStorage.getItem('temData'));
		console.log("tData  ", tData);
		let t = [];
		await tData.forEach(el => {
			if (el.server_file_name === row.server_file_name) {
				let temp = el
				temp.qty = parseInt(row.qty) + 1;
				t.push(temp)
			} else {
				t.push(el)
			}
		})
		setData(t);
		window.localStorage.setItem('temData', JSON.stringify(t))
	};
	const DecNum = async (row) => {
		console.log("DecNum ", row)
		if ( parseInt(row.qty) > 0) {
			const tData = JSON.parse(window.localStorage.getItem('temData'));
			console.log("tData  ", tData);
			let t = [];
			await tData.forEach(el => {
				if (el.server_file_name === row.server_file_name) {
					let temp = el
					temp.qty = parseInt(row.qty) - 1;
					t.push(temp)
				} else {
					t.push(el)
				}
			})
			setData(t);
			window.localStorage.setItem('temData', JSON.stringify(t))
		}
		else {
			const tData = JSON.parse(window.localStorage.getItem('temData'));
			console.log("tData  ", tData);
			let t = [];
			await tData.forEach(el => {
				if (el.server_file_name === row.server_file_name) {
					let temp = el
					temp.qty = 0;
					t.push(temp)
				} else {
					t.push(el)
				}
			})
			setData(t);
			window.localStorage.setItem('temData', JSON.stringify(t))
			alert("min limit reached");
		}

	};
	// const [row, setRow] = useState({})
	// const handleActiveStatus = (temp) => {
	// 	console.log("TEMPPPPP ::", temp)
	// 	if (window.confirm('Are You Sure?')) {
	// 		dispatch(updateShift(temp['temp'])).then(res => {
	// 			if (!res.error) {
	// 				dispatch(getShiftLists({ page_number: 0, row_per_column: 10 }))
	// 				setPage(0)
	// 			}
	// 		})
	// 	}
	// }

	useEffect(() => {


		dispatch(getShiftLists({ timestamp: timestamp, user_id: current_user.user.uuid })).then(() => setLoading(false)).catch(() => setData([]))
		// const obj = {
		// 	user_id:28,
		// 	timestamp:1647093015920
		// }
		// console.log("OBJECT ::",obj)
		// axios
		//         .post(`${process.env.REACT_APP_BACKEND_URL}/fetch-user-files`,
		// 			obj
		// 		)
		//         .then((res) => {
		//             // setFileData(null);
		//             console.log("ressssssssssss:", res);

		//         })
		//         .catch((error) => {
		//             // props.history.push(backPath)
		//             console.log("ERRRRRRRRRRRRRR:", error);
		//             // setFileData(null);
		//             // this.setState({ loading: false });
		// 			setLoading(false)
		//             // alert("File Is Not Valid!");

		//             // setErr(error.response.data.message);
		//         });
	}, [dispatch, timestamp]);

	useEffect(() => {
		const tData = JSON.parse(window.localStorage.getItem('temData'));
		console.log("tData", tData);
		setData(tData)
	}, [Entries]);




	// useEffect(() => {
	// 	if (searchStatus === "false") {
	// 		dispatch(getDeliveredOrders({ page, size })).then(() => setLoading(false));
	// 	}
	// 	else {
	// 		// row_per_column, page_number
	// 		dispatch(SearchDeliveredOrder({ frmFilter: frmFilterData, row_per_column: size, page_number: page })).then(() => setLoading(false));
	// 	}
	// }, [size, page]);

	// useEffect(() => {
	// 	if (searchStatus === "false") {
	// 		setData(Entries);
	// 	}
	// }, [Entries, dispatch, searchStatus])

	// useEffect(() => {
	// 	if (searchStatus === "true") {
	// 		setData(FilterEntries);
	// 	}
	// }, [FilterEntries, dispatch, searchStatus])

	const columns = React.useMemo(
		() => [
			{
				Header: ({ selectedFlatRows }) => {
					// let valid_ids = true;
					const selectedRowIds = selectedFlatRows.map(row => row.original.server_file_name);
					// const SelecttedQuataionIds = selectedFlatRows.map(row => row.original.quotation_id);
					// const tempQ_id = SelecttedQuataionIds[0]
					// SelecttedQuataionIds.map((id) => {
					// 	if (tempQ_id != id) {
					// 		valid_ids = false
					// 	}
					// })
					// if (valid_ids) {
					return (
						selectedFlatRows.length > 0 && <MultiSelectMenu selectedIds={selectedRowIds} />
					);
					// } else {
					// 	alert("Invalid Quotaion Product")
					// 	return (<p >{"Invalid"}</p>);
					// }
				},
				accessor: 'avatar',
				// Cell: ({ row }) => (
				// 	<div className="flex items-center" onClick={async (ev) => {
				// 		console.log("hihihiiihihihi", row.original.id);
				// 		history.push(`/apps/ShiftAdd/${row.original.id}`);
				// 	}}>

				// 		<IconButton>
				// 			<Icon>edit</Icon>
				// 		</IconButton>
				// 	</div>
				// ),
				sortable: false
			},


			// {
			// 	Header: 'ORDER NUMBER',
			// 	accessor: 'id',
			// 	sortable: false
			// },
			{
				Header: 'FILE NAME',
				accessor: 'filename',
				sortable: false
			},
			// {
			// 	Header: 'QUANTITY',
			// 	accessor: 'startTime',
			// 	sortable: false
			// },
			// {
			// 	Header: 'PRICE',
			// 	accessor: 'price',
			// 	sortable: false
			// },
			{
				Header: 'PAGE TYPE',
				accessor: 'page_format',
				sortable: false
			},
			{
				Header: 'DOCUMENT TYPE',
				accessor: 'size',
				sortable: false
			},
			{
				Header: 'COLOR TYPE',
				accessor: 'type',
				sortable: false
			},
			{
				Header: 'QUANTITY',
				// accessor: 'activeStatus',
				sortable: false,

				// eslint-disable-next-line
				Cell: ({ row }) => (

					<>
						<Button onClick={() => IncNum(row.original)} >
							<AddIcon />
						</Button>

						<TextField style={{width: '20%'}} type="number" value={row.original.qty} onChange={(e) => handleChange1(e, row.original)} />

						<Button onClick={() => DecNum(row.original)}>
							<RemoveIcon />
						</Button>
					</>

				)



			},

		],
		[dispatch, Entries.starred]
	);
	// 	[dispatch ,setData]
	// );


	if (!data) {
		return null;
	}

	// eslint-disable-next-line
	function func(size) {
		setSize(size)
	}

	// eslint-disable-next-line
	function func1(page) {
		setPage(page)
	}
	if (loading) {
		return <FuseLoading />;
	}
	console.log("data", data);
	if (data.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					" Your Printing Basket is empty! "
				</Typography>
			</div>
		);
	}


	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<ReactCustomeTable

				columns={columns}
				data={data}
				// dialog={dialog}
				// selectedId={selectedId}
				// Suppliers={Suppliers}
				// row={row}
				// setRow={setRow}
				funcSetIndex={(val) => func1(val)}
				funcsetSize={(val) => func(val)}
				index={page}
				size={size}
			/>

		</FuseAnimate>

	);
}

export default ShiftTableHead;
