import FuseAnimate from "@fuse/core/FuseAnimate";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { darken } from "@material-ui/core/styles/colorManipulator";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { submitLogin } from "app/auth/store/loginSlice";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "app/validations";

const useStyles = makeStyles((theme) => ({
  root: {
    background: `radial-gradient(${darken(
      theme.palette.primary.dark,
      0.5
    )} 0%, ${theme.palette.primary.dark} 80%)`,
    color: theme.palette.primary.contrastText,
  },
}));

function LoginPage({ history }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const login = useSelector(({ auth }) => auth.login);
  // const [isFormValid, setIsFormValid] = useState(false);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });
  const { watch, control } = methods;
  const form = watch();

  function handleSubmitFinal() {
    const userForm = { ...form };

    dispatch(submitLogin(userForm));

    // Reset input value 
    methods.setValue("password", "")
  }

  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32"
      )}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <FuseAnimate animation="transition.expandIn">
          <Card className="w-full max-w-384 rounded-8">
            <CardContent className="flex flex-col items-center justify-center p-32 mb-32">
              <img
                className="w-128 m-32"
                style={{ width: "90%" }}
                src="assets/images/printing_logo.png"
                alt="logo"
              />
              <Typography variant="h6" className="mt-16 mb-32">
                LOGIN TO YOUR ACCOUNT
              </Typography>
              {/* <form name="loginForm" method="post" noValidate className="flex flex-col justify-center w-full" onSubmit={handleSubmit} > */}
              <FormProvider {...methods}>
                <form
                  name="loginForm"
                  className="flex flex-col justify-center w-full"
                  onSubmit={methods.handleSubmit(handleSubmitFinal)}
                >
                  <Controller
                    control={control}
                    name="email"
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        className="mb-16"
                        label="Email Id"
                        autoFocus
                        // name="email"
                        variant="outlined"
                        // required
                        fullWidth
                        {...field}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />


                  <Controller
                    control={control}
                    name="password"
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        className="mb-16"
                        label="Password"
                        type="Password"
                        // name="password"
                        variant="outlined"
                        // required
                        fullWidth
                        {...field}
                        error={!!error}
                        helperText={error?.message}
                      />

                    )}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    className="w-224 mx-auto mt-32"
                    aria-label="LOG IN"
                    type="submit"
                  >
                    LOGIN
                  </Button>
                </form>
              </FormProvider>
            </CardContent>
            <div className="flex flex-col items-center justify-center pb-32">
              <div>
                <span className="font-normal mr-8">Don't have an account?</span>
                <Link className="font-normal" to="/register">
                  Register
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center pb-32">
              <div>
                {/* <span className="font-normal mr-8">Forgot Pass?</span> */}
                <Link className="font-normal" to="/forgot_password">
                  Forgot Password?
                </Link>
              </div>
            </div>
          </Card>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default LoginPage;
