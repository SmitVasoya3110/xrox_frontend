import FuseAnimate from "@fuse/core/FuseAnimate";
// import FuseChipSelect from "@fuse/core/FuseChipSelect";
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useForm, useDeepCompareEffect } from "@fuse/hooks";
// import FuseUtils from "@fuse/utils";
import _ from "@lodash";
import Button from "@material-ui/core/Button";
import { orange } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
// import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import withReducer from "app/store/withReducer";
import TextField from "@material-ui/core/TextField";
// card
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import "./style.css"

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

// import clsx from "clsx";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

import {
  getShiftLists,
  selectShiftList,
  removeShift,
} from "../../../Redux_Store/Shift_Slice/shiftList_Slice";

import reducer from "../../../Redux_Store/index";
import axios from "axios";
import history from "@history";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


function CartList1(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const formRef = useRef(null); //validation
  let backPath = "/apps/dropAndUpload/new";

  const Entries = useSelector(selectShiftList) || [];
  const [data, setData] = useState(Entries);

  const [loading, setLoading] = useState(true);
  const timestamp = localStorage.getItem("timeStemp");
  const current_user = JSON.parse(localStorage.getItem("current_user"));
  const user_id = current_user.user.uuid

  useDeepCompareEffect(() => {
    dispatch(
      getShiftLists({ timestamp: timestamp, user_id: current_user.user.uuid })
    )
      .then(() => {
        setLoading(false)
      })
      .catch(() => setData([]));
  }, [dispatch, timestamp]);

  useEffect(() => {
    const tData = JSON.parse(window.localStorage.getItem("temData"));
    console.log("tData", tData);
    setData(tData);
  }, [Entries]);

  const uploadShift = async () => {
    const localData = JSON.parse(window.localStorage.getItem('temData')) || [];
    const temData = [];
    localData.forEach((element) => {
      let dic = {
        file: element.server_file_name,
        quantity: element.qty
      }
      temData.push(dic)
    });
    const obj = {
      "user_id": user_id,
      "timestamp": timestamp,
      "files": temData
    }
    let myData = {};
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/calcuate-final-cart`, obj)
      // .post(`http://172.105.56.110:8000/upload-to-cart`, fileData)
      .then((res) => {
        // setFileData(null);
        console.log("ressssssssssss:", res);
        console.log("Total Cost ::", res.data.Total_Cost)
        // myData["Total_Pages"] = res.data.numbers.Total_Pages
        myData["Total_Cost"] = res.data.Total_Cost
        myData["numbers"] = temData
        // myData["fileNames"] = fileNames
        // myData["docFormat"] = this.state.docFormat
        // myData["pageFormat"] = this.state.pageFormat

        console.log("mydataaaa", myData)
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
        console.log("ERRRRRRRRRRRRRR:", error);
        // setFileData(null);


        alert("File Is Not Valid!");

        // setErr(error.response.data.message);
      });
  }


  const handleChange1 = async (e, row) => {
    e.target.value < 0 ? (e.target.value = 0) : e.target.value;
    console.log("EE value ", e.target.value);
    console.log("row", row);
    // setNum(e.target.value);
    const tData = JSON.parse(window.localStorage.getItem("temData"));
    console.log("tData  ", tData);
    let t = [];
    await tData.forEach((el) => {
      if (el.server_file_name === row.server_file_name) {
        let temp = el;
        temp.qty = e.target.value;
        t.push(temp);
      } else {
        t.push(el);
      }
    });
    setData(t);
    window.localStorage.setItem("temData", JSON.stringify(t));
  };

  const removeHandle = async (row) => {
    // console.log("remove data ", row.server_file_name);
    let temp = [];
    let myData1 = {};
    temp.push(row.server_file_name)
    console.log("remove data array ", temp);
    myData1["timestamp"] = timestamp
    myData1["user_id"] = current_user.user.uuid
    myData1["files[]"] = temp
    // setCount(count + 1);
    console.log("remove my data ", myData1);
    if (window.confirm("Are You Sure?")) {
      dispatch(removeShift(myData1))
    }

  };

  const IncNum = async (row) => {
    console.log("IncNum ", row);
    // setCount(count + 1);
    const tData = JSON.parse(window.localStorage.getItem("temData"));
    console.log("tData  ", tData);
    let t = [];
    await tData.forEach((el) => {
      if (el.server_file_name === row.server_file_name) {
        let temp = el;
        temp.qty = parseInt(row.qty) + 1;
        t.push(temp);
      } else {
        t.push(el);
      }
    });
    setData(t);
    window.localStorage.setItem("temData", JSON.stringify(t));
  };
  const DecNum = async (row) => {
    console.log("DecNum ", row);
    if (parseInt(row.qty) > 0) {
      const tData = JSON.parse(window.localStorage.getItem("temData"));
      console.log("tData  ", tData);
      let t = [];
      await tData.forEach((el) => {
        if (el.server_file_name === row.server_file_name) {
          let temp = el;
          temp.qty = parseInt(row.qty) - 1;
          t.push(temp);
        } else {
          t.push(el);
        }
      });
      setData(t);
      window.localStorage.setItem("temData", JSON.stringify(t));
    } else {
      const tData = JSON.parse(window.localStorage.getItem("temData"));
      console.log("tData  ", tData);
      let t = [];
      await tData.forEach((el) => {
        if (el.server_file_name === row.server_file_name) {
          let temp = el;
          temp.qty = 0;
          t.push(temp);
        } else {
          t.push(el);
        }
      });
      setData(t);
      window.localStorage.setItem("temData", JSON.stringify(t));
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


  // if (!data) {
  //   console.log("data   !data",data);
  // 	return null;
  // }

  if (loading) {
    return <FuseLoading />;
  }
  console.log("data", data);
  if (data?.length === 0 || !data) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          " Your Printing Basket is empty! "
        </Typography>
      </div>
    );
  }

  return (
    // <Formsy
    //   ref={formRef}
    //   className="flex flex-1 w-full items-center justify-between"
    // >
    <FusePageCarded
      classes={{
        toolbar: "p-0",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        <div className="flex flex-1 w-full items-center justify-between">
          <div className="flex flex-col items-start max-w-full">
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
              <Typography
                className="normal-case flex items-center sm:mb-12"
                component={Link}
                role="button"
                to={backPath}
                color="inherit"
              >
                <Icon className="text-20">
                  {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
                </Icon>
                <span className="mx-4">Add Order</span>
              </Typography>
            </FuseAnimate>

            <div className="flex items-center max-w-full">
              <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography className="text-16 sm:text-20 truncate">
                    Your Cart
                  </Typography>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography variant="caption">Files Details</Typography>
                </FuseAnimate>
              </div>
            </div>
          </div>
          <FuseAnimate animation="transition.slideRightIn" delay={300}>
            <Button
              className="whitespace-nowrap normal-case"
              variant="contained"
              color="secondary"
              // disabled={!isFormValid || !canBeSubmitted()}
              onClick={() => {
                if (window.confirm("Are You Sure?")) {
                  // console.log("selectedIds- zerooo", selectedIds[0]);
                  uploadShift()
                }
                // closeSelectedMenu();
              }}
            >
              Check Out
            </Button>
          </FuseAnimate>
        </div>
      }
      content={
        <div className="sm:p-16 px-4 sm:p-24 max-w-2xl">
          {/* {tabValue === 0 && ( */}
          <div>
            <div className="pt-32 flex flex-1 justify-center sm:justify-start sm:px-16 px-4">
              {data.length > 0 ? (
                <ul className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-10">
                  {data.map((file, index) => (
                    <li
                      className="cardList"
                      key={index}
                    >
                      <Card className="m-10">
                        <CardActionArea>
                          <CardContent className="sm:p-16 p-8">
                            <Typography className="h3 font-bold mb-10 sm:text-base text-sm">
                              {file.filename}
                            </Typography>
                            <Typography className="mb-5 text-slate-500">
                              Page Type: <span className="text-black">{file.page_format}</span>
                            </Typography>
                            <Typography className="mb-5">
                              Document Type: <span className="text-black">{file.size}</span>
                            </Typography>
                            <Typography className="mb-5">Color Type: <span className="text-black">{file.type}</span></Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions className="flex justify-center">
                          <Button onClick={() => IncNum(file)}>
                            <AddIcon />
                          </Button>

                          <TextField
                            style={{ width: "20%" }}
                            type="number"
                            value={file.qty}
                          />

                          <Button onClick={() => DecNum(file)}>
                            <RemoveIcon />
                          </Button>
                        </CardActions>
                        <CardActions className="flex justify-center">
                          <Button onClick={() => removeHandle(file)} color="secondary" variant="contained">
                            Remove
                          </Button>
                        </CardActions>
                      </Card>
                    </li>
                  ))}
                </ul>
              ) : <div>
                <h1>No data Found</h1>
              </div>}
            </div>
          </div>
        </div>
      }
      innerScroll
    />
    // </Formsy>
  );
}

export default withReducer("ERP", reducer)(CartList1);
