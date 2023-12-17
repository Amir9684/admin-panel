// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Invoice List Sidebar
import Sidebar from "./Sidebar";

// ** Table Columns
import { columns } from "./columns";

// ** Store & Actions
import { getAllUsers, selectAllUsers, useUsers } from "../../../redux/users";
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  Share,
  Printer,
  FileText,
  File,
  Grid,
  Copy,
} from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

// ** Table Header
const CustomHeader = ({
  store,
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
}) => {
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page" style={{ margin: "0 5px" }}>
              تعداد نمایش در صفحه
            </label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: "5rem" }}
            >
              <option value="6">6</option>
              <option value="8">8</option>
              <option value="12">12</option>
            </Input>
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="search-invoice">
              جستجو
            </label>
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>

          <div className="d-flex align-items-center table-header-actions">
            <Button
              className="add-new-user"
              color="primary"
              onClick={toggleSidebar}
            >
              افزودن کاربر
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector(selectAllUsers);
  const totalCount = useUsers().totalCount;

  // ** States
  const [sort, setSort] = useState("DESC");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    value: 0,
    label: "انتخاب نقش",
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: false,
    label: "خیر ",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: true,
    label: "انتخاب وضیعت",
  });

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ** Get data on mount

  const result = (str) => {
    const firstChar = str.charAt(0).toUpperCase();
    const remainChars = str.slice(1);
    return `${firstChar}${remainChars}`;
  };

  useEffect(() => {
    dispatch(
      getAllUsers({
        SortType: sort.toUpperCase(),
        SortingCol: result(sortColumn),
        Query: searchTerm,
        PageNumber: currentPageNumber,
        RowsOfPage: rowsPerPage,
      })
    );
  }, [dispatch, totalCount, sort, sortColumn, currentPageNumber]);

  // ** User filter options
  const roleOptions = [
    { value: "", label: "انتخاب نقش" },
    { value: 1, label: "ادمین" },
    { value: 2, label: "استاد" },
    { value: 3, label: "دانشجو" },
    { value: 4, label: "استاد یار" }, //CourseAssistance
    { value: 5, label: " کارمند" }, //EmployeeAdmin
    { value: 6, label: "نویسنده" }, //Employee.Writer
    { value: 7, label: "داور تورنمنت" }, //Referee For Tounament
    { value: 8, label: "ادمین تورنمنت" }, //Tournament Admin
    { value: 9, label: "منتور تورنمنت" }, //Tournament Mentor
  ];

  const planOptions = [
    { value: false, label: "خیر" },
    { value: true, label: "بله" },
  ];

  const statusOptions = [
    { value: "", label: "انتخاب وضیعت" },
    { value: true, label: "فعال" },
    { value: false, label: "غیر فعال" },
  ];

  // ** Function in get data on page change
  const handlePagination = (page) => {
    dispatch(
      getAllUsers({
        SortType: sort.toUpperCase(),
        SortingCol: result(sortColumn),
        Query: searchTerm,
        PageNumber: page.selected + 1,
        RowsOfPage: rowsPerPage,
        roleId: currentRole.value,
        IsActiveUser: currentStatus.value,
        IsDeletedUser: currentPlan.value,
      })
    );
    setCurrentPageNumber(page.selected + 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    dispatch(
      getAllUsers({
        SortType: sort.toUpperCase(),
        SortingCol: result(sortColumn),
        Query: searchTerm,
        PageNumber: currentPageNumber,
        RowsOfPage: value,
        roleId: currentRole.value,
        IsActiveUser: currentStatus.value,
        IsDeletedUser: currentPlan.value,
      })
    );
    setRowsPerPage(value);
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val);
    dispatch(
      getAllUsers({
        SortType: sort.toUpperCase(),
        SortingCol: result(sortColumn),
        Query: val,
        PageNumber: currentPageNumber,
        RowsOfPage: rowsPerPage,
        roleId: currentRole.value,
        IsActiveUser: currentStatus.value,
        IsDeletedUser: currentPlan.value,
      })
    );
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    console.log(store);
    const count = Number(Math.ceil(totalCount / rowsPerPage));

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPageNumber !== 0 ? currentPageNumber - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
  };

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      roleId: currentRole.value,
      IsDeletedUser: currentPlan.value,
      IsActiveUser: currentStatus.value,
      Query: searchTerm,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (store?.length > 0) {
      return store;
    } else if (store?.length === 0 && isFiltered) {
      return [];
    } else {
      return store.slice(0, rowsPerPage);
    }
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    dispatch(
      getAllUsers({
        SortType: sortDirection.toUpperCase(),
        SortingCol: result(column.sortField),
        Query: searchTerm,
        PageNumber: currentPageNumber,
        RowsOfPage: rowsPerPage,
        roleId: currentRole.value,
        IsActiveUser: currentStatus.value,
        IsDeletedUser: currentPlan.value,
      })
    );
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="role-select">انتخاب نقش</Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={roleOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(data) => {
                  setCurrentRole(data);
                  dispatch(
                    getAllUsers({
                      SortType: sort.toUpperCase(),
                      SortingCol: result(sortColumn),
                      Query: searchTerm,
                      PageNumber: page.selected + 1,
                      RowsOfPage: rowsPerPage,
                      roleId: data.value,
                      IsActiveUser: currentStatus.value,
                      IsDeletedUser: currentPlan.value,
                    })
                  );
                }}
              />
            </Col>
            <Col md="4">
              <Label for="status-select">وضیعت</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={currentStatus}
                onChange={(data) => {
                  setCurrentStatus(data);
                  dispatch(
                    getAllUsers({
                      SortType: sort.toUpperCase(),
                      SortingCol: result(sortColumn),
                      Query: searchTerm,
                      PageNumber: page.selected + 1,
                      RowsOfPage: rowsPerPage,
                      roleId: currentRole.value,
                      IsActiveUser: data.value,
                      IsDeletedUser: currentPlan.value,
                    })
                  );
                }}
              />
            </Col>
            <Col className="my-md-0 my-1" md="4">
              <Label for="plan-select">حذف شده</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={planOptions}
                value={currentPlan}
                onChange={(data) => {
                  setCurrentPlan(data);
                  dispatch(
                    getAllUsers({
                      SortType: sort.toUpperCase(),
                      SortingCol: result(sortColumn),
                      Query: searchTerm,
                      PageNumber: page.selected + 1,
                      RowsOfPage: rowsPerPage,
                      roleId: currentRole.value,
                      IsActiveUser: currentStatus.value,
                      IsDeletedUser: data.value,
                    })
                  );
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                store={store}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
              />
            }
          />
        </div>
      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
  );
};

export default UsersList;
