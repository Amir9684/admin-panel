// ** React Imports
import { Fragment } from "react";
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
import { useDispatch } from "react-redux";
import { deleteCourse } from "../../../redux/courses";

// ** Reactstrap Imports
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown,
} from "reactstrap";

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Copy,
  Save,
  Info,
  Trash,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  MoreVertical,
  ArrowDownCircle,
} from "react-feather";
import { getPersianNumbers } from "../../../utility/get-persian-numbers";

// ** Vars
const invoiceStatusObj = {
  Sent: { color: "light-secondary", icon: Send },
  Paid: { color: "light-success", icon: CheckCircle },
  Draft: { color: "light-primary", icon: Save },
  Downloaded: { color: "light-info", icon: ArrowDownCircle },
  "Past Due": { color: "light-danger", icon: Info },
  "Partial Payment": { color: "light-warning", icon: PieChart },
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
        <span>
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
      const dispatch = useDispatch();

      return (
        <div className="column-action d-flex align-items-center">
          <Link
            to={`/course-management/${row.courseId}`}
            id={`pw-tooltip-${row.courseId}`}
          >
            <Eye size={17} className="mx-1" />
          </Link>
          <UncontrolledDropdown>
            <DropdownToggle tag="span">
              <MoreVertical size={17} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem
                tag={Link}
                to={`/course-management/edit/${row.courseId}`}
                className="w-100"
              >
                <Edit size={14} className="me-50" />
                <span className="align-middle">ویرایش</span>
              </DropdownItem>
              <DropdownItem
                tag="button"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(deleteCourse(row.courseId, row.isActive));
                }}
              >
                <Trash size={14} className="me-50" />
                <span className="align-middle">حذف</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];
