// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link, Folder, Code, Command, Globe } from "react-feather";

// ** User Components
// import InvoiceList from './InvoiceList'
// import SecurityTab from './SecurityTab'
// import Connections from './Connections'
import BillingPlanTab from "./BillingTab";
// import UserTimeline from './UserTimeline'
// import Notifications from './Notifications'
// import UserProjectsList from './UserProjectsList'

const UserTabs = ({ active, toggleTab, selectedUser, setShow }) => {
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
            <Folder className="font-medium-3 me-50" />
            <span className="fw-bold">دوره های ایجاد شده</span>
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink active={active === "4"} onClick={() => toggleTab("4")}>
            <Bell className="font-medium-3 me-50" />
            <span className="fw-bold">Notifications</span>
          </NavLink>
        </NavItem> */}
        {/* <NavItem>
          <NavLink active={active === "5"} onClick={() => toggleTab("5")}>
            <Link className="font-medium-3 me-50" />
            <span className="fw-bold">Connections</span>
          </NavLink>
        </NavItem> */}
      </Nav>

      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <BillingPlanTab selectedUser={selectedUser} setShow={setShow} />
          {/* <UserProjectsList />
          <UserTimeline />
          <InvoiceList /> */}
        </TabPane>
        <TabPane tabId="2">{/* <SecurityTab /> */}</TabPane>
        <TabPane tabId="3">
          {/* <BillingPlanTab selectedUser={selectedUser} /> */}
        </TabPane>
        <TabPane tabId="4">{/* <Notifications /> */}</TabPane>
        <TabPane tabId="5">{/* <Connections /> */}</TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
