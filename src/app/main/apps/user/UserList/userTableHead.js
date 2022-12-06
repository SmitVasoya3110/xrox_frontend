import FuseAnimate from "@fuse/core/FuseAnimate";
import history from "@history";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FuseLoading from "@fuse/core/FuseLoading";
import MultiSelectMenu from "./userMenu";
import ReactCustomeTable from "./userTable";

function UserTableHead(props) {
  const dispatch = useDispatch();
  const userList = useSelector(({ user }) => user.userList);
  const [data, setData] = useState(userList);
  console.log("data", data);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // dispatch(
    //   getEmployeeLists({
    //     frmFilter: frmFilterData,
    //     row_per_column: size,
    //     page_number: page,
    //   })
    // ).then(() => setLoading(false));
  }, [dispatch, size, page]);

  useEffect(() => {
    // setData(userList);
  }, [userList]);

  const columns = React.useMemo(
    () => [
      {
        Header: ({ selectedFlatRows }) => {
          const selectedRowIds = selectedFlatRows.map((row) => row.original.id);

          return (
            selectedFlatRows.length > 0 && (
              <MultiSelectMenu selectedIds={selectedRowIds} />
            )
          );
        },
        accessor: "avatar",
        Cell: ({ row }) => (
          <div>
            <IconButton>
              <Icon>edit</Icon>
            </IconButton>
          </div>
        ),
        sortable: false,
      },

      {
        Header: "Employee ID",
        accessor: "id",
        sortable: false,
      },
      {
        Header: "EMPLOYEE NAME",
        accessor: "EmployeeName",
        sortable: false,
      },
      {
        Header: "DESIGNATION",
        accessor: "Designation",
        sortable: false,
      },
      {
        Header: "ROLE TYPE",
        accessor: "RoleType",
        sortable: false,
      },
      {
        Header: "USER NAME",
        accessor: "UserName",
        sortable: false,
      },
      {
        Header: "PASSWORD",
        accessor: "Password",
        sortable: false,
      },
      {
        Header: "DATE",
        accessor: "dateAdded",
        sortable: false,
      },
    ],
    []
  );

  if (!data) {
    return null;
  }

  function func() {
    setSize(size);
  }
  function func1() {
    setPage(page);
  }
  if (loading) {
    return <FuseLoading />;
  }
  if (data.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          " There are no any User List! "
        </Typography>
      </div>
    );
  }

  return (
    <FuseAnimate animation="transition.slideUpIn" delay={300}>
      <ReactCustomeTable
        columns={columns}
        data={data}
        funcSetIndex={(val) => func1(val)}
        funcsetSize={(val) => func(val)}
        index={page}
        size={size}
      />
    </FuseAnimate>
  );
}

export default UserTableHead;
