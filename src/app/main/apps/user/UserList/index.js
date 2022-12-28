import FusePageSimple from "@fuse/core/FusePageSimple";
import React, { useRef } from "react";
import TableHeader from "./userTableHeader";
import TableHead from "./userTableHead";
// import TableFilter from "./userTableFilter";

function UserList(props) {
  const pageLayout = useRef(null);

  return (
    <FusePageSimple
      classes={{
        contentWrapper: "p-0 sm:p-24 h-full",
        content: "flex flex-col h-full",
        leftSidebar: "w-256 border-0",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
        wrapper: "min-h-0",
      }}
      header={<TableHeader pageLayout={pageLayout} />}
      content={<TableHead />}
      // leftSidebarContent={<TableFilter />}
      sidebarInner
      ref={pageLayout}
      innerScroll
    />
  );
}

export default UserList;
