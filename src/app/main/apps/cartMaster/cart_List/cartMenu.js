import history from '@history';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
// import { openNewDialog } from '../../Redux_store/Quotation_Slice/QuotationCreator_Slice';
import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { addToSalesReturn, getDeliveredOrders } from 'app/main/Redux_Store/Item_Slice/DeliveredOrder_Slice';
// import { SetSelectedIds } from '../../Redux_store/ERP_Slice/Order_Slice/ShippedOrder_Slice';
// SetSelectedIds  addToSalesReturn
// dispatch(getDeliveredOrders({ page, size })).then(() => setLoading(false));
// 

import { removeShift } from '../../../Redux_Store/Shift_Slice/shiftList_Slice'

function MultiSelectMenu(props) {

	
	const dispatch = useDispatch();
	const { selectedIds } = props;
	let myData1 = {};

	console.log("selectedIds", selectedIds);
	
	let timestamp=localStorage.getItem("timeStemp");
	let current_user=JSON.parse(localStorage.getItem("current_user"));
	myData1["timestamp"]=timestamp
	myData1["user_id"]=current_user.user.uuid
	myData1["files[]"]=selectedIds
	const [anchorEl, setAnchorEl] = useState(null);
	console.log("myData", myData1);

	function openSelectedContactMenu(event) {
		setAnchorEl(event.currentTarget);
	}

	function closeSelectedMenu() {
		setAnchorEl(null);
	}


	return (
		<>
			<IconButton
				className="p-0"
				aria-owns={anchorEl ? 'selectedMenu' : null}
				aria-haspopup="true"
				onClick={openSelectedContactMenu}
			>
				<Icon>delete</Icon>
			</IconButton>
			<Menu
				id="selectedMenu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={closeSelectedMenu}
			>
				<MenuList>
					<MenuItem
						onClick={() => {
							if (window.confirm("Are You Sure?")) {
								console.log("selectedIds- zerooo", selectedIds[0]);
								dispatch(removeShift(myData1))
							}
							closeSelectedMenu();
						}}
					>
						{/* <ListItemIcon className="min-w-40">
							<Icon>Receive</Icon>
						</ListItemIcon> */}
						<ListItemText primary="Delete" className="min-w-40" />
					</MenuItem>

				</MenuList>
			</Menu>
		</>
	);
}

export default MultiSelectMenu;
