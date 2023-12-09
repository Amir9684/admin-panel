// ** Custom Components
import Avatar from "@components/avatar";

// ** Icons Imports
import * as Icon from "react-feather";

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { getTopCourses, useCourses } from "../../../../redux/courses";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { getPersianNumbers } from "../../../../utility/get-persian-numbers";

const CardTransactions = () => {
  const dispatch = useDispatch();
  const courses = useCourses();
  console.log(courses);
  useEffect(() => {
    dispatch(getTopCourses(4));
  }, []);

  // const transactionsArr = [
  //   {
  //     title: "Wallet",
  //     color: "light-primary",
  //     subtitle: "Starbucks",
  //     amount: "- $74",
  //     Icon: Icon["Pocket"],
  //     down: true,
  //   },
  //   {
  //     title: "Bank Transfer",
  //     color: "light-success",
  //     subtitle: "Add Money",
  //     amount: "+ $480",
  //     Icon: Icon["Check"],
  //   },
  //   {
  //     title: "Paypal",
  //     color: "light-danger",
  //     subtitle: "Add Money",
  //     amount: "+ $590",
  //     Icon: Icon["DollarSign"],
  //   },
  //   {
  //     title: "Mastercard",
  //     color: "light-warning",
  //     subtitle: "Ordered Food",
  //     amount: "- $12",
  //     Icon: Icon["CreditCard"],
  //     down: true,
  //   },
  //   {
  //     title: "Transfer",
  //     color: "light-info",
  //     subtitle: "Refund",
  //     amount: "+ $98",
  //     Icon: Icon["TrendingUp"],
  //   },
  // ];

  const renderTransactions = () => {
    return courses.courses.map((item) => {
      return (
        <div key={item.courseId} className="transaction-item">
          <div className="d-flex">
            <img
              src={item.tumbImageAddress}
              alt="CourseImage"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "100%",
                margin: "0 10px",
              }}
            />
            <div>
              <h6 className="transaction-title">{item.title}</h6>
              <small>{item.teacherName}</small>
            </div>
          </div>
          <div className="fw-bolder">{getPersianNumbers(item.cost)}</div>
        </div>
      );
    });
  };

  return (
    <Card className="card-transaction">
      <CardHeader>
        <CardTitle tag="h4">آخرین دوره‌ها</CardTitle>
        {/* <Icon.MoreVertical size={18} className="cursor-pointer" /> */}
      </CardHeader>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  );
};

export default CardTransactions;
