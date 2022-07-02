import FuseAnimate from "@fuse/core/FuseAnimate";
// import FuseChipSelect from "@fuse/core/FuseChipSelect";
// import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
// import { useForm, useDeepCompareEffect } from "@fuse/hooks";
// import FuseUtils from "@fuse/utils";
// import _ from "@lodash";
import Button from "@material-ui/core/Button";
import { orange } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
// import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import clsx from "clsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

import HomePage from "./HomePage";

import history from "@history";
import FooterLayout1 from '../../../fuse-layouts/layout1/components/FooterLayout1';
import { Box, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

let shouldSucceed = false;

function CustomerPayment(props) {

    const theme = useTheme();

    const classes = useStyles(props);
    const temp_myData = localStorage.getItem("myData");
    // console.log("temp_myData", temp_myData);
    const temp_order_id = localStorage.getItem("order_id");
    let timestamp = localStorage.getItem("timeStemp");
    if (!temp_myData || !temp_order_id) {
        history.push("/apps/dropAndUpload/new")
        window.location.reload();
    }
    const data = JSON.parse(localStorage.getItem('myData'))
    const order_id = parseInt(localStorage.getItem("order_id"))

    // const tp = data.Total_Pages.toString()
    const tc = data.Total_Cost.toString()
    const userData = JSON.parse(localStorage.getItem('current_user'))
    const [loading, setLoading] = useState(false)

    return (
        <div>
            <form className="flex flex-1 w-full items-center justify-between">
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
                                        to="/apps/dropAndUpload/new"
                                        color="inherit"
                                    >
                                        <Icon className="text-20">
                                            {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
                                        </Icon>
                                        <span className="mx-4">Back To Upload</span>
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                Invoice
                                            </Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>

                        </div>
                    }
                    content={
                        <div className="p-2 sm:p-16 my-20">
                            <div className="flex items-center">
                                <FuseAnimate animation="transition.expandIn">
                                    <Icon className="text-32">attach_file</Icon>
                                </FuseAnimate>
                                <Typography className="text-20 sm:text-20 truncate my-12">
                                    Order Details
                                </Typography>
                            </div>


                            <TableContainer className="border w-full sm:w-1/2" component={Paper}>
                                <Table aria-label="custom table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" className="whitespace-nowrap p-8 sm:p-16" scope="row">
                                                {"Order ID"}
                                            </TableCell>
                                            <TableCell align="left" className="p-8 sm:p-16">
                                                {localStorage.getItem("order_id")}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" className="whitespace-nowrap p-8 sm:p-16" scope="row">
                                                {"User Name"}
                                            </TableCell>
                                            <TableCell align="left" className="p-8 sm:p-16">
                                                {userData.user.data.displayName}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>

                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" className="whitespace-nowrap p-8 sm:p-16" scope="row">
                                                {"User Email"}
                                            </TableCell>
                                            <TableCell align="left" className="p-8 sm:p-16">
                                                {userData.user.data.email}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th"
                                                className="whitespace-nowrap p-8 sm:p-16"
                                                scope="row">
                                                {"Total Cost"}
                                            </TableCell>
                                            <TableCell align="left" className="p-8 sm:p-16">
                                                {/* ${data.Total_Cost} */}
                                                ${parseFloat(data.Total_Cost).toFixed(2)}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    {/* <TableBody>
                                        <TableRow>
                                            <TableCell component="th" className="whitespace-nowrap" scope="row">
                                                {"Page Type"}
                                            </TableCell>
                                            <TableCell style={{ width: 160 }} align="left">
                                                {data.docFormat}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody> */}
                                    {/* <TableBody>
                                        <TableRow>
                                            <TableCell component="th" className="whitespace-nowrap" scope="row">
                                                {"Total Pages"}
                                            </TableCell>
                                            <TableCell style={{ width: 160 }} align="left">
                                                {data.Total_Pages}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody> */}

                                </Table>
                            </TableContainer>

                            <div className="pt-16 mb-3">


                                {loading && (
                                    <CircularProgress style={{ marginLeft: "2em" }} />
                                )
                                }
                            </div>
                            <h3 className="pt-16 mb-3 ml-16"><b>PAY WITH CARD</b></h3>
                            <div className="mb-60">
                                <HomePage />
                            </div>
                        </div>

                    }
                    innerScroll
                />
            </form>
            <FooterLayout1 />
        </div>
    );
}

export default CustomerPayment;