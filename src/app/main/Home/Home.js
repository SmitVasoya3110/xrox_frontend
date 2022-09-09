import FuseAnimate from "@fuse/core/FuseAnimate";

import { makeStyles } from "@material-ui/core/styles";
import { darken } from "@material-ui/core/styles/colorManipulator";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

import { Link } from "react-router-dom";
import "./home.css";

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

	return (
		<div
			className={clsx(
				classes.root,
				"flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24"
			)}
		>
			<FuseAnimate animation="transition.expandIn">
				<div className=" w-full md:max-w-3xl rounded-12 shadow-2xl overflow-hidden">
					<div className="flex items-center justify-center homeImageDiv">
						<img
							src="assets/images/printing_logo.png"
							alt="logo"
						/>
					</div>
					<div className="homeTitleWrapper">
						<div className="max-w-700">
							<FuseAnimate animation="transition.slideUpIn" delay={400}>
								<Typography
									variant="h3"
									color="inherit"
									className="font-800 leading-tight mainHomeText"
								>
									Welcome to the Printing7
								</Typography>
							</FuseAnimate>

							<FuseAnimate delay={500}>
								<Typography
									variant="subtitle1"
									color="inherit"
									className="mt-32 text-20 HomeSubText"
								>
									We're glad to have you here. Let's work and Grow together.
								</Typography>
							</FuseAnimate>
						</div>
						<div className="homeLoginRegisterWrapper">
							<div className="flex flex-col items-center justify-center homeLoginRegisterWrapperItem">
								<div>
									<span className="font-normal mr-8">
										Already have an account?
									</span>
									<Link className="font-normal" to="/login">
										Login
									</Link>
								</div>
							</div>
							<div className="homeLoginRegisterWrapperItem">
								<span className="font-normal mr-8">Don't have an account?</span>
								<Link className="font-normal" to="/register1">
									Register
								</Link>
							</div>
						</div>
					</div>
				</div>
			</FuseAnimate >
		</div >
	);
}

export default Register3Page;
