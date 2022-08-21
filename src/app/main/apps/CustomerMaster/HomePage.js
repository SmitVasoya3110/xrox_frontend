import React, { useState } from 'react';
import axios from 'axios';
// MUI Components
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
// Util imports
import { makeStyles } from '@material-ui/core/styles';
import FuseLoading from "@fuse/core/FuseLoading";

import "./style1.css"
import history from "@history";
import { Box, CircularProgress, Paper } from '@material-ui/core';
import { ApplePay, CreditCard, GooglePay, PaymentForm } from 'react-square-web-payments-sdk';

// smit  test
let square_application_id = "sandbox-sq0idb-SvqHq2eq43x61WjecHVNUw"
let square_location_id = "L5KKFMZJPVWBY"

let NODE_ENV = process.env.NODE_ENV;
NODE_ENV= "production"
// NODE_ENV = "development"
square_application_id = NODE_ENV.toString().toLowerCase() === "development" ? process.env.REACT_APP_APPLICATION_ID_DEV : process.env.REACT_APP_APPLICATION_ID_LIVE
square_location_id = NODE_ENV.toString().toLowerCase() === "development" ? process.env.REACT_APP_LOCATION_ID_DEV : process.env.REACT_APP_LOCATION_ID_LIVE
console.log(NODE_ENV);
const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        // margin: '35vh auto',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-start',
        fontSize: "16px",
        ["@media (min-width:360px) "]: {
            padding: "8px"
        },
        ["@media (min-width:320px) "]: {
            padding: "8px"
        }
    },
    div: {
        display: 'flex',
        // flexDirection: 'row',
        // alignContent: 'flex-start',
        // justifyContent: 'space-b',
    },
    button: {
        margin: '2em',
    },
});

function HomePage() {


    const data = JSON.parse(localStorage.getItem('myData'))
    const userData = JSON.parse(localStorage.getItem('current_user'))
    const order_id = parseInt(localStorage.getItem("order_id"))
    let timestamp = localStorage.getItem("timeStemp");
    const [loading, setLoading] = useState(false)
    const tempData = {
        user_id: userData.user.uuid,
        files: data.numbers,
        amount: data.Total_Cost,
        email: userData.user.data.email,
        order_id: order_id,
        timestamp: timestamp
    }
    const classes = useStyles();
    // State
    const [email, setEmail] = useState('');

    const handleSubmitPay = async (token) => {
        setLoading(true)
        await axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/pay`, { ...tempData, token: token })
            .then(res => {
                if (!res.error) {
                    if (res?.data?.payment?.status === "COMPLETED") {
                        alert("Your file(s) have been send for printing. You will receive a pickup confirmation shortly");
                        localStorage.removeItem("order_id");
                        localStorage.removeItem("myData");
                        localStorage.removeItem("temData");
                        localStorage.removeItem("timestamp");
                        localStorage.setItem("timeStemp", Math.floor(Date.now() / 1000))
                        history.push("/apps/dropAndUpload/new");
                    }
                    setLoading(false)

                }
            })
            .catch(error => {
                setLoading(false)
                console.log("err", error)
                console.log("Error While Generate Order");
            })
    }


    return (
        <Paper className="border w-full sm:w-1/2">
            <Card>
                <CardContent className={classes.content}>
                    {loading && (
                        <div className={classes.button}>
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                        </div>
                    )}
                    <TextField
                        label='Email'
                        id='outlined-email-input'
                        helperText={`Email you'll recive updates and receipts on`}
                        margin='normal'
                        variant='outlined'
                        type='email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                    <div style={{ touchAction: "none" }}>
                        <PaymentForm
                            applicationId={square_application_id}
                            locationId={square_location_id}
                            cardTokenizeResponseReceived={async (token, buyer) => {

                                const response = await handleSubmitPay(token.token)
                                // const response = await fetch("/api/pay", {
                                //     method: "POST",
                                //     headers: {
                                //         "Content-type": "application/json"
                                //     },
                                //     body: JSON.stringify({
                                //         sourceId: token.token,
                                //         amount: 200
                                //     })
                                // })
                                // alert(JSON.stringify(await response.json(), null,))
                            }}

                            createPaymentRequest={() => ({
                                countryCode: "AU",
                                currencyCode: "AUD",
                                total: {
                                    amount: data.Total_Cost.toString(),
                                    label: "Total",
                                }
                            })}



                        >
                            <GooglePay />
                            <ApplePay />
                            <br />
                            <CreditCard />
                        </PaymentForm>
                    </div>
                    <div className={classes.div}>
                        {/* <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        // onClick={handleSubmitPay}
                    >
                        Pay
                    </Button> */}

                    </div>

                </CardContent>
            </Card>
        </Paper>
    );
}

export default HomePage;