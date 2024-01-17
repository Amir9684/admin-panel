// ** Reactstrap Imports
import { Row, Col } from "reactstrap";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// ** Demo Components
import StatsHorizontal from "../../@core/components/widgets/stats/StatsHorizontal";
import CardTransactions from "../ui-elements/cards/advance/CardTransactions";
import LineChart from "../charts/LineChart";

import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Styles
import "@styles/react/libs/charts/apex-charts.scss";
import "@styles/base/pages/dashboard-ecommerce.scss";
import { BookOpen, FileText, UserCheck, Users } from "react-feather";
import { getAllUsers, useUsers } from "../../redux/users";
import { getAllCourses, useCourses } from "../../redux/courses";
import { getAllNews, useNews } from "../../redux/news";
import { getAllTeachers, selectAllTeachers } from "../../redux/teachers";
import { getPersianNumbers } from "../../utility/get-persian-numbers";

const Home = () => {
  const { colors } = useContext(ThemeColors);

  const dispatch = useDispatch();

  const users = useUsers();
  const courses = useCourses();
  const news = useNews();
  const teachers = useSelector(selectAllTeachers);

  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getAllUsers());
    dispatch(getAllNews({ RowsOfPage: 0 }));
    dispatch(getAllTeachers());
  }, []);
  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="استاید مجموعه"
            icon={<Users size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {getPersianNumbers(teachers?.length)}
              </h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="دانشجویان مجموعه"
            icon={<UserCheck size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {getPersianNumbers(users.totalCount)}
              </h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="تعداد دوره‌ها"
            icon={<BookOpen size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {getPersianNumbers(courses.totalCount)}
              </h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="تعداد بلاگ‌ها"
            icon={<FileText size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {getPersianNumbers(news.totalCount)}
              </h3>
            }
          />
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
