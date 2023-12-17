// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Badge } from "reactstrap";

// ** Third Party Components
import { ArrowDown } from "react-feather";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ** Chart Data
const data = [
  {
    name: "7/12",
    pv: 280,
  },
  {
    name: "8/12",
    pv: 200,
  },
  {
    name: "9/12",
    pv: 220,
  },
  {
    name: "10/12",
    pv: 180,
  },
  {
    name: "11/12",
    pv: 270,
  },
  {
    name: "12/12",
    pv: 250,
  },
  {
    name: "13/12",
    pv: 70,
  },
  {
    name: "14/12",
    pv: 90,
  },
  {
    name: "15/12",
    pv: 200,
  },
  {
    name: "16/12",
    pv: 150,
  },
  {
    name: "17/12",
    pv: 160,
  },
  {
    name: "18/12",
    pv: 100,
  },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload) {
    return (
      <div className="recharts-custom-tooltip">
        <span>{`${payload[0].value}%`}</span>
      </div>
    );
  }

  return null;
};

const SimpleLineChart = ({ warning }) => {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle tag="h4">نمودار دانشجویان</CardTitle>
          <small className="text-muted">
            نمودار بررسی تعداد ثبت نام دانشجویان در ماه
          </small>
        </div>
      </CardHeader>
      <CardBody>
        <div className="recharts-wrapper">
          <ResponsiveContainer width="100%" aspect={3}>
            <LineChart height={300} data={data}>
              <CartesianGrid />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={CustomTooltip} />
              <Line dataKey="pv" stroke={warning} strokeWidth={4}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
};
export default SimpleLineChart;
