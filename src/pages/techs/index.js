// ** React Imports
import { useContext } from "react";

// ** Custom Components
import Avatar from "@components/avatar";
import AvatarGroup from "@components/avatar-group";

// ** Utils

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Demo Components
import InvoiceList from "./list";

// ** Images
import jsonImg from "@src/assets/images/icons/json.png";

// ** Avatar Imports
import avatar6 from "@src/assets/images/portrait/small/avatar-s-6.jpg";
import avatar7 from "@src/assets/images/portrait/small/avatar-s-7.jpg";
import avatar8 from "@src/assets/images/portrait/small/avatar-s-8.jpg";
import avatar9 from "@src/assets/images/portrait/small/avatar-s-9.jpg";
import avatar20 from "@src/assets/images/portrait/small/avatar-s-20.jpg";

// ** Styles
import "@styles/react/libs/charts/apex-charts.scss";

const AnalyticsDashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors);

  // ** Vars

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
