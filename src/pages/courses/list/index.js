// ** React Imports
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// ** Table Columns
import { columns } from "./columns";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// ** Reactstrap Imports
import { Button, Input, Row, Col, Card } from "reactstrap";

// ** Store & Actions
import { useDispatch } from "react-redux";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { getAllCourses, useCourses } from "../../../redux/courses";
import { apiCall } from "../../../@core/auth/jwt/services/interceptor/api-call";
import { getPersianNumbers } from "../../../utility/get-persian-numbers";

const CustomHeader = ({
  handleFilter,
  value,
  handleStatusValue,
  statusValue,
  handlePerPage,
  rowsPerPage,
}) => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    apiCall("/Course/GetCreate").then((res) => setDatas(res));
  }, []);
  return (
    <div className="invoice-list-table-header w-100 py-2">
      <Row>
        <Col lg="6" className="d-flex align-items-center px-0 px-lg-1">
          <div className="d-flex align-items-center me-2">
            <label htmlFor="rows-per-page">نمایش</label>
            <Input
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              className="form-control ms-50 pe-3"
            >
              <option value="4">{getPersianNumbers(4)}</option>
              <option value="8">8</option>
              <option value="12">12</option>
            </Input>
          </div>
          <Button tag={Link} to="/apps/invoice/add" color="primary">
            افزودن دوره
          </Button>
        </Col>
        <Col
          lg="6"
          className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0"
        >
          <div className="d-flex align-items-center">
            <label htmlFor="search-invoice">جستجو</label>
            <Input
              id="search-invoice"
              className="ms-50 me-2 w-100"
              type="text"
              value={value}
              onChange={(e) => handleFilter(e.target.value)}
              placeholder="جستجو دوره"
            />
          </div>
          <Input
            className="w-auto "
            type="select"
            value={statusValue}
            onChange={handleStatusValue}
          >
            <option value="">انتخاب وضعیت</option>
            {datas?.statusDtos?.map((item) => (
              <option value={item.statusName}>{item.describe}</option>
            ))}
          </Input>
        </Col>
      </Row>
    </div>
  );
};
const result = (str) => {
  const firstChar = str.charAt(0).toUpperCase();
  const remainingChars = str.slice(1);
  return `${firstChar}${remainingChars}`;
};

const InvoiceList = () => {
  // ** Store vars
  const dispatch = useDispatch();
  const courses = useCourses();

  // ** States
  const [value, setValue] = useState("");
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusValue, setStatusValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const params = {
      sort: sort.toUpperCase(),
      q: value,
      sortColumn: result(sortColumn),
      PageNumber: currentPage,
      RowsOfPage: rowsPerPage,
      status: statusValue,
    };
    dispatch(getAllCourses(params));
  }, [dispatch, courses.totalCount]);

  const handleFilter = (val) => {
    setValue(val);
    const params = {
      sort: sort.toUpperCase(),
      q: value,
      sortColumn: result(sortColumn),
      PageNumber: currentPage,
      RowsOfPage: rowsPerPage,
      status: statusValue,
    };
    dispatch(getAllCourses(params));
  };

  const handlePerPage = (e) => {
    const params = {
      sort: sort.toUpperCase(),
      q: value,
      sortColumn: result(sortColumn),
      PageNumber: currentPage,
      RowsOfPage: parseInt(e.target.value),
      status: statusValue,
    };
    dispatch(getAllCourses(params));
    setRowsPerPage(parseInt(e.target.value));
  };

  const handleStatusValue = (e) => {
    setStatusValue(e.target.value);
    const params = {
      sort: sort.toUpperCase(),
      q: value,
      sortColumn: result(sortColumn),
      PageNumber: currentPage,
      RowsOfPage: rowsPerPage,
      status: e.target.value,
    };
    dispatch(getAllCourses(params));
  };

  const handlePagination = (page) => {
    const params = {
      sort: sort.toUpperCase(),
      q: value,
      sortColumn: result(sortColumn),
      PageNumber: page.selected + 1,
      RowsOfPage: rowsPerPage,
      status: statusValue,
    };
    dispatch(getAllCourses(params));
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    const count = Number((courses.totalCount / rowsPerPage).toFixed(0));

    return (
      <ReactPaginate
        nextLabel=""
        breakLabel="..."
        previousLabel=""
        pageCount={count || 1}
        activeClassName="active"
        breakClassName="page-item"
        pageClassName={"page-item"}
        breakLinkClassName="page-link"
        nextLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousLinkClassName={"page-link"}
        previousClassName={"page-item prev"}
        onPageChange={(page) => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={"pagination react-paginate justify-content-end p-1"}
      />
    );
  };

  const dataToRender = () => {
    const filters = {
      q: value,
      status: statusValue,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (courses.courses.length > 0) {
      return courses.courses;
    } else if (courses.courses.length === 0 && isFiltered) {
      return [];
    } else {
      return courses.courses.slice(0, rowsPerPage);
    }
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);

    const params = {
      q: value,
      page: currentPage,
      sort: sortDirection,
      status: statusValue,
      perPage: rowsPerPage,
      sortColumn: column.sortField,
    };
    dispatch(getAllCourses(params));
  };

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <div className="invoice-list-dataTable react-dataTable">
          <DataTable
            noHeader
            pagination
            sortServer
            paginationServer
            subHeader={true}
            columns={columns}
            responsive={true}
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            defaultSortField="invoiceId"
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            subHeaderComponent={
              <CustomHeader
                value={value}
                statusValue={statusValue}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                handleStatusValue={handleStatusValue}
              />
            }
          />
        </div>
      </Card>
    </div>
  );
};

export default InvoiceList;
