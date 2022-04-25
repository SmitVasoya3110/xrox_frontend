import FuseAnimate from "@fuse/core/FuseAnimate";
import { useForm } from "@fuse/hooks";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { darken } from "@material-ui/core/styles/colorManipulator";
import TextField from "@material-ui/core/TextField";
import { TextFieldFormsy, } from '@fuse/core/formsy';
import Formsy from 'formsy-react';
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import axios from "axios";
// import { submitLogin } from "app/auth/store/loginSlice";

const useStyles = makeStyles((theme) => ({
    root: {
        background: `radial-gradient(${darken(
            theme.palette.primary.dark,
            0.5
        )} 0%, ${theme.palette.primary.dark} 80%)`,
        color: theme.palette.primary.contrastText,
    },
}));

function ForgotPassword({ history }) {
    // const dispatch = useDispatch();
    const classes = useStyles();
    // const login = useSelector(({ auth }) => auth.login);
    // const [isFormValid, setIsFormValid] = useState(false);
    const { form, handleChange } = useForm({ Email_Id: "" });
    const [valid, setValid] = useState("")
    const [isFormValid, setIsFormValid] = useState(false); //validation
    const formRef = useRef(null); //validation

    // useEffect(() => {
    //   if (login.error && (login.error.Email_Id || login.error.Password)) {
    //     form.current.updateInputsWithError({
    //       ...login.error,
    //     });
    //   }
    // }, [login.error, form]);

    function isFormValid1() {
        return form.Email_Id.length >= 4
    }

    const handleSubmit = async (ev) => {
        // ev.preventDefault();

        const user = { Email_Id: form.Email_Id };
        console.log("user", user);
        await axios
            // .post(`${process.env.REACT_APP_BACKEND_URL}/forgot-password`, user)
            .post(`${process.env.REACT_APP_BACKEND_URL}/forgot-password`, user)
            .then(res => {
                if (!res.error) {
                    alert("Reset password link send to your email")
                }
            })

    }

    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32")}>
            <div className="flex flex-col items-center justify-center w-full">
                <FuseAnimate animation="transition.expandIn">
                    <Card className="w-full max-w-384 rounded-8">
                        <CardContent className="flex flex-col items-center justify-center p-32 mb-32">
                            <img className="w-128 m-32" style={{ width: "90%" }}
                                src="assets/images/printing_logo.png"
                                alt="logo"
                            />
                            <Typography variant="h6" className="mt-16 mb-32">RESET YOUR PASSWORD</Typography>

                            {/* <form name="loginForm" method="post" noValidate className="flex flex-col justify-center w-full" onSubmit={handleSubmit} > */}
                            <Formsy
                                onValid={enableButton}
                                onInvalid={disableButton}
                                ref={formRef}
                                // onSubmit={handleSubmit}
                                className="flex flex-col justify-center w-full"
                            >
                                <TextField
                                    className="mb-16"
                                    label="Email Id"
                                    type="email"
                                    autoFocus
                                    name="Email_Id"
                                    value={form.Email_Id}
                                    onChange={handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />







                                <Button variant="contained" color="primary" className="w-224 mx-auto mt-32"
                                    aria-label="LOG IN"
                                    disabled={!isFormValid1()}
                                    // type="bu"
                                    onClick={handleSubmit}
                                >
                                    SUBMIT
                                </Button>

                                {/* </form> */}
                            </Formsy>

                        </CardContent>
                        <div className="flex flex-col items-center justify-center pb-32">
                            <div>
                                <span className="font-normal mr-8">Back To</span>
                                <Link className="font-normal" to="/login">
                                    Login
                                </Link>
                            </div>

                        </div>

                    </Card>
                </FuseAnimate>
            </div>
        </div>
    );
}

export default ForgotPassword;