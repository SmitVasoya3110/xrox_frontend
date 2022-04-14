import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { memo } from 'react';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { selectFooterTheme } from 'app/store/fuse/settingsSlice';
import clsx from 'clsx';
import { unset } from 'lodash';

function FooterLayout1(props) {
	const footerTheme = useSelector(selectFooterTheme);
	

	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar
				id="fuse-footer"
				className={clsx('shadow-md', props.className)}
				color="default"
				style={{ backgroundColor: footerTheme.palette.background.paper , top:'unset',bottom:'0'}}
			>
				<Toolbar className="min-h-48 md:min-h-64 px-8 sm:px-12 py-0 flex items-center overflow-x-auto" style={{justifyContent: "flex-end"}}>
					<Typography ><b className="flex items-center" >
						<a style={{marginRight: '20px'}} href='https://www.fairtrading.nsw.gov.au/buying-products-and-services/repairs,-replacements-and-refunds#when'>
							Refunds Policy</a>
						<a className='ml-8'href='https://www.accc.gov.au/about-us/using-our-website/short-form-privacy-policy'>Privacy policy</a>
					</b>
					</Typography>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default memo(FooterLayout1);
