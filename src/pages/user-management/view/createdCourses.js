// ** Reactstrap Imports
import { Badge, Card, CardHeader, Progress } from "reactstrap";

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

// const customStyles = {
//     // rows: {
//     //     style: {
//     //         minHeight: '42px',// override the row height
//     //     },
//     // },

//     // cells: {
//     //     style: {
//     //         border:'2px solid red'
//     //     },
//     // },
// };

export const columns = [
  {
    sortable: true,
    style: { maxWidth: "30%" },
    minWidth: "290px",
    name: "دوره ها",
    selector: (row) => row.title,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="avatar-wrapper">
            <Avatar
              className="me-1"
              img={row.img}
              alt={row.title}
              imgWidth="32"
            />
          </div>
          <div className="d-flex flex-column">
            <span
              className="text-truncate fw-bolder"
              style={{ whiteSpace: "normal" }}
            >
              {row.title}
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
    // minWidth:"100px",
    style: { maxWidth: "17%" },
    name: "اخرین بروزرسانی",
    selector: (row) => row.currentLastUpdate,
    cell: (row) => {
      return (
        <div className="fw-bolder">
          {`${getPersianNumbers(row.currentLastUpdate?.[2], true)} ${
            months[row.currentLastUpdate?.[1] - 1]
          } ${getPersianNumbers(row.currentLastUpdate?.[0], true)}`}
        </div>
      );
    },
  },
  {
    minWidth: "250px",
    name: "   توضیحات دوره    ",
    selector: (row) => row.describe,
    cell: (row) => {
      return <div>{row.describe.slice(0, 100)}</div>;
    },
  },
  //   {
  //     name: "کد ثبت نام",
  //     selector: (row) => row.describe,
  //     // cell: (row) => {
  //     //   return (

  //     //   );
  //     // },
  //   },
];
const CreatedCourses = ({ selectedUser }) => {
  const data = selectedUser.courses;

  const img = [
    vueLabel,
    sketchLabel,
    xdLabel,
    figmaLabel,
    reactLabel,
    htmlLabel,
  ];

  const dataArr = data.map((data, index) => {
    const currentLastUpdate = new Date(data.lastUpdate)
      .toLocaleDateString("fa-IR-u-nu-latn")
      .split("/");
    return {
      ...data,
      img: img[index % 6],
      currentLastUpdate: currentLastUpdate,
    };
  });

  return (
    <Card>
      <CardHeader tag="h4">دوره های خریداری شده</CardHeader>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={dataArr}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          //   customStyles={customStyles}
        />
      </div>
    </Card>
  );
};

export default CreatedCourses;
