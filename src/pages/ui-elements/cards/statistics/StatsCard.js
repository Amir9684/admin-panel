// ** Third Party Components
import classnames from "classnames";
import { BookOpen, Users, UserCheck, FileText } from "react-feather";

import { getAllUsers, useUsers } from "../../../../redux/users";
import { getAllCourses, useCourses } from "../../../../redux/courses";
import { getAllTeachers, useTeachers } from "../../../../redux/teachers";
import { getAllNews, useNews } from "../../../../redux/news";

import { getPersianNumbers } from "../../../../utility/get-persian-numbers";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const StatsCard = ({ cols }) => {
  const dispatch = useDispatch();

  const user = useUsers();
  const courses = useCourses();
  const news = useNews();
  const teachers = useTeachers();

  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getAllUsers());
    dispatch(getAllNews());
    dispatch(getAllTeachers());
  }, []);

  console.log(user)

  const data = [
    {
      title: getPersianNumbers(teachers.teachers?.length, false),
      subtitle: "اساتید محموعه",
      color: "light-info",
      icon: <Users size={40} />,
    },
    {
      title: getPersianNumbers(user?.totalCount, false),
      subtitle: "کاربران مجموعه",
      color: "light-success",
      icon: <UserCheck size={40} />,
    },
    {
      title: getPersianNumbers(courses.totalCount, false),
      subtitle: "دوره‌ها",
      color: "light-primary",
      icon: <BookOpen size={40} />,
    },
    {
      title: getPersianNumbers(news.totalCount, false),
      subtitle: "اخبار",
      color: "light-danger",
      icon: <FileText size={40} />,
    },
  ];

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols);
      const margin = index === 2 ? "sm" : colMargin[0];
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-1 mb-${margin}-0`]: index !== data.length - 1,
          })}
        >
          <div className="d-flex align-items-center">
            <Avatar color={item.color} icon={item.icon} className="me-2 p-1" />
            <div className="my-auto">
              <h4 className="fw-bolder mb-0 font-medium-2">{item.title}</h4>
              <CardText className="font-medium-2 mb-0">{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      );
    });
  };

  return (
    <Card className="card-statistics">
      <CardHeader>
        <CardTitle className=" fw-bolder font-medium-5" tag="h1">آکادمی سپهر</CardTitle>
      </CardHeader>
      <CardBody className="statistics-body">
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  );
};

export default StatsCard;
