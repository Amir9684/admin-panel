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
import {
  BookOpen,
  Bookmark,
  Folder,
  Globe,
  Linkedin,
  Send,
} from "react-feather";
import fullLogo from "../../../assets/images/PC-logo/pcLogo.svg";
import StatsHorizontal from "./StatsHorizontal";

const BillingTab = ({ selectedUser, setShow, teachers, userAccess }) => {
  const { colors } = useContext(ThemeColors);

  const currentTeacher = teachers?.find(
    (t) => t.fullName === selectedUser?.fName + "-" + selectedUser?.lName
  );

  return (
    <Fragment>
      {/* <BillingCurrentPlan />
      <PaymentMethods /> */}
      <BillingAddress selectedUser={selectedUser} />
      <Row xl="2" lg="1" md="1" sm="1" xs="1">
        <Col
        //  lg="6" md="10" xs="10"
        >
          <Earnings
            success={colors.primary.main}
            selectedUser={selectedUser}
            setShow={setShow}
          />
        </Col>
        <Col>
          {" "}
          <Row xl="2">
            <Col>
              {" "}
              <StatsVertical
                link={selectedUser.linkdinProfile}
                icon={<Linkedin size={40} />}
                color="danger"
                stats="LinkedIn"
                statTitle="پروفایل لینکدین"
              />
            </Col>
            <Col>
              {" "}
              <StatsVertical
                link={selectedUser.telegramLink}
                icon={<Send size={40} />}
                color="info"
                stats="Telegram"
                statTitle="پروفایل تلگرام"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {userAccess === true && (
        <Row lg="2" md="1" sm="2" xs="1">
          <Col>
            <StatsHorizontal
              icon={<BookOpen size={33} />}
              color="success"
              stats={currentTeacher?.courseCounts ? currentTeacher.courseCounts : "0"}
              statTitle="تعداد دوره های ایجاد شده توسط کاربر"
            />
          </Col>
          <Col>
            <StatsHorizontal
              icon={<Bookmark size={33} />}
              color="warning"
              stats={currentTeacher?.newsCount ? currentTeacher.newsCount : "0"}
              statTitle="تعداد اخبار ایجاد شده توسط کاریر"
            />
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default BillingTab;
