// ** React Imports
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// ** Store & Actions
import { getUserById, selectAllUsers } from "../../../redux/users";
import { useSelector, useDispatch } from "react-redux";

// ** Reactstrap Imports
import { Row, Col, Alert } from "reactstrap";

// ** User View Components
import UserTabs from "./Tabs";
// import PlanCard from './PlanCard'
import UserInfoCard from "./UserInfoCard";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { getAllTeachers, useTeachers } from "../../../redux/teachers";

const UserView = () => {
  // ** Store Vars
  const store = useSelector(selectAllUsers);
  const teachers = useTeachers();
  const dispatch = useDispatch();
  // console.log(store);

  // ** Hooks
  const { id } = useParams();

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(getAllTeachers());
  }, []);

  // console.log(teachers)

  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  // for edit modal
  const [show, setShow] = useState(false);

  // check access by role
  const [userAccess, setUserAccess] = useState(null);

  return store.length && teachers.teachers.length > 0 ? (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard
            selectedUser={store.length > 0 && store[0]}
            teachers={teachers.teachers.length > 0 && teachers.teachers}
            show={show}
            setShow={setShow}
            userAccess={userAccess}
            setUserAccess={setUserAccess}
          />
          {/* <PlanCard /> */}
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs
            active={active}
            toggleTab={toggleTab}
            selectedUser={store.length > 0 && store[0]}
            show={show}
            setShow={setShow}
            userAccess={userAccess}
          />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">کاربر یافت نشد</h4>
      <div className="alert-body">
        کاربری با آیدی مورد نظر یافت نشد لطفا وارد لیست کاربران شوید -
        <Link to="/user-management"> لیست کاربران </Link>
      </div>
    </Alert>
  );
};
export default UserView;
