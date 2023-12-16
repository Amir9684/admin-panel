// ** React Imports
import { useState } from "react";

// ** Table Columns

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// ** Reactstrap Imports
import { Card } from "reactstrap";
import { getItem, setItem } from "../../../services/common/storage.services";

const DataTablesReOrder = ({ stepper, data, columns }) => {
  // ** States
  const [currentPage, setCurrentPage] = useState(0),
    [itemOffset, setItemOffset] = useState(0);
  // ** Function to handle Pagination
  const handlePagination = (page) => {
    const newOffset = (page.selected * 6) % data?.length;
    setItemOffset(newOffset);
    setCurrentPage(page.selected);
  };

  const handleNext = (value) => {
    let createCourseDatas = getItem("create_course");
    if (createCourseDatas) {
      createCourseDatas = { ...createCourseDatas, ...value };
      setItem("create_course", createCourseDatas);
    } else setItem("create_course", value);
    stepper.next();
  };

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      nextLabel=""
      breakLabel="..."
      previousLabel=""
      pageRangeDisplayed={2}
      forcePage={currentPage}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      pageCount={Math.ceil(data.length / 6) || 1}
      onPageChange={(page) => handlePagination(page)}
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  );

  const dataToRender = () => {
    if (data.length > 0) return data.slice(itemOffset, itemOffset + 6);
  };

  return (
    <Card className="overflow-hidden">
      <div className="react-dataTable">
        <DataTable
          noHeader
          pagination
          data={dataToRender()}
          columns={columns}
          pointerOnHover
          highlightOnHover
          onRowClicked={handleNext}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          paginationDefaultPage={currentPage + 1}
        />
      </div>
    </Card>
  );
};

export default DataTablesReOrder;
