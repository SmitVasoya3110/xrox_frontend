import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import React, { useRef  } from 'react';
import ShiftHeader from './cartHeader';
import ShiftTableHead from './cartTableHead';
import ShiftFilter from './cartFilter';
import reducer from 'app/main/Redux_Store/index';


function CartList(props) {
	const pageLayout = useRef(null);

	return (
		<FusePageSimple
			classes={{
				contentWrapper: 'p-0 sm:p-24 h-full',
				content: 'flex flex-col h-full',
				leftSidebar: 'w-256 border-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
				wrapper: 'min-h-0'
			}}
			header={<ShiftHeader pageLayout={pageLayout} />}
			content={<ShiftTableHead />}
			// leftSidebarContent={<ShiftFilter />}
			sidebarInner
			ref={pageLayout}
			innerScroll

		/>
	);
}

export default withReducer('ERP', reducer)(CartList);
