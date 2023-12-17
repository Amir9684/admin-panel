// ** Reactstrap Imports
import { Row, Col } from "reactstrap";
import { useContext } from "react";

// ** Demo Components
import StatsCard from "../ui-elements/cards/statistics/StatsCard";
import CardTransactions from "../ui-elements/cards/advance/CardTransactions";
import LineChart from "../charts/LineChart";

import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Styles
import "@styles/react/libs/charts/apex-charts.scss";
import "@styles/base/pages/dashboard-ecommerce.scss";

const Home = () => {
  const { colors } = useContext(ThemeColors);

  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col sm="12">
          <StatsCard cols={{ xl: "3", sm: "6" }} />
        </Col>
        <Col lg="8" md="6" xs="12">
          <LineChart warning={colors.primary.main} />
        </Col>
        <Col lg="4" md="6" xs="12">
          <CardTransactions />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
