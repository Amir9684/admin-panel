// ** Reactstrap Imports
import { Alert, Badge, Card, CardHeader, Progress } from "reactstrap";

// ** Third Party Components
import {
  CheckCircle,
  ChevronDown,
  ThumbsDown,
  ThumbsUp,
  XCircle,
} from "react-feather";
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
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { getUserComments } from "../../../services/api/get-comments-by-id";
import {
  getCommentsByUserId,
  selectAllUserComments,
  useUserComments,
} from "../../../redux/userCommentsById";
import { useDispatch, useSelector } from "react-redux";

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
      // minHeight: '72px', // override the row height
      padding: "7px 0",
    },
  },
  // headCells: {
  //     style: {
  //         paddingLeft: '8px', // override the cell padding for head cells
  //         paddingRight: '8px',
  //     },
  // },
  // cells: {
  //     style: {
  //         paddingLeft: '8px', // override the cell padding for data cells
  //         paddingRight: '8px',
  //     },
  // },
};

export const columns = [
  {
    sortable: true,
    minWidth: "300px",
    name: "عنوان و متن کامنت",
    selector: (row) => row.commentTitle,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="avatar-wrapper">
            {row.img && row.img !== "Not-set" ? (
              <Avatar className="me-1" img={row.img} alt="P C" imgWidth="32" />
            ) : (
              <Avatar
                initials
                color={"light-primary"}
                className="me-1"
                content="P C"
                imgWidth="32"
              />
            )}
          </div>
          <div className="d-flex flex-column">
            <span
              className="text-truncate fw-bolder font-medium-1"
              style={{ whiteSpace: "normal" }}
            >
              {row.commentTitle}
            </span>
            <small
              className="text-muted font-small-4"
              style={{ marginTop: "3px" }}
            >
              {row.describe}
            </small>
          </div>
        </div>
      );
    },
  },
  {
    name: "نام دوره",
    selector: (row) => row.courseTitle,
    cell: (row) => {
      const [wrap, setWrap] = useState(false);
      return (
        <div className="d-flex flex-column">
          <div className="fw-bolder">{row.courseTitle}</div>
          <small
            onClick={(e) => setWrap(!wrap)}
            className="text-muted font-small-1"
            style={{ marginTop: "5px", cursor: "pointer" }}
          >
            {wrap === true ? row.courseId : " ••• " + row.courseId.slice(0, 13)}
          </small>
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
    name: "واکنش ها",
    selector: (row) => row.likeCount,
    cell: (row) => {
      return (
        <div className="d-flex flex-column" style={{ gap: "8px" }}>
          <div
            className="d-flex bg-light-info gap-1 rounded-2"
            style={{ padding: "3px 5px" }}
          >
            <div> {row.likeCount} </div>

            <ThumbsUp size={15} />
          </div>

          <div
            className="d-flex bg-light-danger gap-1 rounded-2"
            style={{ padding: "3px 5px" }}
          >
            <div> {row.dislikeCount}</div>

            <ThumbsDown style={{ transform: "rotateY(180deg)" }} size={15} />
          </div>
        </div>
      );
    },
  },
];
const UserComments = ({ selectedUser }) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsByUserId(id));
  }, []);

  const userComments = useSelector(selectAllUserComments);

  const commentsArr = userComments.map((data) => {
    return {
      ...data,
      img: selectedUser.currentPictureAddress,
    };
  });

  //   console.log(commentsArr);

  //   const user = selectedUser.coursesReseves;

  //   const img = [
  //     reactLabel,
  //     vueLabel,
  //     htmlLabel,
  //     xdLabel,
  //     sketchLabel,
  //     figmaLabel,
  //   ];

  //   const dataArr = user.map((data, index) => {
  //     const currentReserverDate = new Date(data.reserverDate)
  //       .toLocaleDateString("fa-IR-u-nu-latn")
  //       .split("/");
  //     return {
  //       ...data,
  //       img: img[index % 6],
  //       currentReserverDate: currentReserverDate,
  //     };
  //   });

  return (
    <>
      {commentsArr.length > 0 ? (
        <Card>
          <CardHeader tag="h4">دوره های خریداری شده توسط کاربر</CardHeader>
          <div className="react-dataTable user-view-account-projects">
            <DataTable
              noHeader
              responsive
              columns={columns}
              data={commentsArr}
              className="react-dataTable"
              sortIcon={<ChevronDown size={10} />}
              customStyles={customStyles}
            />
          </div>
        </Card>
      ) : (
        <Alert color="danger">
          <h4 className="alert-heading"> کامنتی یافت نشد </h4>
          <div className="alert-body">
                این کاربر تاکنون کامنتی ثبت نکرده است - 
            <Link to="/user-management"> لیست کاربران </Link>
          </div>
        </Alert>
      )}
    </>
  );
};

export default UserComments;
