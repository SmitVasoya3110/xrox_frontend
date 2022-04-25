import React, { useState } from 'react';
import axios from 'axios';
// MUI Components
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
// Util imports
import { makeStyles } from '@material-ui/core/styles';
// Components
import CardInput from './CardInput';
// Stripe
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import FuseLoading from "@fuse/core/FuseLoading";

import "./style1.css"
import history from "@history";
import { Box, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        // margin: '35vh auto',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-start',
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
        timestamp:timestamp
    }
    const classes = useStyles();
    // State
    const [email, setEmail] = useState('');

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmitPay = async (event) => {

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        var clientSecret = null;
        console.log("object")
        setLoading(true)
        // const res = axios.post(`${process.env.REACT_APP_BACKEND_URL}/pay`, tempData);
        await axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/pay`, tempData)
            .then(res => {
                if (!res.error) {
                    // alert("Payment Successfull");
                    // console.log("res", res.data['client_secret']);
                    clientSecret = res.data['client_secret']
                    // localStorage.setItem("order_id", res.data.order_id)
                    // localStorage.removeItem("order_id");
                    // localStorage.removeItem("myData");


                    // history.push("/apps/dropAndUpload");
                }
            })
            .catch(error => {
                console.log("err", error)
                console.log("Error While Generate Order");
            })
        // console.log("res", res.data)
        // const clientSecret = res.data['client_secret'];

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    email: email,
                },
            },
        });

        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
            setLoading(false)
            alert("Problem in Payment");

        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
                alert("Your file(s) have been send for printing. You will receive a pickup confirmation shortly ");
                setLoading(false)
                localStorage.removeItem("order_id");
                localStorage.removeItem("myData");
                localStorage.removeItem("temData");
                localStorage.removeItem("timestamp");
                localStorage.setItem("timeStemp",Math.floor(Date.now() /1000))
                history.push("/apps/dropAndUpload/new");
                // Show a success message to your customer
                // There's a risk of the customer closing the window before callback
                // execution. Set up a webhook or plugin to listen for the
                // payment_intent.succeeded event that handles any business critical
                // post-payment actions.

            }
        }
    };

   


    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
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
                <CardInput />
                <div className={classes.div}>
                    <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmitPay}>
                        Pay
                    </Button>
                    {loading && (
                        <div className={classes.button}>
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                        </div>
                    )
                    }
                </div>

            </CardContent>
        </Card>
    );
}

export default HomePage;