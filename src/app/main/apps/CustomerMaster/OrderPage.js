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

import GooglePayButton from "@google-pay/button-react"
// import StripeCheckout from 'react-stripe-checkout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
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

// the key is located in the .env file
const stripePromise = loadStripe("pk_live_51KNpBmDiddQAhMW0KFEt4brL1aT9RrcKtj8wPeCiyE3UlWXBIna6jRIDCbh1ELxsM8CyStT9c9TTwu3u1H3fWa2500z2hWgEPm");

let shouldSucceed = false;

function hasSufficientFunds() {
    // TODO: implement funds check
    const promise = Promise.resolve(shouldSucceed);
    shouldSucceed = !shouldSucceed;
    return promise;
}

function CustomerPayment(props) {

    const theme = useTheme();

    const classes = useStyles(props);
    const temp_myData = localStorage.getItem("myData");
    console.log("temp_myData", temp_myData);
    const temp_order_id = localStorage.getItem("order_id");
    if (!temp_myData || !temp_order_id) {
        history.push("/apps/dropAndUpload")
        window.location.reload();
    }
    const data = JSON.parse(localStorage.getItem('myData'))
    const order_id = parseInt(localStorage.getItem("order_id"))

    const tp = data.Total_Pages.toString()
    const tc = data.Total_Cost.toString()
    const userData = JSON.parse(localStorage.getItem('current_user'))
    const [loading, setLoading] = useState(false)
    console.log("userData", userData)
    // console.log("data", userData.user.data.displayName)

    console.log("data", data)



    function handleSuccess() {
        setLoading(true)
        // event.preventDefault();
        console.log("mydataaa:", data)
        // console.log("transactionState", transactionState);
        // console.log("SUCCESS",SUCCESS)

        const tempData = {
            user_id: userData.user.uuid,
            docFormat: data.docFormat,
            pageFormat: data.pageFormat,
            fileNames: data.fileNames,
            Total_Cost: data.Total_Cost,
            email: userData.user.data.email,
            order_id: order_id,
            displayName: userData.user.data.displayName


        }
        console.log("tempData", tempData);
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/confirm/order`, tempData)
            .then(res => {
                if (!res.error) {
                    setLoading(false)
                    alert("Payment Successfull");
                    console.log("res", res.data);
                    // localStorage.setItem("order_id", res.data.order_id)
                    localStorage.removeItem("order_id");
                    localStorage.removeItem("myData");


                    history.push("/apps/dropAndUpload");
                }
            })
            .catch(error => {
                setLoading(false)
                alert("Pronlem in Payment");
                console.log("Error While Generate Order");
            })

        return { transactionState: 'SUCCESS' }

    }

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
                                        to="/apps/dropAndUpload"
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
                        <div className="p-16 my-20">
                            <div className="flex items-center">
                                <FuseAnimate animation="transition.expandIn">
                                    <Icon className="text-32">attach_file</Icon>
                                </FuseAnimate>
                                <Typography className="text-20 sm:text-20 truncate my-12">
                                    Order Details
                                </Typography>
                            </div>


                            <TableContainer className="border" style={{ width: "500px" }} component={Paper}>
                                <Table aria-label="custom table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" className="whitespace-nowrap" scope="row">
                                                {"Order ID"}
                                            </TableCell>
                                            <TableCell style={{ width: 160 }} align="left">
                                                {localStorage.getItem("order_id")}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" className="whitespace-nowrap" scope="row">
                                                {"User Name"}
                                            </TableCell>
                                            <TableCell style={{ width: 160 }} align="left">
                                                {userData.user.data.displayName}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>

                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" className="whitespace-nowrap" scope="row">
                                                {"User Email"}
                                            </TableCell>
                                            <TableCell style={{ width: 160 }} align="left">
                                                {userData.user.data.email}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" className="whitespace-nowrap" scope="row">
                                                {"Total Cost"}
                                            </TableCell>
                                            <TableCell style={{ width: 160 }} align="left">
                                                ${data.Total_Cost}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" className="whitespace-nowrap" scope="row">
                                                {"Page Type"}
                                            </TableCell>
                                            <TableCell style={{ width: 160 }} align="left">
                                                {data.docFormat}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" className="whitespace-nowrap" scope="row">
                                                {"Total Pages"}
                                            </TableCell>
                                            <TableCell style={{ width: 160 }} align="left">
                                                {data.Total_Pages}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" className="whitespace-nowrap" scope="row">
                                                {"Files Name(s)"}
                                            </TableCell>
                                            <TableCell align="left">
                                                {/* {data.fileNames.toString()} */}
                                                {
                                                    data.fileNames.map(f => {
                                                        return (<p className="whitespace-nowrap" >{f}</p>)
                                                    })
                                                }
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <div className="pt-16 mb-3">

                                <GooglePayButton
                                    environment="TEST"
                                    paymentRequest={{
                                        apiVersion: 2,
                                        apiVersionMinor: 0,
                                        allowedPaymentMethods: [
                                            {
                                                type: 'CARD',
                                                parameters: {
                                                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                                },
                                                tokenizationSpecification: {
                                                    type: 'PAYMENT_GATEWAY',
                                                    parameters: {
                                                        gateway: 'example',
                                                        gatewayMerchantId: 'exampleGatewayMerchantId',
                                                    },
                                                },
                                            },
                                        ],
                                        merchantInfo: {
                                            merchantId: '12345678901234567890',
                                            merchantName: 'Demo Merchant',
                                        },
                                        transactionInfo: {
                                            totalPriceStatus: 'FINAL',
                                            totalPriceLabel: 'Total',
                                            totalPrice: tc,
                                            currencyCode: 'AUD',
                                            countryCode: 'AU',
                                        },
                                        shippingAddressRequired: true,
                                        callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
                                    }}
                                    onLoadPaymentData={paymentRequest => {
                                        console.log('Success', paymentRequest);
                                    }}
                                    onPaymentAuthorized={async () => {
                                        if (await hasSufficientFunds()) {
                                            return handleSuccess()
                                        } else {
                                            return {
                                                transactionState: 'ERROR',
                                                error: {
                                                    reason: "PAYMENT_DATA_INVALID",
                                                    message: "Insufficient funds (shouldSucceed is false), click Pay again.",
                                                    intent: "PAYMENT_AUTHORIZATION"
                                                }
                                            };
                                        }
                                    }}
                                    onPaymentDataChanged={paymentData => {
                                        console.log('On Payment Data Changed', paymentData)
                                        return {}
                                    }
                                    }
                                    existingPaymentMethodRequired='false'
                                    buttonColor='black'
                                    buttonType='pay'
                                />
                                {loading && (
                                    
                                        <CircularProgress style={{marginLeft:"2em"}} />
                                    
                                )
                                }
                            </div>
                            <h3 className="pt-16 mb-3 ml-3"><b>PAY WITH CARD</b></h3>
                            <div className="mb-60">
                                <Elements stripe={stripePromise}>
                                    <HomePage />
                                </Elements>
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