// ** Reactstrap Imports
import { Alert, Badge, Card, CardHeader, Progress } from "reactstrap";

// ** Third Party Components
import { CheckCircle, ChevronDown, XCircle } from "react-feather";
import DataTable from "react-data-table-component";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Label Images
import xdLabel from "../../../assets/images/brands/xd-label.png";
import vueLabel from "../../../assets/images/brands/vue-label.png";
import htmlLabel from "../../../assets/images/brands/html-label.png";
import reactLabel from "../../../assets/images/brands/react-label.png";
import sketchLabel from "../../../assets/images/brands/sketch-label.png";
import figmaLabel from "../../../assets/images/brands/figma-label.png";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { getPersianNumbers } from "../../../utility/get-persian-numbers";
import { useState } from "react";
import { Link } from "react-router-dom";

// const projectsArr = [
//   {
//     progress: 60,
//     hours: "210:30h",
//     progressColor: "info",
//     totalTasks: "233/240",
//     subtitle: "React Project",
//     title: "BGC eCommerce App",
//     img: reactLabel,
//   },
//   {
//     hours: "89h",
//     progress: 15,
//     totalTasks: "9/50",
//     progressColor: "danger",
//     subtitle: "UI/UX Project",
//     title: "Falcon Logo Design",
//     img: xdLabel,
//   },
//   {
//     progress: 90,
//     hours: "129:45h",
//     totalTasks: "100/190",
//     progressColor: "success",
//     subtitle: "Vuejs Project",
//     title: "Dashboard Design",
//     img: vueLabel,
//   },
//   {
//     hours: "45h",
//     progress: 49,
//     totalTasks: "12/86",
//     progressColor: "warning",
//     subtitle: "iPhone Project",
//     title: "Foodista mobile app",
//     img: sketchLabel,
//   },

//   {
//     progress: 73,
//     hours: "67:10h",
//     totalTasks: "234/378",
//     progressColor: "info",
//     subtitle: "React Project",
//     title: "Dojo React Project",
//     img: reactLabel,
//   },
//   {
//     progress: 81,
//     hours: "108:39h",
//     totalTasks: "264/537",
//     title: "HTML Project",
//     progressColor: "success",
//     subtitle: "Crypto Website",
//     img: htmlLabel,
//   },
//   {
//     progress: 78,
//     hours: "88:19h",
//     totalTasks: "214/627",
//     progressColor: "success",
//     subtitle: "Vuejs Project",
//     title: "Vue Admin template",
//     img: vueLabel,
//   },
// ];

const months = [
  "فروردين",
  "ارديبهشت",
  "خرداد",
  "تير",
  "مرداد",
  "شهريور",
  "مهر",
  "آبان",
  "آذر",
  "دي",
  "بهمن",
  "اسفند",
];

const customStyles = {
  rows: {
    style: {
      padding: "1px 0",
    },
  },
};

export const columns = [
  {
    sortable: true,
    minWidth: "300px",
    name: "دوره ها",
    selector: (row) => row.courseName,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="avatar-wrapper">
            <Avatar
              className="me-1"
              img={row.img}
              alt={row.courseName}
              imgWidth="32"
            />
          </div>
          <div className="d-flex flex-column">
            <span
              className="text-truncate fw-bolder"
              style={{ whiteSpace: "normal" }}
            >
              {row.courseName}
            </span>
            <small
              className="text-muted font-small-1"
              style={{ whiteSpace: "nowrap", marginTop: "3px" }}
            >
              {row.courseId}
            </small>
          </div>
        </div>
      );
    },
  },
  {
    name: "روز ثبت نام",
    selector: (row) => row.currentReserverDate,
    cell: (row) => {
      return (
        <div className="fw-bolder">
          {`${getPersianNumbers(row.currentReserverDate?.[2], true)} ${
            months[row.currentReserverDate?.[1] - 1]
          } ${getPersianNumbers(row.currentReserverDate?.[0], true)}`}
        </div>
      );
    },
  },
  {
    name: "   وضیعت    ",
    selector: (row) => row.accept,
    cell: (row) => {
      return (
        <div className="d-flex flex-column">
          {row.accept === true ? (
            <Badge className="text-capitalize" color="light-success">
              <CheckCircle style={{ marginLeft: "3px" }} />
              <small className="mb-1 color-success">تایید شده</small>
            </Badge>
          ) : (
            <Badge className="text-capitalize" color="light-danger">
              <XCircle style={{ marginLeft: "3px" }} />
              <small className="mb-1"> درانتظار</small>
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    name: "کد ثبت نام",
    selector: (row) => row.reserveId,
    cell: (row) => {
      const [wrap, setWrap] = useState(false);
      return (
        <div
          onClick={(e) => {
            setWrap(!wrap);
          }}
          title={row.reserveId}
          style={{
            whiteSpace: "normal",
            cursor: "pointer",
          }}
          className="font-small-2"
        >
          {wrap === false
            ? " ••• " + row.reserveId.slice(2, 11)
            : row.reserveId}
        </div>
      );
    },
  },
];
const UserProjectsList = ({ selectedUser }) => {
  const data = selectedUser.coursesReseves;

  const img = [
    reactLabel,
    vueLabel,
    htmlLabel,
    xdLabel,
    sketchLabel,
    figmaLabel,
  ];

  const dataArr = data?.map((data, index) => {
    const currentReserverDate = new Date(data.reserverDate)
      .toLocaleDateString("fa-IR-u-nu-latn")
      .split("/");
    return {
      ...data,
      img: img[index % 6],
      currentReserverDate: currentReserverDate,
    };
  });

  return (
    <>
      {dataArr?.length > 0 ? (
        <Card>
          <CardHeader tag="h4">دوره های خریداری شده توسط کاربر</CardHeader>
          <div className="react-dataTable user-view-account-projects">
            <DataTable
              noHeader
              responsive
              columns={columns}
              data={dataArr}
              className="react-dataTable"
              sortIcon={<ChevronDown size={10} />}
              customStyles={customStyles}
            />
          </div>
        </Card>
      ) : (
        <Alert color="danger">
          <h4 className="alert-heading"> دوره ای یافت نشد </h4>
          <div className="alert-body">
            این کاربر دوره ای تهیه نکرده است -
            <Link to="/user-management"> لیست کاربران </Link>
          </div>
        </Alert>
      )}
    </>
  );
};

export default UserProjectsList;
