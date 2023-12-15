// ** React Imports
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
import { useDispatch } from "react-redux";
import {
  activeCourse,
  deActiveCourse,
  deleteCourse,
} from "../../../redux/courses";

// ** Reactstrap Imports
import { Badge } from "reactstrap";

// ** Third Party Components
import { Edit, Eye, EyeOff, Trash } from "react-feather";
import { getPersianNumbers } from "../../../utility/get-persian-numbers";

// ** Vars

const statusObj = {
  true: "light-success",
  false: "light-secondary",
};
// ** renders client column
const renderClient = (row) => {
  const stateNum = Math.floor(Math.random() * 6),
    states = [
      "light-success",
      "light-danger",
      "light-warning",
      "light-info",
      "light-primary",
      "light-secondary",
    ],
    color = states[stateNum];

  if (row.tumbImageAddress?.length) {
    return (
      <Avatar
        className="me-50"
        img={row.tumbImageAddress}
        width="32"
        height="32"
      />
    );
  } else {
    return (
      <Avatar
        color={color}
        className="me-50"
        content={row.tumbImageAddress ? row.title : "John Doe"}
        initials
      />
    );
  }
};

// ** Table columns
export const columns = [
  // {
  //   name: "#",
  //   sortable: true,
  //   sortField: "id",
  //   minWidth: "107px",
  //   // selector: row => row.id,
  //   cell: (row) => (
  //     <Link
  //       to={`/course-managment/preview/${row.courseId}`}
  //     >{`#${row.courseId.substr(0, 10)}`}</Link>
  //   ),
  // },
  {
    name: "عنوان دوره",
    sortable: true,
    minWidth: "350px",
    sortField: "title",
    // selector: row => row.client.name,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(row)}
          <div className="d-flex flex-column">
            <h6 className="user-name text-truncate mb-0">{row.title}</h6>
            <small className="text-truncate text-muted mb-0">
              {row.statusName}
            </small>
          </div>
        </div>
      );
    },
  },
  {
    name: "قیمت",
    sortable: true,
    minWidth: "150px",
    sortField: "cost",
    // selector: row => row.total,
    cell: (row) => <span>{row.cost || 0} ريال</span>,
  },
  {
    name: "وضعیت",
    minWidth: "150px",
    sortField: "likes",
    // selector: row => row.total,
    cell: (row) => (
      <Badge
        className="text-capitalize"
        style={{ fontSize: "15px" }}
        color={statusObj[row.isActive]}
        pill
      >
        {row.isActive ? "فعال" : "غیرفعال"}
      </Badge>
    ),
  },
  {
    sortable: true,
    minWidth: "200px",
    name: "آخرین بروزرسانی",
    sortField: "lastUpdate",
    cell: (row) => {
      const lastUpdate = new Date(row?.lastUpdate)
        .toLocaleDateString("fa-IR-u-nu-latn")
        .split("/");
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
      return (
        <span style={{ fontSize: "14px" }}>
          {`${getPersianNumbers(lastUpdate?.[2], true)} ${
            months[lastUpdate?.[1] - 1]
          } ${getPersianNumbers(lastUpdate?.[0], true)}`}
        </span>
      );
    },
    // selector: row => row.dueDate
  },
  // {
  //   sortable: true,
  //   name: "Balance",
  //   minWidth: "164px",
  //   sortField: "balance",
  //   // selector: row => row.balance,
  //   cell: (row) => {
  //     return row.balance !== 0 ? (
  //       <span>{row.balance}</span>
  //     ) : (
  //       <Badge color="light-success" pill>
  //         پرداخت شده
  //       </Badge>
  //     );
  //   },
  // },
  {
    name: "عملیات",
    minWidth: "110px",
    cell: (row) => {
      const [isLoading, setIsLoading] = useState(false);
      const dispatch = useDispatch();

      const handleDelete = async () => {
        try {
          setIsLoading(true);
          await dispatch(deleteCourse(row.courseId, row.isActive));
        } catch (error) {
          console.log(error);
          toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
        }
      };

      const handleActiveness = () => {
        try {
          setIsLoading(true);
          if (row.isActive) dispatch(deActiveCourse(row));
          else dispatch(activeCourse(row));
        } catch (error) {
          console.log(error);
          toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
        }
      };

      return (
        <div className="column-action d-flex align-items-center">
          {row.isActive ? (
            <>
              <EyeOff
                onClick={handleActiveness}
                size={18}
                className="me-50"
                style={{
                  stroke: "#ffca18",
                  cursor: "pointer",
                }}
              />
              <Link
                to={`/course-management/${row.courseId}`}
                id={`pw-tooltip-${row.courseId}`}
              >
                <Edit size={18} className="me-50" />
              </Link>
            </>
          ) : (
            <Eye
              onClick={handleActiveness}
              size={18}
              className="me-50"
              style={{
                stroke: "#0ed145",
                cursor: "pointer",
              }}
            />
          )}
          <Trash
            onClick={handleDelete}
            size={18}
            style={{
              stroke: "#cf2f4a",
              cursor: "pointer",
            }}
          />
        </div>
      );
    },
  },
];
