import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  control: { margin: theme.spacing(1) },
  control1: { margin: theme.spacing(1), width: 200 },
}));

function UserTableFilter(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [frmFilter, setFrmFilter] = useState({
    EmployeeName: "",
  });

  const handleChangeFrmFilter = (e) => {
    console.log("name", e.target.name, "value:-", e.target.value);
    setFrmFilter({
      ...frmFilter,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetChange = () => {
    setFrmFilter({
      EmployeeName: "",
    });

    // dispatch(SetFrmFilterData(null));
    // dispatch(
    //   getEmployeeLists({ frmFilter: null, page_number: 0, row_per_column: 10 })
    // );
  };

  const handleGetFilterData = () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const i in frmFilter) {
      if (frmFilter[i].length === 0) {
        frmFilter[i] = "none";
      }
    }
    // dispatch(SetFrmFilterData(frmFilter));
    // dispatch(
    //   getEmployeeLists({ frmFilter, page_number: 0, row_per_column: 10 })
    // );
  };

  return (
    <div className={classes.control}>
      <TextField
        id="EmployeeName"
        label="Employee Name"
        className={classes.control1}
        name="EmployeeName"
        value={frmFilter.EmployeeName === "none" ? "" : frmFilter.EmployeeName}
        onChange={handleChangeFrmFilter}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleGetFilterData()}
      >
        Search
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.control}
        onClick={handleResetChange}
      >
        Reset
      </Button>
    </div>
  );
}

export default UserTableFilter;
