import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import PropTypes from "prop-types";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
// import TableSortLabel from '@material-ui/core/TableSortLabel';
import {
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from "react-table";
import clsx from "clsx";
import CustomeTablePagination from "app/Components/CustomeTablePagination";
import { TableSortLabel } from "@material-ui/core";
import MultiSelectMenu from "./userMenu";
import { KeyboardArrowDown } from "@material-ui/icons";

const IndeterminateCheckbox = React.forwardRef(
	({ indeterminate, ...rest }, ref) => {
		const defaultRef = React.useRef();
		const resolvedRef = ref || defaultRef;

		React.useEffect(() => {
			resolvedRef.current.indeterminate = indeterminate;
		}, [resolvedRef, indeterminate]);

		return (
			<Checkbox
				size="small"
				ref={resolvedRef}
				{...rest}
				style={{ padding: "5px", margin: 0 }}
			/>
		);
	}
);

const EnhancedTable = ({
	columns,
	data,
	index,
	size,
	params,
	setParams,
	totalCount,
}) => {
	const {
		getTableProps,
		headerGroups,
		prepareRow,
		page,
		gotoPage,
		setPageSize,
		state: { sortBy },
	} = useTable(
		{
			columns,
			data,
			autoResetPage: true,
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect,
		(hooks) => {
			// hooks.allColumns.push((_columns) => [
			// 	// Let's make a column for selection
			// 	{
			// 		id: "selection",
			// 		sortable: false,
			// 		Header: ({ selectedFlatRows }) => {
			// 			const selectedRowIds = selectedFlatRows.map((row) => row.original.id);
			// 			console.log("vvvvvvv", selectedRowIds)
			// 			return (
			// 				selectedFlatRows.length > 0 && (
			// 					<MultiSelectMenu selectedIds={selectedRowIds} />
			// 				)
			// 			);
			// 		},
			// 		Cell: ({ row }) => (
			// 			<div>
			// 				{row.original.return_status === 1 ? (
			// 					"Return"
			// 				) : (
			// 					<IndeterminateCheckbox
			// 						{...row.getToggleRowSelectedProps()}
			// 						onClick={(ev) => ev.stopPropagation()}
			// 					/>
			// 				)}
			// 			</div>
			// 		),
			// 	},
			// 	..._columns,
			// ]);
		}
	);

	const handleChangePage = (event, newPage) => {
		event.preventDefault();
		gotoPage(Number(newPage));
		setParams({
			...params,
			pageIndex: Number(newPage + 1),
		});
	};

	const handleChangeRowsPerPage = (event) => {
		event.preventDefault();
		setPageSize(Number(event.target.value));
		gotoPage(1);
		setParams({
			...params,
			pageIndex: 1,
			pageSize: Number(event.target.value),
		});
	};

	// Render the UI for your table
	return (
		<div
			className="flex flex-col min-h-full overflow-hidden "
			style={{
				borderRadius: "5px",
				border: "1px solid #E0E0E0",
			}}
		>
			<TableContainer className="flex-1">
				<Table {...getTableProps()} stickyHeader className="border">
					<TableHead>
						{headerGroups.map((headerGroup) => (
							<TableRow
								{...headerGroup.getHeaderGroupProps()}
							// style={{ minHeight: "30px" }}
							>
								{headerGroup.headers.map((column) => (
									<TableCell
										// style={{ minHeight: "30px" }}
										className="whitespace-nowrap p-4 "
										{...(!column.sortable
											? column.getHeaderProps()
											: column.getHeaderProps(column.getSortByToggleProps()))}
									>
										<b>{column.render("Header")}</b>
										{column.sortable && (
											<>
												<TableSortLabel
													active={column.isSorted}
													// react-table has a unsorted state which is not treated here
													direction={column.isSortedDesc ? "desc" : "asc"}
													IconComponent={[<KeyboardArrowDown />]}
												/>
												{/* <dix style={{ display: "flex" }} >
													<KeyboardArrowUp style={{ height: "1.5rem", width: "1.5rem" }} />
													<KeyboardArrowDown style={{ height: "1.5rem", width: "1.5rem" }} />
												</dix> */}
											</>
										)}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableHead>
					<TableBody>
						{page.map((row, i) => {
							prepareRow(row);
							return (
								<TableRow
									{...row.getRowProps()}
									className="truncate"
								//   style={{ minHeight: "30px" }}
								>
									{row.cells.map((cell) => {
										return (
											<TableCell
												// style={{ minHeight: "30px" }}
												{...cell.getCellProps()}
												className={clsx("p-4", cell.column.className)}
											>
												{cell.render("Cell")}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				component="div"
				classes={{
					root: "flex-shrink-0 border-t-1",
				}}
				// params={params}
				// setParams={setParams}
				rowsPerPageOptions={[5, 10, 25]}
				colSpan={5}
				count={totalCount}
				rowsPerPage={params.pageSize}
				page={params.pageIndex}
				SelectProps={{
					inputProps: { "aria-label": "rows per page" },
					native: false,
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
				ActionsComponent={CustomeTablePagination}
			/>
		</div>
	);
};

EnhancedTable.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	onRowClick: PropTypes.func,
};

export default EnhancedTable;
