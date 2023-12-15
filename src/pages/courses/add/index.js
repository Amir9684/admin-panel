import { Row, Col } from "reactstrap";
import WizardHorizontal from "./WizardHorizontal";

import "@styles/react/libs/tables/react-dataTable-component.scss";

const AddCourse = () => {
  return (
    <Row>
      <Col sm="12">
        <WizardHorizontal />
      </Col>
    </Row>
  );
};

export default AddCourse;
