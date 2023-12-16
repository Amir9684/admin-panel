// ** React Imports
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ** Table columns & Expandable Data
import ExpandableTable, { columns } from "./data";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllComments,
  useComments,
  getCommentReplies,
} from "../../../../redux/commnets";

// ** Reactstrap Imports
import { Card } from "reactstrap";

import { Loading } from "../../../ui-elements/loading";

const DataTableWithButtons = () => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0),
    [isLoading, setIsLoading] = useState(false),
    [itemOffset, setItemOffset] = useState(0);

  const dispatch = useDispatch();

  const { courseId, commentId } = useParams();

  const comments = useSelector(selectAllComments);
  const totalCount = useComments().totalCount;

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      const params = { courseId, commentId };
      dispatch(getCommentReplies(params)).then(() => setIsLoading(false));
    }
  }, [dispatch, totalCount]);

  // ** Function to handle filter
  const handlePagination = (page) => {
    const newOffset = (page.selected * 6) % comments?.length;
    setItemOffset(newOffset);
    setCurrentPage(page.selected);
  };
  const pageCount = Math.ceil(comments.length / 6);
  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={""}
      nextLabel={""}
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={pageCount || 1}
      breakLabel={"..."}
      pageRangeDisplayed={2}
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
      containerClassName={
        "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1"
      }
    />
  );

  const dataToRender = () => {
    if (comments.length > 0) return comments.slice(itemOffset, itemOffset + 6);
  };

  if (isLoading) return <Loading />;

  return (
    <Card>
      <div className="react-dataTable">
        <DataTable
          noHeader
          pagination
          data={dataToRender()}
          expandableRows
          columns={columns}
          expandOnRowClicked
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          paginationDefaultPage={currentPage + 1}
          expandableRowsComponent={ExpandableTable}
        />
      </div>
    </Card>
  );
};

export default DataTableWithButtons;
