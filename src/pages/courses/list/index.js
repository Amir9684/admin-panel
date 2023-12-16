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
import {
  getAllCourses,
  selectAllCourses,
  useCourses,
} from "../../../redux/courses";
import { getPersianNumbers } from "../../../utility/get-persian-numbers";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../ui-elements/loading";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const CustomHeader = ({ handleFilter, value, handlePerPage, rowsPerPage }) => {
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
              <option value="12">{getPersianNumbers(12)}</option>
              <option value="16">{getPersianNumbers(16)}</option>
              <option value="20">{getPersianNumbers(20)}</option>
            </Input>
          </div>
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
          <Button tag={Link} to="/course-management/add" color="primary">
            افزودن دوره
          </Button>
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
  const [isLoading, setIsLoading] = useState(false);
  // ** Store vars
  const dispatch = useDispatch();
  const courses = useSelector(selectAllCourses);
  const totalCount = useCourses().totalCount;

  // ** States
  const [value, setValue] = useState("");
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusValue, setStatusValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(12);

  useEffect(() => {
    setIsLoading(true);
    const params = {
      SortType: sort.toUpperCase(),
      Query: value,
      SortingCol: result(sortColumn),
      PageNumber: currentPage,
      RowsOfPage: rowsPerPage,
    };
    dispatch(getAllCourses(params)).then(() => setIsLoading(false));
  }, [dispatch, totalCount]);

  const handleFilter = (val) => {
    setIsLoading(true);
    const params = {
      SortType: sort.toUpperCase(),
      Query: val,
      SortingCol: result(sortColumn),
      PageNumber: currentPage,
      RowsOfPage: rowsPerPage,
    };
    dispatch(getAllCourses(params)).then(() => setIsLoading(false));
    setValue(val);
  };

  const handlePerPage = (e) => {
    setIsLoading(true);
    const params = {
      SortType: sort.toUpperCase(),
      Query: value,
      SortingCol: result(sortColumn),
      PageNumber: 1,
      RowsOfPage: parseInt(e.target.value),
    };
    dispatch(getAllCourses(params)).then(() => setIsLoading(false));
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePagination = (page) => {
    setIsLoading(true);
    const params = {
      SortType: sort.toUpperCase(),
      Query: value,
      SortingCol: result(sortColumn),
      PageNumber: page.selected + 1,
      RowsOfPage: rowsPerPage,
    };
    dispatch(getAllCourses(params)).then(() => setIsLoading(false));
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    const count = Number((totalCount / rowsPerPage).toFixed(0));

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
      Query: value,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (courses.length > 0) {
      return courses;
    } else if (courses.length === 0 && isFiltered) {
      return [];
    } else {
      return courses.slice(0, rowsPerPage);
    }
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    const params = {
      SortType: sort.toUpperCase(),
      Query: value,
      PageNumber: currentPage,
      RowsOfPage: rowsPerPage,
      SortingCol: result(column.sortField),
    };
    dispatch(getAllCourses(params));
  };

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <div
          className="invoice-list-dataTable react-dataTable"
          style={{ opacity: isLoading ? "0.7" : "1" }}
        >
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
              />
            }
          />
        </div>
      </Card>
    </div>
  );
};

export default InvoiceList;
