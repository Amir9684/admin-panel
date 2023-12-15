// ** React Imports
import { Fragment, useContext } from "react";

// ** Billing Components
// import PaymentMethods from './PaymentMethods'
// import BillingCurrentPlan from './BillingCurrentPlan'
import BillingAddress from "./BillingAddress";
import Earnings from "./Earnings";
import { Col } from "reactstrap";
import { ThemeColors } from "../../../utility/context/ThemeColors";

const BillingTab = ({ selectedUser, setShow }) => {
  const { colors } = useContext(ThemeColors);

  return (
    <Fragment>
      {/* <BillingCurrentPlan />
      <PaymentMethods /> */}
      <BillingAddress selectedUser={selectedUser} />
      <Col lg="6" md="9" xs="12">
        <Earnings
          success={colors.primary.main}
          selectedUser={selectedUser}
          setShow={setShow}
        />
      </Col>
    </Fragment>
  );
};

export default BillingTab;
