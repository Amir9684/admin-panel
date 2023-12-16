// ** React Imports
import { Fragment } from "react";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

// ** Third Party Components
import { Row, Col } from "reactstrap";

// ** Demo Components
import TableExpandable from "./TableExpandable";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { AddComment } from "./add-comment";

const Tables = () => {
  return (
    <Fragment>
      <Breadcrumbs
        title="کامنت‌ها"
        data={[
          { title: "لیست کامنت‌ها", link: "/courses-comments" },
          { title: "لیست پاسخ‌ها" },
        ]}
      />
      <Row>
        <Col sm="12">
          <TableExpandable />
        </Col>
        <Col sm="12">
          <AddComment />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Tables;
