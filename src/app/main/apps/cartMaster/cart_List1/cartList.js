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
import { makeStyles, ThemeProvider, useTheme } from "@material-ui/core/styles";
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

import axios from "axios";
import history from "@history";
import {
  getShiftLists,
  selectShiftList,
  removeShift,
} from "../../../Redux_Store/Shift_Slice/shiftList_Slice";

import reducer from "../../../Redux_Store/index";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


function CartList1(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const formRef = useRef(null); // validation
  const backPath = "/apps/dropAndUpload/new";

  const Entries = useSelector(selectShiftList) || [];
  const [data, setData] = useState(Entries);
  console.log("data", data)
  const [loading, setLoading] = useState(false);
  const timestamp = localStorage.getItem("timeStemp");
  const current_user = JSON.parse(localStorage.getItem("current_user"));
  console.log("current_user000", current_user)
  const user_id = current_user.uuid

  // useDeepCompareEffect(() => {
  //   dispatch(
  //     getShiftLists({ timestamp, user_id: user_id })
  //   )
  //     .then(() => {
  //       setLoading(false)
  //     })
  //     .catch(() => setData([]));
  // }, [dispatch, timestamp]);

  useDeepCompareEffect(() => {
    setLoading(true);
    const cart_arr = JSON.parse(localStorage.getItem("cart_arr")) || [];
    if (cart_arr) {
      setData(cart_arr);
    }
    setLoading(false);
  }, [dispatch, timestamp]);

  const addFilesToCard = async (fileKeyArr) => {
    // console.log("addFilesToCard", fileKeyArr)
    try {
      const newArr = [];
      // multiple file upload
      for (let index = 0; index < fileKeyArr.length; index++) {
        const item = fileKeyArr[index];
        newArr.push({
          "filename": item.key,
          "size": item.size,
          "color": item.color,
          "side": item.side,
          quantity: item?.quantity ? parseInt(item.quantity) : 1
        });
      }
      const payload = {
        "user_id": current_user.uuid,
        "files": [...newArr]
      }
      const cart_id = localStorage.getItem("cart_id")
      const cartRes = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/cart/${cart_id}/`,
        payload
      );
      // console.log("cartRes", cartRes)
      if (cartRes.status) {
        return { status: 200, files: fileKeyArr };
      }
      return { status: 500 };

    } catch (error) {
      // console.log("addFilesToCard->\n", error);
      return { status: 500 };
    } finally {
      // this.setState({ loading: false });
    }
  };

  const onClickCheckOut = async () => {
    setLoading(true);
    // const temData = [];
    // cart_arr.forEach((element) => {
    //   const dic = {
    //     file: element.server_file_name,
    //     quantity: element.qty
    //   }
    //   temData.push(dic)
    // });
    const cart_id = localStorage.getItem("cart_id");
    if (!cart_id) {
      alert("Cart not fount!")
      return
    }
    const cart_arr = JSON.parse(localStorage.getItem("cart_arr")) || [];
    const res = await addFilesToCard(cart_arr)
    if (res.status != 200) return

    const obj = {
      "cart_id": cart_id
    }
    // const myData = {};
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/order/`, obj)
      .then((res) => {
        console.log("res0", res)
        setLoading(false);
        // myData["Total_Cost"] = res.data.Total_Cost
        // myData["numbers"] = temData
        // localStorage.setItem('myData', JSON.stringify(myData));
        alert("Order Placed successfully!");
        history.push("/apps/custometPayment")
      })
      .catch((error) => {
        setLoading(false);
        // console.log("ERRRRRRRRRRRRRR:", error);
        alert("File Is Not Valid!");
      });
  }

  const removeHandle = async (row) => {
    if (window.confirm("Are You Sure?")) {
      // setLoading(true);
      let cart_arr = JSON.parse(localStorage.getItem("cart_arr")) || [];
      const foundIndex = data.findIndex((item) => item.key == row.key)
      // console.log("foundIndex", foundIndex)
      cart_arr.splice(foundIndex, 1)
      // console.log("cart_arr", cart_arr)
      setData(cart_arr)
      window.localStorage.setItem("cart_arr", JSON.stringify(cart_arr));
    }

  };

  const IncNum = async (row) => {
    // setCount(count + 1);
    // const tData = JSON.parse(window.localStorage.getItem("temData"));
    const cart_arr = JSON.parse(localStorage.getItem("cart_arr")) || [];
    const t = [];
    await cart_arr.forEach((el) => {
      let temp = { ...el }
      if (el.key === row.key) {
        temp = { ...temp, quantity: parseInt(temp.quantity) + 1 }
        t.push(temp);
      } else {
        t.push(temp);
      }
    });
    setData(t);
    window.localStorage.setItem("cart_arr", JSON.stringify(t));
  };
  const DecNum = async (row) => {
    const newValue = parseInt(row.quantity) - 1
    if (newValue != 0) {
      // const tData = JSON.parse(window.localStorage.getItem("temData"));

      const cart_arr = JSON.parse(localStorage.getItem("cart_arr")) || [];

      const t = [];
      await cart_arr.forEach((el) => {
        let temp = { ...el }
        if (el.key === row.key) {
          temp = { ...temp, quantity: newValue }
          t.push(temp);
        } else {
          t.push(temp);
        }
      });
      setData(t);
      window.localStorage.setItem("cart_arr", JSON.stringify(t));
    } else {
      const cart_arr = JSON.parse(localStorage.getItem("cart_arr")) || [];
      const t = [];
      await cart_arr.forEach((el) => {
        let temp = { ...el }
        if (el.key === row.key) {
          temp = { ...temp, quantity: 1 }
          t.push(temp);
        } else {
          t.push(temp);
        }
      });
      setData(t);
      window.localStorage.setItem("cart_arr", JSON.stringify(t));
      alert("min limit reached");
    }
  };

  const onBlurQtyChnge = (row, value) => {
    const cart_arr = JSON.parse(localStorage.getItem("cart_arr")) || [];
    const tempData = [];
    cart_arr.forEach((el) => {
      let temp = { ...el }
      if (el.key === row.key) {
        if (value <= 0) {
          temp = { ...temp, quantity: 1 }
        }
        tempData.push(temp);
      } else {
        tempData.push(temp);
      }
    });
    setData(tempData);
    window.localStorage.setItem("cart_arr", JSON.stringify(tempData));
  }

  const onQtyChange = (row, value) => {
    const cart_arr = JSON.parse(localStorage.getItem("cart_arr")) || [];
    const tempData = [];
    cart_arr.forEach((el) => {
      let temp = { ...el }
      if (el.key === row.key) {
        temp = { ...temp, quantity: parseInt(value) }
        tempData.push(temp);
      } else {
        tempData.push(temp);
      }
    });
    setData(tempData);
    window.localStorage.setItem("cart_arr", JSON.stringify(tempData));
  }

  if (loading) {
    return <FuseLoading />;
  }
  if (data?.length === 0 || !data) {
    return (
      <div className="flex flex-1 items-center justify-center h-full flex-col	">
        <Typography color="textSecondary" variant="h5">
          " Your Printing Basket is empty! "
        </Typography>
        <br />
        <div >
          <Link to="/apps/dropAndUpload/new">
            Upload Document
          </Link>
        </div>
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
                  onClickCheckOut()
                }
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
                              Page Type: {" "}
                              <span className="text-black capitalize">
                                {file?.side?.split("_")?.join(" ")?.toLowerCase()}
                              </span>
                            </Typography>
                            <Typography className="mb-5">
                              Document Type: <span className="text-black">{file.size}</span>
                            </Typography>
                            <Typography className="mb-5">Color Type: <span className="text-black">{file.color}</span></Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions className="flex justify-center">
                          <Button onClick={() => DecNum(file)}>
                            <RemoveIcon />
                          </Button>
                          <TextField
                            style={{ width: "20%" }}
                            type="number"
                            value={file.quantity}
                            onChange={(e) => onQtyChange(file, e.target.value)}
                            onBlur={(e) => onBlurQtyChnge(file, e.target.value)}
                          />
                          <Button onClick={() => IncNum(file)}>
                            <AddIcon />
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
