import FuseAnimate from "@fuse/core/FuseAnimate";
import FusePageCarded from "@fuse/core/FusePageCarded";
import Button from "@material-ui/core/Button";
import { orange } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import clsx from "clsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


// card
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Alert from "@material-ui/lab/Alert";
import { set } from "date-fns";
import history from "@history";
import pdfFile from "./Printing7.pdf"



import FooterLayout1 from '../../../fuse-layouts/layout1/components/FooterLayout1';
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

// let shouldSucceed = false;

// function hasSufficientFunds() {
//     // TODO: implement funds check
//     const promise = Promise.resolve(shouldSucceed);
//     shouldSucceed = !shouldSucceed;
//     return promise;
// }

function CustomerPayment(props) {
    const theme = useTheme();

    const classes = useStyles(props);
    const temp_myData=localStorage.getItem("myData");
    if(!temp_myData){
        history.push("/apps/dropAndUpload/new")
        window.location.reload();
    }
    const data = JSON.parse(localStorage.getItem('myData'))
    const tp = data.numbers
    const tc = data.Total_Cost.toString()
    const userData = JSON.parse(localStorage.getItem('current_user'))
    data["displayName"] = userData.user.data.displayName
    data["email"] = userData.user.data.email

    const [docFormat, setDocFormat] = useState("")

    // const [fileData, setFileData] = useState(null);
    const [agree, setAgree] = useState(false);

    function onResumeClick() {
        window.open(Pdf);
    }




    const checkboxHandler = () => {
        // if agree === true, it will be set to false
        // if agree === false, it will be set to true
        setAgree(!agree);
        // Don't miss the exclamation mark
    }
   

    const functionCreateOrder = async (event) => {
        event.preventDefault();
        const tempData = {
            user_id: userData.user.uuid,
            files: data.numbers,
            amount: data.Total_Cost,
            
        }
        await axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/place/order`, tempData)
            .then(res => {
                if (!res.error) {
                    // alert("Order Placed");
                    localStorage.setItem("order_id", res.data.order_id)
                    history.push("/apps/OderPage");
                }
            })
            .catch(error => {
                alert("Error While Generate Order")
            })
    }



    return (
        <div>
            <form encType="multipart/form-data" method="post" className="flex flex-1 w-full items-center justify-between">
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
                        <div className="p-16 my-20">
                            <div className="flex items-center">
                                <FuseAnimate animation="transition.expandIn">
                                    <Icon className="text-32">attach_file</Icon>
                                </FuseAnimate>
                                <Typography className="text-20 sm:text-20 truncate my-12">
                                    How the Prices are calculated? <a className="headerProfile-menu-list" onClick={() => window.open(pdfFile)}> Pricing Structure </a>
                                </Typography>
                            </div>

                            <div className="flex justify-center sm:justify-start  -mx-8 p-16 ">

                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image="assets/images/printing_logo.png"
                                            title="Contemplative Reptile"
                                            // style={{width:'100%', height:'50%'}}
                                        />
                                        <CardContent>
                                            {/* <Typography gutterBottom variant="h5" component="h2">
                                                Total Pages : <b>{tp}</b>
                                            </Typography> */}
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Total Amount : <b>${tc}</b>
                                            </Typography>
                                            <Typography gutterBottom variant="h7" component="h4">
                                                10% GST included
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                <div>
                                                    <input type="checkbox" id="agree" onChange={checkboxHandler} />
                                                    <label htmlFor="agree"> I agree to <b>terms and conditions & Privacy Policy </b></label>
                                                </div>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions className="pl-32">
                                        <Button
                                            // type="submit"
                                            className="whitespace-nowrap normal-case"
                                            variant="contained"
                                            color="secondary"
                                            style={{ width: "40%" }}
                                            disabled={!agree}
                                            // onClick={(event) => history.push("/apps/OderPage")}
                                            onClick={functionCreateOrder}
                                        >
                                            Place Order
                                        </Button>

                                    </CardActions>
                                </Card>
                            </div>
                        
                        </div>
                    }
                    innerScroll
                />
            </form>
            <FooterLayout1 style={{}} />
        </div>
    );
}

export default CustomerPayment;