// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import {
  User,
  Lock,
  Bookmark,
  Bell,
  Link,
  Folder,
  Code,
  Command,
  Globe,
  MessageCircle,
} from "react-feather";

// ** User Components
// import InvoiceList from './InvoiceList'
// import SecurityTab from './SecurityTab'
// import Connections from './Connections'
import BillingPlanTab from "./BillingTab";
import UserProjectsList from "./UserCourses";
import CreatedCourses from "./createdCourses";
import UserComments from "./UserComments";
// import UserTimeline from './UserTimeline'
// import Notifications from './Notifications'

// import CourseColumn from "./list";

const UserTabs = ({
  active,
  toggleTab,
  selectedUser,
  setShow,
  userAccess,
  teachers,
}) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">پروفایل</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Globe className="font-medium-3 me-50" />
            <span className="fw-bold">دوره های ثبت نامی</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <MessageCircle className="font-medium-3 me-50" />
            <span className="fw-bold"> کامنت ها </span>
          </NavLink>
        </NavItem>

        {userAccess === true && (
          <NavItem>
            <NavLink active={active === "4"} onClick={() => toggleTab("4")}>
              <Bookmark className="font-medium-3 me-50" />
              <span className="fw-bold"> دوره های ایجاد شد </span>
            </NavLink>
          </NavItem>
        )}

        {/* <NavItem>
          <NavLink active={active === "5"} onClick={() => toggleTab("5")}>
            <Link className="font-medium-3 me-50" />
            <span className="fw-bold">Connections</span>
          </NavLink>
        </NavItem> */}
      </Nav>

      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <BillingPlanTab
            selectedUser={selectedUser}
            setShow={setShow}
            teachers={teachers}
            userAccess={userAccess}
          />
          {/* <UserTimeline />
          <InvoiceList /> */}
        </TabPane>
        <TabPane tabId="2">
          <UserProjectsList selectedUser={selectedUser} />
          {/* <SecurityTab /> */}
          {/* <CourseColumn selectedUser={selectedUser} /> */}
        </TabPane>
        <TabPane tabId="3">
          {/* <BillingPlanTab selectedUser={selectedUser} /> */}
          <UserComments selectedUser={selectedUser} />
        </TabPane>
        <TabPane tabId="4">
          {/* <Notifications /> */}
          <CreatedCourses selectedUser={selectedUser} />
        </TabPane>
        <TabPane tabId="5">{/* <Connections /> */}</TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
