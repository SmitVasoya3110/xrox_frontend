/* eslint-disable react/jsx-no-bind */
import history from "@history";
import { IconButton } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

function MultiSelectMenu(props) {
  const dispatch = useDispatch();
  const { selectedIds } = props;

  console.log("selectedIds", selectedIds);

  const [anchorEl, setAnchorEl] = useState(null);

  function openSelectedContactMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeSelectedMenu() {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        className="p-0"
        aria-owns={anchorEl ? "selectedMenu" : null}
        aria-haspopup="true"
        onClick={openSelectedContactMenu}
      >
        <Icon>more_horiz</Icon>
      </IconButton>
      <Menu
        id="selectedMenu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeSelectedMenu}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              if (window.confirm("Are You Sure?")) {
                console.log("selectedIds- zerooo", selectedIds[0]);
                // dispatch(removeEmployee(selectedIds));
              }
              closeSelectedMenu();
            }}
          >
            {/* <ListItemIcon className="min-w-40">
							<Icon>Receive</Icon>
						</ListItemIcon> */}
            <ListItemText primary="Delete" className="min-w-40" />
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

export default MultiSelectMenu;
