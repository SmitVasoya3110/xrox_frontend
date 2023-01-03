/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-bind */
import FuseAnimate from "@fuse/core/FuseAnimate";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { darken } from "@material-ui/core/styles/colorManipulator";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import React, { useState, useRef } from "react";
import axios from "axios";
import history from "@history";
import { Link } from "react-router-dom";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "app/validations";


const useStyles = makeStyles((theme) => ({
	root: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark
			} 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
		color: theme.palette.primary.contrastText,
	},
	leftSection: {},
	rightSection: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark
			} 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
		color: theme.palette.primary.contrastText,
	},
}));

function Register3Page() {
	const classes = useStyles();
	const methods = useForm({
		mode: "onChange",
		defaultValues: {
			username: "",
			email: "",
			password: "",
			passwordConfirm: "",
			mobile_number: "",
			acceptTermsConditions: false,
		},
		resolver: yupResolver(signUpSchema),
	});
	const { watch, control } = methods;
	const form = watch();

	console.log("form", form);

	const handleSubmitFinal = async () => {
		if (!form.acceptTermsConditions) {
			alert("Please accept terms and conditions!")
			return
		}
		axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/`, form)
			.then((res) => {
				// console.log(res);
				if (!res.error) {
					alert("You Register Successfully!");
					history.push("/login");
				}
			})
			.catch((error) => {
				// console.log(error);
				// console.log(error.paylod);
				// console.log(error.response);
				if (error.response) {
					alert("warning!");
				}
			});
	};

	return (
		<div
			className={clsx(
				classes.root,
				"flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24"
			)}
		>
			<FuseAnimate animation="transition.expandIn">
				<div className="flex w-full max-w-400 md:max-w-3xl rounded-12 shadow-2xl overflow-hidden">
					<Card
						className={clsx(
							classes.leftSection,
							"flex flex-col w-full max-w-sm items-center justify-center shadow-0"
						)}
						square
					>
						<CardContent className="flex flex-col items-center justify-center w-full py-32 max-w-320">
							<img
								className="w-128 m-32 mt-16"
								style={{ width: "70%" }}
								src="assets/images/printing_logo.png"
								alt="logo"
							/>

							<FormProvider {...methods}>
								<form onSubmit={methods.handleSubmit(handleSubmitFinal)}>
									<Controller
										control={control}
										name="username"
										render={({ field, fieldState: { error } }) => (
											<TextField
												className="mb-16"
												label="User Name"
												type="text"
												// name="username"
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
										name="mobile_number"
										render={({ field, fieldState: { error } }) => (
											<TextField
												className="mb-16"
												label="Mobile Number"
												type="text"
												// name="Mobile_Number"

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
										name="email"
										render={({ field, fieldState: { error } }) => (
											<TextField
												className="mb-16"
												label="Email"
												type="text"
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
												// name="Password"

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
										name="passwordConfirm"
										render={({ field, fieldState: { error } }) => (
											<TextField
												className="mb-16"
												label="Password (Confirm)"
												type="password"
												variant="outlined"
												// required
												fullWidth
												{...field}
												error={!!error}
												helperText={error?.message}
											/>
										)}
									/>
									<div>
										<Controller
											control={control}
											name="acceptTermsConditions"
											render={({ field, fieldState: { error } }) => (
												<>
													<input
														type="checkbox"
														checked={field.value}
														onChange={() => {
															methods.setValue(
																"acceptTermsConditions",
																!field.value
															);
														}}
													/>
													<label htmlFor="agree">
														I agree to{" "}
														<b>
															terms and conditions , Refund Policy & privacy
															Policy{" "}
														</b>
													</label>
												</>
											)}
										/>
									</div>

									<Button
										variant="contained"
										color="primary"
										className="w-full mx-auto mt-16"
										aria-label="Register"
										type="submit"
									>
										Create an account
									</Button>
								</form>
							</FormProvider>
						</CardContent>

						<div className="flex flex-col items-center justify-center mb-16">
							<div>
								<span className="font-normal mr-8">
									Already have an account?
								</span>
								<Link className="font-normal" to="/login">
									Login
								</Link>
							</div>
						</div>
					</Card>

					<div
						className={clsx(
							classes.rightSection,
							"hidden md:flex flex-1 items-center justify-center p-64"
						)}
					>
						<div className="max-w-640">
							<FuseAnimate animation="transition.slideUpIn" delay={400}>
								<Typography
									variant="h3"
									color="inherit"
									className="font-800 leading-tight"
								>
									Welcome to the
									<br /> Printing
								</Typography>
							</FuseAnimate>

							<FuseAnimate delay={500}>
								<Typography
									variant="subtitle1"
									color="inherit"
									className="mt-32 text-20	"
								>
									We're glad to have you here. Let's work and Grow together.
								</Typography>
							</FuseAnimate>
						</div>
					</div>
				</div>
			</FuseAnimate>
		</div>
		// </Formsy >
	);
}

export default Register3Page;
