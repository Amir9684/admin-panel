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
import { getAllTeachers, selectAllTeachers } from "../../../redux/teachers";

import { Loading } from "../../ui-elements/loading";

// ** Styles
import "@styles/react/apps/app-users.scss";

const UserView = () => {
  const [isLoading, setIsLoading] = useState(false);
  // ** Store Vars
  const store = useSelector(selectAllUsers);
  const teachers = useSelector(selectAllTeachers);
  const dispatch = useDispatch();
  // console.log(store);

  // ** Hooks
  const { id } = useParams();

  // ** Get suer on mount
  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      dispatch(getUserById(id));
      dispatch(getAllTeachers()).then(() => setIsLoading(false));
    }
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

  if (isLoading) return <Loading />;

  return (
    store.length > 0 &&
    teachers.length > 0 && (
      <div className="app-user-view">
        <Row>
          <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
            <UserInfoCard
              selectedUser={store.length > 0 && store[0]}
              teachers={teachers.length > 0 && teachers}
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
              teachers={teachers.length > 0 && teachers}
            />
          </Col>
        </Row>
      </div>
    )
  );
};
export default UserView;
