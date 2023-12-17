// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
import { store } from "@store/store";

/// deleteUser ***** براره دار
import { getAllUsers } from "../../../redux/users";

// ** Icons Imports
import { Edit } from "react-feather";

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { getPersianNumbers } from "../../../utility/get-persian-numbers";
import { useState } from "react";
import EditUserModal from "../edit-user-modal";

// ** Renders Client Columns
const renderClient = (row) => {
  if (row.pictureAddress?.length) {
    return (
      <Avatar
        className="me-1"
        img={row.pictureAddress}
        width="32"
        height="32"
      />
    );
  } else {
    return (
      <Avatar
        initials
        className="me-1"
        color={row.avatarColor || "light-primary"}
        content={row.fullName || "John Doe"}
      />
    );
  }
};

// ** Renders Role Columns
const renderRole = (row) => {
  const roleColors = {
    CourseAssistance: "light-info",
    Administrator: "light-danger",
    "Employee.Admin": "light-warning",
    Teacher: "light-success",
    Student: "light-primary",
    "Employee.Writer": "light-secondary",
    Referee: "light-info",
    TournamentAdmin: "light-secondary",
    TournamentMentor: "light-warning",
  };
  const roles = row?.userRoles?.split(", ");
  return (
    <span className="text-truncate text-capitalize align-middle">
      {roles?.slice(0, 1).map((role) => (
        <Badge
          color={roleColors[role]}
          className="text-capitalize"
          style={{ margin: "10px 5px 0" }}
        >
          {role}
        </Badge>
      ))}
      {row.role}
    </span>
  );
};

const statusObj = {
  False: "light-danger",
  True: "light-success",
};

export const columns = [
  {
    name: "کاربر",
    sortable: true,
    minWidth: "300px",
    sortField: "fullName",
    selector: (row) => row.fname + row.lname,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <Link
            to={`/user-detail/${row.id}`}
            className="user_name text-truncate text-body"
          >
            <span className="fw-bolder">{row.fname + row.lname}</span>
          </Link>
          <small className="text-truncate text-muted mb-0">{row.gmail}</small>
        </div>
      </div>
    ),
  },
  {
    name: "نقش",
    sortable: true,
    minWidth: "172px",
    sortField: "role",
    selector: (row) => row.role,
    cell: (row) => renderRole(row),
  },
  {
    name: "وضعیت",
    minWidth: "138px",
    sortable: true,
    sortField: "currentPlan",
    selector: (row) => row.active,
    cell: (row) => (
      <Badge
        color={statusObj[row.active]}
        className="text-capitalize px-1"
        style={{ fontSize: "15px" }}
      >
        {row.active ? "فعال" : "غیرفعال"}
      </Badge>
    ),
  },
  {
    name: "زمان پیوستن",
    minWidth: "230px",
    sortable: true,
    sortField: "billing",
    selector: (row) => row.insertDate,
    cell: (row) => {
      const insertDate = new Date(row?.insertDate)
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
        <span className="text-capitalize">{`${getPersianNumbers(
          insertDate?.[2],
          true
        )} ${months[insertDate?.[1] - 1]} ${getPersianNumbers(
          insertDate?.[0],
          true
        )}`}</span>
      );
    },
  },
  {
    name: "عملیات",
    minWidth: "100px",
    cell: (row) => {
      const [show, setShow] = useState(false);
      const handleEdit = () => {
        setShow(true);
      };
      return (
        <div className="column-action">
          <Edit size={18} onClick={handleEdit} />
          <EditUserModal show={show} setShow={setShow} selectedUser={row} />
        </div>
      );
    },
  },
];
