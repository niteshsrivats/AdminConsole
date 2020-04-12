import { DepartmentsProvider } from "./DepartmentsContext";
import React from "react";

const DataContextWrapper = (props) => {
  return (
    <DepartmentsProvider>
      {props.children}
    </DepartmentsProvider>
  );
};

export default DataContextWrapper;
