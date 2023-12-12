// ** User List Component
import Table from "./Table";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";

import { useEffect, useState } from "react";
import { apiCall } from "../../../services/interceptor/api-call";

const UsersList = () => {
  const [totalUsers, setTotalUsers] = useState("موردی یافت نشد");
  const [activeUsers, setActiveUsers] = useState("موردی یافت نشد");
  const [dyActiveUsers, setDyActiveUsers] = useState("موردی یافت نشد");
  const [teachers, setTeachers] = useState("موردی یافت نشد");

  const getUserData = async () => {
    const getDyActiveUsers = await apiCall("/User/UserMannage", {
      params: { IsActiveUser: false },
    });

    const getActiveUsers = await apiCall("/User/UserMannage", {
      params: { IsActiveUser: true },
    });

    const getTeachers = await apiCall("/Home/GetTeachers");

    setTeachers(getTeachers.length);

    setTotalUsers(getDyActiveUsers.totalCount + getActiveUsers.totalCount);

    setDyActiveUsers(getDyActiveUsers.totalCount);

    setActiveUsers(getActiveUsers.totalCount);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="app-user-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="تعداد کاربران "
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75"> {totalUsers} </h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="کاربران فعال"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75"> {activeUsers} </h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="کاربران غیر فعال"
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75"> {dyActiveUsers} </h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="تعداد اساتید"
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75"> {teachers} </h3>}
          />
        </Col>
      </Row>
      <Table />
    </div>
  );
};

export default UsersList;
