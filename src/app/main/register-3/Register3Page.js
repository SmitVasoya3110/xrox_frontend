import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState, useRef } from 'react';
import axios from 'axios'
import history from '@history'
import { TextFieldFormsy, } from '@fuse/core/formsy';
import Formsy from 'formsy-react';
import { Link } from 'react-router-dom';
// import jsonCity from '../json/cities.json'
// import { NotificationManager } from 'react-notifications';

const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	},
	leftSection: {},
	rightSection: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));

function Register3Page() {
	const classes = useStyles();
	const [isFormValid, setIsFormValid] = useState(false); //validation
	const { form, handleChange } = useForm({
		FirstName: '',
		LastName: '',
		Mobile_Number: '',
		Email_Id: '',
		Password: '',
		passwordConfirm: '',
		acceptTermsConditions: true
	});
	const [state, setState] = useState({
		FirstName: ""
	})
	const [valid, setValid] = useState("")
	const formRef = useRef(null); //validation

	const [agree, setAgree] = useState(false);

    const checkboxHandler = () => {
        // if agree === true, it will be set to false
        // if agree === false, it will be set to true
        setAgree(!agree);
        // Don't miss the exclamation mark
    }

	const handlenameChange = (e) => {

		const value = e.target.value
		if (!value.match(/^[a-zA-Z ]*$/)) {

			setValid("false")
			// console.log(valid)
			setState({
				...state,
				FirstName: "*Please enter alphabet characters only."
			})
		}
		else {
			setState({
				...state,
				FirstName: ""
			})
			setValid("true")
			// console.log(valid)
			form.FirstName = value
			// setIsFormValid(true);
		}
	}
	function canBeSubmitted() {
		return (
			valid === "true"


		);
	}
	const handleSubmit = async () => {
		// ev.preventDefault();
		// resetForm();
		console.log("form \n ", form);
		axios.post(`${process.env.REACT_APP_BACKEND_URL}/Customer`, form).then(res => {
			console.log(res);
			if (!res.error) {
				alert("You Register Successfully!")

				history.push('/login');
			}

		}).catch(error => {
			console.log(error);
			console.log(error.paylod);
			console.log(error.response);
			if (error.response) {
				// NotificationManager.warning(error.response.data.Messgae, 'warning!', 4000);
				alert("warning!")
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
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
			)}
		>
			<FuseAnimate animation="transition.expandIn">
				<div className="flex w-full max-w-400 md:max-w-3xl rounded-12 shadow-2xl overflow-hidden">
					<Card
						className={clsx(
							classes.leftSection,
							'flex flex-col w-full max-w-sm items-center justify-center shadow-0'
						)}
						square
					>
						<CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">

							<img className="w-128 m-32" style={{ width: "70%" }} src="assets/images/printing_logo.png" alt="logo" />

							<Formsy
								onValid={enableButton}
								onInvalid={disableButton}
								ref={formRef}
								onSubmit={handleSubmit}
							>
								<TextFieldFormsy
									className="mb-16"
									label="First Name"
									autoFocus
									type="text"
									name="FirstName"
									value={form.FirstName}
									onChange={handlenameChange}
									variant="outlined"
									required
									fullWidth
								/>
								<div className="text-red">{state.FirstName}</div>

								<TextFieldFormsy
									className="mb-16"
									label="Last Name"
									type="text"
									name="LastName"
									value={form.LastName}
									validations={{
										isAlpha: true,
									}}
									validationErrors={{
										isAlpha: "Only Character Required"
									}}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>

								<TextFieldFormsy
									className="mb-16"
									label="Mobile Number"
									type="text"
									name="Mobile_Number"
									value={form.Mobile_Number}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
									validations={{
										maxLength: 10,
										isNumeric: true,
									}}
									validationErrors={{
										maxLength: 'Maximum length is 10',
										isNumeric: 'Only Number required'
									}}
								/>

								<TextFieldFormsy
									className="mb-16"
									label="Email"
									type="text"
									name="Email_Id"
									value={form.Email_Id}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
									validations={{
										isEmail: true,
									}}
									validationErrors={{
										isEmail: "Email in Invalid",
									}}
								/>

								<TextFieldFormsy
									className="mb-16"
									label="Password"
									type="Password"
									name="Password"
									id="Password"
									value={form.Password}
									validations={{
										minLength: 6,

									}}
									validationErrors={{
										minLength: 'Minimum length is 6',

									}}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>

								<TextField
									className="mb-16"
									label="Password (Confirm)"
									type="password"
									name="passwordConfirm"
									value={form.passwordConfirm}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
									error={form.Password !== form.passwordConfirm}
								// // errorText="Confirm Paswword Not Match !"
								// onError="Confirm Paswword Not Match !"
								// validationError={'Confirm Paswword Not Match !'}
								// validation={`equalsField:Password`}
								/>
								<div>
									<input type="checkbox" id="agree" onChange={checkboxHandler} />
									<label htmlFor="agree"> I agree to <b>terms and conditions , Refund Policy & privacy Policy </b></label>
								</div>

								{/* <FormControl className="items-center">
									<FormControlLabel
										classes={{ label: 'text-13 font-600' }}
										control={
											<Checkbox
												name="acceptTermsConditions"
												checked={form.acceptTermsConditions}
												onChange={handleChange}
											/>
										}
										label="I read and accept terms and conditions"
									/>
								    </FormControl> */}

								<Button
									variant="contained"
									color="primary"
									className="w-full mx-auto mt-16"
									aria-label="Register"
									disabled={!agree || !isFormValid || !canBeSubmitted()}
									type="submit"
								>
									Create an account
								</Button>
								{/* </form> */}
							</Formsy>
						</CardContent>

						<div className="flex flex-col items-center justify-center pb-64">
							<div>
								<span className="font-normal mr-8">Already have an account?</span>
								<Link className="font-normal" to="/login">
									Login
								</Link>
							</div>

						</div>
					</Card>

					<div
						className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center p-64')}
					>
						<div className="max-w-640">
							<FuseAnimate animation="transition.slideUpIn" delay={400}>
								<Typography variant="h3" color="inherit" className="font-800 leading-tight">
									Welcome to the
									<br /> Printing
								</Typography>
							</FuseAnimate>

							<FuseAnimate delay={500}>
								<Typography variant="subtitle1" color="inherit" className="mt-32 text-20	">
									We're glad to have you here. Let's work and Grow together.
								</Typography>
							</FuseAnimate>
						</div>
					</div>
				</div>
			</FuseAnimate>
		</div >
		// </Formsy >
	);
}

export default Register3Page;
