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
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
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
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(store[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv === null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
          <label htmlFor="rows-per-page" style={{margin:"0 5px"}}>تعداد نمایش در صفحه</label>
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
            {/* <UncontrolledDropdown className="me-1">
              <DropdownToggle color="secondary" caret outline>
                <Share className="font-small-4 me-50" />
                <span className="align-middle">Export</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className="w-100">
                  <Printer className="font-small-4 me-50" />
                  <span className="align-middle">Print</span>
                </DropdownItem>
                <DropdownItem
                  className="w-100"
                  onClick={() => downloadCSV(store)}
                >
                  <FileText className="font-small-4 me-50" />
                  <span className="align-middle">CSV</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Grid className="font-small-4 me-50" />
                  <span className="align-middle">Excel</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <File className="font-small-4 me-50" />
                  <span className="align-middle">PDF</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Copy className="font-small-4 me-50" />
                  <span className="align-middle">Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}

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
  const users = useUsers();

  // ** States
  const [sort, setSort] = useState("DESC");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "انتخاب نقش",
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: false,
    label: "خیر ",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
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
        roleId: currentRole.value,
        IsActiveUser: currentStatus.value,
        IsDeletedUser:currentPlan
      })
    );
  }, [dispatch, store?.length, sort, sortColumn, currentPageNumber]);

  // ** User filter options
  const roleOptions = [
    { value: "", label: "انتخاب نقش" },
    { value: 1 , label: "ادمین" },
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
    { value: false, label: "خیر"},
    { value: true, label: "بله" },
  ];

  const statusOptions = [
    { value: "", label: "انتخاب وضیعت" },
    { value: true, label: "فعال"},
    { value: false , label: "غیر فعال" },
  ];

  // ** Function in get data on page change
  const handlePagination = (page) => {
    dispatch(
      getAllUsers({
        SortType: sort.toUpperCase(),
        SortingCol: result(sortColumn),
        Query: searchTerm,
        PageNumber: currentPageNumber,
        RowsOfPage: rowsPerPage,
        roleId: currentRole.value,
        IsActiveUser: currentStatus.value,
        currentPlan: currentPlan.value,
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
        RowsOfPage: rowsPerPage,
        roleId: currentRole.value,
        IsActiveUser: currentStatus.value,
        currentPlan: currentPlan.value,
        status: currentStatus.value,
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
        Query: searchTerm,
        PageNumber: currentPageNumber,
        RowsOfPage: rowsPerPage,
        roleId: currentRole.value,
        IsActiveUser: currentStatus.value,
        currentPlan: currentPlan.value,
      })
    );
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage));

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
      role: currentRole.value,
      currentPlan: currentPlan.value,
      status: currentStatus.value,
      q: searchTerm,
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
        SortType: sort.toUpperCase(),
        SortingCol: result(sortColumn),
        Query: searchTerm,
        PageNumber: currentPageNumber,
        RowsOfPage: rowsPerPage,
        roleId: currentRole.value,
        IsActiveUser: currentStatus.value,
        currentPlan: currentPlan.value,
      })
    );
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Filters</CardTitle>
        </CardHeader>
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
                      PageNumber: currentPageNumber,
                      RowsOfPage: rowsPerPage,
                      roleId: currentRole.value,
                      IsActiveUser: currentStatus.value,
                      currentPlan: currentPlan.value,
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
                      PageNumber: currentPageNumber,
                      RowsOfPage: rowsPerPage,
                      roleId: currentRole.value,
                      IsActiveUser: currentStatus.value,
                      currentPlan: currentPlan.value,
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
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPageNumber,
                      perPage: rowsPerPage,
                      role: currentRole.value,
                      currentPlan: data.value,
                      status: currentStatus.value,
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
