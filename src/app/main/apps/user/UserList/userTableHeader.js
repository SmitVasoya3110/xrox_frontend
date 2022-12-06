import FuseAnimate from "@fuse/core/FuseAnimate";
import Hidden from "@material-ui/core/Hidden";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

function UserTableHeader(props) {
  return (
    <div className="flex flex-1 items-center justify-between p-4 sm:p-24">
      <div className="flex flex-shrink items-center sm:w-224">
        <Hidden lgUp>
          <IconButton
            onClick={(ev) => {
              props.pageLayout.current.toggleLeftSidebar();
            }}
            aria-label="open left sidebar"
          >
            <Icon>menu</Icon>
          </IconButton>
        </Hidden>

        <div className="flex items-center" style={{ whiteSpace: "nowrap" }}>
          <FuseAnimate animation="transition.expandIn" delay={300}>
            <Icon className="text-32">backpack</Icon>
          </FuseAnimate>

          <FuseAnimate animation="transition.slideLeftIn" delay={300}>
            <Typography variant="h6" className="mx-12 hidden sm:flex">
              All Employee List
            </Typography>
          </FuseAnimate>
        </div>
      </div>

      <FuseAnimate animation="transition.slideRightIn" delay={300}>
        <Button
          component={Link}
          to="/apps/employeeAdd/new"
          className="whitespace-no-wrap normal-case"
          variant="contained"
          color="secondary"
        >
          <span className="hidden sm:flex">Add New Employee</span>
          <span className="flex sm:hidden">New</span>
        </Button>
      </FuseAnimate>
    </div>
  );
}

export default UserTableHeader;
