// ** React Imports
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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

const MySwal = withReactContent(Swal);

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
          return MySwal.fire({
            title: "آیا از حذف مطمئنید؟",
            text: "این عملیات قابل بازگشت نیست",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "بله، دوره حذف شود",
            cancelButtonText: "لغو",
            customClass: {
              confirmButton: "btn btn-primary",
              cancelButton: "btn btn-outline-danger ms-1",
            },
            buttonsStyling: false,
          }).then(async (result) => {
            if (result.value) {
              setIsLoading(true);
              await dispatch(deleteCourse(row));
            } else if (result.dismiss === MySwal.DismissReason.cancel) {
              MySwal.fire({
                title: "درخواست لغو شد",
                text: "حذف دوره لغو شد",
                icon: "error",
                customClass: {
                  confirmButton: "btn btn-success",
                },
              });
            }
          });
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };

      const handleActiveness = async () => {
        try {
          setIsLoading(true);
          if (row.isActive) await dispatch(deActiveCourse(row));
          else await dispatch(activeCourse(row));
        } catch (error) {
          console.log(error);
          toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
        } finally {
          setIsLoading(false);
        }
      };

      return (
        <div className="column-action d-flex align-items-center">
          {row.isActive ? (
            <>
              <button
                disabled={isLoading}
                onClick={handleActiveness}
                style={{
                  cursor: isLoading && "not-allowed",
                  opacity: isLoading && "0.7",
                  backgroundColor: "transparent",
                  border: "transparent",
                }}
              >
                <EyeOff
                  size={18}
                  className="me-50"
                  style={{
                    stroke: "#ffca18",
                    cursor: "pointer",
                  }}
                />
              </button>
              <Link
                to={`/course-management/${row.courseId}`}
                id={`pw-tooltip-${row.courseId}`}
              >
                <Edit size={18} className="me-50" />
              </Link>
            </>
          ) : (
            <button
              disabled={isLoading}
              onClick={handleActiveness}
              style={{
                cursor: isLoading && "not-allowed",
                opacity: isLoading && "0.7",
                backgroundColor: "transparent",
                border: "transparent",
              }}
            >
              <Eye
                size={18}
                className="me-50"
                style={{
                  stroke: "#0ed145",
                  cursor: "pointer",
                }}
              />
            </button>
          )}
          <button
            disabled={isLoading}
            onClick={handleDelete}
            style={{
              cursor: isLoading && "not-allowed",
              opacity: isLoading && "0.7",
              backgroundColor: "transparent",
              border: "transparent",
            }}
          >
            <Trash
              onClick={handleDelete}
              size={18}
              style={{
                stroke: "#cf2f4a",
                cursor: "pointer",
              }}
            />
          </button>
        </div>
      );
    },
  },
];
