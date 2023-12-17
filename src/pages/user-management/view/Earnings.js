// ** Third Party Components
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  Row,
  Col,
  Button,
} from "reactstrap";

const Earnings = ({ success, selectedUser, setShow }) => {
  const completed = +selectedUser.profileCompletionPercentage;
  const remaining = 100 - completed;

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: { show: false },
    comparedResult: [2, -3, 8],
    labels: [" تکمیل شده ", " باقی مانده "],
    stroke: { width: 0 },
    colors: [success, "#988eff"],
    grid: {
      padding: {
        right: -18,
        bottom: -6,
        left: -18,
      },
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15,
            },
            value: {
              offsetY: -15,
              formatter(val) {
                return `% ${parseInt(val)}`;
              },
            },
            total: {
              show: true,
              offsetY: 15,
              label: "تکمیل شده",
              formatter() {
                return "% " + completed;
              },
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 1325,
        options: {
          chart: {
            height: 100,
          },
        },
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 120,
          },
        },
      },
      {
        breakpoint: 1155,
        options: {
          chart: {
            height: 110,
          },
        },
      },
      {
        breakpoint: 1065,
        options: {
          chart: {
            height: 100,
          },
        },
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 120,
          },
        },
      },
    ],
  };

  return (
    <Card className="earnings-card">
      <CardBody>
        <Row>
          <Col xs="6">
            <CardTitle className="mb-0"> پروفایل کاربری</CardTitle>
            <div className="font-small-2" style={{ margin: "6px" }}>
              {" "}
              مقدار تکمیل شده مشخصات حساب کاربری{" "}
            </div>
            <div className="font-small-2" style={{ margin: "0 0 12px" ,whiteSpace:"nowrap" }}>
              برای تکمیل پروفایل اقدام کنید
            </div>
            <CardText className="text-muted font-small-2">
              <Button.Ripple
                color="primary"
                outline
                className="round"
                style={{ whiteSpace: "nowrap" }}
                onClick={() => setShow(true)}
              >
                تکمیل پروفایل
              </Button.Ripple>
            </CardText>
          </Col>
          <Col xs="6">
            <Chart
              options={options}
              series={[completed, remaining]}
              type="donut"
              height={120}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Earnings;
