import { Row, Col } from "reactstrap";

import InvoiceList from "./list";

import "@styles/react/libs/charts/apex-charts.scss";

const AnalyticsDashboard = () => {
  return (
    <div id="dashboard-analytics">
      <Row className="match-height">
        <Col xs="12">
          <InvoiceList />
        </Col>
      </Row>
    </div>
  );
};

export default AnalyticsDashboard;
