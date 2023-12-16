// ** React Imports
import { Fragment, useContext } from "react";

// ** Billing Components
// import PaymentMethods from './PaymentMethods'
// import BillingCurrentPlan from './BillingCurrentPlan'
import BillingAddress from "./BillingAddress";
import Earnings from "./Earnings";
import { Col, Row } from "reactstrap";
import { ThemeColors } from "../../../utility/context/ThemeColors";
import StatsVertical from "./StatsVertical";
import { Globe } from "react-feather";
import fullLogo from "../../../assets/images/PC-logo/pcLogo.svg";

const BillingTab = ({ selectedUser, setShow }) => {
  const { colors } = useContext(ThemeColors);

  return (
    <Fragment>
      {/* <BillingCurrentPlan />
      <PaymentMethods /> */}
      <BillingAddress selectedUser={selectedUser} />
      <Row>
        <Col lg="6" md="9" xs="12">
          <Earnings
            success={colors.primary.main}
            selectedUser={selectedUser}
            setShow={setShow}
          />
        </Col>
        {/* <Col lg="3" md="4" xs="7">
          <StatsVertical
            className="bg-white"
            selectedUser={selectedUser}
            icon={<Globe size={21} />}
            color="info"
            stats="36.9k"
            statTitle="Views"
          />
        </Col>
        <Col lg="3" md="4" xs="7" className="bg-white">
          <img src={fullLogo} style={{width:"90%" , height:"90%"}}/>
        </Col> */}
      </Row>
    </Fragment>
  );
};

export default BillingTab;
