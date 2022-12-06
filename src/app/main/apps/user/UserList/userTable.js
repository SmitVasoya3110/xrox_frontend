import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import CustomTablePagination from "component/CustomeTablePagination";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <Checkbox ref={resolvedRef} {...rest} />;
  }
);

const EnhancedTable = ({
  columns,
  data,
  index,
  size,
  funcSetIndex,
  funcsetSize,
}) => {
  const { getTableProps, headerGroups, prepareRow, rows } = useTable(
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
      hooks.allColumns.push((_columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          sortable: false,
          Cell: ({ row }) => (
            <div>
              {row.original.return_status === 1 ? (
                "Return"
              ) : (
                <IndeterminateCheckbox
                  {...row.getToggleRowSelectedProps()}
                  onClick={(ev) => ev.stopPropagation()}
                />
              )}
            </div>
          ),
        },
        ..._columns,
      ]);
    }
  );

  // const [Tform, setForm] = useState({
  // 	sales_order_id: [],
  // 	deliver_date: ""
  // })
  // const dispatch = useDispatch()
  const handleChangePage = (event, newPage) => {
    funcSetIndex(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    funcsetSize(event.target.value);
  };

  console.log("rows", rows);

  // Render the UI for your table
  return (
    <div
      className="flex flex-col min-h-full sm:border-1 sm:rounded-16 overflow-hidden rounded-16"
      style={{
        borderRadius: "20px",
        border: "1px solid #E0E0E0",
      }}
    >
      <TableContainer className="flex-1">
        <Table {...getTableProps()} stickyHeader className="border">
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    className="whitespace-nowrap p-4 md:p-12"
                    {...(!column.sortable
                      ? column.getHeaderProps()
                      : column.getHeaderProps(column.getSortByToggleProps()))}
                  >
                    <b>{column.render("Header")}</b>
                    {/* {column.sortable ? (
											<TableSortLabel
												active={column.isSorted}
												// react-table has a unsorted state which is not treated here
												direction={column.isSortedDesc ? 'desc' : 'asc'}
											/>
										) : null} */}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  // onClick={ev => onRowClick(ev, row)}
                  className="truncate"
                >
                  {row.cells.map((cell) => {
                    return (
                      <TableCell
                        {...cell.getCellProps()}
                        className={clsx("p-4 md:p-12", cell.column.className)}
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
        // rowsPerPageOptions={[5, 10, 25, { label: 'All', value: data.length + 1 }]}
        colSpan={5}
        count={data[0].total}
        rowsPerPage={size}
        page={index}
        SelectProps={{
          inputProps: { "aria-label": "rows per page" },
          native: false,
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={CustomTablePagination}
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
