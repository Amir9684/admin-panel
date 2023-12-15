// ** React Imports
import { Fragment } from "react";

import DataTablesReOrder from "../TableColumnReorder";
import { categoryColumns } from "../column";

const SelectCategory = ({ stepper, categories }) => {
  return (
    <Fragment>
      <DataTablesReOrder
        stepper={stepper}
        data={categories}
        columns={categoryColumns}
      />
    </Fragment>
  );
};

export default SelectCategory;
