// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import { Button } from "reactstrap";

import DataTablesReOrder from "../TableColumnReorder";
import { teacherColumns } from "../column";

import "@styles/react/libs/react-select/_react-select.scss";
import { ArrowLeft } from "react-feather";

const SelectTeacher = ({ stepper, teachers }) => {
  return (
    <Fragment>
      <DataTablesReOrder
        stepper={stepper}
        data={teachers}
        columns={teacherColumns}
      />
      <Button
        type="button"
        color="primary"
        className="btn-prev"
        onClick={() => stepper.previous()}
      >
        <ArrowLeft size={14} className="align-middle me-sm-25 me-0" />
        <span
          className="align-middle d-sm-inline-block d-none"
          style={{ margin: "0 10px" }}
        >
          قبلی
        </span>
      </Button>
    </Fragment>
  );
};

export default SelectTeacher;
