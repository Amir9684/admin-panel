import Avatar from "@components/avatar";
import { apiCall } from "../../../services/interceptor/api-call";

import cSharp from "@src/assets/images/categories/cSharp.png";
import js from "@src/assets/images/categories/js.svg";
import backend from "@src/assets/images/categories/backend.png";
import frontend from "@src/assets/images/categories/frontend.jpg";
import reactJs from "@src/assets/images/categories/reactjs.webp";
import nextJs from "@src/assets/images/categories/nextjs.png";
import sql from "@src/assets/images/categories/sql.png";
import tsql from "@src/assets/images/categories/tsql.webp";

const image = {
  "C#": cSharp,
  "Front-End": frontend,
  ReactJS: reactJs,
  NextJs: nextJs,
  JAVASCRIPTS: js,
  BackEnd: backend,
  SQL: sql,
  TSQL: tsql,
};

export const getData = async () => await apiCall("/Course/GetCreate");

export const categoryColumns = [
  {
    name: "موضوع",
    minWidth: "250px",
    selector: (row) => row,
    cell: (row) => (
      <div className="d-flex align-items-center">
        {<Avatar img={image[row.techName]} />}
        <div className="user-info text-truncate ms-1">
          <span className="d-block fw-bold text-truncate">{row.techName}</span>
        </div>
      </div>
    ),
  },
  {
    name: "توضیحات",
    minWidth: "250px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        <div className="user-info text-truncate ms-1">
          <span className="d-block fw-bold text-truncate">{row.describe}</span>
        </div>
      </div>
    ),
  },
];
export const teacherColumns = [
  {
    name: "موضوع",
    minWidth: "250px",
    selector: (row) => row,
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.pictureAddress && <Avatar img={row.pictureAddress} />}
        <div className="user-info text-truncate ms-1">
          <span className="d-block fw-bold text-truncate">{row.fullName}</span>
        </div>
      </div>
    ),
  },
  {
    name: "لینکدین",
    minWidth: "250px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        <div className="user-info text-truncate ms-1">
          <span className="d-block fw-bold text-truncate">
            {row.linkdinProfileLink}
          </span>
        </div>
      </div>
    ),
  },
];
