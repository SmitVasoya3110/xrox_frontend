import FuseAnimate from '@fuse/core/FuseAnimate';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectShiftList } from '../../../Redux_Store/Shift_Slice/shiftList_Slice'
import axios from "axios";
import history from "@history";


function CartHeader(props) {
	const dispatch = useDispatch();
	const Entries = useSelector(selectShiftList);
	let timestamp = localStorage.getItem("timeStemp");
	let current_user = JSON.parse(localStorage.getItem("current_user"));
	let user_id = current_user.user.uuid
	
	
	// const { files, timestamp, user_id } = props;
	const uploadShift = async()=>{
		// const uploadObject = Entries.map(rowData => rowData.server_file_name);
		const localData = JSON.parse(window.localStorage.getItem('temData')) || [];
		const temData = [];
		localData.forEach((element) => {
			let dic = {
				file:element.server_file_name,
				quantity: element.qty
			}
			temData.push(dic)
		});
		const obj = {
			"user_id":user_id,
			"timestamp":timestamp,
			"files":temData
		}
		let myData = {};
		await axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/calcuate-final-cart`, obj)
			// .post(`http://172.105.56.110:8000/upload-to-cart`, fileData)
			.then((res) => {
				// setFileData(null);
				// myData["Total_Pages"] = res.data.numbers.Total_Pages
				myData["Total_Cost"] = res.data.Total_Cost
				myData["numbers"] = temData
				// myData["fileNames"] = fileNames
				// myData["docFormat"] = this.state.docFormat
				// myData["pageFormat"] = this.state.pageFormat

				// // this.state.total_price=res.data.numbers.Total_Cost
				// this.setState({
				//     total_price: res.data.numbers.Total_Cost
				// }, () => {
				//     console.log(this.state)
				// })
				localStorage.setItem('myData', JSON.stringify(myData));
				// // localStorage.setItem('files', JSON.stringify(myData));
				// // setErr([]);
				// this.setState({ loading: false });

				alert("Order Placed successfully!");
				// let backPath = "/apps/custometPayment";
				// history.push("/apps/cartList")
				history.push("/apps/custometPayment")
			})
			.catch((error) => {
				// props.history.push(backPath)
				// setFileData(null);
				

				alert("File Is Not Valid!");

				// setErr(error.response.data.message);
			});
	}
	return (
		<div className="flex flex-1 items-center p-4 sm:p-24">
			<div className="flex flex-shrink items-center sm:w-224">
				<Hidden lgUp>
					<IconButton
						onClick={ev => {
							props.pageLayout.current.toggleLeftSidebar();
						}}
						aria-label="open left sidebar"
					>
						<Icon>menu</Icon>
					</IconButton>
				</Hidden>

				<div className="flex items-center" style={{ whiteSpace: 'nowrap' }}>
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<Icon className="text-32">backpack</Icon>
					</FuseAnimate>

					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Typography variant="h6" className="mx-12 hidden sm:flex">
							Your Cart
						</Typography>
					</FuseAnimate>
				</div>
			</div>



			<FuseAnimate animation="transition.slideRightIn" delay={300}>
				<Button
					component={Link}
					to="/apps/dropAndUpload/new"
					className="whitespace-no-wrap normal-case mx-10"
					variant="contained"
					color="secondary"
				>
					<span className="hidden sm:flex">AddOrder</span>
					<span className="flex sm:hidden">AddOrder</span>
				</Button>


			</FuseAnimate>
			<FuseAnimate animation="transition.slideRightIn" delay={300}>
				<Button
					// component={Link}
					// to="/apps/dropAndUpload/new"
					className="whitespace-no-wrap normal-case"
					variant="contained"
					color="secondary"
					onClick={() => {
						if (window.confirm("Are You Sure?")) {
							uploadShift()
						}
						// closeSelectedMenu();
					}}


				>
					<span className="hidden sm:flex">Check Out</span>
					<span className="flex sm:hidden">CheckOut</span>
				</Button>
			</FuseAnimate>
		</div>
	);
}

export default CartHeader;
